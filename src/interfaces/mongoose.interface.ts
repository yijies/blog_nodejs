/**
 * Mongoose model interface.
 * @file Mongoose 和 Paginate 模型的兼容
 * @module interface/mongoose
 * @author Yijie <https://github.com/yijies>
 */

import { ModelType } from '@typegoose/typegoose/lib/types';
import { PaginateModel, Document } from 'mongoose';

export type MongooseModel<T> = ModelType<T> & PaginateModel<T & Document>;
