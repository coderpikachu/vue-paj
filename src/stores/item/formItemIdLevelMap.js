import itemLevelJson from '@/assets/jsons/item_level.json';
import { saveAs } from 'file-saver';
export const doOnce = () => {
  const idLevelMap = {};
  itemLevelJson['items_ext'].forEach((item) => {
    idLevelMap[item['item_id']] = item['category'];
  });
  const blob = new Blob([JSON.stringify(idLevelMap)], {
    type: 'text/plain;charset=utf-8',
  });
  console.log('导出json', blob);
  saveAs(blob, `itemLevelJsonMap.json`);
};
