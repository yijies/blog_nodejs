/**
 * Cache module.
 * @file Cache 全局模块
 * @module processor/cache/module
 * @author Yijie <https://github.com/yijies>
 */

import { CacheModule as NestCacheModule, Global, Module } from '@nestjs/common';
import { CacheConfigService } from './cache.config.service';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useClass: CacheConfigService,
      inject: [CacheConfigService],
    }),
  ],
  providers: [CacheConfigService, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
