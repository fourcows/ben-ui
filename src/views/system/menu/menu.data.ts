import {BasicColumn, FormSchema} from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    width: 160,
    align: 'left',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: {span: 8},
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: '菜单名称',
    component: 'Input',
    colProps: {span: 24},
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    colProps: {span: 24},
    componentProps: {
      fieldNames: {
        label: 'menuName',
        key: 'menuId',
        value: 'menuId',
      },
      getPopupContainer: () => document.body,
    },
    required: false,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    colProps: {span: 24},
  },
];
