<template>
  <div class="create-post-box">
    <div class="pfp-container"><img class="user-pfp" :src="pictureLink" /></div>
    <input @change="input" class="post-input" type="text" id="create-post" name="create-post" :placeholder="message" ref="dataInput" />
    <button @click="createPost" class="post-button">Post</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Share your thoughts with your organization..",
      post: null,
    };
  },
  props: ["firstname", "pictureLink"],
  methods: {
    input() {
      this.$emit("data", this.$refs.dataInput.value);

      this.post = this.$refs.dataInput.value;
    },
    createPost() {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      let body = JSON.stringify({
        userId: "test",
        orgId: "test",
        content: this.post,
      });

      let options = {
        method: "POST",
        headers,
        body,
      };

      console.log(options);

      fetch("/api/user/post", options).then((r) => {
        console.log(r);
      });
    },
  },
};
</script>

<style scoped>
.create-post-box {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  border-radius: 10px;
  width: 600px;
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}
.pfp-container {
  width: 35px;
  height: 35px;
  background-color: var(--color-fourth);
  padding: 0.3em;
  border-radius: 50%;
  margin-right: 35px;
}
.user-pfp {
  width: 100%;
  border-radius: 50%;
}
.post-button {
  background-color: var(--color-primary);
  color: white;
  font-size: 12px;
  border: 1px solid black;
  display: block;
  cursor: pointer;
  text-align: center;
  border-radius: 15px;
  transition-duration: 0.4s;
  /* font-weight: bold; */
  height: 30px;
  width: 60px;
  margin-left: 35px;
}
.post-input {
  width: 350px;
  padding: 5px 0;
  font-size: 13px;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid var(--color-fourth);
  outline: none;
  resize: none;
}

@media (max-width: 770px) {
  .post-input {
    width: 300px;
  }
  .create-post-box {
    width: 500px;
  }
  .pfp-container {
    margin-right: 25px;
  }
  .post-button {
    margin-left: 25px;
  }
}
@media (max-width: 600px) {
  .post-input {
    width: 200px;
  }
  .create-post-box {
    width: 400px;
    height: 75px;
  }
  .pfp-container {
    margin-right: 20px;
  }
  .post-button {
    margin-left: 20px;
  }
}
@media (max-width: 500px) {
  .post-input {
    width: 180px;
  }
  .create-post-box {
    width: 350px;
    height: 70px;
  }
  .pfp-container {
    margin-right: 15px;
  }
  .post-button {
    margin-left: 15px;
  }
}
@media (max-width: 430px) {
  .post-input {
    width: 160px;
  }
  .create-post-box {
    width: 330px;
    height: 67px;
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
  .create-post-box {
    width: 290px;
    height: 60px;
  }
  .pfp-container {
    margin-right: 12px;
  }
  .post-button {
    margin-left: 12px;
  }
}
</style>
