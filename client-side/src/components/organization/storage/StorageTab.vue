<template>
  <organization-page-tab :layout="'block'" @scroll="handleScroll()" ref="filesTab">
    <div class="storage--header">
      <upload-file-button @fileData="getData"></upload-file-button>
      <div class="load-file">
        <base-spinner v-if="loadingUploadedFile"></base-spinner>
        <p v-else class="chosen-file">No file chosen</p>
      </div>
      <file-search-bar @searchFile="searchFile"></file-search-bar>
    </div>
    <div class="files-container" v-if="!searchingFiles">
      <base-spinner v-if="loadingFiles"></base-spinner>
      <p v-else-if="files.length === 0 && !loadingFiles" class="empty-message">No Files</p>
      <ul class="file-ul" v-else>
        <file-item v-for="file in files" :key="file._id" :id="file._id" :name="file.name" :type="file.type" @openOptions="showContextMenu"></file-item>
      </ul>
      <base-spinner v-if="loadingMoreFiles"></base-spinner>
    </div>
    <div class="files-container" v-else>
      <base-spinner v-if="loadingFiles"></base-spinner>
      <p v-else-if="filteredFiles.length === 0 && !loadingFiles" class="empty-message">No files found for your search!</p>
      <ul class="file-ul" v-else>
        <file-item v-for="file in filteredFiles" :key="file._id" :id="file._id" :name="file.name" :type="file.type" @openOptions="showContextMenu"></file-item>
      </ul>
    </div>
    <base-context-menu v-if="activeFileID !== null" :position="menuPosition">
      <template #options>
        <li @click="openFile()">Open</li>
        <li @click="saveFile()">Save</li>
        <li @click="copyFile()">Copy</li>
        <li @click="renameFile()">Rename</li>
        <li class="warning" @click="deleteFile()">Delete</li>
      </template>
    </base-context-menu>
  </organization-page-tab>
</template>

<script>
import BaseSpinner from "../../basic-components/BaseSpinner.vue";
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import FileItem from "./FileItem.vue";
import UploadFileButton from "./UploadFileButton.vue";
import BaseContextMenu from "../../basic-components/BaseContextMenu.vue";
import FileSearchBar from "./FileSearchBar.vue";

export default {
  components: { FileItem, OrganizationPageTab, UploadFileButton, BaseSpinner, BaseContextMenu, FileSearchBar },
  data() {
    return {
      files: [],
      limit: 12,
      page: 1,
      loadingUploadedFile: false,
      loadingFiles: false,
      loadingMoreFiles: false,
      moreFilesExists: false,
      /* For context menu */
      activeFileID: null,
      menuPosition: {
        x: 0,
        y: 0,
      },
      /* For files searching */
      filteredFiles: [],
      searchingFiles: false,
      previousSearch: "",
    };
  },
  methods: {
    //Insert into selected file the object of file.
    async getData(files) {
      this.loadingUploadedFile = true;

      for (const file in files) {
        if (files[file] instanceof File) {
          try {
            const successData = await this.$store.dispatch("storageFileUpload", {
              userID: this.$store.getters.loggedUserID,
              organizationID: this.$store.getters.selectedOrganizationID,
              file: files[file],
            });

            this.files.push(successData.storedFile);
          } catch (error) {
            console.log(error.message || "Something went wrong!");
          }
        }
      }

      this.loadingUploadedFile = false;
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
    showContextMenu(positionX, positionY, fileID) {
      const container = this.$refs.filesTab.$el;

      this.activeFileID = fileID;
      this.menuPosition = {
        x: positionX,
        /* We need to do here the addition, because of the scroll that we maybe done */
        y: positionY + (container?.scrollTop || 0),
      };
    },
    closeContextMenu() {
      this.activeFileID = null;
    },
    removeEventListeners() {
      document.removeEventListener("click", this.closeContextMenu);
    },
    openFile() {
      window.open(`/api/storage/file/${this.activeFileID}`, "_blank");
    },
    saveFile() {
      console.log("Save");
    },
    copyFile() {
      console.log("Copy");
    },
    renameFile() {
      console.log("Rename");
    },
    async deleteFile() {
      try {
        const fileIndex = this.files.findIndex((file) => {
          return file._id === this.activeFileID;
        });

        if (fileIndex > -1) {
          this.files.splice(fileIndex, 1);
        }

        this.$store.dispatch("deleteStorageFile", {
          organizationID: this.$store.getters.selectedOrganizationID,
          fileID: this.activeFileID,
        });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async searchFile(insertedChars) {
      if (this.previousSearch !== insertedChars) {
        if (insertedChars.trim()) {
          try {
            this.searchingFiles = true;
            this.loadingFiles = true;

            const successData = await this.$store.dispatch("searchFiles", {
              userID: this.$store.getters.loggedUserID,
              organizationID: this.$store.getters.selectedOrganizationID,
              startsWith: insertedChars,
            });

            this.filteredFiles = successData.filteredFiles;
            this.loadingFiles = false;
          } catch (error) {
            console.log(error.message || "Something went wrong!");
          }
        } else {
          this.searchingFiles = false;
        }
      }

      this.previousSearch = insertedChars;
    },
  },
  async created() {
    this.loadingFiles = true;
    await this.loadFiles();
    this.loadingFiles = false;
    document.addEventListener("click", this.closeContextMenu);
  },
  beforeUnmount() {
    this.removeEventListeners();
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
  margin-top: 20px;
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

.context-menu ul li {
  cursor: pointer;
  padding: 8px 15px 8px 15px;
  width: 80px;
}

.context-menu ul li:hover {
  background-color: #eee;
}

.warning {
  color: red;
}

.storage--header {
  display: flex;
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
