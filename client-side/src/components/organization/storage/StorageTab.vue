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
        <file-item v-for="file in files" :key="file._id" :id="file._id" :name="file.name" :type="file.type" @openOptions="showContextMenu"></file-item>
      </ul>
      <base-spinner v-if="loadingMoreFiles"></base-spinner>
    </div>
    <base-context-menu v-if="activeFileID !== null" :position="menuPosition">
      <template #options>
        <li @click="viewOrganization()">Open</li>
        <li @click="viewOrganization()">Copy</li>
        <li @click="viewOrganization()">Rename</li>
        <li class="warning" @click="leaveOrganization()">Delete</li>
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

export default {
  components: { FileItem, OrganizationPageTab, UploadFileButton, BaseSpinner, BaseContextMenu },
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
      /* For context menu */
      activeFileID: null,
      menuPosition: {
        x: 0,
        y: 0,
      },
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
    viewOrganization() {
      console.log("fds");
    },
    leaveOrganization() {
      console.log("Leave");
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
