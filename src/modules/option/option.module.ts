/**
 * Option module.
 * @file 设置模块
 * @module module/option/module
 * @author Yijie <https://github.com/yijies>
 */

import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionProvider } from './option.model';
import { OptionService } from './option.service';

@Module({
  controllers: [OptionController],
  providers: [OptionProvider, OptionService],
  exports: [OptionService],
})
export class OptionModule {}
