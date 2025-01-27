/**
 * Like service.
 * @file 点赞模块数据服务
 * @module module/like/service
 * @author Yijie <https://github.com/yijies>
 */

import { DocumentType } from '@typegoose/typegoose';
import { Injectable } from '@nestjs/common';
import { Option } from '../../modules/option/option.model';
import { Comment } from '../../modules/comment/comment.model';
import { OptionService } from '../../modules/option/option.service';
import { ArticleService } from '../../modules/article/article.service';
import { CommentService } from '../../modules/comment/comment.service';

@Injectable()
export class LikeService {
  constructor(
    private readonly optionService: OptionService,
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  // 喜欢主站
  public likeSite(): Promise<boolean> {
    return this.optionService
      .getOption()
      .then((option: DocumentType<Option>) => {
        option.meta.likes++;
        return option.save().then(() => true);
      });
  }

  // 喜欢评论
  public likeComment(commentId: number): Promise<boolean> {
    return this.commentService
      .getDetailByNumberId(commentId)
      .then((comment: DocumentType<Comment>) => {
        comment.likes++;
        return comment.save().then(() => true);
      });
  }

  // 喜欢文章
  public likeArticle(articleId: number): Promise<boolean> {
    return this.articleService
      .getDetailByNumberId(articleId)
      .then(article => {
        article.meta.likes++;
        return article.save().then(() => true);
      });
  }
}
