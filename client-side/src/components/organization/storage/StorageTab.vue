<template>
  <organization-page-tab :layout="'block'" @scroll="handleScroll()" ref="filesTab">
    <upload-file-button @fileData="getData"></upload-file-button>
    <div class="load-file">
      <base-spinner v-if="loadingUploadedFile"></base-spinner>
      <p v-else class="chosen-file">{{ selectedFile?.name || "No file chosen" }}</p>
    </div>
    <div class="files-container">
      <base-spinner v-if="loadingFiles"></base-spinner>
      <p v-else-if="files.length === 0 && !loadingFiles" class="empty-message">No Files</p>
      <ul class="file-ul" v-else>
        <file-item v-for="file in files" :key="file._id" :id="file._id" :name="file.name" :type="file.type"></file-item>
      </ul>
      <base-spinner v-if="loadingMoreFiles"></base-spinner>
    </div>
  </organization-page-tab>
</template>

<script>
import BaseSpinner from "../../basic-components/BaseSpinner.vue";
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import FileItem from "./FileItem.vue";
import UploadFileButton from "./UploadFileButton.vue";

export default {
  components: { FileItem, OrganizationPageTab, UploadFileButton, BaseSpinner },
  data() {
    return {
      selectedFile: null,
      files: [],
      limit: 12,
      page: 1,
      loadingUploadedFile: false,
      loadingFiles: false,
      loadingMoreFiles: false,
      moreFilesExists: false,
    };
  },
  methods: {
    //Insert into selected file the object of file.
    async getData(value) {
      this.loadingUploadedFile = true;
      this.selectedFile = value;

      try {
        const successData = await this.$store.dispatch("storageFileUpload", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
          file: this.selectedFile,
        });

        console.log(successData);
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }

      this.loadingUploadedFile = false;
      setTimeout(() => {
        this.selectedFile = null;
      }, 3000);
    },
    async loadFiles() {
      try {
        const successData = await this.$store.dispatch("getFiles", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
          page: this.page,
          limit: this.limit,
        });

        this.files = [...this.files, ...successData.files];

        if (successData.totalFiles <= this.limit * this.page) {
          this.moreFilesExists = false;
        } else {
          this.moreFilesExists = true;
        }

        this.page++;
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async handleScroll() {
      if (!this.loadingMoreFiles && this.moreFilesExists) {
        const container = this.$refs.filesTab.$el; // get the container element
        const scrollPosition = container.scrollHeight - container.scrollTop - container.clientHeight;
        // calculate the scroll position relative to the bottom of the container

        if (scrollPosition === 0) {
          this.loadingMoreFiles = true;
          await this.loadFiles();
          this.loadingMoreFiles = false;
        }
      }
    },
  },
  async created() {
    this.loadingFiles = true;
    await this.loadFiles();
    this.loadingFiles = false;
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

.load-file {
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

.empty-message {
  text-align: center;
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
