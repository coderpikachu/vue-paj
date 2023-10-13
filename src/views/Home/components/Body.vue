<!--  排名，位置，T级别，英雄，胜率，登场率，Ban率，对位情况（被克制）-->
<template>
  <el-table :data="tableData" style="width: 100%" @row-click="select">
<!--    <el-table-column label="排名" prop="rank" />-->
<!--    &lt;!&ndash;    <el-table-column label="位置" prop="position"/>&ndash;&gt;-->
<!--    <el-table-column label="T级" prop="level" />-->
    <!--    <el-table-column label="英雄" prop="hero" />-->
    <el-table-column label="英雄4" width="250">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.imageUrl"
            fit="scale-down"
          />
          <span style="margin-left: 10px">{{ scope.row.hero }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="胜率" prop="win" />
    <el-table-column label="登场率" prop="show" />
    <el-table-column label="BAN率" prop="ban" />
    <el-table-column label="对位情况" width="400">
      <template #default="scope">
        <SpecDragCounter :id="scope.row.id"></SpecDragCounter>
      </template>
    </el-table-column>
  </el-table>
</template>
<!--  排名，英雄id，T级别，   ，胜率，Ban率，登场率，对位情况（被克制）、{最佳双排详情}-->
<!--  排名，位置，T级别，英雄，胜率，登场率，Ban率，对位情况（被克制）-->
<script lang="ts" setup>
import { useTableDataStore } from '@/stores/useTableData.js';
import { storeToRefs } from 'pinia';
import idMapJson from '@/assets/jsons/idMap.json';
import SpecDragCounter from '@/views/Home/components/spec_drag_counter.vue';

interface Info {
  rank: string;
  id: string;
  level: string;
  win: string;
  ban: string;
  show: string;
  counter: string;
  hero: string;
  alias: string;
}
const tableDataStore = useTableDataStore();
// import { doOnce } from '@/stores/item/downloadItem.js';
// doOnce();
const { tableData, specCounterUrlMap } = storeToRefs(tableDataStore);
import { useRouter } from 'vue-router';
import DragCounter from '@/views/Detail/components/drag_counter.vue';
const router = useRouter();
const select = (s, r) => {
  //console.log('sr', s, r);
  //console.log('dt', specCounterUrlMap[s.id]);
  if (r.label == '对位情况') {
    return;
  }

  const counter = s.counter;
  router.push({ path: '/detail/' + s.id, query: { counter: counter } });
};
</script>
