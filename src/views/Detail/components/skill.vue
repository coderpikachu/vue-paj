<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="skill" label="英雄技能" width="480">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-text class="mx-1">{{ scope.row.skill[0] }}</el-text>
          <el-text class="mx-1">{{ scope.row.skill[1] }}</el-text>
          <el-text class="mx-1">{{ scope.row.skill[2] }}</el-text>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="show" label="登场率" width="180" />
    <el-table-column prop="win" label="胜率" />
  </el-table>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
const props = defineProps({
  tableData: Array,
});
</script>
<style>
.mx-1 {
  padding: 0 10px;
}
</style>
