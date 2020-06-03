/**
 * Bilibili module.
 * @file Bilibili 模块
 * @module module/bilibili/module
 * @author Yijie <https://github.com/yijies>
 */

import { Module, HttpModule } from '@nestjs/common';
import { BilibiliController } from './bilibili.controller';
import { BilibiliService } from './bilibili.service';

@Module({
  imports: [HttpModule],
  controllers: [BilibiliController],
  providers: [BilibiliService],
  exports: [BilibiliService],
})
export class BilibiliModule {}
