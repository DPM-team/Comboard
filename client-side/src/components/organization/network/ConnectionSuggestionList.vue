<template>
  <div class="connection-sug-list">
    <h2>{{ title }}</h2>
    <ul>
      <connection-suggestion-item
        v-for="member in fellowOrgMembers"
        :key="member.id"
        :firstname="member.firstname"
        :lastname="member.lastname"
        :pictureLink="member.pictureLink"
      ></connection-suggestion-item>
    </ul>
  </div>
</template>

<script>
import ConnectionSuggestionItem from "./ConnectionSuggestionItem.vue";
export default {
  components: { ConnectionSuggestionItem },
  data() {
    return {
      title: "Expand your network",
      fellowOrgMembers: [
        { id: 1, firstname: "Dionisis", lastname: "Lougaris", pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" },
        { id: 2, firstname: "Panagiotis", lastname: "Machairas", pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" },
        { id: 3, firstname: "Minas", lastname: "Charakopoulos", pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" },
        { id: 4, firstname: "Giorgos", lastname: "Stefou", pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" },
      ],
    };
  },
};
</script>

<style scoped>
.connection-sug-list {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  border-radius: 10px;
  width: 200px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  /* height: calc(100% - 400px); */
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.connection-sug-list h2 {
  font-size: 18px;
  color: var(--color-primary);
  width: 100%;
  text-align: center;
  padding-bottom: 15px;
}

.connection-sug-list ul {
  list-style-type: none;
}
</style>
