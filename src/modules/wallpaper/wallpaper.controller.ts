/**
 * Wallpaper controller.
 * @file Wallpaper 模块控制器
 * @module module/wallpaper/controller
 * @author Yijie <https://github.com/yijies>
 */

import { Controller, Get } from '@nestjs/common';
import { HttpProcessor } from '../../decorators/http.decorator';
import { WallpaperService } from './wallpaper.service';
import { QueryParams } from '../../decorators/query-params.decorator';

@Controller('wallpaper')
export class WallpaperController {

  constructor(private readonly wallpaperService: WallpaperService) {}

  @Get('list')
  @HttpProcessor.handle('获取今日壁纸列表')
  getWallpapers(@QueryParams(['en']) { querys }): Promise<any> {
    return Boolean(Number(querys.en))
      ? this.wallpaperService.getEnWallpapersCache()
      : this.wallpaperService.getZhWallpapersCache()
  }
}
