<template>
  <div class="connections-container">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <connection-item v-for="connection in connections" :key="connection.id" :firstname="connection.name" :lastname="connection.surname"></connection-item>
  </div>
</template>

<script>
import ConnectionItem from "./ConnectionItem.vue";

export default {
  components: { ConnectionItem },
  props: {
    userID: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      connections: new Array(),
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadUserConnections() {
      try {
        this.isLoading = true;

        this.connections = await this.$store.dispatch("getUserConnections", {
          userID: this.userID || this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;

        if (this.connections.length === 0) {
          this.message = "0 Connections";
        } else {
          this.message = "";
        }
      } catch (error) {
        this.message = error.message || "Something went wrong!";
      }
    },
  },
  created() {
    this.loadUserConnections();
  },
};
</script>

<style scoped>
.connections-container {
  display: inline-block;
  padding: 30px;
}

@media (max-width: 900px) {
  .connections-container {
    display: block;
    margin: 0 auto;
  }
}
</style>
