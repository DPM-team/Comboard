<template>
  <div class="sug-item-container">
    <div>
      <img v-if="profilePhoto !== ''" class="user-pfp" :src="profilePhoto" />
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
    async setPhoto() {
      try {
        console.log(this.$store);
        const blob = await this.$store.dispatch("getUserProfile", {
          userID: this.id,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        console.log(blob);

        if (blob.size !== 0) {
          const file = new File([blob], "");
          const fileReader = new FileReader();

          fileReader.onload = () => {
            this.profilePhoto = fileReader.result;
          };

          fileReader.readAsDataURL(file);
        }
      } catch (e) {
        console.log(e);
      }
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
    this.setPhoto();
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
