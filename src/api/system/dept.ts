import {defHttp} from '/@/utils/http/axios';
import {
  DeptCreateReqVo,
  DeptDetailVo,
  DeptListReqVo,
  DeptListResModel,
  DeptUpdateReqVo
} from "/@/api/system/model/deptModel";

const DEPTS = '/system/depts';

// Get personal center-basic settings

export const deptList = (params: DeptListReqVo) => defHttp.get<DeptListResModel>({
  url: DEPTS,
  params
});
export const deptTree = (params: DeptListReqVo) => defHttp.get<DeptListResModel>({
  url: DEPTS + '/tree',
  params
});
export const deptDetail = (id: string) => defHttp.get<DeptDetailVo>({url: DEPTS + '/' + id});
export const deptAdd = (data: DeptCreateReqVo) => defHttp.post<void>({url: DEPTS, data});
export const deptEdit = (data: DeptUpdateReqVo) => defHttp.put<void>({url: DEPTS, data});
export const deptDelete = (ids: string[]) => defHttp.delete<void>({url: DEPTS, data: ids});
