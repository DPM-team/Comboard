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
      return require("../../assets/images/common-images/" + this.fileName + ".png");
    },
  },
};
</script>

<style scoped>
li {
  width: 6%;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  border-radius: 15px;
  margin: 10px;
}

li div {
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

@media screen and (max-width: 1300px) {
  li {
    width: 8%;
  }
}

@media screen and (max-width: 1200px) {
  li {
    width: 10%;
  }
}

@media screen and (max-width: 1100px) {
  li {
    width: 12%;
  }
}

@media screen and (max-width: 900px) {
  li {
    width: 16%;
  }
}

@media screen and (max-width: 800px) {
  li {
    width: 20%;
  }
}

@media screen and (max-width: 600px) {
  li {
    width: 40%;
  }
}

@media screen and (max-width: 400px) {
  li {
    width: 60%;
  }
}
</style>
