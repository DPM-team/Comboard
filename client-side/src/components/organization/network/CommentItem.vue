<template>
  <div class="comment-box">
    <div class="image-name-container">
      <div class="pfp-container"><img class="user-pfp" :src="pictureLink" /></div>
      <h2>{{ commenter }}</h2>
    </div>
    <p>{{ comment }}</p>
  </div>
</template>

<script>
export default {
  props: ["comment", "commenter", "pictureLink"],
};
</script>

<style scoped>
.pfp-container {
  width: 20px;
  height: 20px;
  background-color: var(--color-fourth);
  padding: 0.2em;
  border-radius: 50%;
  margin-right: 10px;
}
.user-pfp {
  width: 100%;
  border-radius: 50%;
}
h2 {
  font-size: 16px;
  margin-top: 2px;
}
p {
  font-size: 14px;
  text-align: center;
}
.comment-box {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  padding: 20px;
  margin: 5px auto;
}
.image-name-container {
  display: flex;
}
</style>
