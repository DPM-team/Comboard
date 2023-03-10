<template>
  <li class="file-item">
    <div class="file-item-content">
      <font-awesome-icon class="icon" :icon="icon" />
      <p>{{ fileName }}</p>
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
    icon: {
      type: String,
    },
  },
  data() {
    return {
      fileName: this.name,
    };
  },
};
</script>

<style scoped>
.file-item {
  /* width: 8%; */
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  border-radius: 15px;
  margin: 10px;
  background: white;
}
.file-item :hover {
  cursor: pointer;
}

.file-item-content {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 20px 30px 20px;
  width: 150px;
}

.icon {
  display: block;
  margin-left: auto;
  margin-bottom: 1rem;
  margin-right: auto;
  width: 80px;
  font-size: 45px;
}

.file-item-content p {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

/* @media screen and (max-width: 1300px) {
  li {
    width: 10%;
  }
}

@media screen and (max-width: 1200px) {
  li {
    width: 14%;
  }
}

@media screen and (max-width: 1100px) {
  li {
    width: 16%;
  }
}

@media screen and (max-width: 1000px) {
  li {
    width: 16%;
  }
}

@media screen and (max-width: 800px) {
  li {
    width: 20%;
  }
}

@media screen and (max-width: 700px) {
  li {
    width: 30%;
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
} */
</style>
