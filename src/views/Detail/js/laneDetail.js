import { itemIdToUrl } from '@/utils/trans';
import itemLevelJson from '@/assets/jsons/itemLevelJsonMap.json';
import request1 from '@/utils/http1';
export const getLevel = (item) => {
  return itemLevelJson[item];
};
export const filterEpic = (items) => {
  const res = [];
  items.forEach((item) => {
    const level = getLevel(item);
    //console.log('level', level);
    if (level !== undefined && level !== '' && level[0] === 'legend') {
      res.push(item);
    }
  });
  return res;
};
import runeMap from '@/assets/jsons/rune_map.json';
export const getPropRuneDetail = (val, name1, name2) => {
  if (
    val.value == null ||
    val.value[name1] == null ||
    val.value[name2] == null
  ) {
    return [];
  }
  const laneJson1 = val.value[name1];
  const laneJson2 = val.value[name2];
  const x1 = JSON.parse(laneJson1);
  const y1 = JSON.parse(laneJson2);
  //console.log('rune1', x1);
  //console.log('rune2', y1);
  const res = [];
  Object.keys(x1).forEach((x2) => {
    const mainname = x1[x2]['mainname'];
    const viceperk = x1[x2]['viceperk'];
    const show = x1[x2]['showrate'];
    const win = x1[x2]['winrate'];
    Object.keys(y1[x2]).forEach((y3) => {
      const rune = y1[x2][y3];
      res.push({
        rune: rune['perk'],
        mainname: mainname,
        viceperk: viceperk,
        show: (rune['showrate'] / 100).toFixed(0).toString() + '%',
        win: (rune['winrate'] / 100).toFixed(0).toString() + '%',
      });
    });
  });
  res.map((r) => {
    r['rune'] = r['rune'].split('&').map((rune) => runeMap[rune]['icon']);
  });
  //console.log('res', res);
  res.sort(
    (b, a) =>
      parseInt(a.show.slice(0, a.show.length - 1)) *
        parseInt(a.win.slice(0, a.win.length - 1)) -
      parseInt(b.show.slice(0, b.show.length - 1)) *
        parseInt(b.win.slice(0, a.win.length - 1)),
  );

  return res.slice(0, 3);
};
import spellMap from '@/assets/jsons/spell_map.json';
export const getPropSpellDetail = (val, name) => {
  if (val.value == null || val.value[name] == null) {
    return [];
  }
  const laneJson = val.value[name];
  const x1 = JSON.parse(laneJson);
  //console.log('spell', x1);
  const res = [];
  Object.keys(x1).forEach((x2) => {
    const spell = x1[x2];
    res.push({
      spell: spell['spellid'],
      show: (spell['showrate'] / 100).toFixed(0).toString() + '%',
      win: (spell['winrate'] / 100).toFixed(0).toString() + '%',
    });
  });
  res.map((r) => {
    r['spell'] = r['spell'].split('&').map((spell) => spellMap[spell]['icon']);
  });
  res.sort(
    (b, a) =>
      parseInt(a.show.slice(0, a.show.length - 1)) *
        parseInt(a.win.slice(0, a.win.length - 1)) -
      parseInt(b.show.slice(0, b.show.length - 1)) *
        parseInt(b.win.slice(0, a.win.length - 1)),
  );
  //console.log('res', res);
  return res.slice(0, 2);
};
export const getPropSkillDetail = (val, name) => {
  if (val.value == null || val.value[name] == null) {
    return [];
  }
  const laneJson = val.value[name];
  const x1 = JSON.parse(laneJson);
  //console.log('skill', x1);
  const res = [];
  Object.keys(x1).forEach((x2) => {
    Object.keys(x1[x2]['sks']).forEach((x3) => {
      const skill = x1[x2]['sks'][x3];
      res.push({
        skill: skill['sk'],
        show: (skill['sk_s'] / 100).toFixed(0).toString() + '%',
        win: (skill['sk_w'] / 100).toFixed(0).toString() + '%',
      });
    });
  });
  res.map((r) => {
    r['skill'] = r['skill'].replaceAll('1', 'Q');
    r['skill'] = r['skill'].replaceAll('2', 'W');
    r['skill'] = r['skill'].replaceAll('3', 'E');
    r['skill'] = r['skill'].replaceAll('4', 'R');

    r['skill'] = [
      r['skill'].slice(0, 5),
      r['skill'].slice(6, 11),
      r['skill'].slice(12),
    ];
  });
  res.sort(
    (b, a) =>
      parseInt(a.show.slice(0, a.show.length - 1)) *
        parseInt(a.win.slice(0, a.win.length - 1)) -
      parseInt(b.show.slice(0, b.show.length - 1)) *
        parseInt(b.win.slice(0, a.win.length - 1)),
  );
  return res.slice(0, 2);
};

export const getPropItemDetail = (val, name) => {
  if (val.value == null || val.value[name] == null) {
    return [];
  }
  const laneJson = val.value[name];
  //console.log('laneJson', laneJson);
  const x1 = JSON.parse(laneJson);
  if (name === 'hold3') {
    const res = [];
    Object.keys(x1).forEach((x) => {
      let items = x1[x].itemid.split('&');
      items = filterEpic(items);
      if (items.length !== 0) {
        res.push({
          equips: items.map((x) => itemIdToUrl(x)),
          show: (x1[x].showrate / 100).toFixed(0).toString() + '%',
          win: (x1[x].winrate / 100).toFixed(0).toString() + '%',
        });
      }
    });
    res.sort(
      (b, a) =>
        parseInt(a.show.slice(0, a.show.length - 1)) *
          parseInt(a.win.slice(0, a.win.length - 1)) -
        parseInt(b.show.slice(0, b.show.length - 1)) *
          parseInt(b.win.slice(0, a.win.length - 1)),
    );
    //console.log('res', res);
    return res.slice(0, 6);
  }
  return Object.keys(x1)
    .slice(0, 3)
    .map((x) => {
      let items = x1[x].itemid.split('&');

      //console.log('equip', x1[x]);
      return {
        equips: items.map((x) => itemIdToUrl(x)),
        show: (x1[x].showrate / 100).toFixed(0).toString() + '%',
        win: (x1[x].winrate / 100).toFixed(0).toString() + '%',
      };
    });
};
