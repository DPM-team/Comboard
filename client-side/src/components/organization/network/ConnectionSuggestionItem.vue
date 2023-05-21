<template>
  <div class="sug-item-container">
    <div>
      <img v-if="profilePhoto !== ''" class="user-pfp" :src="pictureLink" />
      <font-awesome-icon v-else class="user-icon" :icon="['fas', 'user']"></font-awesome-icon>
    </div>
    <li>{{ firstname }} {{ lastname }}</li>
    <font-awesome-icon v-if="!added" @click="sendRequest()" class="icon" icon="fa-solid fa-user-plus" />
    <font-awesome-icon v-if="added === true" @click="sendRequest()" class="icon" :icon="['fas', 'user-check']" />
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
      const succesMessage = await response.json();
      if (succesMessage?.profilePhoto) {
        this.profilePhoto = succesMessage.profilePhoto;
      }
    },
    async sendRequsest() {
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
