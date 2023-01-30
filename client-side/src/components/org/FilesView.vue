<template>
  <ul>
    <file-display v-for="file in files" :key="file.id" :name="file.name" :type="file.type"></file-display>
  </ul>
</template>

<script>
import FileDisplay from "../dashboard/FileDisplay.vue";
export default {
  components: {
    FileDisplay,
  },
  data() {
    return {
      files: [
        {
          id: "1",
          name: "icons8_doc_26px",
          type: "png",
        },
      ],
    };
  },
};
</script>
