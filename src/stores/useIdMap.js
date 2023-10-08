import { ref, onMounted, onBeforeMount, onBeforeUpdate } from 'vue';
import { defineStore } from 'pinia';
import idMapJson from '@/assets/jsons/idMap.json';
export const useIdMapStore = defineStore(
  'idMap',
  () => {
    const idMap = ref({});
    const addMap = (id, name, alias) => {
      idMap.value[id] = { name: name, alias: alias };
    };

    const fromJson = (idMapJson) => {
      idMap.value = idMapJson;
    };

    onBeforeMount(() => {
      fromJson(idMapJson);
    });

    return { idMap, addMap, fromJson };
  },
  {
    persist: true,
  },
);
