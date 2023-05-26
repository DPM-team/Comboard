<template>
  <div class="container">
    <div class="pfp-container">
      <img v-if="profilePhoto !== ''" class="user-pfp" :src="pictureLink" />
      <font-awesome-icon v-else class="user-icon" :icon="['fas', 'user']"></font-awesome-icon>
    </div>
    <h2>{{ firstname }} {{ lastname }}</h2>
  </div>
</template>

<script>
export default {
  props: ["profilePhoto", "pictureLink", "firstname", "lastname"],
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
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
</style>
