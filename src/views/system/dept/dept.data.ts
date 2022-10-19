import {BasicColumn, FormSchema} from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
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
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: {span: 8},
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: {span: 24},
    required: true,
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',
    colProps: {span: 24},
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'deptId',
        value: 'deptId',
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
