<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'deptId', title: 'deptName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';

import {BasicTree, TreeItem} from '/@/components/Tree';
import {deptTree} from "/@/api/system/dept";
import {DeptListReqVo} from "/@/api/system/model/deptModel";

export default defineComponent({
  name: 'DeptTree',
  components: {BasicTree},

  emits: ['select'],
  setup(_, {emit}) {
    const treeData = ref<TreeItem[]>([]);

    async function fetch() {
      treeData.value = (await deptTree({} as DeptListReqVo)) as unknown as TreeItem[];
    }

    function handleSelect(keys) {
      emit('select', keys[0]);
    }

    onMounted(() => {
      fetch();
    });
    return {treeData, handleSelect};
  },
});
</script>
