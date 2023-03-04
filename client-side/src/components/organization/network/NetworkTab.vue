<template>
  <div class="network-tab-container">
    <create-post-box pictureLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s"></create-post-box>
  </div>
</template>

<script>
import CreatePostBox from "./CreatePostBox.vue";
export default {
  components: { CreatePostBox },
};
</script>

<style scoped>
.network-tab-container {
  position: absolute;
  top: 100px;
  left: 200px;
  background-color: red;
  width: 100%;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>
