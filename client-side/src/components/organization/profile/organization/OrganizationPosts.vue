<template>
  <div class="posts-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <post-box
      v-else
      v-for="post in posts"
      :key="post.id"
      :id="post.id"
      :content="post.content"
      :firstname="post.name"
      :lastname="post.surname"
      :image="post.contentMedia"
      :pictureLink="post.pictureLink"
      :likes="post.likes"
      :comments="post.comments"
      :date="post.date"
    ></post-box>
  </div>
</template>

<script>
import PostBox from "../../network/PostBox.vue";

export default {
  components: { PostBox },
  data() {
    return {
      posts: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.posts-container {
  display: inline-block;
}

@media (max-width: 900px) {
  .posts-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
