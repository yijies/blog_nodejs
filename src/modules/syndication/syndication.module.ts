/**
 * Syndication module.
 * @file Syndication 模块
 * @module module/syndication/module
 * @author Surmon <https://github.com/yijies>
 */

import { Module } from '@nestjs/common';
import { CategoryProvider } from '../../modules/category/category.model';
import { ArticleProvider } from '../../modules/article/article.model';
import { TagProvider } from '../../modules/tag/tag.model';
import { SyndicationController } from './syndication.controller';
import { SyndicationService } from './syndication.service';

@Module({
  controllers: [SyndicationController],
  providers: [
    TagProvider,
    CategoryProvider,
    ArticleProvider,
    SyndicationService,
  ],
  exports: [SyndicationService],
})
export class SyndicationModule {}
