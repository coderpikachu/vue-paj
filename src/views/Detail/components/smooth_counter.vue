<template>
  <div>
    <div class="simple-page">
      <Container @drop="onDrop">
        <Draggable v-for="item in items" :key="item.id">
          <div class="draggable-item">
            {{ item.data }}
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script setup>
import { Container, Draggable } from 'vue-smooth-dnd';
import { applyDrag, generateItems } from './utils/smooth';
const onDrop = (dropResult) => {
  this.items = applyDrag(this.items, dropResult);
};
const items = generateItems(50, (i) => ({ id: i, data: 'Draggable ' + i }));
</script>
