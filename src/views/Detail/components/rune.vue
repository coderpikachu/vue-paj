<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="rune" label="符文" width="1080">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image
            v-for="(index, item) in scope.row.rune"
            style="width: 100px; height: 100px"
            :src="index"
            fit="scale-down"
          />
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
