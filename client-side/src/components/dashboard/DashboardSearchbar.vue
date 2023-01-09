<template>
  <div>
    <input type="text" v-model="input" placeholder="Search organizations..." />
    <!-- <div class="item organization" v-for="organization in filteredList()" :key="organization">
      <p>{{ organization }}</p>
    </div> -->
    <div class="item error" v-if="input && !filteredList().length">
      <p>No results found!</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      organizations: [
        {
          id: 1,
          title: "Organization1",
          imageLink: "",
        },
        {
          id: 2,
          title: "Organization2",
          imageLink: "",
        },
        {
          id: 3,
          title: "Organization3",
          imageLink: "",
        },
      ],
    };
  },
  methods: {
    filteredList() {
      return this.organizations.filter((organization) => {
        organization.title.toLowerCase().includes(this.input.value.toLowerCase());
      });
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
</style>
