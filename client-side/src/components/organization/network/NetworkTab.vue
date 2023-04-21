<template>
  <organization-page-tab layout="flex">
    <div class="main-section">
      <create-post-box :pictureLink="this.myUser.pictureLink"></create-post-box>
      <post-box
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :content="post.content"
        :firstname="post.firstname"
        :lastname="post.lastname"
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
    };
  },
  methods: {
    async loadPosts() {
      try {
        await this.$store.dispatch("loadPosts", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.message = "";
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }

      this.$store.getters.posts.forEach((post, index) => {
        this.posts[index] = {
          id: post.postObj._id,
          content: post.postObj.contentString,
          firstname: post.creatorObj.name,
          lastname: post.creatorObj.surname,
          pictureLink: `/api/users/${post.postObj.creatorID}/profilePhoto`,
          likes: post.postObj?.likes,
          comments: post.postObj?.comments,
          date: new Date(post.postObj.createdAt).toLocaleDateString(),
        };
      });
    },
  },
  async created() {
    this.loadPosts();
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
