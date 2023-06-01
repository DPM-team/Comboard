<template>
  <div class="posts-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 style="padding: 30px" v-else-if="!isLoading && message">{{ message }}</h4>
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
  props: {
    userID: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      posts: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadUserPosts() {
      try {
        this.isLoading = true;

        const postsData = await this.$store.dispatch("loadMyPosts", {
          userID: this.userID || this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.posts = postsData.map((post) => {
          return {
            id: post.postObj._id,
            content: post.postObj.contentString,
            name: post.creatorObj.name,
            surname: post.creatorObj.surname,
            pictureLink: `/api/users/${post.postObj.creatorID}/profilePhoto`,
            likes: post.postObj?.likes,
            comments: post.postObj?.comments,
            date: new Date(post.postObj.createdAt).toLocaleDateString(),
          };
        });

        this.isLoading = false;

        if (this.posts.length === 0) {
          this.message = "No posts created!";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadUserPosts();
  },
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
