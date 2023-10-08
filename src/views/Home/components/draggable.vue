<script setup>
import draggable from 'vuedraggable';
import { reactive } from 'vue';

const state = reactive({
  list1: [1, 2, 3, 4],
  list2: ['a', 'b', 'c', 'd'],
  urls: [
    new URL('@/assets/lol_images/Aatrox.png', import.meta.url).href,
    new URL('@/assets/lol_images/Ahri.png', import.meta.url).href,
    new URL('@/assets/lol_images/Akali.png', import.meta.url).href,
  ],
});

function onStart() {}

function onEnd() {
  console.log(state);
}
const url = new URL('@/assets/lol_images/Aatrox.png', import.meta.url).href;
</script>
<template>
  <el-row>
    <el-col :span="12">
      <draggable group="group" :list="state.urls" item-key="id">
        <template #item="{ element }">
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="element"
              fit="scale-down"
            />
          </div>
        </template>
      </draggable>
    </el-col>
    <el-col :span="12">
      <draggable group="group" :list="state.list2" item-key="id">
        <template #item="{ element }">
          <div class="item bck2">
            {{ element }}
          </div>
        </template>
      </draggable>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.item {
  width: 200px;
  height: 40px;
  line-height: 40px;
  // background-color: #f5f6f8;
  background-color: skyblue;
  text-align: center;
  margin: 10px;
  color: #fff;
  font-size: 18px;
}

.container {
  position: relative;
  padding: 0;
}

.moveing {
  opacity: 0;
}
</style>
