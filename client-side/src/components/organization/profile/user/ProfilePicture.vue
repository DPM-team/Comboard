<template>
  <div class="img__container">
    <img :src="profilePhoto" alt="User Profile Pic" />

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["pfp"],
  data() {
    return {
      profilePhoto: "",
    };
  },

  created() {
    this.profilePhoto = this.$store.getters.profilePhoto;

    this.$store.watch(
      () => this.$store.getters.profilePhoto,

      (photo) => {
        this.profilePhoto = photo;

        console.log(photo);
      }
    );
  },
};
</script>

<style scoped>
.img__container {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translatex(-50%);
}
.img__container img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.18);
}
/* Online status */
/* .header__wrapper .cols__container .left__col .img__container span {
  position: absolute;
  background: #2afa6a;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  bottom: 3px;
  right: 11px;
  border: 2px solid #fff;
} */
</style>
