/**
 * Comment module.
 * @file 评论模块
 * @module module/comment/module
 * @author Yijie <https://github.com/yijies>
 */

import { Module } from '@nestjs/common';
import { SyndicationModule } from '../../modules/syndication/syndication.module';
import { OptionProvider } from '../../modules/option/option.model';
import { ArticleProvider } from '../../modules/article/article.model';
import { CommentController } from './comment.controller';
import { CommentProvider } from './comment.model';
import { CommentService } from './comment.service';

@Module({
  imports: [SyndicationModule],
  controllers: [CommentController],
  providers: [
    CommentProvider,
    ArticleProvider,
    OptionProvider,
    CommentService,
  ],
  exports: [CommentService],
})
export class CommentModule {}
