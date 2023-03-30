<template>
  <organization-page-tab @scroll="scrollFiles" :layout="'block'">
    <upload-file-button @change="getData"></upload-file-button>
    <p class="chosen-file">{{ this.selectedFile?.name || "No file chosen" }}</p>
    <div class="files-container">
      <ul class="file-ul">
        <div v-if="this.files.length === 0" class="file-ul">
          <file-item v-for="i in 4" :key="i" :spinner="true" :name="''"></file-item>
        </div>
        <file-item
          v-else
          v-for="(file, i) in files"
          @dblclick="openFile(`http://localhost:3000/api/users/${this.$store.getters.loggedUserID}/file/${file._id}`)"
          :key="i"
          :icon="getIcon(i)"
          :src="`http://localhost:3000/api/users/${this.$store.getters.loggedUserID}/file/${file._id}`"
          :name="file.name"
        ></file-item>
      </ul>
      <base-spinner v-if="this.spinnerScroll"></base-spinner>
    </div>
  </organization-page-tab>
</template>

<script>
import BaseSpinner from "../../basic-components/BaseSpinner.vue";
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import FileItem from "./FileItem.vue";
import UploadFileButton from "./UploadFileButton.vue";
export default {
  components: {
    FileItem,
    OrganizationPageTab,
    UploadFileButton,
    BaseSpinner,
  },
  created() {
    this.$store.dispatch("getFiles", {
      skip: 0,
    });
  },

  data() {
    return {
      files: this.$store.getters.getFiles,
      selectedFile: null,
      skip: 0,
      spinnerScroll: false,
    };
  },
  methods: {
    getIcon(ind) {
      if (this.files[ind].type === "pdf") {
        return "fa-regular fa-file-pdf";
      } else if (this.files[ind].type === "doc") {
        return "fa-regular fa-file-word";
      } else if (this.files[ind].type === "xls") {
        return "fa-regular fa-file-excel";
      }
    },

    //Insert into selected file the object of file.
    async getData(e) {
      this.selectedFile = e.srcElement.files[0];

      await this.$store.dispatch("upload", { file: this.selectedFile });
      setTimeout(() => {
        this.selectedFile = null;
      }, 4000);
    },
    async scrollFiles(e) {
      if (e.srcElement.offsetHeight + e.srcElement.scrollTop >= e.srcElement.scrollHeight) {
        this.spinnerScroll = true;
        this.skip = this.files.length;

        console.log(this.$refs.file);

        const otherFiles = await this.getFiles(this.skip);
        if (otherFiles.length === 0) {
          this.spinnerScroll = false;

          return;
        } else if (otherFiles.length > 0) {
          otherFiles.forEach((file) => {
            this.files.push(file);
          });
        }
        this.spinnerScroll = false;
      }
    },

    openFile(file) {
      window.open(file, "_blank");
    },
  },
};
</script>

<style scoped>
.files-container {
  margin-top: 20px;
  width: calc(100% - 200px);
}

.chosen-file {
  color: grey;
  display: inline-block;
}

.file-ul {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  width: 100%;
  justify-content: center;
}

/* Responsiveness */

@media (max-width: 1250px) {
  .files-container {
    width: calc(100% - 180px);
  }
}
@media (max-width: 1150px) {
  .files-container {
    width: calc(100% - 80px);
  }
}

@media (max-width: 700px) {
  .files-container {
    width: calc(100% - 55px);
  }
}
@media (max-width: 450px) {
  .files-container {
    width: calc(100% - 45px);
  }
}
</style>
