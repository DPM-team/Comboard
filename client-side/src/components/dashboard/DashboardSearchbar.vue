<template>
  <div>
    <input type="text" v-model="insertedChars" placeholder="Search organizations..." @keyup="searchOrganization()" />
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
    async searchOrganization() {
      if (this.insertedChars.trim()) {
        await this.$store.dispatch("searchOrganizations", { startsWith: this.insertedChars });
      } else {
        this.$store.commit("toogleSearchIsMade", false);
      }
    },
  },
};
</script>

<style scoped>
input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("../../assets/images/common-images/search.png") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.item {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.organization {
  background-color: rgb(41, 21, 130);
  cursor: pointer;
}

.error {
  background-color: tomato;
}

/* Responsiveness */
@media (max-width: 800px) {
  input {
    width: 250px;
    padding: 8px 38px;
    background: white url("../../assets/images/common-images/search.png") no-repeat 14px center;
    background-size: 13px 13px;
    font-size: 14px;
    float: left;
    margin-left: 40px;
  }
}

@media (max-width: 500px) {
  input {
    width: 200px;
    padding: 7px 35px;
    background: white url("../../assets/images/common-images/search.png") no-repeat 13px center;
    background-size: 12px 12px;
    font-size: 13px;
    float: left;
    margin-left: 20px;
  }
}

@media (max-width: 400px) {
  input {
    width: 160px;
  }
}
</style>
