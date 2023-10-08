<template>
  <el-row justify="center">
    <!--    <el-image-->
    <!--      v-drag="{ axis: 'x', snap: [100, 100] }"-->
    <!--      @v-drag-end="drag()"-->
    <!--      v-for="(index, item) in data"-->
    <!--      style="width: 100px; height: 100px"-->
    <!--      :src="index"-->
    <!--      fit="scale-down"-->
    <!--    />-->
    <el-col :span="9">
      <draggable
        group="id"
        :list="specCounterMap[id]"
        :item-key="(element) => element"
        @change="drag1"
      >
        <template #item="{ element }">
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="getImgFromId(element)"
              fit="scale-down"
            />
          </div>
        </template>
      </draggable>
    </el-col>
    <!--    <div style="width: 100px"></div>-->
    <el-col :span="3"></el-col>
    <el-col :span="9">
      <draggable
        group="id"
        :list="counterMap[id]"
        :item-key="(element) => element"
        @change="drag2"
      >
        <template #item="{ element }">
          <div style="float: left">
            <el-image
              style="width: 100px; height: 100px"
              :src="getImgFromId(element)"
              fit="scale-down"
            />
          </div>
        </template>
      </draggable>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeMount, ref } from 'vue';
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';
//import Draggable from '@/views/Home/components/draggable.vue';
const props = defineProps({
  id: { type: String },
});
import { useTableDataStore } from '@/stores/useTableData.js';
const tableDataStore = useTableDataStore();
// import { doOnce } from '@/stores/item/downloadItem.js';
// doOnce();
const { tableData, specCounterMap, counterMap } = storeToRefs(tableDataStore);
const {
  getImgFromId,
  moveCounter,
  transferCounter1,
  transferCounter2,
  getFilterCounterMap,
} = tableDataStore;
const drag1 = (e, a) => {
  //console.log('ea', e, a);
  transferCounter1(e, props.id);
};
const drag2 = (e, a) => {
  //console.log('ea', e, a);
  transferCounter2(e, props.id);
};
// const filterMap = ref({});
// const filterMap = computed(() => {
//   let res = counterMap.value[props.id];
//   let spec = specCounterMap.value[props.id];
//   console.log('res0', res);
//   console.log('spec', spec);
//   if (spec === null || spec === undefined) {
//     console.log('spec0', spec);
//     return;
//   }
//   // spec.forEach((key) => {
//   //   //console.log('key', key);
//   //   res.splice(res.indexOf(key), 1);
//   // });
//   console.log('res1', res);
//   return res;
// });
onBeforeMount(() => {
  //console.log('spec', specCounterMap.value);
  //console.log('spec1', specCounterMap.value[props.id]);
  //console.log('id', props.id);
});
</script>
