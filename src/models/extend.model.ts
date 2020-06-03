/**
 * Extend model.
 * @file 通用扩展字段数据模型
 * @module model/extend
 * @author Yijie <https://github.com/yijies>
 */

import { prop } from '@typegoose/typegoose';
import { IsString, IsNotEmpty } from 'class-validator';

export class Extend {
  @IsNotEmpty()
  @IsString()
  @prop({ required: true, validate: /\S+/ })
  name: string;

  @IsNotEmpty()
  @IsString()
  @prop({ required: true, validate: /\S+/ })
  value: string;
}
