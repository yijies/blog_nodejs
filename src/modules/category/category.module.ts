/**
 * Category module.
 * @file 分类模块
 * @module module/category/module
 * @author Surmon <https://github.com/yijies>
 */

import { Module } from '@nestjs/common';
import { SyndicationModule } from '../../modules/syndication/syndication.module';
import { ArticleProvider } from '../../modules/article/article.model';
import { CategoryController } from './category.controller';
import { CategoryProvider } from './category.model';
import { CategoryService } from './category.service';

@Module({
  imports: [SyndicationModule],
  controllers: [CategoryController],
  providers: [
    ArticleProvider,
    CategoryProvider,
    CategoryService,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
