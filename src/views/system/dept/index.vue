<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门</a-button>
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
    <DeptModal @register="registerModal" @success="handleSuccess"/>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';

import {BasicTable, TableAction, useTable} from '/@/components/Table';

import {useModal} from '/@/components/Modal';
import DeptModal from './DeptModal.vue';

import {columns, searchFormSchema} from './dept.data';
import {deptDelete, deptDetail, deptTree} from "/@/api/system/dept";

export default defineComponent({
  name: 'DeptList',
  components: {BasicTable, DeptModal, TableAction},
  setup() {
    const [registerModal, {openModal}] = useModal();
    const [registerTable, {reload}] = useTable({
      title: '部门列表',
      api: deptTree,
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
      const detail = await deptDetail(record.deptId);
      openModal(true, {
        detail,
        isUpdate: true,
      });
    }

    async function handleDelete(record: Recordable) {
      console.log(record);
      await deptDelete([record.deptId]);
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
