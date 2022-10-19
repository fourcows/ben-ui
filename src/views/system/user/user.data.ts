import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {isAccountExist} from "/@/api/system/user";

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '部门',
    dataIndex: 'deptIds',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'roleIds',
    width: 120,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    field: 'roleIds',
    label: '角色',
    component: 'Select',
    colProps: {span: 8},
    componentProps: {
      mode: 'multiple',
      options: [
        {
          value: '1',
          label: 'Jack',
        },
        {
          value: '2',
          label: 'Lucy',
        }
      ],
    },
  },
  {
    field: 'deptIds',
    label: '部门',
    component: 'Input',
    colProps: {span: 8},
    show: false
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: {span: 24},
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    colProps: {span: 24},
    required: true,
    ifShow: false,
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'Select',
    colProps: {span: 24},
    componentProps: {
      mode: 'multiple',
      options: [
        {
          value: '1',
          label: 'Jack',
        },
        {
          value: '2',
          label: 'Lucy',
        }
      ],
    },
    required: true,
  },
  {
    field: 'deptIds',
    label: '所属部门',
    component: 'TreeSelect',
    colProps: {span: 24},
    componentProps: {
      multiple: true,
      fieldNames: {
        label: 'deptName',
        key: 'deptId',
        value: 'deptId',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    colProps: {span: 24},
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    colProps: {span: 24},
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    colProps: {span: 24},
  },
];
