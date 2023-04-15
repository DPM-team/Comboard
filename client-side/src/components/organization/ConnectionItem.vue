<template>
  <div class="connection-box">
    <div class="image-name-container">
      <div class="pfp-container"><img class="user-pfp" :src="pictureLink" /></div>
      <h2>{{ firstname }} {{ lastname }}</h2>
      <font-awesome-icon :icon="['fas', 'user-minus']" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["firstname", "lastname", "pictureLink"],
  methods: {},
};
</script>

<style scoped>
.connection-box {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  /* border-radius: 10px; */
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.image-name-container {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-name-container h2 {
  width: 200px;
  font-size: 16px;
}

.pfp-container {
  width: 25px;
  height: 25px;
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
