<template>
  <div class="storage-tab-container">
    <div>
      <ul v-for="i in numberRows" :key="i">
        <file-item v-for="j in calculateColumns(i)" :icon="getIcon((i - 1) * 4 + j - 1)" :key="j" :name="files[(i - 1) * 4 + j - 1].name" :type="files[(i - 1) * 4 + j - 1].type"></file-item>
      </ul>
    </div>
  </div>
</template>

<script>
import FileItem from "./FileItem.vue";
export default {
  components: {
    FileItem,
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
          id: "1",
          name: "icons8_doc_26px",
          type: "pdf",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "doc",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "xls",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "pdf",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "pdf",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "pdf",
        },
      ],
    };
  },
  computed: {
    width() {
      return this.files.length / 4;
    },
    numberRows() {
      return this.files.length - Math.floor(this.files.length / 4) * 4 === 0 ? Math.floor(this.files.length / 4) : Math.floor(this.files.length / 4) + 1;
    },
  },
  methods: {
    calculateColumns(ind) {
      return ind === this.numberRows ? this.files.length - Math.floor(this.files.length / 4) * 4 : 4;
    },
    getIcon(ind) {
      if (this.files[ind].type === "pdf") {
        return "fa-regular fa-file-pdf";
      } else if (this.files[ind].type === "doc") {
        return "fa-regular fa-file-word";
      } else if (this.files[ind].type === "xls") {
        return "fa-regular fa-file-excel";
      }
    },
  },
};
</script>

<style scoped>
.storage-tab-container {
  position: absolute;
  top: 100px;
  left: 200px;
  background-color: red;
  width: calc(100% - 200px);
  height: calc(100% - 100px);
  overflow-y: auto;
}
div {
  margin: auto;
}

ul {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style-type: none;
}
</style>
