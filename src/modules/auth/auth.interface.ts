/**
 * Auth interface.
 * @file 权限模块公共接口
 * @module module/auth/interface
 * @author Yijie <https://github.com/yijies>
 */

export interface ITokenResult {
  access_token: string;
  expires_in: number;
}
