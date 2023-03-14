<template>
  <organization-page-tab>
    <div class="files-container">
      <ul class="file-ul">
        <file-item v-for="(file, i) in files" :key="i" :icon="getIcon(i)" :src="'http://localhost:3000/api/users/640a0aadd861253531ce2f18/file/64106606b7fe259745b7291d'" :name="file.name"></file-item>
      </ul>
    </div>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import FileItem from "./FileItem.vue";
export default {
  components: {
    FileItem,
    OrganizationPageTab,
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
      ],
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
    upload() {},
  },
};
</script>

<style scoped>
.files-container {
  margin-top: 20px;
  width: calc(100% - 200px);
}

.file-ul {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}
</style>
