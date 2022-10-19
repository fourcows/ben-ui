<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色</a-button>
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
    <RoleModal @register="registerModal" @success="handleSuccess"/>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import {BasicTable, TableAction, useTable} from '/@/components/Table';
import {columns, searchFormSchema} from './role.data';
import {roleDelete, roleDetail, roleList} from "/@/api/system/role";
import RoleModal from "/@/views/system/role/RoleModal.vue";
import {useModal} from "/@/components/Modal";

export default defineComponent({
  name: 'RoleList',
  components: {RoleModal, BasicTable, TableAction},
  setup() {
    const [registerModal, {openModal}] = useModal();
    const [registerTable, {reload}] = useTable({
      title: '角色列表',
      api: roleList,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
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
      const detail = await roleDetail(record.roleId);
      openModal(true, {
        detail,
        isUpdate: true,
      });
    }

    async function handleDelete(record: Recordable) {
      console.log(record);
      await roleDelete([record.roleId]);
      await reload();
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerModal,
      registerTable,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    };
  },
});
</script>
