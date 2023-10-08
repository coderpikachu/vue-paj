import TestJson from '@/assets/jsons/hero_list.json';
import { saveAs } from 'file-saver';
const doOnce = () => {
  TestJson['hero'].forEach((hero) => {
    idMapStore.addMap(hero['heroId'], hero['name'], hero['alias']);
  });
  const blob = new Blob([JSON.stringify(idMapStore.idMap)], {
    type: 'text/plain;charset=utf-8',
  });
  console.log('导出json', blob);
  saveAs(blob, `mapde.json`);
};
