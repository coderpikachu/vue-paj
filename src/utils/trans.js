import { stringFormat } from '@/utils/string-format';
export const idToName = (index) => {
  switch (index) {
    case '':
      return '全部';
    case '1':
      return '侍';
    case '2':
      return '巫';
    case '3':
      return '射';
    case '4':
      return '忍';
    case '5':
      return '守';
    case '6':
      return '祝';
    default:
      return '侍';
  }
};
export const idToLane = (index) => {
  switch (index) {
    case '':
      return 'all';
    case '1':
      return 'top';
    case '2':
      return 'mid';
    case '3':
      return 'ad';
    case '4':
      return 'jug';
    case '5':
      return 'ward';
    case '6':
      return 'sup';
    default:
      return 'top';
  }
};
export const laneToId = (lane) => {
  switch (lane) {
    case 'all':
      return '';
    case 'top':
      return '1';
    case 'mid':
      return '2';
    case 'ad':
      return '3';
    case 'jug':
      return '4';
    case 'ward':
      return '5';
    case 'sup':
      return '6';
    default:
      return '1';
  }
};
export const aliasToUrl = (alias) => {
  const url = stringFormat('../assets/lol_images/{0}.png', alias);
  //console.log('url', url);
  return new URL(url, import.meta.url).href;
};
export const itemIdToUrl = (itemId) => {
  const url = stringFormat('../assets/item_images/{0}.png', itemId);
  //console.log('url', url);
  return new URL(url, import.meta.url).href;
};
