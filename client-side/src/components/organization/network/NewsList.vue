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
        { id: 1, description: "Projectname by teamname is now finished!" },
        { id: 2, description: "Projectname by teamname is now finished!" },
        { id: 3, description: "Projectname by teamname is now finished!" },
        { id: 4, description: "Projectname by teamname is now finished!" },
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
  width: 200px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  /* height: calc(100% - 400px); */
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.news-list h2 {
  font-size: 18px;
  color: var(--color-primary);
  width: 100%;
  text-align: center;
  padding-bottom: 15px;
}
.news-list ul {
  list-style-type: none;
}
</style>
