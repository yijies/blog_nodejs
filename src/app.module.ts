/**
 * App module.
 * @file App 主模块
 * @module app/module
 * @author Yijie <https://github.com/yijies>
 */

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';

// 拦截器
import { HttpCacheInterceptor } from './interceptors/cache.interceptor';

// 中间件
import { CorsMiddleware } from './middlewares/cors.middleware';
import { OriginMiddleware } from './middlewares/origin.middleware';

// 公共模块
import { DatabaseModule } from './processors/database/database.module';
import { CacheModule } from './processors/cache/cache.module';
import { HelperModule } from './processors/helper/helper.module';

// 业务模块（辅助）
import { SyndicationModule } from './modules/syndication/syndication.module';
import { ExpansionModule } from './modules/expansion/expansion.module';
import { MusicModule } from './modules/music/music.module';
import { BilibiliModule } from './modules/bilibili/bilibili.module';
import { WallpaperModule } from './modules/wallpaper/wallpaper.module';

// 业务模块（核心）
import { AuthModule } from './modules/auth/auth.module';
import { OptionModule } from './modules/option/option.module';
import { AnnouncementModule } from './modules/announcement/announcement.module';
import { TagModule } from './modules/tag/tag.module';
import { CategoryModule } from './modules/category/category.module';
import { ArticleModule } from './modules/article/article.module';
import { CommentModule } from './modules/comment/comment.module';
import { LikeModule } from './modules/like/like.module';

@Module({
  imports: [
    HelperModule,
    DatabaseModule,
    CacheModule,

    AuthModule,
    OptionModule,
    AnnouncementModule,
    TagModule,
    CategoryModule,
    ArticleModule,
    CommentModule,
    LikeModule,

    ExpansionModule,
    MusicModule,
    BilibiliModule,
    WallpaperModule,
    SyndicationModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware, OriginMiddleware).forRoutes('*');
  }
}
