import { ref, onMounted, computed } from 'vue';
import { getRankAPI } from '@/apis/rank';
// import {Info} from "@/interfaces/info.ts"
import { defineStore, storeToRefs } from 'pinia';
import { useIdMapStore } from '@/stores/useIdMap';
import { processCounter } from '@/utils/process';
import { aliasToUrl, idToLane, laneToId } from '@/utils/trans';
import {doOnceIdMap } from '@/stores/once.js';
import imageJson from '@/assets/jsons/image_list.json';
import { doOnce } from '@/stores/downloadImage';
import {testAPI} from "@/apis/detail";
// interface Info {
//   rank: string;
//   id: string;
//   level: string;
//   win: string;
//   ban: string;
//   show: string;
//   counter: string;
//   hero: string;
//   alias: string;
// }
// @ts-ignore
export const useTableDataStore = defineStore(
  'tableData',
  () => {
    const tableData = ref([]);
    const allTableData = ref([]);
    const lane = ref('top');
    const specCounterMap = ref({});
    const counterMap = ref({});
    const activeIndex = ref('0');
    // const getFilterCounterMap = (id) => {
    //   let res = counterMap.value[id];
    //   const spec = specCounterMap.value[id];
    //   console.log('res0', res);
    //   console.log('spec', spec);
    //   if (spec === null || spec === undefined) {
    //     console.log('spec0', spec);
    //     return;
    //   }
    //   spec.forEach((key) => res.splice(res.indexOf(key), 1));
    //   console.log('res1', res);
    //   return res;
    // };
    const getImgFromId = (id) => {
      return aliasToUrl(idMap.value[id]['alias']);
    };
    const moveCounter = (e, id) => {
      if (e === null || e === undefined) {
        return;
      }
      let val = specCounterMap.value[id];
      const oldId = e['oldIndex'];
      const newId = e['oldIndex'];
      const tmp = val[newId];
      // specCounterMap.value[newId] = specCounterMap.value[oldId];
      // specCounterMap.value[oldId] = tmp;
      val[newId] = val[oldId];
      val[oldId] = tmp;
      //console.log('move', specCounterMap.value[id]);
    };
    const transferCounter1 = (e, id) => {
      if (e === null || e === undefined) {
        return;
      }
      //console.log('ee1', e);
      let a = e['added'];
      let r = e['removed'];
      let val = specCounterMap.value[id];
    };
    const transferCounter2 = (e, id) => {
      if (e === null || e === undefined) {
        return;
      }
    };
    const specCounterUrlMap = computed(() => {
      const res = {};
      Object.keys(specCounterMap.value).forEach((key) => {
        const s = specCounterMap.value[key];
        res[key] = s
          .map((id) => {
            //console.log('id', id);
            return idMap.value[id]['alias'];
          })
          .map((alias) => aliasToUrl(alias));
      });
      return res;
    });
    const tabChange = (selectTab) => {
      tableData.value = [];
      lane.value = selectTab;
      getTableData(lane.value);
    };

    const { idMap } = storeToRefs(useIdMapStore());

    const getAllTableData = async () => {
      //doOnceIdMap()
      //doOnceImageMap()
      //   const res=await testAPI()
      //   console.log("go_res",res)
      allTableData.value = {
        top: [],
        mid: [],
        ad: [],
        jug: [],
        ward: [],
        sup: [],
        all: [],
      };
      for (const lane1 of ['1', '2', '3', '4', '5', '6', '']) {
        //console.log('lane', lane1);
        let res = await getRankAPI(lane1);
        //console.log('test', res);
        const jsonStr = res['data'];
        //console.log('test1', jsonStr);
        //const jsonObj = JSON.parse(jsonStr);
        //console.log('test2', jsonObj);
        let raws = jsonStr;
        //
          var first=true
        raws.forEach((raw) => {
          const info = {
            hero_id: raw['hero_id'],
            hero_type: raw['hero_type'],
            win: (raw['win_rate'] * 100).toFixed(0).toString() + '%',
            show: (raw['battle_rate'] * 100).toFixed(0).toString() + '%',
          };
          //
          //     info.hero = idMap.value[info.id]['name'];
          //     info.url = aliasToUrl(info.alias);
          //     //console.log('url1', info.url);
            if (idMap.value[info.hero_id]!==null&&idMap.value[info.hero_id]!==undefined) {
                info.hero = idMap.value[info.hero_id]['name']
                info.imageAlias = idMap.value[info.hero_id]['alias']
                info.imageUrl = imageJson[info.imageAlias]
            }

            //if(first){
                first=false
                // console.log("*info")
                // console.log(info)
                // console.log(idMap.value[info.hero_id])
            //}

          tableData.value.push(info);
        });
        allTableData.value[idToLane(lane1)] = tableData.value;
        //console.log('t1', allTableData);
        tableData.value = [];
      }
    };
    // @ts-ignore
    const getTableData = async (lane) => {
      const id = laneToId(lane);
      //console.log('t2', tableData);

      tableData.value = allTableData.value[lane];
      //console.log('t3', tableData);
    };

    // onMounted(() => {
    //   getTableData(lane.value);
    // });

    onMounted(() => {
      //tableData.value = [];
      //getAllTableData().then((r) => getTableData(lane.value));
      //doOnce(idMap.value);
      localStorage.removeItem('reloaded');
      if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        //localStorage.removeItem('reloaded');
      } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        tableData.value = [];
        getAllTableData().then((r) => getTableData(lane.value));
      }
    });

    return {
      tableData,
      allTableData,
      activeIndex,
      specCounterMap,
      counterMap,
      specCounterUrlMap,
      getImgFromId,
      moveCounter,
      transferCounter1,
      transferCounter2,
      //getFilterCounterMap,
      tabChange,
      getTableData,
    };
  },
  {
    persist: true,
  },
);
