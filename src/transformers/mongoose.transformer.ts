/**
 * Mongoose transform.
 * @file Mongoose 模块转换器
 * @module transformer/mongoose
 * @author Yijie <https://github.com/yijies>
 */

import _mongoose from 'mongoose';
import _mongoosePaginate from 'mongoose-paginate';
import _mongooseAutoIncrement from 'mongoose-auto-increment';
import * as APP_CONFIG from '../app.config';

// 各种 Hack
_mongoose.set('useFindAndModify', false);
(_mongoose as any).Promise = global.Promise;

// 初始化翻页插件
_mongooseAutoIncrement.initialize(_mongoose.connection);

// 插件配置初始化
(_mongoosePaginate as any).paginate.options = {
  limit: APP_CONFIG.APP.LIMIT,
};

export const mongoose = _mongoose;
export const mongoosePaginate = _mongoosePaginate;
export const mongooseAutoIncrement = _mongooseAutoIncrement;
export default mongoose;
