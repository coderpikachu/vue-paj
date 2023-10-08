<template>
  <div style="display: flex; align-items: center">
    <el-image
      v-for="(index, item) in top5UrlComputed"
      style="width: 100px; height: 100px"
      :src="index"
      fit="scale-down"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeMount, ref } from 'vue';
const props = defineProps({
  data: String,
});
//console.log(props.data);
import { processCounter } from '@/utils/process.js';
import { useIdMapStore } from '@/stores/useIdMap.js';
import { useDetail } from '@/stores/useDetail.js';
import { aliasToUrl, laneToId } from '@/utils/trans.js';
import { storeToRefs } from 'pinia';
const { idMap } = storeToRefs(useIdMapStore());
const { getPos, getCounter } = useDetail();
const { pos, curLane, top5Url } = storeToRefs(useDetail());
const top5UrlComputed = computed(() => getCounter(props.data).slice(0, 10));
// onMounted(() => {
//   getCounter(props.data);
// });
</script>
