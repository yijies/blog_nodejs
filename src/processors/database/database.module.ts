/**
 * Database module.
 * @file Database 全局模块
 * @module processor/database/module
 * @author Yijie <https://github.com/yijies>
 */

import { Module, Global } from '@nestjs/common';
import { databaseProvider } from './database.provider';

@Global()
@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
