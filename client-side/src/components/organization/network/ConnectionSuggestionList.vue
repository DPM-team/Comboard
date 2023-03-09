<template>
  <div class="connection-sug-list">
    <h2>{{ title }}</h2>
    <ul>
      <connection-suggestion-item v-for="member in fellowOrgMembers" :key="member.id" :firstname="member.firstname" :lastname="member.lastname"></connection-suggestion-item>
    </ul>
  </div>
</template>

<script>
import ConnectionSuggestionItem from "./ConnectionSuggestionItem.vue";
export default {
  components: { ConnectionSuggestionItem },
  data() {
    return {
      title: "test",
      fellowOrgMembers: [
        { id: 1, firstname: "Dionisis", lastname: "Lougaris" },
        { id: 2, firstname: "Panagiotis", lastname: "Machairas" },
        { id: 3, firstname: "Minas", lastname: "Charakopoulos" },
        { id: 4, firstname: "Giorgos", lastname: "Stefou" },
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
  /* width: 600px; */
  display: inline-block;
  /* height: 80px; */
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.connection-sug-list h2 {
  font-size: 18px;
  color: var(--color-primary);
}
.connection-sug-list ul {
  list-style-type: none;
}
</style>
