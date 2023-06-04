<template>
  <div class="post-box load" @dblclick="toogleLike">
    <base-spinner v-if="loading"></base-spinner>
    <div v-else>
      <div class="image-name-date-container">
        <div class="pfp-container">
          <img v-if="profilePhoto !== ''" class="user-pfp" :src="profilePhoto" />
          <img v-else class="user-pfp" src="../../../assets/images/common-images/user-profile.png" />
        </div>
        <h2>{{ firstname }} {{ lastname }}</h2>
        <h4>{{ dateFormat }}</h4>
        <font-awesome-icon v-if="this.creatorID === this.$store.getters.loggedUserID" :icon="['fas', 'ellipsis']" class="ellipsis-info" ref="ellipsis" @click.prevent="openOptions($event)" />
      </div>
      <div class="paragraph-container">
        <p v-if="!editPostArea">{{ contentString }}</p>
        <form v-else @submit.prevent="editPost">
          <textarea v-model="contentString" class="edit-post"></textarea>
          <input type="submit" value="Edit" />
        </form>
        <img class="post-img" v-if="media" :src="media" />
        <base-spinner v-else-if="!this.contentMedia && !media"></base-spinner>
      </div>
      <div class="like-comment-container">
        <p>
          <b @click="toggleModal">{{ likesNum }}</b> <span @click="toggleModal">likes</span> <b>{{ commentsNum }}</b> comments
        </p>
        <font-awesome-icon @click="toogleLike" :class="{ liked: this.haveLike }" class="post-icon" id="heart" :icon="['fas', 'heart']" />
        <base-dialog v-if="modal" :title="likePopUpTitle" :overlay="true" @close="toggleModal">
          <template #main>
            <div v-if="usersLikePost.length > 0">
              <pfp-fullname-area v-for="user of usersLikePost" :key="user._id" :id="user._id" :firstname="user.name" :lastname="user.surname"></pfp-fullname-area>
            </div>

            <p v-else>No users write now</p>
          </template>
        </base-dialog>
        <font-awesome-icon @click="writeComment" class="post-icon" icon="fa-regular fa-comment" />
      </div>
      <div v-if="showCommentSection" class="comment-section">
        <div class="write-comment">
          <form @submit.prevent="createComment">
            <input class="write-comment-input" type="text" name="write-comment" placeholder="Leave a comment.." ref="createComment" />
            <font-awesome-icon class="post-comment-button" type="submit" :icon="['fas', 'paper-plane']" @click="createComment" />
          </form>
        </div>
        <div class="comments-done">
          <comment-item
            v-for="comment in nextComments"
            :key="comment._id"
            :commenterID="comment.userID"
            :comment="comment.content"
            :commenter="comment.commenter"
            :pictureLink="comment.pictureLink"
          ></comment-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import moment from "moment";
import PfpFullnameArea from "./PfpFullnameArea.vue";

