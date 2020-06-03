/**
 * App controller.
 * @file 主页控制器
 * @module app/controller
 * @author Yijie <https://github.com/yijies>
 */

import { Get, Controller } from '@nestjs/common';
import * as APP_CONFIG from './app.config';


@Controller()
export class AppController {

  @Get()
  root(): any {
   return APP_CONFIG.INFO;
  }
}
