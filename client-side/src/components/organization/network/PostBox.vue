<template>
  <div class="post-box" @dblclick="addLike">
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
      <font-awesome-icon @click="addLike" :class="{ liked: this.haveLike }" class="post-icon" id="heart" :icon="['fas', 'heart']" />
      <font-awesome-icon @click="writeComment" class="post-icon" icon="fa-regular fa-comment" />
    </div>
    <div v-if="showCommentSection" class="comment-section">
      <div class="write-comment">
        <input class="write-comment-input" type="text" name="write-comment" placeholder="Leave a comment.." /> <font-awesome-icon class="post-comment-button" :icon="['fas', 'paper-plane']" />
      </div>
      <comment-item
        v-for="comment in comments"
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
  data() {
    return {
      haveLike: null,
      likesNum: this.likes,
      showCommentSection: false,
      comments: [
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

  async created() {
    const respones = await this.$store.dispatch("isLiked", {
      id: this.id,
    });

    this.haveLike = await respones.json();
  },

  props: ["firstname", "lastname", "pictureLink", "content", "date", "id", "likes"],
  methods: {
    async addLike() {
      this.haveLike = !this.haveLike;
      if (this.haveLike) {
        this.likesNum++;
      } else {
        this.likesNum--;
      }

      this.$store.dispatch("addLike", {
        id: this.id,
      });
    },
    writeComment() {
      this.showCommentSection = !this.showCommentSection;
    },
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
}
@media (max-width: 600px) {
  .post-box {
    width: 400px;
  }
  .image-name-date-container h2 {
    width: 200px;
  }
}
@media (max-width: 500px) {
  .post-box {
    width: 350px;
  }
  .image-name-date-container h2 {
    width: 180px;
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
}
@media (max-width: 400px) {
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
