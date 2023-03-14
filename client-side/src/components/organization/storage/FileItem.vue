<template>
  <li class="file-item">
    <div class="file-item-content">
      <font-awesome-icon v-if="!src" class="icon" :icon="icon" />
      <iframe v-if="src" :src="src" class="frame"></iframe>
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
    src: {
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
  text-align: center;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  width: 19%;
  border-radius: 4px;
  margin: 30px;
  margin-bottom: 60px;
  padding: 30px;
  background: white;
}

.file-item :hover {
  cursor: pointer;
}

.file-item-content {
  padding: 30px 20px 30px 20px;
  width: 100%;
}

.frame {
  width: 100%;
}

.icon {
  justify-content: center;
  display: block;
  margin-left: auto;
  margin-bottom: 1rem;
  margin-right: auto;
  width: 115px;
  font-size: 45px;
}

.file-item-content p {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

@media screen and (max-width: 1200px) {
  .file-item {
    width: 30%;
  }
}

@media screen and (max-width: 900px) {
  .file-item {
    width: 45%;
  }
}

@media screen and (max-width: 750px) {
  .file-item {
    width: 50%;
  }
}

@media screen and (max-width: 700px) {
  .file-item {
    width: 55%;
  }
}

@media screen and (max-width: 650px) {
  .file-item {
    width: 60%;
  }
}

@media screen and (max-width: 600px) {
  .file-item {
    width: 80%;
  }
}

@media screen and (max-width: 400px) {
  .file-item {
    width: 100%;
  }
}
</style>
