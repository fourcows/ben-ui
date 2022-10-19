<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          Ben系列框架采用最新的技术栈开发，底层封装通用的逻辑，可帮助您快速开发ERP、OA、CRM等后台管理系统。
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y"/>
    <Description @register="register" class="my-4 enter-y"/>
    <Description @register="registerDev" class="enter-y"/>
  </PageWrapper>
</template>
<script lang="ts" setup>
import {h} from 'vue';
import {Tag} from 'ant-design-vue';
import {PageWrapper} from '/@/components/Page';
import {Description, DescItem, useDescription} from '/@/components/Description/index';
import {GITHUB_URL, DOC_URL, BEN_BOOT_URL, BEN_CLOUD_URL} from '/@/settings/siteSetting';

const {pkg, lastBuildTime} = __APP_INFO__;

const {dependencies, devDependencies, version} = pkg;

const schema: DescItem[] = [];
const devSchema: DescItem[] = [];

const commonTagRender = (color: string) => (curVal) => h(Tag, {color}, () => curVal);
const commonLinkRender = (text: string) => (href) => h('a', {href, target: '_blank'}, text);

const infoSchema: DescItem[] = [
  {
    label: '版本',
    field: 'version',
    render: commonTagRender('blue'),
  },
  {
    label: '最后编译时间',
    field: 'lastBuildTime',
    render: commonTagRender('blue'),
  },
  {
    label: '文档地址',
    field: 'doc',
    render: commonLinkRender('文档地址'),
  },
  {
    label: '前端项目',
    field: 'ben_ui',
    render: commonLinkRender('ben-ui'),
  },
  {
    label: '后端项目(单体)',
    field: 'ben_boot',
    render: commonLinkRender('ben-boot'),
  },
  {
    label: '后端项目(微服务)',
    field: 'ben_cloud',
    render: commonLinkRender('ben-cloud'),
  },
];

const infoData = {
  version,
  lastBuildTime,
  doc: DOC_URL,
  ben_ui: GITHUB_URL,
  ben_boot: BEN_BOOT_URL,
  ben_cloud: BEN_CLOUD_URL,
};

Object.keys(dependencies).forEach((key) => {
  schema.push({field: key, label: key});
});

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({field: key, label: key});
});

const [register] = useDescription({
  title: '生产环境依赖',
  data: dependencies,
  schema: schema,
  column: 3,
});

const [registerDev] = useDescription({
  title: '开发环境依赖',
  data: devDependencies,
  schema: devSchema,
  column: 3,
});

const [infoRegister] = useDescription({
  title: '项目信息',
  data: infoData,
  schema: infoSchema,
  column: 2,
});
</script>
