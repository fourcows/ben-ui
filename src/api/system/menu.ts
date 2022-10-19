import {defHttp} from '/@/utils/http/axios';
import {
  MenuCreateReqVo,
  MenuDetailVo,
  MenuListReqVo,
  MenuListResModel,
  MenuUpdateReqVo
} from "/@/api/system/model/menuModel";

const API = '/system/menus';

// Get personal center-basic settings

export const menuList = (params: MenuListReqVo) => defHttp.get<MenuListResModel>({
  url: API,
  params
});
export const menuTree = (params: MenuListReqVo) => defHttp.get<MenuListResModel>({
  url: API + '/tree',
  params
});
export const menuDetail = (id: string) => defHttp.get<MenuDetailVo>({url: API + '/' + id});
export const menuAdd = (data: MenuCreateReqVo) => defHttp.post<void>({url: API, data});
export const menuEdit = (data: MenuUpdateReqVo) => defHttp.put<void>({url: API, data});
export const menuDelete = (ids: string[]) => defHttp.delete<void>({url: API, data: ids});
