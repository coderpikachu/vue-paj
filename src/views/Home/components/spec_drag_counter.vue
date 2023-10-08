<template>
  <div style="display: flex; align-items: center">
    <!--    <el-image-->
    <!--      v-drag="{ axis: 'x', snap: [100, 100] }"-->
    <!--      @v-drag-end="drag()"-->
    <!--      v-for="(index, item) in data"-->
    <!--      style="width: 100px; height: 100px"-->
    <!--      :src="index"-->
    <!--      fit="scale-down"-->
    <!--    />-->
    <draggable
      :group="id"
      :list="specCounterMap[id]"
      :item-key="(element) => element"
      @change="drag"
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
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeMount, ref } from 'vue';
import draggable from 'vuedraggable';
import { storeToRefs } from 'pinia';
//import Draggable from '@/views/Home/components/draggable.vue';
const props = defineProps({
  id: String,
});
import { useTableDataStore } from '@/stores/useTableData.js';
const tableDataStore = useTableDataStore();
// import { doOnce } from '@/stores/item/downloadItem.js';
// doOnce();
const { tableData, specCounterMap } = storeToRefs(tableDataStore);
const { getImgFromId, moveCounter } = tableDataStore;
const drag = (e, a) => {
  console.log('ea', e, a);
  moveCounter(e['moved'], props.id);
};
onBeforeMount(() => {
  //console.log('spec', specCounterMap.value);
  //console.log('spec1', specCounterMap.value[props.id]);
  //console.log('id', props.id);
});
</script>
