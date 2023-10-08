<script setup>
import { useRouter } from 'vue-router';
import Equip from '@/views/Detail/components/equip.vue';
import Counter from '@/views/Detail/components/counter.vue';
import { useDetail } from '@/stores/useDetail';
import Tab from '@/views/Detail/components/tab.vue';
import DragCounter from '@/views/Detail/components/drag_counter.vue';
import { computed, onBeforeMount } from 'vue';
import { itemIdToUrl } from '@/utils/trans';
import { storeToRefs } from 'pinia';
import {
  getPropItemDetail,
  getPropRuneDetail,
  getPropSkillDetail,
  getPropSpellDetail,
} from '@/views/Detail/js/laneDetail';
import { doOnce } from '@/stores/item/formItemIdLevelMap';
import Skill from '@/views/Detail/components/skill.vue';
import Spell from '@/views/Detail/components/spell.vue';
import Rune from '@/views/Detail/components/rune.vue';
import Transfer_counter from '@/views/Detail/components/transfer_counter.vue';
const router = useRouter();
const id = router.currentRoute.value.params['id'];

const counterData = router.currentRoute.value.query['counter'];
//console.log('counter', counter);

const detailStore = useDetail();
const { laneDetail, pos } = storeToRefs(detailStore);
onBeforeMount(() => {
  detailStore.setPos(id).then((r) => {
    detailStore
      .getDetail(id)
      .then(() => detailStore.setLaneDetail(pos.value[0]));
  });
});

const shoes = computed(() => {
  return getPropItemDetail(laneDetail, 'shoesjson');
});
const itemOut = computed(() => getPropItemDetail(laneDetail, 'itemoutjson'));
const core3Item = computed(() =>
  getPropItemDetail(laneDetail, 'core3itemjson'),
);
const hold3 = computed(() => getPropItemDetail(laneDetail, 'hold3'));
const skill = computed(() => getPropSkillDetail(laneDetail, 'skilljson'));
const spell = computed(() => getPropSpellDetail(laneDetail, 'spellidjson'));
const rune = computed(() =>
  getPropRuneDetail(laneDetail, 'mainviceperk', 'perkdetail'),
);
</script>

<template>
  <Tab></Tab>
  <Transfer_counter :id="id"></Transfer_counter>
  <Rune :tableData="rune"></Rune>
  <Spell :tableData="spell"></Spell>
  <Skill :tableData="skill"></Skill>
  <DragCounter :data="counterData"></DragCounter>
  <!--  <Counter :data="counterData"></Counter>-->
  <Equip title="出门装" :tableData="itemOut"></Equip>
  <Equip title="核心装" :tableData="core3Item"></Equip>
  <Equip title="鞋子" :tableData="shoes"></Equip>
  <Equip title="其他装备" :tableData="hold3"></Equip>
</template>
