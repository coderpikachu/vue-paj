import TestJson from '@/assets/jsons/hero_list.json';
import { saveAs } from 'file-saver';
import { useIdMapStore } from '@/stores/useIdMap';


import {storeToRefs} from "pinia";
import request1 from "@/utils/http1";
// export const testAPI=()=>{
//   const url =
//       '';
//   //console.log('url', url);
//   return request1({
//     url: url,
//     method: 'GET',
//   });
// }
export const doOnceIdMap = () => {
  console.log('doIdMap');
  var z=0

  const idMapStore = useIdMapStore();
  //const { clear, addMap } = storeToRefs(idMapStore);
  idMapStore.clear()
  for (var hero in TestJson) {
    idMapStore.addMap(TestJson[hero]["式神ID"],hero, TestJson[hero]['式神圆头像_新']);
  }

  const blob = new Blob([JSON.stringify(idMapStore.idMap)], {
    type: 'text/plain;charset=utf-8',
  });
  console.log('导出json', blob);
  saveAs(blob, `mapde.json`);
};


