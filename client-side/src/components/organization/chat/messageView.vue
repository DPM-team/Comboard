<template>
  <div>
    <div class="header" @change="defaultData">{{ user.name }}</div>

    <ul class="messages">
      <li v-for="(u, index) in chat" :key="index" class="message">
        <div v-if="u.from === this.$store.getters.loggedUserID" class="sender">user</div>
        <div v-else class="sender">{{ user.name }}</div>
        {{ u.content }}
      </li>
    </ul>

    <form @submit.prevent="onSubmit" class="form">
      <textarea v-model="input" placeholder="Your message..." class="input" />
      <button :disabled="!isValid" class="send-button">Send</button>
    </form>
  </div>
</template>

<script>
import { socket } from "@/socket";
export default {
  // name: "message",
  props: {
    user: Object,
  },
  data() {
    return {
      input: "",
      member: null,
      chat: [],
    };
  },
  watch: {
    user() {
      this.chat = [];
    },
  },
  methods: {
    onSubmit() {
      const content = this.input;
      socket.emit("private-message", {
        content,
        to: this.user.id,
        from: this.$store.getters.loggedUserID,
      });
      this.chat.push({ content, id: this.$store.getters.loggedUserID, from: this.$store.getters.loggedUserID });
      this.input = "";
    },
    defaultData() {
      this.chat = [];
    },
  },
  computed: {
    isValid() {
      return this.input.length > 0;
    },
  },
  created() {
    socket.on("private-messa", (content, to, from, name) => {
      this.chat.push({ content, id: to, from, name });
    });
  },
};
</script>

<style scoped>
.header {
  line-height: 40px;
  padding: 10px 20px;
  border-bottom: 1px solid #dddddd;
}
.messages {
  margin: 0;
  padding: 20px;
}
.message {
  list-style: none;
}
.sender {
  font-weight: bold;
  margin-top: 5px;
}
.form {
  padding: 10px;
}
.input {
  width: 80%;
  resize: none;
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #000;
}
.send-button {
  vertical-align: top;
}
</style>
