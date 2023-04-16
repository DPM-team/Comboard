<template>
  <div class="connections-container">
    <connection-item v-for="connection in connections" :key="connection.id" :pictureLink="connection.pictureLink" :firstname="connection.firstname" :lastname="connection.lastname"></connection-item>
  </div>
</template>
<script>
import ConnectionItem from "./ConnectionItem.vue";

export default {
  components: { ConnectionItem },
  data() {
    return {
      connections: [
        {
          id: 1,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
          firstname: "Minas",
          lastname: "Charakopoulos",
        },
        {
          id: 2,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
          firstname: "Panos",
          lastname: "Machairas",
        },
      ],
    };
  },
};
</script>
<style scoped>
.connections-container {
  display: inline-block;
  padding: 30px;
}
@media (max-width: 900px) {
  .connections-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
