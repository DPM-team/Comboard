<template>
  <li>
    <img :src="src" :fileName="fileName" />
    <h5>{{ name }}</h5>
  </li>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      name: this.fileName,
    };
  },
};
</script>

<style scoped>
li {
  width: 4%;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  border-radius: 15px;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50px;
}
</style>
