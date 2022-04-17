import {BasicPageParams, BasicFetchResult} from '/@/api/model/baseModel';

export type DeptListReqVo = BasicPageParams & {
  deptName?: string;
  parentIds?: string[];
};

export interface DeptListResVo {
  deptId: string;
  deptName: string;
  parentId: string;
  remark: string;
}

export interface DeptDetailVo {
  deptId: string;
  deptName: string;
  parentId: string;
  remark: string;
}


export interface DeptCreateReqVo {
  deptName: string;
  parentId: string;
  remark: string;
}

export interface DeptUpdateReqVo {
  deptId: string;
  deptName: string;
  parentId: string;
  remark: string;
}

/**
 * @description: Request list return value
 */
export type DeptListResModel = BasicFetchResult<DeptListResVo>;
