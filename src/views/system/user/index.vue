<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect"/>
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              tooltip: '查看用户详情',
              onClick: handleView.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              tooltip: '编辑用户资料',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此账号',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess"/>
  </PageWrapper>
</template>
<script lang="ts">
import {defineComponent, reactive} from 'vue';

import {BasicTable, TableAction, useTable} from '/@/components/Table';
import {PageWrapper} from '/@/components/Page';
import DeptTree from './DeptTree.vue';

import {useModal} from '/@/components/Modal';
import UserModal from './UserModal.vue';

import {columns, searchFormSchema} from './user.data';
import {userDelete, userDetail, userList} from "/@/api/system/user";

export default defineComponent({
  name: 'AccountManagement',
  components: {BasicTable, PageWrapper, DeptTree, UserModal, TableAction},
  setup() {
    const [registerModal, {openModal}] = useModal();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, {reload, updateTableDataRecord}] = useTable({
      title: '用户列表',
      api: userList,
      rowKey: 'userId',
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      handleSearchInfoFn(info) {
        return info;
      },
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        slots: {customRender: 'action'},
      },
    });


    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    async function handleEdit(record: Recordable) {
      console.log(record);
      const detail = await userDetail(record.userId);
      openModal(true, {
        detail,
        isUpdate: true,
      });
    }

    async function handleDelete(record: Recordable) {
      console.log(record);
      await userDelete([record.userId]);
      await reload();
    }

    function handleSuccess({isUpdate, values}) {
      if (isUpdate) {
        // 不刷新表格直接更新内部数据。
        // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
        const result = updateTableDataRecord(values.userId, values);
        console.log(result);
      } else {
        reload();
      }
    }

    function handleSelect(deptId = '') {
      searchInfo.deptIds = deptId;
      reload();
    }

    async function handleView(record: Recordable) {
      const detail = await userDetail(record.userId);
      openModal(true, {
        detail,
        isDetail: true,
      });
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      handleView,
      searchInfo,
    };
  },
});
</script>
