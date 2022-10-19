<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuModal @register="registerModal" @success="handleSuccess"/>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';

import {BasicTable, TableAction, useTable} from '/@/components/Table';

import {useModal} from '/@/components/Modal';
import MenuModal from './MenuModal.vue';

import {columns, searchFormSchema} from './menu.data';
import {menuDelete, menuDetail, menuTree} from "/@/api/system/menu";

export default defineComponent({
  name: 'MenuList',
  components: {BasicTable, MenuModal, TableAction},
  setup() {
    const [registerModal, {openModal}] = useModal();
    const [registerTable, {reload}] = useTable({
      title: '菜单列表',
      api: menuTree,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      pagination: false,
      striped: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        slots: {customRender: 'action'},
        fixed: undefined,
      },
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    async function handleEdit(record: Recordable) {
      console.log(record);
      const detail = await menuDetail(record.menuId);
      openModal(true, {
        detail,
        isUpdate: true,
      });
    }

    async function handleDelete(record: Recordable) {
      console.log(record);
      await menuDelete([record.menuId]);
      await reload();
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    };
  },
});
</script>
