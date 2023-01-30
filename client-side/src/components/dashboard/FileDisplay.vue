<template>
  <li>
    <div>
      <img :src="formatImagePath" :class="type" name="name" />
      <h6>{{ fileName }}</h6>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fileName: this.name,
    };
  },
  computed: {
    formatImagePath() {
      return "path";
    },
  },
};
</script>

<style scoped>
li {
  width: 6%;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}

div {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

img {
  display: block;
  margin-left: auto;
  margin-bottom: 1rem;
  margin-right: auto;
  width: 50px;
}

h6 {
  display: flex;
  justify-content: center;
}
</style>
