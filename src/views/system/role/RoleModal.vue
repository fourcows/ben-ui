<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm ref="basicForm" @register="registerForm"/>
  </BasicModal>
</template>
<script lang="ts">
import {defineComponent, ref, computed, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, FormActionType, useForm} from '/@/components/Form';
import {formSchema} from "/@/views/system/role/role.data";
import {roleAdd, roleEdit} from '/@/api/system/role';
import {RoleCreateReqVo, RoleUpdateReqVo} from "/@/api/system/model/roleModel";

export default defineComponent({
  name: 'RoleModal',
  components: {BasicModal, BasicForm},
  emits: ['success', 'register'],
  setup(_, {emit}) {
    const isUpdate = ref(true);
    const isDetail = ref(true);
    const rowId = ref('');
    const basicForm = ref<Nullable<FormActionType>>(null);
    const [registerForm, {setFieldsValue, resetFields, validate}] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
    });

    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
      const formEl = basicForm.value;
      if (!formEl) return;
      isDetail.value = !!data?.isDetail
      await formEl.setProps({disabled: isDetail.value});
      setModalProps({showOkBtn: !isDetail.value, showCancelBtn: !isDetail.value});
      await resetFields();
      setModalProps({confirmLoading: false});
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate) || unref(isDetail)) {
        console.log('data====>>>', data)
        rowId.value = data.detail.roleId;
        await setFieldsValue({
          ...data.detail,
        });
      }
    });

    const getTitle = computed(() => {
      if (isDetail) return '角色详情';
      else return (!unref(isUpdate) ? '新增角色' : '编辑角色')
    });

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({confirmLoading: true});
        // TODO custom api
        !unref(isUpdate) ? await roleAdd(values as RoleCreateReqVo) : await roleEdit({roleId: rowId.value, ...values} as RoleUpdateReqVo);

        console.log(values);
        closeModal();
        emit('success', {isUpdate: unref(isUpdate), values: {...values, roleId: rowId.value}});
      } finally {
        setModalProps({confirmLoading: false});
      }
    }

    return {registerModal, registerForm, getTitle, handleSubmit, basicForm};
  },
});
</script>
