<template>
  <div class="create-post-box">
    <div class="pfp-container"><img class="user-pfp" :src="pictureLink" /></div>
    <input class="post-input" type="text" id="create-post" name="create-post" :placeholder="message" />
    <button class="post-button">Post</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Share your thoughts with your organization..",
    };
  },
  props: ["firstname", "pictureLink"],
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
  margin: 10px auto;
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
