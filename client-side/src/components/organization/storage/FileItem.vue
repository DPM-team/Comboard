<template>
  <li class="file-item" @dblclick="openFile()">
    <base-spinner v-if="fileLoading" class="base-spinner"></base-spinner>
    <div class="file-item-content-iframe" :class="{ visibility: fileLoading }">
      <iframe v-if="allowPreview()" class="frame" :src="`/api/storage/file/${this.id}`" @load="onFileLoaded()"></iframe>
      <div :class="{ 'content-name': allowPreview() }">
        <font-awesome-icon :icon="getIcon()" :class="{ icon: !allowPreview() }" />
        <p>{{ fileName }}</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
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
      fileName: this.name?.length > 30 ? this.name.slice(0, 27) + "..." : this.name,
      fileLoading: true,
    };
  },
  methods: {
    getIcon() {
      switch (this.type) {
        case "application/pdf":
          return "fa-regular fa-file-pdf";
        case "application/msword":
          return "fa-regular fa-file-word";
        case "xls":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          return "fa-regular fa-file-excel";
        case "image/png":
        case "image/jpeg":
        case "image/jpg":
          return "fa-regular fa-file-image";
        default:
          return "fa-regular fa-file";
      }
    },
    allowPreview() {
      if (this.type === "application/pdf" || this.type === "image/png" || this.type === "image/jpeg") {
        return true;
      } else {
        this.fileLoading = false;
        return false;
      }
    },
    onFileLoaded() {
      this.fileLoading = false;
    },
    openFile() {
      window.open(`/api/storage/file/${this.id}`, "_blank");
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

.visibility {
  display: none;
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
