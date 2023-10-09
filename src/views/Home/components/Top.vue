<template>
  <el-row>
    <el-col>
      <el-tabs
        class="demo-tabs"
        v-model="activeIndex"
        @tab-click="handleSelect"
        type="border-card"
      >
        <el-tab-pane
          v-for="index in 6"
          :label="idToName((index - 1).toString())"
          :name="(index - 1).toString()"
        >
          <Body></Body>
        </el-tab-pane>
      </el-tabs>
      <div style="position: absolute; top: 4px; right: 800px">
        <el-select v-model="value" placeholder="Select" style="width: 120px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { idToLane, idToName } from '@/utils/trans.js';
import { useTableDataStore } from '@/stores/useTableData.js';
import { storeToRefs } from 'pinia';
import Body from '@/views/Home/components/Body.vue';
const tableDataStore = useTableDataStore();
const { activeIndex } = storeToRefs(tableDataStore);
const { tabChange } = tableDataStore;

const handleSelect = (a, b) => {
  tabChange(idToLane(a.props.name));
  console.log(a.props.name);
};

const value = ref('Option1');
const options = [
  {
    value: 'Option1',
    label: '禁选模式test2',
  },
  {
    value: 'Option2',
    label: '迷雾模式',
  },
  {
    value: 'Option3',
    label: '全部',
  },
];
</script>

<style>
.el-row {
  margin-top: 0;
}
.space0 {
  width: 100px;
}
.flex-grow {
  flex-grow: 1;
}
</style>
