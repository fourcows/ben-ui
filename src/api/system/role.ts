import {defHttp} from '/@/utils/http/axios';
import {
  RoleCreateReqVo,
  RoleDetailVo,
  RoleListReqVo,
  RoleListResModel,
  RoleUpdateReqVo
} from "/@/api/system/model/roleModel";

const ROLES = '/system/roles';

// Get personal center-basic settings

export const roleList = (params: RoleListReqVo) => defHttp.get<RoleListResModel>({
  url: ROLES,
  params
});
export const roleDetail = (id: string) => defHttp.get<RoleDetailVo>({url: ROLES + '/' + id});
export const roleAdd = (data: RoleCreateReqVo) => defHttp.post<void>({url: ROLES, data});
export const roleEdit = (data: RoleUpdateReqVo) => defHttp.put<void>({url: ROLES, data});
export const roleDelete = (ids: string[]) => defHttp.delete<void>({url: ROLES, data: ids});
