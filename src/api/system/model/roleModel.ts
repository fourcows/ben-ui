import {BasicPageParams, BasicFetchResult} from '/@/api/model/baseModel';

export type RoleListReqVo = BasicPageParams & {
  roleKey?: string;
  roleName?: string;
};

export interface RoleListResVo {
  roleId: string;
  roleKey: string;
  roleName: string;
  remark: string;
}

export interface RoleDetailVo {
  roleId: string;
  roleKey: string;
  roleName: string;
  remark: string;
}


export interface RoleCreateReqVo {
  roleKey: string;
  roleName: string;
  remark: string;
}

export interface RoleUpdateReqVo {
  roleId: string;
  roleKey: string;
  roleName: string;
  remark: string;
}

/**
 * @description: Request list return value
 */
export type RoleListResModel = BasicFetchResult<RoleListResVo>;

