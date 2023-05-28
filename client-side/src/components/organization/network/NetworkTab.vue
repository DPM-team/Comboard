<template>
  <organization-page-tab layout="flex">
    <div class="main-section" @scroll="loadNextPosts">
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
        :creatorID="post.creatorID"
        :likes="post.likes"
        :comments="post.comments"
        :date="post.date"
        @openPostOptions="showContextMenu"
      ></post-box>
    </div>
    <div class="side-section">
      <connection-suggestion-list></connection-suggestion-list>
      <news-list></news-list>
    </div>
    <base-context-menu v-if="activePostID !== null" :position="menuPosition">
      <template #options>
        <li @click="closeContextMenu()">Cancel</li>
        <li>Edit</li>
        <li>Delete</li>
      </template>
    </base-context-menu>
  </organization-page-tab>
</template>

<script>
import BaseContextMenu from "../../basic-components/BaseContextMenu.vue";
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import ConnectionSuggestionList from "./ConnectionSuggestionList.vue";
import CreatePostBox from "./CreatePostBox.vue";
import NewsList from "./NewsList.vue";
import PostBox from "./PostBox.vue";

export default {
  components: { CreatePostBox, PostBox, ConnectionSuggestionList, NewsList, OrganizationPageTab, BaseContextMenu },
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

      loadingPosts: false,
      skip: 0,
      /* For post context menu */
      activePostID: null,
      menuPosition: {
        x: 0,
        y: 0,
      },
    };
  },
  methods: {
    loadCreatedPost(post) {
      this.posts.unshift({
        id: post._id,
        content: post.contentString,
        name: "",
        surname: "",
        creatorID: post.creatorID,
        contentMedia: post.contentMedia,
        pictureLink: `/api/users/${post.creatorID}/profilePhoto`,
        likes: post.likes,
        comments: post.comments,
        date: new Date(post.createdAt),
      });
    },
    async loadPosts() {
      try {
        let posts = await this.$store.dispatch("loadPosts", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
          skip: this.skip,
        });

        const nextPosts = posts.allPosts.map((post) => {
          return {
            id: post.postObj._id,
            content: post.postObj.contentString,
            contentMedia: post.postObj.contentMedia,
            name: post.creatorObj.name,
            surname: post.creatorObj.surname,
            creatorID: post.postObj.creatorID,
            pictureLink: `/api/users/${post.postObj.creatorID}/profilePhoto`,
            likes: post.postObj?.likes,
            comments: post.postObj?.comments,
            date: new Date(post.postObj.createdAt),
          };
        });

        if (nextPosts.length > 0) {
          this.posts.push(...nextPosts);

          this.skip = this.skip + nextPosts.length;
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
    async loadNextPosts() {
      try {
        if (!this.loadingPosts) {
          this.loadingPosts = true;
          await this.loadPosts();
          this.loadingPosts = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    showContextMenu(positionX, positionY, postID) {
      this.activePostID = postID;
      this.menuPosition = {
        x: positionX,
        y: positionY,
      };
    },
    closeContextMenu() {
      this.activePostID = null;
    },
    removeEventListeners() {
      document.removeEventListener("click", this.closeContextMenu);
    },
  },
  async created() {
    this.spinner = true;
    await this.loadPosts();
    this.spinner = false;
  },
  beforeUnmount() {
    this.removeEventListeners();
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

.context-menu ul li {
  cursor: pointer;
  padding: 8px 15px 8px 15px;
  width: 80px;
}

.context-menu ul li:hover {
  background-color: #eee;
}

.warning {
  color: red;
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
