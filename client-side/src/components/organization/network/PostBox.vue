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
      <font-awesome-icon class="post-icon" icon="fa-regular fa-comment" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      haveLike: null,
      likesNum: this.likes,
    };
  },

  async created() {
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${this.$store.getters.loggedUserToken}`);
    headers.append("AuthorizationOrg", `${this.$store.getters.selectedOrganizationID}`);

    let requestOptions = {
      method: "get",
      headers,
    };

    let respones = await fetch(`/api/user/like/post/${this.id}`, requestOptions);
    this.haveLike = await respones.json();
  },

  props: ["firstname", "lastname", "pictureLink", "content", "date", "id", "likes"],
  methods: {
    async addLike() {
      let headers = new Headers();
      headers.append("Authorization", `Bearer ${this.$store.getters.loggedUserToken}`);
      headers.append("AuthorizationOrg", `${this.$store.getters.selectedOrganizationID}`);
      headers.append("Content-Type", "application/json");

      this.haveLike = !this.haveLike;
      if (this.haveLike) {
        this.likesNum++;
      } else {
        this.likesNum--;
      }

      let requestOptions = {
        method: "put",
        headers,
        body: JSON.stringify({ like: !this.haveLike }),
      };

      await fetch(`/api/user/like/post/${this.id}`, requestOptions);
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
