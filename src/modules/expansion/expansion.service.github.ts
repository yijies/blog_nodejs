/**
 * Expansion Giithub service.
 * @file 扩展模块 Giithub 服务
 * @module module/expansion/github.service
 * @author Yijie <https://github.com/yijies>
 */

import { Injectable, HttpService } from '@nestjs/common';
import { CacheService, ICacheIoResult } from '../../processors/cache/cache.service';
import { getMessageFromAxiosError } from '../../transformers/error.transformer';
import * as CACHE_KEY from '../../constants/cache.constant';
import * as APP_CONFIG from '../../app.config';

export interface IGithubRepositorie {
  html_url: string;
  name: string;
  fork: boolean;
  forks: number;
  forks_count: number;
  description: string;
  open_issues_count: number;
  stargazers_count: number;
  created_at: string;
  language: string;
}

export interface IGithubOriginRepositorie {
  [key: string]: string | number;
}

@Injectable()
export class GithubService {

  // 项目列表缓存
  private repositoriesCache: ICacheIoResult<IGithubRepositorie[]>;

  constructor(private readonly httpService: HttpService, private readonly cacheService: CacheService) {
    this.repositoriesCache = this.cacheService.interval({
      ioMode: true,
      key: CACHE_KEY.GITHUB_REPOSITORIES,
      promise: this.getRepositories.bind(this),
      timeout: {
        success: 1000 * 60 * 60 * 2, // 成功后 2 小时更新一次数据
        error: 1000 * 60 * 10, // 失败后 10 分钟更新一次数据
      },
    });
  }

  // 获取缓存
  public getRepositoriesCache(): Promise<IGithubRepositorie[]> {
    return this.repositoriesCache.get();
  }

  // 更新缓存
  public updateRepositoriesCache(): Promise<IGithubRepositorie[]> {
    return this.repositoriesCache.update();
  }

  // 获取项目列表
  public getRepositories(): Promise<IGithubRepositorie[]> {
    return this.httpService.axiosRef
      .request({
        headers: { 'User-Agent': APP_CONFIG.INFO.name },
        url: `http://api.github.com/users/${APP_CONFIG.GITHUB.username}/repos?per_page=1000`,
      })
      .then(response => {
        try {
          return response.data.map(rep => {
            return {
              html_url: rep.html_url,
              name: rep.name || ' ',
              fork: rep.fork,
              forks: rep.forks,
              forks_count: rep.forks_count,
              description: rep.description || ' ',
              open_issues_count: rep.open_issues_count,
              stargazers_count: rep.stargazers_count,
              created_at: rep.created_at,
              language: rep.language,
            } as IGithubRepositorie;
          });
        } catch (error) {
          return Promise.reject('Giithub 控制器解析 JSON 失败' + error);
        }
      })
      .catch(error => {
        const message = getMessageFromAxiosError(error);
        console.warn('Giithub 项目列表获取失败：', message);
        return Promise.reject(message);
      });
  }
}
