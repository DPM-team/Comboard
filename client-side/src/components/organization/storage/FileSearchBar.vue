<template>
  <div class="searchbar">
    <input type="text" v-model="insertedChars" placeholder="Search files..." @keyup="searchFile()" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      insertedChars: "",
    };
  },
  methods: {
    async searchFile() {
      this.$emit("search-file", this.insertedChars);
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 250px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../../../assets/images/common-images/search.png") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.searchbar {
  position: absolute;
  right: 230px;
}

/* Responsiveness */
@media (max-width: 800px) {
  input {
    width: 200px;
    padding: 8px 38px;
    background: white url("../../../assets/images/common-images/search.png") no-repeat 14px center;
    background-size: 13px 13px;
    font-size: 14px;
    float: left;
    margin-left: 40px;
  }
}

@media (max-width: 500px) {
  input {
    width: 150px;
    padding: 7px 35px;
    background: white url("../../../assets/images/common-images/search.png") no-repeat 13px center;
    background-size: 12px 12px;
    font-size: 13px;
    float: left;
    margin-left: 20px;
  }
}

@media (max-width: 420px) {
  input {
    width: 100px;
  }
  .searchbar {
    right: 20px;
  }
}

@media (max-width: 1150px) {
  .searchbar {
    right: 120px;
  }
}

@media (max-width: 700px) {
  .searchbar {
    right: 70px;
  }
}
</style>
