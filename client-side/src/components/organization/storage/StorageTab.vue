<template>
  <organization-page-tab :layout="'block'">
    <upload-file-button @change="getData"></upload-file-button>
    <div class="files-container">
      <ul class="file-ul">
        <div v-if="this.files.length === 0" class="file-ul">
          <file-item v-for="i in 4" :key="i" :spinner="true" :name="''"></file-item>
        </div>
        <file-item
          @dbclick="openFile('http://localhost:3000/api/users/6415df05780af31e91dbffdb/file/6415df5d780af31e91dbffe1')"
          v-for="(file, i) in files"
          :key="i"
          :icon="getIcon(i)"
          :src="'http://localhost:3000/api/users/6415df05780af31e91dbffdb/file/6415df5d780af31e91dbffe1'"
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
  data() {
    return {
      files: [
        {
          id: "1",
          name: "dgd",
          type: "doc",
        },
        {
          id: "2",
          name: "dgd",
          type: "doc",
        },
      ],
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
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEyZjU4NzQ0NjUyNTg5NTU1ZmFiYjkiLCJpYXQiOjE2Nzg5NjQxMDN9.CUP--oLJxeQ7uQWp-ebpLFHsc2IAcQQsr-Tu_IvxxKs");

      let formdata = new FormData();
      console.log(this.$refs.file.files);
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
