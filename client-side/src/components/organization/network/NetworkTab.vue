<template>
  <organization-page-tab layout="flex">
    <div class="main-section">
      <create-post-box :pictureLink="`/api/users/${this.$store.getters.loggedUserID}/profilephoto`" @create-post="loadCreatedPost"></create-post-box>
      <base-spinner v-if="spinner && posts.length === 0"></base-spinner>
      <post-box
        v-else-if="!spinner && posts.length > 0"
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :content="post.content"
        :contentMedia="post.contentMedia"
        :firstname="post.name"
        :lastname="post.surname"
        :image="post.contentMedia"
        :pictureLink="post.pictureLink"
        :likes="post.likes"
        :comments="post.comments"
        :date="post.date"
      ></post-box>
    </div>
    <div class="side-section">
      <connection-suggestion-list></connection-suggestion-list>
      <news-list></news-list>
    </div>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import ConnectionSuggestionList from "./ConnectionSuggestionList.vue";
import CreatePostBox from "./CreatePostBox.vue";
import NewsList from "./NewsList.vue";
import PostBox from "./PostBox.vue";

export default {
  components: { CreatePostBox, PostBox, ConnectionSuggestionList, NewsList, OrganizationPageTab },
  data() {
    return {
      myUser: {
        firstname: "Dio",
        lastname: "Lou",
        pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s",
      },
      posts: [],
      message: "",
      spinner: false,
    };
  },
  methods: {
    loadCreatedPost(post) {
      this.posts.unshift({
        id: post._id,
        content: post.contentString,
        name: "",
        surname: "",
        contentMedia: post.contentMedia,
        pictureLink: `/api/users/${post.creatorID}/profilePhoto`,
        likes: post.likes,
        comments: post.comments,
        date: new Date(post.createdAt).toLocaleDateString(),
      });
    },
    async loadPosts() {
      try {
        await this.$store.dispatch("loadPosts", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }

      this.posts = this.$store.getters.posts.map((post) => {
        return {
          id: post.postObj._id,
          content: post.postObj.contentString,
          contentMedia: post.postObj.contentMedia,
          name: post.creatorObj.name,
          surname: post.creatorObj.surname,
          pictureLink: `/api/users/${post.postObj.creatorID}/profilePhoto`,
          likes: post.postObj?.likes,
          comments: post.postObj?.comments,
          date: new Date(post.postObj.createdAt).toLocaleDateString(),
        };
      });
    },
  },
  async created() {
    this.spinner = true;
    await this.loadPosts();
    this.spinner = false;
  },
};
</script>

<style scoped>
.main-section {
  width: calc(70% - 100px);
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.side-section {
  width: calc(30% - 100px);
}

/* Responsiveness */
@media (max-width: 1250px) {
  .side-section {
    width: calc(30% - 80px);
  }
}
@media (max-width: 1150px) {
  .main-section {
    width: calc(70% - 50px);
  }
  .side-section {
    width: calc(30% - 30px);
  }
}
@media (max-width: 1050px) {
  .main-section {
    width: calc(100% - 80px);
  }
  .side-section {
    display: none;
  }
}

@media (max-width: 700px) {
  .main-section {
    width: calc(100% - 55px);
  }
}
@media (max-width: 450px) {
  .main-section {
    width: calc(100% - 45px);
  }
}
</style>
