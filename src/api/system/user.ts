import {defHttp} from '/@/utils/http/axios';
import {
  UserCreateReqVo,
  UserDetailItem,
  UserListGetResultModel,
  UserParams, UserUpdateReqVo
} from "/@/api/system/model/userModel";

const USERS = '/system/users';

// Get personal center-basic settings

export const userList = (params: UserParams) => defHttp.get<UserListGetResultModel>({
  url: USERS,
  params
});
export const userDetail = (id: string) => defHttp.get<UserDetailItem>({url: USERS + '/' + id});
export const userAdd = (data: UserCreateReqVo) => defHttp.post<void>({url: USERS, data});
export const userEdit = (data: UserUpdateReqVo) => defHttp.put<void>({url: USERS, data});
export const userDelete = (ids: string[]) => defHttp.delete<void>({url: USERS, data: ids});
export const isAccountExist = (account: string) =>
  defHttp.post({url: USERS + '/usernameExist', params: {account}}, {errorMessageMode: 'none'});
