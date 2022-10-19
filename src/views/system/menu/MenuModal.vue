<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm"/>
  </BasicModal>
</template>
<script lang="ts">
import {computed, defineComponent, ref, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {BasicForm, useForm} from '/@/components/Form';
import {formSchema} from './menu.data';
import {menuAdd, menuEdit, menuTree} from "/@/api/system/menu";
import {MenuCreateReqVo, MenuListReqVo, MenuUpdateReqVo} from "/@/api/system/model/menuModel";

export default defineComponent({
  name: 'MenuModal',
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
        rowId.value = data.detail.menuId;
        await setFieldsValue({
          ...data.detail,
        });
      }
      const treeData = await menuTree({} as MenuListReqVo);
      await updateSchema({
        field: 'parentId',
        componentProps: {treeData},
      });
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({confirmLoading: true});
        !unref(isUpdate) ? await menuAdd(values as MenuCreateReqVo) : await menuEdit({menuId: rowId.value, ...values} as MenuUpdateReqVo);
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
