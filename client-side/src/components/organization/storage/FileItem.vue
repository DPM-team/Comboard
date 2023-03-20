<template>
  <li class="file-item">
    <base-spinner v-if="spinner" class="base-spinner"></base-spinner>
    <div v-else class="file-item-content-iframe">
      <iframe :src="src" class="frame"></iframe>
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
    spinner: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      fileName: this.name,
    };
  },
  method: {
    spi() {
      console.log("xvg");
    },
  },
};
</script>

<style scoped>
.file-item {
  text-align: center;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  width: 20%;
  border-radius: 4px;
  margin: 30px;
  margin-bottom: 60px;

  background: white;
}

.file-item :hover {
  cursor: pointer;
}

.file-item-content-icon {
  padding: 30px 20px 30px 20px;
  width: 100%;
}
.file-item-content-iframe {
  padding: 7px 3px 7px 3px;
  width: 100%;
}

.base-spinner {
  padding: 70px;
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
@media screen and (max-width: 1400px) {
  .file-item {
    width: 25%;
  }
}

@media screen and (max-width: 1200px) {
  .file-item {
    width: 35%;
  }
}

@media screen and (max-width: 900px) {
  .file-item {
    width: 40%;
  }
}

@media screen and (max-width: 750px) {
  .file-item {
    width: 35%;
  }
}

@media screen and (max-width: 700px) {
  .file-item {
    width: 80%;
  }
}

@media screen and (max-width: 600px) {
  .file-item {
    width: 85%;
  }
}

@media screen and (max-width: 400px) {
  .file-item {
    width: 90%;
  }
}
</style>
