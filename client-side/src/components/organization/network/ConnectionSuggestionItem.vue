<template>
  <div class="sug-item-container">
    <li>{{ firstname }} {{ lastname }}</li>
    <font-awesome-icon v-if="added === false" @click="sendRequest(firstname, lastname)" class="icon" icon="fa-solid fa-user-plus" />
    <font-awesome-icon v-if="added === true" @click="removeRequest(firstname, lastname)" class="icon" :icon="['fas', 'user-check']" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      added: false,
    };
  },
  props: ["firstname", "lastname"],
  methods: {
    sendRequest(firstname, lastname) {
      console.log("Friend request sent to " + firstname + " " + lastname);
      this.added = true;
    },
    removeRequest(firstname, lastname) {
      console.log("Friend request for " + firstname + " " + lastname + " removed");
      this.added = false;
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
</style>
