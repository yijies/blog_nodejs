/**
 * Tag module.
 * @file 标签模块
 * @module module/tag/module
 * @author Surmon <https://github.com/yijies>
 */

import { Module } from '@nestjs/common';
import { SyndicationModule } from '../../modules/syndication/syndication.module';
import { ArticleProvider } from '../../modules/article/article.model';
import { TagController } from './tag.controller';
import { TagProvider } from './tag.model';
import { TagService } from './tag.service';

@Module({
  imports: [SyndicationModule],
  controllers: [TagController],
  providers: [ArticleProvider, TagProvider, TagService],
  exports: [TagService],
})
export class TagModule {}
