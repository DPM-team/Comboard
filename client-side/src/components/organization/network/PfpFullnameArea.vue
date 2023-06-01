<template>
  <div class="container">
    <div class="pfp-container">
      <img v-if="profileUrl" class="user-pfp" :src="profileUrl" />
      <img v-else class="user-pfp" src="../../../assets/images/common-images/user-profile.png" />
    </div>
    <h2>{{ firstname }} {{ lastname }}</h2>
  </div>
</template>

<script>
export default {
  props: ["id", "firstname", "lastname"],
  data() {
    return {
      profileUrl: "",
    };
  },
  methods: {
    async pictureProfile() {
      try {
        const blob = await this.$store.dispatch("getUserProfile", {
          userID: this.id,
        });

        if (blob.size !== 0) {
          const file = new File([blob], "g");
          const fileReader = new FileReader();

          fileReader.onload = () => {
            this.profileUrl = fileReader.result;
          };

          fileReader.readAsDataURL(file);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    this.pictureProfile();
  },
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
