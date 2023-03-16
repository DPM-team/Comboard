<template>
  <div>
    <h1>{{ boardTitle }}</h1>
    <div class="all-lists">
      <draggable @change="log" group="entire-list">
        <board-list v-for="list in numberOfLists" :key="list" :listTitle="listTitle"></board-list>
      </draggable>
    </div>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import BoardList from "./BoardList.vue";

export default {
  components: { draggable: VueDraggableNext, BoardList },
  data() {
    return {
      boardTitle: "Personal Tasks",
      enabled: true,
      numberOfLists: 3,
      listTitle: "title",
      dragging: false,
    };
  },
  methods: {
    log(event) {
      console.log(event);
    },
  },
};
</script>

<style scoped>
.all-lists {
  display: flex;
  flex-wrap: nowrap;
  width: 500px;
  height: 80px;
}
</style>
