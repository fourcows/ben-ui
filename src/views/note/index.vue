<template>
  <a-row class="mt-3 ml-3 mr-3">
    <a-col :xs="22" :sm="22" :md="8">
      <a-textarea
        ref="inputRef"
        class="shadow"
        v-model:value="newNote.content"
        placeholder="记录当下所思所想..."
        :auto-size="{ minRows: 5, maxRows: 20 }"
      />
      <a-select
        v-if="false"
        class="mt-3"
        :bordered="false"
        placement="topLeft"
        v-model:value="newNote.labelIds"
        mode="tags"
        style="width: 100%"
        placeholder="请选择标签"
        :options="[]"
      />
      <a-button
        class="mt-3 ml-3 mb-3 shadow"
        :class="{ 'text-grey': isAdd }"
        @click="addOrUpdateNote"
        >{{ isAdd ? '小记一下' : '保存' }}
      </a-button>
      <a-button class="mt-3 ml-3 shadow" v-if="!isAdd" @click="clearInput">取消</a-button>
    </a-col>
    <a-col :xs="2" :sm="2" :md="1" />
    <a-col :xs="24" :sm="24" :md="15">
      <a-row
        class="mb-3"
        v-for="note in noteData"
        :key="note.noteId"
        @mouseover="note.showAction = true"
        @mouseleave="note.showAction = false"
      >
        <a-col :span="22">
          <a-card style="width: 100%" class="ease-in-out duration-500 hover:shadow-2xl">
            <p class="text-[12px] text-gray-400">更新于: {{ formatTime(note.updateTime) }}</p>
            <p>{{ note.content }}</p>
            <a-tag :key="label.labelId" v-for="label in note.labels">{{ label.labelName }}</a-tag>
          </a-card>
        </a-col>
        <a-col :span="2" v-show="note.showAction" class="p-1">
          <a-button :icon="h(EditOutlined)" class="mb-2" @click="editNote(note)" />
          <br />
          <a-button :icon="h(DeleteOutlined)" @click="deleteNote(note.noteId)" />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
  import { Textarea, Row, Col, Card, Select, Modal, Tag } from 'ant-design-vue';
  import { reactive, ref, h, computed, createVNode } from 'vue';
  import { addNoteApi, deleteNoteApi, noteListApi, updateNoteApi } from '@/api/demo/note';
  import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { NoteModel } from '@/api/demo/model/noteModel';
  import dayjs from 'dayjs';

  const ATextarea = Textarea;
  const ARow = Row;
  const ACol = Col;
  const ACard = Card;
  const ASelect = Select;
  const ATag = Tag;
  const newNote = reactive<NoteModel>({});
  const noteData = reactive<any>([]);
  const isAdd = computed(() => {
    return !newNote.noteId;
  });
  const inputRef = ref(null);
  const getNoteList = async () => {
    const res = await noteListApi({ 'page.num': 1, 'page.size': 200 });
    noteData.length = 0;
    noteData.push(...res.records);
  };
  getNoteList();
  const addOrUpdateNote = async () => {
    isAdd.value ? await addNoteApi(newNote) : await updateNoteApi(newNote);
    clearInput();
    getNoteList();
  };
  const editNote = (note) => {
    newNote.noteId = note.noteId;
    newNote.content = note.content;
    newNote.labelIds = note.labels.map((item) => item.labelId);
    inputRef.value.focus();
  };
  const clearInput = () => {
    newNote.noteId = null;
    newNote.content = null;
    newNote.labelIds = null;
  };
  const deleteNote = (id) => {
    Modal.confirm({
      title: '确定删除这条记录吗?',
      icon: createVNode(ExclamationCircleOutlined),
      okType: 'danger',
      onOk: async () => {
        await deleteNoteApi(id);
        await getNoteList();
      },
      onCancel() {},
    });
  };
  const formatTime = (timeStr) => {
    const time = dayjs(timeStr);
    const now = dayjs();
    const dayFormat = 'YYYY/MM/DD';
    if (time.add(1, 'day').format(dayFormat) === now.format(dayFormat)) {
      return '昨天 ' + time.format('HH:mm');
    }
    if (time.format(dayFormat) === now.format(dayFormat)) {
      return '今天 ' + time.format('HH:mm');
    }
    if (time.year() === now.year()) {
      return time.format('MM/DD HH:mm');
    }
    return time.format('YYYY/MM/DD HH:mm');
  };
</script>
