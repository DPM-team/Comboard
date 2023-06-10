<template>
  <li>
    <div class="item">
      <h2 class="item--text">{{ text }}</h2>
      <button class="remove-btn" v-if="isPrivateProfile">Remove</button>
      <button>View</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    isPrivateProfile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.item {
  margin-top: 10px;
  display: flex;
}

.item h2 {
  font-size: 17px;
  margin-top: 5px;
  margin-right: 10px;
}

button {
  margin-top: 3px;
  padding: 0.3rem 0.75rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: var(--color-third);
}

.remove-btn {
  margin-right: 3px;
  margin-top: 3px;
  padding: 0.3rem 0.75rem;
  font-family: inherit;
  background-color: rgb(167, 9, 9);
  /* border: 1px solid var(--color-primary); */
  color: white;
  cursor: pointer;
}
</style>
