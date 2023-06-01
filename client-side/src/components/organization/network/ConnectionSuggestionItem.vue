<template>
  <div class="sug-item-container">
    <div>
      <img v-if="profilePhoto !== ''" class="user-pfp" :src="pictureLink" />
      <img v-else class="user-pfp" src="../../../assets/images/common-images/user-profile.png" />
    </div>
    <li>{{ firstname }} {{ lastname }}</li>
    <font-awesome-icon v-if="!added" @click="sendRequest" class="icon" icon="fa-solid fa-user-plus" />
    <font-awesome-icon v-if="added === true" @click="sendRequest" class="icon" :icon="['fas', 'user-check']" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      added: false,
      profilePhoto: "",
    };
  },
  props: ["id", "firstname", "lastname", "pictureLink"],
  methods: {
    async setProfilePhoto() {
      const response = await fetch(this.pictureLink);
      this.profilePhoto = await response.text();
    },
    async sendRequest() {
      try {
        this.added = !this.added;
        await this.$store.dispatch("requestConnection", {
          userId: this.id,
          orgID: this.$store.getters.selectedOrganizationID,
        });
      } catch (_) {
        this.added = !this.added;
      }
    },
  },
  created() {
    this.setProfilePhoto();
  },
};
</script>

<style scoped>
.sug-item-container {
  display: flex;
}
.sug-item-container li {
  font-size: 15px;
  padding: 5px 15px;
  width: 90%;
}
.icon {
  font-size: 13px;
  padding: 4px 0;
  float: right;
  cursor: pointer;
  color: var(--color-primary);
}

.user-pfp {
  width: 100%;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  margin-top: 3px;
}
</style>
