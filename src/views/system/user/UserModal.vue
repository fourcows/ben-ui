<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm ref="basicForm" @register="registerForm"/>
  </BasicModal>
</template>
<script lang="ts">
import {computed, defineComponent, ref, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, FormActionType, useForm} from '/@/components/Form';
import {accountFormSchema} from './user.data';
import {UserCreateReqVo, UserUpdateReqVo} from "/@/api/system/model/userModel";
import {userAdd, userEdit} from "/@/api/system/user";
import {DeptListReqVo} from "/@/api/system/model/deptModel";
import {deptTree} from "/@/api/system/dept";

export default defineComponent({
  name: 'UserModal',
  components: {BasicModal, BasicForm},
  emits: ['success', 'register'],
  setup(_, {emit}) {
    const isUpdate = ref(true);
    const isDetail = ref(true);
    const rowId = ref('');
    const basicForm = ref<Nullable<FormActionType>>(null);
    const [registerForm, {setFieldsValue, updateSchema, resetFields, validate}] = useForm({
      labelWidth: 100,
      schemas: accountFormSchema,
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
        rowId.value = data.detail.userId;
        setFieldsValue({
          ...data.detail,
        });
      }

      const treeData = await deptTree({} as DeptListReqVo);
      await updateSchema([
        {
          field: 'password',
          show: !unref(isUpdate),
        },
        {
          field: 'deptIds',
          componentProps: {treeData},
        },
      ]);
    });

    const getTitle = computed(() => {
      if (isDetail) return '用户详情';
      else return (!unref(isUpdate) ? '新增用户' : '编辑用户')
    });

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({confirmLoading: true});
        // TODO custom api
        !unref(isUpdate) ? await userAdd(values as UserCreateReqVo) : await userEdit({userId: rowId.value, ...values} as UserUpdateReqVo);

        console.log(values);
        closeModal();
        emit('success', {isUpdate: unref(isUpdate), values: {...values, userId: rowId.value}});
      } finally {
        setModalProps({confirmLoading: false});
      }
    }

    return {registerModal, registerForm, getTitle, handleSubmit, basicForm};
  },
});
</script>
