<template>
  <div>
    <label class="button" for="upload">Upload File</label>
    <input id="upload" type="file" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
input[type="file"] {
  position: absolute;
  z-index: -1;
  top: 15px;
  left: 20px;
  font-size: 17px;
  color: #b8b8b8;
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
</style>
