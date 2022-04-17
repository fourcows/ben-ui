import {BasicPageParams, BasicFetchResult} from '/@/api/model/baseModel';

export type UserParams = BasicPageParams & {
  username?: string;
  nickName?: string;
  deptIds?: string[];
  roleIds?: string[];
};

export interface UserListItem {
  userId: string;
  username: string;
  nickName: string;
  email: string;
  remark: string;
}

export interface UserDetailItem {
  userId: string;
  username: string;
  nickName: string;
  email: string;
  remark: string;
  roleIds: string[];
  deptIds: string[];
}


export interface UserCreateReqVo {
  username: string;
  nickName: string;
  email: string;
  remark: string;
  roleIds: string[];
  deptIds: string[];
}

export interface UserUpdateReqVo {
  userId: string;
  nickName: string;
  email: string;
  remark: string;
  roleIds: string[];
  deptIds: string[];
}

export interface RoleSelectItem {
  roleId: string;
  roleName: string;
}

export interface DeptTreeItem {
  deptId: string;
  deptName: string;
}

/**
 * @description: Request list return value
 */
export type UserListGetResultModel = BasicFetchResult<UserListItem>;

