<template>
  <organization-page-tab layout="flex">
    <div class="main-section" @scroll="loadNextPosts">
      <create-post-box :pictureLink="`/api/users/${this.$store.getters.loggedUserID}/profilephoto`" @create-post="loadCreatedPost"></create-post-box>
      <base-spinner v-if="loadingPosts && posts.length === 0"></base-spinner>
      <post-box
        v-else-if="posts.length > 0"
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :content="post.content"
        :firstname="post.name"
        :lastname="post.surname"
        :pictureLink="post.pictureLink"
        :creatorID="post.creatorID"
        :likes="post.likes"
        :comments="post.comments"
        :date="post.date"
        :ref="post.id"
        @openPostOptions="showContextMenu"
        @finishEdit="editPost"
      ></post-box>
    </div>
    <div class="side-section">
      <connection-suggestion-list></connection-suggestion-list>
      <news-list></news-list>
    </div>
    <base-context-menu v-if="activePostID !== null" :position="menuPosition">
      <template #options>
        <li @click="closeContextMenu()">Cancel</li>
        <li @click="editPost">
          <font-awesome-icon :icon="['fas', 'pen']" />
          Edit
        </li>
        <li class="warning" @click="deletePost">
          <font-awesome-icon :icon="['fas', 'trash-can']" />
          Delete
        </li>
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
      posts: [],
      message: "",
      loadingPosts: false,
      skip: 0,
      /* For post context menu */
      activePostID: null,
      menuPosition: {
        x: 0,
        y: 0,
      },
      editText: false,
    };
  },
  methods: {
    loadCreatedPost(post) {
      this.posts.unshift({
        id: post._id,
        content: post.contentString,
        name: this.$store.getters.name,
        surname: this.$store.getters.surname,
        creatorID: post.creatorID,
        pictureLink: `/api/users/${post.creatorID}/profilePhoto`,
        likes: post.likes,
        comments: post.comments,
        date: new Date(post.createdAt),
      });
    },
    editPost() {
      this.editText = !this.editText;
      this.$refs[this.activePostID][0].setEditTextArea(this.editText);
    },
    async deletePost() {
      try {
        const successMessage = await this.$store.dispatch("deletePost", {
          postID: this.activePostID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });
        console.log(successMessage.message);

        const index = this.posts.findIndex((post) => {
          return post.id === this.activePostID;
        });

        if (index > -1) {
          this.posts.splice(index, 1);
        }
        this.closeContextMenu();
      } catch (e) {
        console.log(e);
      }
    },
    async loadPosts() {
      try {
        let posts = await this.$store.dispatch("loadPosts", {
          organizationID: this.$store.getters.selectedOrganizationID,
          skip: this.skip,
        });

        const nextPosts = posts.allPosts.map((post) => {
          return this.structurePost(post);
        });

        if (nextPosts.length > 0) {
          this.posts.push(...nextPosts);
          this.skip = this.skip + nextPosts.length;
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
    structurePost(post) {
      return {
        id: post.postObj._id,
        content: post.postObj.contentString,
        name: post.creatorObj.name,
        surname: post.creatorObj.surname,
        creatorID: post.postObj.creatorID,
        pictureLink: `/api/users/${post.postObj.creatorID}/profilePhoto`,
        likes: post.postObj?.likes,
        comments: post.postObj?.comments,
        date: new Date(post.postObj.createdAt),
      };
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
      if (this.editText) {
        this.editPost();
      }
      this.activePostID = null;
    },
    removeEventListeners() {
      document.removeEventListener("click", this.closeContextMenu);
    },
  },
  async created() {
    this.loadingPosts = true;
    await this.loadPosts();
    this.loadingPosts = false;
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
