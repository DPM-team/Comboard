<template>
  <div class="post-box">
    <div class="image-name-date-container">
      <div class="pfp-container"><img class="user-pfp" :src="pictureLink" /></div>
      <h2>{{ firstname }} {{ lastname }}</h2>
      <h4>{{ date }}</h4>
    </div>
    <div class="paragraph-container">
      <p>
        arxh blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blahBlah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blah
        Blah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blahBlah blah blah Blah blah blah Blah blah telos
      </p>
    </div>
    <div class="like-comment-container">
      <p>5 people like this post</p>
      <font-awesome-icon icon="fa-regular fa-heart" />
      <font-awesome-icon icon="fa-regular fa-comment" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "dd/mm/yyyy",
    };
  },
  props: ["firstname", "lastname", "pictureLink"],
};
</script>

<style scoped>
.post-box {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  border-radius: 10px;
  width: 600px;
  display: inline-block;
  height: 250px;
}
.image-name-date-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.paragraph-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  overflow-y: auto;
  margin: 0 auto;
  width: 80%;
}

.like-comment-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
