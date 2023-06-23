<template>
  <div>
    <div class="left-panel">
      <connections-members v-for="member in members" :key="member._id" :user="member" :selected="selectedUser === member" @select="onSelectUser(member)" />
    </div>
    <message-view v-if="selectedUser" :user="selectedUser" class="right-panel" />
  </div>
</template>

<script>
import { socket } from "@/socket";
import ConnectionsMembers from "./connectionsMembers.vue";
import MessageView from "./messageView.vue";

export default {
  name: "ChatArea",
  components: { ConnectionsMembers, MessageView },
  data() {
    return {
      selectedUser: null,
      members: [],
    };
  },
  methods: {
    onSelectUser(user) {
      this.selectedUser = user;
    },
    async loadConnectionsMembers() {
      try {
        const succesMessage = await this.$store.dispatch("getUserConnections", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.members = succesMessage;
        this.members.forEach((member) => {
          member.messages = [];
        });
      } catch (_) {
        console.log();
      }
    },
  },
  async created() {
    socket.connect();
    socket.emit("chat-person", this.$store.getters.loggedUserID);
    await this.loadConnectionsMembers();
  },
};
</script>

<style scoped>
.left-panel {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  overflow-x: hidden;
  background-color: #3f0e40;
  color: white;
}
.right-panel {
  margin-left: 260px;
}
</style>
