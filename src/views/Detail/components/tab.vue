<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="change">
    <el-tab-pane v-for="(p, id) in pos" :label="p" :name="id"> </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { useDetail } from '@/stores/useDetail.js';
import { storeToRefs } from 'pinia';
const detailStore = useDetail();

const { pos } = storeToRefs(detailStore);
const activeName = ref(0);

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   const p = pos.value[tab.paneName];
//   const laneDetail = detailStore.getLaneDetail(p);
//   console.log('tt', laneDetail);
// };
const change = (tab: TabsPaneContext) => {
  //const p = pos.value[tab.paneName];
  const z = activeName.value;
  const p = pos.value[z];
  //console.log('p', z);
  //console.log('p1', pos.value);
  //console.log('p2', p);

  detailStore.setLaneDetail(p);
  //console.log('tt', detailStore.laneDetail);
};
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
