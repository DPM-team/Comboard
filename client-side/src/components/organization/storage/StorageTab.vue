<template>
  <div>
    <div>
      <ul v-for="i in numberRows" :key="i">
        <file-item v-for="j in calculateColumns(i)" :key="j" :name="files[(i - 1) * 4 + j - 1].name" :type="files[(i - 1) * 4 + j - 1].type"></file-item>
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
          type: "png",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "png",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "png",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "png",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "png",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "png",
        },
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "png",
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
  },
};
</script>

<style scoped>
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
