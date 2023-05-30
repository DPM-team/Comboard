<template>
  <div class="button-container">
    <label class="button" for="upload">Upload File</label>
    <input id="upload" type="file" @change="input()" multiple ref="fileInput" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    input() {
      this.$emit("fileData", this.$refs.fileInput.files);
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}

.button-wrap {
  position: relative;
}

.button {
  display: inline-block;
  background-color: var(--color-primary);
  border-radius: 10px;
  border: 4px double #cccccc;
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  padding: 7px;
  width: 100px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button:hover {
  opacity: 0.9;
}

.button-container {
  display: inline-block;
}
</style>
