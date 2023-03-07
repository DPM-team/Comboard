<template>
  <div class="news-list">
    <h2>{{ title }}</h2>
    <ul>
      <news-item v-for="newsItem in news" :key="newsItem.id" :description="newsItem.description"></news-item>
    </ul>
  </div>
</template>

<script>
import NewsItem from "./NewsItem.vue";
export default {
  components: { NewsItem },
  data() {
    return {
      title: "Latest news",
      news: [
        { id: 1, description: "Blahahahhahahahahahahahahahhahahahaha" },
        { id: 2, description: "Blahahahhahahahahahahahahahhahahahaha" },
        { id: 3, description: "Blahahahhahahahahahahahahahhahahahaha" },
        { id: 4, description: "Blahahahhahahahahahahahahahhahahahaha" },
      ],
    };
  },
};
</script>

<style scoped>
.news-list {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  border-radius: 10px;
  width: 300px;
  display: inline-block;
  /* height: 80px; */
  justify-content: center;
  align-items: center;
  padding: 30px;
}
.news-list h2 {
  font-size: 18px;
  color: var(--color-primary);
}
.news-list ul {
  list-style-type: none;
}
</style>
