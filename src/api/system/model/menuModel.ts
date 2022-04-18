import {BasicPageParams, BasicFetchResult} from '/@/api/model/baseModel';

export type MenuListReqVo = BasicPageParams & {
  menuName?: string;
  parentIds?: string[];
};

export interface MenuListResVo {
  menuId: string;
  menuName: string;
  parentId: string;
  remark: string;
}

export interface MenuDetailVo {
  menuId: string;
  menuName: string;
  parentId: string;
  remark: string;
}


export interface MenuCreateReqVo {
  menuName: string;
  parentId: string;
  remark: string;
}

export interface MenuUpdateReqVo {
  menuId: string;
  menuName: string;
  parentId: string;
  remark: string;
}

/**
 * @description: Request list return value
 */
export type MenuListResModel = BasicFetchResult<MenuListResVo>;
