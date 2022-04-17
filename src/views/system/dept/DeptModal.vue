<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"/>
  </BasicModal>
</template>
<script lang="ts">
import {computed, defineComponent, ref, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, useForm} from '/@/components/Form';
import {formSchema} from './dept.data';
import {deptAdd, deptEdit, deptTree} from "/@/api/system/dept";
import {DeptCreateReqVo, DeptListReqVo, DeptUpdateReqVo} from "/@/api/system/model/deptModel";

export default defineComponent({
  name: 'DeptModal',
  components: {BasicModal, BasicForm},
  emits: ['success', 'register'],
  setup(_, {emit}) {
    const isUpdate = ref(true);
    const rowId = ref('');
    const [registerForm, {resetFields, setFieldsValue, updateSchema, validate}] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
    });

    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
      await resetFields();
      setModalProps({confirmLoading: false});
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowId.value = data.detail.deptId;
        await setFieldsValue({
          ...data.detail,
        });
      }
      const treeData = await deptTree({} as DeptListReqVo);
      await updateSchema({
        field: 'parentId',
        componentProps: {treeData},
      });
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({confirmLoading: true});
        !unref(isUpdate) ? await deptAdd(values as DeptCreateReqVo) : await deptEdit({deptId: rowId.value, ...values} as DeptUpdateReqVo);
        console.log(values);
        closeModal();
        emit('success');
      } finally {
        setModalProps({confirmLoading: false});
      }
    }

    return {registerModal, registerForm, getTitle, handleSubmit};
  },
});
</script>
