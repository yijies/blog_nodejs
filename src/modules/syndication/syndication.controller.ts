/**
 * Syndication controller.
 * @file Syndication 模块控制器
 * @module module/syndication/controller
 * @author Yijie <https://github.com/yijies>
 */

import { UseGuards, Response, Controller, Get, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { HttpProcessor } from '../../decorators/http.decorator';
import { SyndicationService } from './syndication.service';

@Controller('syndication')
export class SyndicationController {

  constructor(private readonly syndicationService: SyndicationService) {}

  @Get('sitemap')
  @HttpProcessor.handle('获取网站地图')
  getSitemapXML(@Response() response): void {
    this.syndicationService.getSitemapCache().then(xml => {
      response.header('Content-Type', 'application/xml');
      response.send(xml);
    });
  }

  @Get('rss')
  @HttpProcessor.handle('获取 RSS 订阅')
  getRSSXML(@Response() response): void {
    this.syndicationService.getRSSCache().then(xml => {
      response.header('Content-Type', 'application/xml');
      response.send(xml);
    });
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('更新聚合供稿')
  updateData(): Promise<any> {
    return this.syndicationService.updateCache();
  }
}
