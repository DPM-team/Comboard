<template>
  <div class="sug-item-container">
    <div><img class="user-pfp" :src="pictureLink" /></div>
    <li>{{ firstname }} {{ lastname }}</li>
    <font-awesome-icon v-if="added === false" @click="sendRequest('643eeb4ccdc942f537f389ec')" class="icon" icon="fa-solid fa-user-plus" />
    <font-awesome-icon v-if="added === true" @click="sendRequest('643eeb4ccdc942f537f389ec')" class="icon" :icon="['fas', 'user-check']" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      added: false,
    };
  },
  props: ["firstname", "lastname", "pictureLink"],
  methods: {
    async sendRequest(id) {
      try {
        this.added = !this.added;
        await this.$store.dispatch("requestConnection", {
          userId: id,
        });
      } catch (_) {
        this.added = !this.added;
      }
    },
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
