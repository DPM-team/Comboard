<template>
  <organization-page-tab :layout="'block'">
    <upload-file-button @change="getData"></upload-file-button>
    <div class="files-container">
      <ul class="file-ul">
        <file-item
          @dblclick="openFile('http://localhost:3000/api/users/6412f58744652589555fabb9/file/6412f62944652589555fabbf')"
          v-for="(file, i) in files"
          :key="i"
          :icon="getIcon(i)"
          :src="'http://localhost:3000/api/users/6412f58744652589555fabb9/file/6412f62944652589555fabbf'"
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
          name: "icons8_doc_26px",
          type: "pdf",
        },
        {
          id: "2",
          name: "icons8_doc_26px",
          type: "pdf",
        },
        {
          id: "3",
          name: "icons8_doc_26px",
          type: "pdf",
        },
        {
          id: "4",
          name: "icons8_doc_26px",
          type: "pdf",
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
