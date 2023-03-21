<template>
  <organization-page-tab :layout="'block'">
    <upload-file-button @change="getData"></upload-file-button>
    <div class="files-container">
      <ul class="file-ul">
        <div v-if="this.files.length === 0" class="file-ul">
          <file-item v-for="i in 4" :key="i" :spinner="true" :name="''"></file-item>
        </div>
        <file-item
          v-for="(file, i) in files"
          @dblclick="openFile(`http://localhost:3000/api/users/64187222cdb384a474b4d4f1/file/${file._id}`)"
          :key="i"
          :icon="getIcon(i)"
          :src="`http://localhost:3000/api/users/64187222cdb384a474b4d4f1/file/${file._id}`"
          :name="file.name"
        ></file-item>
      </ul>
    </div>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import FileItem from "./FileItem.vue";
import UploadFileButton from "./UploadFileButton.vue";
export default {
  components: {
    FileItem,
    OrganizationPageTab,
    UploadFileButton,
  },
  async created() {
    this.files = await this.getFiles();
  },

  data() {
    return {
      files: [],
      selectedFile: null,
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
    upload() {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE4NzIyMmNkYjM4NGE0NzRiNGQ0ZjEiLCJpYXQiOjE2NzkzMjM2ODJ9.IQ5IxYBsAmC39O3QtbRliA9rPZQqQL_1eI4cO3QgVFI");

      let formdata = new FormData();

      formdata.append("upload", this.selectedFile, this.selectedFile.name);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("/api/user/upload", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
    //Insert into selected file the object of file.
    getData(e) {
      this.selectedFile = e.srcElement.files[0];
      this.upload();
    },
    getFiles() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE4NzIyMmNkYjM4NGE0NzRiNGQ0ZjEiLCJpYXQiOjE2NzkzMjM2ODJ9.IQ5IxYBsAmC39O3QtbRliA9rPZQqQL_1eI4cO3QgVFI");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      return fetch("/api/user/files?limit=&skip=", requestOptions)
        .then((response) => response.json())
        .then((result) => result)
        .catch((error) => console.log("error", error));
    },
    spinner() {
      console.log("");
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

.upload {
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
