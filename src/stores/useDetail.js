import { ref, onMounted, onBeforeMount, onBeforeUpdate } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { getRankAPI } from '@/apis/rank';
import { getDetailAPI, getPosAPI } from '@/apis/detail';
import heroPosJson from '@/assets/jsons/hero_pos.json';
import { processCounter } from '@/utils/process';
import { useIdMapStore } from '@/stores/useIdMap';
import { aliasToUrl } from '@/utils/trans';
export const useDetail = defineStore(
  'detail',
  () => {
    const details = ref({});
    const laneDetail = ref({});
    const pos = ref([]);
    const curLane = ref('');
    const top5Url = ref([]);
    // const itemOut = ref([]);
    // const core3item = ref([]);
    // const shoes = ref([]);
    // const hold3 = ref([]);
    // const skill = ref([]);
    // const spellId = ref([]);
    // const mainvicePerk = ref([]);
    // const perkDetail = ref([]);
    const { idMap } = storeToRefs(useIdMapStore());
    const getCounter = (data) => {
      //const res = processCounter(props.data).map((id) => idMap.value[id]['alias']);
      const res = processCounter(data);

      let counterInfos = res[1];
      let top5Alias = [];
      res[0].forEach((id) => {
        const counterPos = getPos(id);
        for (const i in counterPos) {
          const c = counterPos[i];
          //console.log('c', c);
          //console.log('c', curLane.value);
          if (curLane.value === c) {
            top5Alias.push(idMap.value[id]['alias']);
            break;
          }
        }
      });
      //console.log('counterinfo', counterInfos);
      return top5Alias.map((alias) => aliasToUrl(alias));
    };
    const getPos = (heroId) => {
      let res = [];
      const posJson = heroPosJson['list'];
      const detailJson = posJson[heroId];
      for (const detailJsonKey in detailJson) {
        res.push(detailJsonKey);
      }
      return res;
    };
    const setPos = async (heroId) => {
      pos.value = [];
      const posJson = heroPosJson['list'];
      const detailJson = posJson[heroId];
      //console.log('detailJson', detailJson);
      for (const detailJsonKey in detailJson) {
        pos.value.push(detailJsonKey);
      }
      //console.log('pos', pos.value);
    };
    const setLaneDetail = (lane) => {
      curLane.value = lane;
      // console.log('set', curLane.value);
      laneDetail.value = [];
      // console.log('details——value0', details.value);
      // console.log('lane', lane);
      // console.log('details——value', details.value[lane]);
      laneDetail.value = details.value[lane];
      //console.log('laneDetail', laneDetail);
    };

    const getDetail = async (heroId) => {
      let res = await getDetailAPI(heroId);
      const raw = res.slice(res.indexOf('{'), res.lastIndexOf('}') + 1);
      const jsonObj = JSON.parse(raw);
      const detailsJson = jsonObj['list'];

      pos.value.forEach((lane) => {
        let detail = {
          itemoutjson: '',
          core3itemjson: '',
          shoesjson: '',
          hold3: '',
          skilljson: '',
          spellidjson: '',
          mainviceperk: '',
          perkdetail: '',
        };
        const detailJson = detailsJson['championLane'][lane];
        //console.log('detailJson', detailJson);
        for (const detailKey in detail) {
          //console.log('key', detailKey);
          detail[detailKey] = detailJson[detailKey];
        }
        //console.log(detail);
        details.value[lane] = detail;
      });
      //console.log('details', details);
    };

    return {
      details,
      laneDetail,
      pos,
      curLane,
      top5Url,
      setPos,
      getPos,
      getDetail,
      getCounter,
      setLaneDetail,
    };
  },
  // {
  //   persist: true,
  // },
);
