<template>
  <div class="task-board-container">
    <font-awesome-icon class="back-button" :icon="['fas', 'circle-chevron-left']" />
    <h1>{{ boardTitle }}</h1>
    <div class="all-lists">
      <draggable @change="log" group="entire-list" class="draggable">
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
  props: {
    boardID: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      boardTitle: "Personal Tasks",
      enabled: true,
      numberOfLists: 3,
      listTitle: "List title",
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
.task-board-container {
  background: rgb(110, 211, 255);
  width: calc(100% - 200px);
  overflow-x: auto;
}
.task-board-container h1 {
  color: rgb(30, 30, 30);
  font-size: 23px;
  /* margin-bottom: 2px; */
  font-weight: 600;
  padding-top: 25px;
  padding-left: 25px;
  display: inline-block;
}
.all-lists {
  display: flex !important;
  flex-wrap: nowrap;
  width: 1000px;
  height: 80px;
}
.draggable {
  display: flex;
  height: 220px;
}
.back-button {
  font-size: 30px;
  display: inline;
  cursor: pointer;
  margin-left: 20px;
}
/* Responsiveness */

@media (max-width: 1250px) {
  .task-board-container {
    width: calc(100% - 180px);
  }
}
@media (max-width: 1150px) {
  .task-board-container {
    width: calc(100% - 80px);
  }
}

@media (max-width: 700px) {
  .task-board-container {
    width: calc(100% - 55px);
  }
}
@media (max-width: 450px) {
  .task-board-container {
    width: calc(100% - 45px);
  }
}
</style>
