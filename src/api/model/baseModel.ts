export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface QueryParam {
  orders?: OrderParam[];
  isPage?: boolean;
}

export interface OrderParam {
  col: string;
  isAsc: boolean;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}
