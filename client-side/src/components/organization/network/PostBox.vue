<template>
  <div class="post-box" @dblclick="toogleLike">
    <div class="image-name-date-container">
      <div class="pfp-container"><img class="user-pfp" :src="pictureLink" /></div>
      <h2>{{ firstname }} {{ lastname }}</h2>
      <h4>{{ date }}</h4>
    </div>
    <div class="paragraph-container">
      <p>{{ content }}</p>
    </div>
    <div class="like-comment-container">
      <p>
        <b>{{ likesNum }}</b> people like this post
      </p>
      <font-awesome-icon @click="toogleLike" :class="{ liked: this.haveLike }" class="post-icon" id="heart" :icon="['fas', 'heart']" />
      <font-awesome-icon @click="writeComment" class="post-icon" icon="fa-regular fa-comment" />
    </div>
    <div v-if="showCommentSection" class="comment-section">
      <div class="write-comment">
        <form>
          <input class="write-comment-input" type="text" name="write-comment" placeholder="Leave a comment.." ref="createComment" />
          <font-awesome-icon class="post-comment-button" type="submit" :icon="['fas', 'paper-plane']" @click="createComment" />
        </form>
      </div>
      <comment-item
        v-for="comment in commentsDummy"
        :key="comment.id"
        :description="comment.description"
        :firstname="comment.firstname"
        :lastname="comment.lastname"
        :pictureLink="comment.pictureLink"
      ></comment-item>
    </div>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";

export default {
  components: { CommentItem },
  props: {
    id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    pictureLink: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      haveLike: false,
      likesNum: this.likes?.length || 0,
      showCommentSection: false,
      commentsDummy: [
        {
          id: 1,
          firstname: "Dionisis",
          lastname: "Lougaris",
          description: "comment1",
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s",
        },
        {
          id: 2,
          firstname: "Panos",
          lastname: "Lougaris",
          description: "comment2",
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s",
        },
      ],
    };
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
    writeComment() {
      this.showCommentSection = !this.showCommentSection;
      try {
        this.$store.dispatch("loadCommentsOfPost", {
          postID: this.id,
        });
      } catch (e) {
        console.log(e);
      }
    },
    async createComment() {
      let comment = this.$refs.createComment.value;

      try {
        await this.$store.dispatch("createComment", {
          content: comment,
          postID: this.id,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.isLiked();
  },
};
</script>

<style scoped>
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
.like-comment-container p {
  width: 70%;
  font-size: 14px;
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
