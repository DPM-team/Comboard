<template>
  <div class="posts-container">
    <post-box v-for="post in posts" :key="post.id" :pictureLink="post.pictureLink" :firstname="post.firstname" :lastname="post.lastname" :content="post.content" :date="post.date"></post-box>
  </div>
</template>

<script>
import PostBox from "./network/PostBox.vue";
export default {
  components: { PostBox },
  data() {
    return {
      posts: [
        {
          id: 1,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
          firstname: "Dionisis",
          lastname: "Lougaris",
          date: "9/3/2023",
          content: "Auto einai to prwto post tou Comboard apo to development!",
        },
        {
          id: 2,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
          firstname: "Dionisis",
          lastname: "Lougaris",
          date: "9/3/2023",
          content: "Auto einai to deutero post tou Comboard apo to development!",
        },
      ],
    };
  },
};
</script>
<style scoped>
.posts-container {
  display: inline-block;
}
</style>
