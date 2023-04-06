<template>
  <li class="file-item" :class="{ loading: spinner }">
    <base-spinner v-if="spinner" class="base-spinner"></base-spinner>
    <div v-else class="file-item-content-iframe">
      <iframe v-if="icon !== 'fa-regular fa-file-word'" :src="src" class="frame"></iframe>
      <div :class="{ 'content-name': icon !== 'fa-regular fa-file-word' }">
        <font-awesome-icon :icon="icon" :class="{ icon: icon === 'fa-regular fa-file-word' }" />
        <p>{{ fileName }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    type: {
      type: String,
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

  created() {
    if (this.name?.length > 30) {
      this.fileName = this.name.slice(0, 27) + "...";
    } else {
      this.fileName = this.name;
    }
  },

  data() {
    return {
      fileName: "",
    };
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

.spinner {
  background-color: gray;
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

.content-name {
  display: flex;
  justify-content: space-around;
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
