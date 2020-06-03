/**
 * Expansion Statistic service.
 * @file 扩展模块 Statistic 服务
 * @module module/expansion/statistic.service
 * @author Yijie <https://github.com/yijies>
 */

import schedule from 'node-schedule';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '../../transformers/model.transformer';
import { MongooseModel } from '../../interfaces/mongoose.interface';
import { CacheService } from '../../processors/cache/cache.service';
import { Article } from '../../modules/article/article.model';
import { Comment } from '../../modules/comment/comment.model';
import { Tag } from '../../modules/tag/tag.model';
import * as CACHE_KEY from '../../constants/cache.constant';

export interface ITodayStatistic {
  tags: number;
  views: number;
  articles: number;
  comments: number;
}

@Injectable()
export class StatisticService {

  private resultData: ITodayStatistic = {
    tags: null,
    views: null,
    articles: null,
    comments: null,
  };

  constructor(
    private readonly cacheService: CacheService,
    @InjectModel(Tag) private readonly tagModel: MongooseModel<Tag>,
    @InjectModel(Article) private readonly articleModel: MongooseModel<Article>,
    @InjectModel(Comment) private readonly commentModel: MongooseModel<Comment>,
  ) {
    // 每天 0 点数据清零
    schedule.scheduleJob('1 0 0 * * *', () => {
      this.cacheService.set(CACHE_KEY.TODAY_VIEWS, 0);
    });
  }

  private getViewsCount(): Promise<number> {
    return this.cacheService.get<number>(CACHE_KEY.TODAY_VIEWS).then(views => {
      this.resultData.views = views || 0;
      return views;
    });
  }

  private getTagsCount(): Promise<number> {
    return this.tagModel.countDocuments().exec().then(count => {
      this.resultData.tags = count;
      return count;
    });
  }

  private getArticlesCount(): Promise<number> {
    return this.articleModel.countDocuments().exec().then(count => {
      this.resultData.articles = count;
      return count;
    });
  }

  private getCommentsCount(): Promise<number> {
    return this.commentModel.countDocuments().exec().then(count => {
      this.resultData.comments = count;
      return count;
    });
  }

  // 获取统计数据
  public getStatistic() {
    return Promise.all([
      this.getTagsCount(),
      this.getViewsCount(),
      this.getArticlesCount(),
      this.getCommentsCount(),
    ])
    .then(() => Promise.resolve(this.resultData))
    .catch(() => Promise.resolve(this.resultData));
  }
}