export default {
  components: { CommentItem, PfpFullnameArea },
  props: ["id", "content", "creatorID", "firstname", "lastname", "pictureLink", "likes", "comments", "date"],
  data() {
    return {
      haveLike: false,
      likesNum: this.likes?.length || 0,
      commentsNum: this.comments?.length || 0,
      showCommentSection: false,
      profilePhoto: "",
      usersLikePost: [],
      editPostArea: false,
      contentString: "",
      nextComments: [],
      dateFormat: "",
      contentMedia: null,
      media: "",
      modal: false,
      numOpenModal: 0,
      loading: true,
    };
  },
  computed: {
    likePopUpTitle() {
      if (this.firstname.charAt(this.firstname.length - 1) === "s") return this.firstname + "' post";
      else return this.firstname + "'s post";
    },
  },
  methods: {
    async toogleLike() {
      this.haveLike = !this.haveLike;

      if (this.haveLike) {
        this.likesNum++;
      } else {
        this.likesNum--;
      }

      try {
        const successData = await this.$store.dispatch("toogleLike", {
          userID: this.$store.getters.loggedUserID,
          postID: this.id,
        });

        console.log(successData.succesMessage);
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async setMedia() {
      this.contentMedia = await this.$store.dispatch("getPostMedia", {
        organizationID: this.$store.getters.selectedOrganizationID,
        postID: this.id,
      });

      if (this.contentMedia.size !== 0) {
        const file = new File([this.contentMedia], "name");
        const reader = new FileReader();

        reader.onload = () => {
          this.media = reader.result;
        };

        reader.readAsDataURL(file);
      }
    },
    setEditTextArea(b) {
      this.editPostArea = b;
    },
    toggleModal() {
      this.modal = !this.modal;
      if (this.modal && this.numOpenModal === 0) {
        this.usersLiked();
      }
      this.numOpenModal++;
    },
    async setPhoto() {
      try {
        console.log(this.$store);
        const blob = await this.$store.dispatch("getUserProfile", {
          userID: this.creatorID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        console.log(blob);

        if (blob.size !== 0) {
          const file = new File([blob], "");
          const fileReader = new FileReader();

          fileReader.onload = () => {
            this.profilePhoto = fileReader.result;
          };

          fileReader.readAsDataURL(file);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async editPost() {
      try {
        const successMessage = await this.$store.dispatch("editPost", {
          postID: this.id,
          organizationID: this.$store.getters.selectedOrganizationID,
          editText: this.contentString,
        });

        this.contentString = successMessage.content;
        this.$emit("finish-edit");
      } catch (e) {
        console.log(e);
      }
    },
    async usersLiked() {
      try {
        const successMessage = await this.$store.dispatch("loadUsersLikePost", {
          organizationID: this.$store.getters.selectedOrganizationID,
          postID: this.id,
        });
        this.usersLikePost.push(...successMessage.users);
      } catch (e) {
        console.log(e);
      }
    },
    async isLiked() {
      try {
        this.haveLike = await this.$store.dispatch("isLiked", {
          userID: this.$store.getters.loggedUserID,
          postID: this.id,
        });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    infoButton() {
      return this.creatorID === this.$store.getters.loggedUserID;
    },
    async writeComment() {
      this.showCommentSection = !this.showCommentSection;
      if (this.showCommentSection) {
        try {
          this.nextComments = await this.$store.dispatch("loadCommentsOfPost", {
            postID: this.id,
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    setDate() {
      const toDay = new Date();
      const dateOfPost = this.date;
      if (dateOfPost.getFullYear() === toDay.getFullYear() && dateOfPost.getMonth() === toDay.getMonth() && dateOfPost.getDate() === toDay.getDate()) {
        this.dateFormat = "To day";
      } else {
        const day1 = moment(toDay);
        const day2 = moment(dateOfPost);
        let days = day1.diff(day2, "days");

        if (days <= 7) {
          this.dateFormat = `${days === 0 ? ++days : days}  ${days !== 1 ? "days" : "day"} Ago`;
        } else if (days > 7 && days <= 10) {
          this.dateFormat = "1 week Ago";
        } else if (days <= 14) {
          this.dateFormat = "2 Weeks Ago";
        } else {
          this.dateFormat = dateOfPost.toLocaleDateString();
        }
      }
    },
    async createComment() {
      let comment = this.$refs.createComment.value;

      try {
        const successMessage = await this.$store.dispatch("createComment", {
          content: comment,
          postID: this.id,
        });

        this.nextComments.unshift(successMessage.comment);
      } catch (error) {
        console.log(error);
      }
    },
    openOptions(evt) {
      const rect = evt.target.getBoundingClientRect();
      const leftNavBarWidth = document.querySelector("#organization-left-navbar").getBoundingClientRect()?.width || 150;
      this.$emit("open-post-options", rect.left - leftNavBarWidth + 15, rect.top - 60, this.id);
    },
  },
  created() {
    this.isLiked();
    this.contentString = this.content;
    this.loading = false;
    this.setDate();
    this.setPhoto();
    this.setMedia();
  },
};
</script>

<style scoped>
.post-img {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 200px;
  margin: 0 auto;
}

.load {
  background-color: grey;
}

.media {
  background-color: #ebeef2;
}

.post-box {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  /* border-radius: 10px; */
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding-top: 10px;
  padding-bottom: 15px;
}
.image-name-date-container {
  padding-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-name-date-container h2 {
  width: 380px;
  font-size: 18px;
}
.image-name-date-container h4 {
  font-size: 14px;
}
.paragraph-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 18px;
  padding-bottom: 18px;
  /* height: 140px;
  overflow-y: auto; */
  margin: 0 auto;
  width: 70%;
}
.paragraph-container p {
  font-size: 15px;
}

.like-comment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
  margin-top: 5px;
  width: 100%;
}
.like-comment-container > p {
  width: 70%;
  font-size: 14px;
}

.edit-post {
  width: 100%;
  height: 80px;
}

.ellipsis-info {
  margin-left: 2px;
}

.post-icon {
  margin-right: 12px;
  font-size: 22px;
}
.liked {
  color: red;
}
.pfp-container {
  width: 35px;
  height: 35px;
  background-color: var(--color-fourth);
  padding: 0.3em;
  border-radius: 50%;
  margin-right: 30px;
}
.user-pfp {
  width: 100%;
  border-radius: 50%;
}
.write-comment {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  padding: 5px 20px 5px 20px;
}
.write-comment-input {
  width: 450px;
  padding: 5px 0;
  font-size: 14px;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid var(--color-fourth);
  outline: none;
  resize: none;
}
.post-comment-button {
  font-size: 17px;
  margin-left: 10px;
  color: var(--color-primary);
  cursor: pointer;
}

.comments-done {
  overflow-y: auto;
  max-height: 240px;
}

@media (max-width: 770px) {
  .post-box {
    width: 500px;
  }
  .image-name-date-container h2 {
    width: 300px;
  }

  .write-comment-input {
    width: 380px;
  }
}

@media (max-width: 600px) {
  .post-box {
    width: 400px;
  }
  .image-name-date-container h2 {
    width: 200px;
  }
  .write-comment-input {
    width: 280px;
  }
}

@media (max-width: 500px) {
  .post-box {
    width: 350px;
  }
  .image-name-date-container h2 {
    width: 180px;
  }
  .write-comment-input {
    width: 220px;
  }
}

@media (max-width: 430px) {
  .post-input {
    width: 160px;
  }
  .post-box {
    width: 330px;
  }
  .pfp-container {
    margin-right: 13px;
  }
  .post-button {
    margin-left: 13px;
  }
  .write-comment-input {
    width: 190px;
  }
}

@media (max-width: 400px) {
  .write-comment-input {
    width: 170px;
  }
  .post-input {
    width: 140px;
  }
  .post-box {
    width: 290px;
  }
  .pfp-container {
    margin-right: 12px;
  }
  .post-button {
    margin-left: 12px;
  }
  .image-name-date-container h2 {
    width: 150px;
    font-size: 16px;
  }
  .image-name-date-container h4 {
    font-size: 12px;
  }
  .like-comment-container p {
    width: 60%;
    font-size: 12px;
  }
}
</style>
