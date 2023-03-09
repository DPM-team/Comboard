<template>
  <div class="network-tab-container">
    <div class="main-section">
      <create-post-box :pictureLink="this.myUser.pictureLink"></create-post-box>
      <post-box v-for="post in posts" :key="post.id" :pictureLink="post.pictureLink" :firstname="post.firstname" :lastname="post.lastname" :content="post.content" :date="post.date"></post-box>
    </div>
    <div class="side-section">
      <connection-suggestion-list></connection-suggestion-list>
      <news-list></news-list>
    </div>
  </div>
</template>

<script>
import ConnectionSuggestionList from "./ConnectionSuggestionList.vue";
import CreatePostBox from "./CreatePostBox.vue";
import NewsList from "./NewsList.vue";
import PostBox from "./PostBox.vue";
export default {
  data() {
    return {
      myUser: { firstname: "Dio", lastname: "Lou", pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" },
      posts: [
        {
          id: 1,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s",
          firstname: "Dionisis",
          lastname: "Lougaris",
          dateOfPost: "9/3/2023",
          content: "Auto einai to prwto post tou Comboard apo to development!",
        },
        {
          id: 2,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP2I0IL6HN3k4H3AsEV0VHBYhoD2vHB5L9zQ&usqp=CAU",
          firstname: "Panos",
          lastname: "Machairas",
          dateOfPost: "9/3/2023",
          content: "Auto einai to deutero post tou Comboard apo to development!",
        },
        {
          id: 3,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s",
          firstname: "Minas",
          lastname: "Charakopoulos",
          dateOfPost: "9/3/2023",
          content: "Auto einai to trito post tou Comboard apo to development!",
        },
        {
          id: 4,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
          firstname: "Giorgos",
          lastname: "Askianakis",
          dateOfPost: "9/3/2023",
          content: "Auto einai to tetarto post tou Comboard apo to development!",
        },
      ],
    };
  },
  components: { CreatePostBox, PostBox, ConnectionSuggestionList, NewsList },
};
</script>

<style scoped>
.network-tab-container {
  position: absolute;
  top: 100px;
  left: 200px;
  background-color: red;
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
}
.main-section {
  width: calc(70%);
  overflow-y: auto;
  /* -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: -moz-scrollbars-none; */
  background: black;
}
/* .main-section ::-webkit-scrollbar {
  display: none;
} */
.side-section {
  width: calc(30% - 200px);
  background: yellow;
}
</style>
