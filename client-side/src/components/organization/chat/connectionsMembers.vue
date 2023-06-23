<template>
  <div class="user" @click="onClick" :class="{ selected: selected }">
    <div class="description">
      <div class="name">{{ user.name }}</div>
    </div>
    <div v-if="user.hasNewMessages" class="new-messages">!</div>
  </div>
</template>

<script>
export default {
  name: "memberView",
  props: {
    user: Object,
    selected: Boolean,
  },
  methods: {
    onClick() {
      this.$emit("select");
    },
  },
};
</script>

<style scoped>
.selected {
  background-color: #1164a3;
}
.user {
  padding: 10px;
}
.description {
  display: inline-block;
}
.status {
  color: #92959e;
}
.new-messages {
  color: white;
  background-color: red;
  width: 20px;
  border-radius: 5px;
  text-align: center;
  float: right;
  margin-top: 10px;
}
</style>
