import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '角色编码',
    dataIndex: 'roleKey',
    width: 180,
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
  },

  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleKey',
    label: '角色编码',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    colProps: {span: 8},
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleKey',
    label: '角色编码',
    required: true,
    component: 'Input',
    colProps: {span: 24},
  },
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
    colProps: {span: 24},
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    colProps: {span: 24},
  },
];
