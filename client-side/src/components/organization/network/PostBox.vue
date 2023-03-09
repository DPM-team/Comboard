<template>
  <div class="post-box">
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
        <b>{{ likeCounter }}</b> people like this post
      </p>
      <font-awesome-icon class="post-icon" icon="fa-regular fa-heart" />
      <font-awesome-icon class="post-icon" icon="fa-regular fa-comment" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likeCounter: 12,
    };
  },
  props: ["firstname", "lastname", "pictureLink", "content", "date"],
};
</script>

<style scoped>
.post-box {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  border-radius: 10px;
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.image-name-date-container {
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-name-date-container h2 {
  width: 350px;
  font-size: 20px;
}
.paragraph-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  /* height: 140px;
  overflow-y: auto; */
  margin: 0 auto;
  width: 80%;
}

.like-comment-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  margin-top: 5px;
}
.like-comment-container p {
  width: 70%;
  font-size: 14px;
}
.post-icon {
  margin-right: 12px;
  font-size: 22px;
}
.pfp-container {
  width: 35px;
  height: 35px;
  background-color: var(--color-fourth);
  padding: 0.3em;
  border-radius: 50%;
  margin-right: 37px;
}
.user-pfp {
  width: 100%;
  border-radius: 50%;
}
</style>
