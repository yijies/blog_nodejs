/**
 * Announcement module.
 * @file 公告模块
 * @module module/announcement/module
 * @author Yijie <https://github.com/yijies>
 */

import { Module } from '@nestjs/common';
import { AnnouncementProvider } from './announcement.model';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';

@Module({
  controllers: [AnnouncementController],
  providers: [AnnouncementProvider, AnnouncementService],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
