<template>
  <organization-page-tab layout="flex">
    <div class="main-section">
      <create-post-box :pictureLink="this.myUser.pictureLink"></create-post-box>
      <post-box v-for="post in posts" :key="post.id" :pictureLink="post.pictureLink" :firstname="post.firstname" :lastname="post.lastname" :content="post.content" :date="post.date"></post-box>
    </div>
    <div class="side-section">
      <connection-suggestion-list></connection-suggestion-list>
      <news-list></news-list>
    </div>
  </organization-page-tab>
</template>

<script>
import OrganizationPageTab from "../../layout/pages/organization/OrganizationPageTab.vue";
import ConnectionSuggestionList from "./ConnectionSuggestionList.vue";
import CreatePostBox from "./CreatePostBox.vue";
import NewsList from "./NewsList.vue";
import PostBox from "./PostBox.vue";

export default {
  props: {
    userID: {
      type: String,
      required: true,
    },
    organizationID: {
      type: String,
      required: true,
    },
  },
  async created() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${this.$store.getters.loggedUserToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const postResponse = await fetch("/api/user/posts", requestOptions);

    const posts = await postResponse.json();

    posts.forEach((post, ind) => {
      this.posts[ind] = {
        id: post._id,
        pictureLink: `/api/users/${post.userId}/profilePhoto`,
        firstname: "",
        lastname: "",
      };
    });
  },
  data() {
    return {
      myUser: { firstname: "Dio", lastname: "Lou", pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s" },
      posts: [
        {
          id: 1,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s",
          firstname: "Dionisis",
          lastname: "Lougaris",
          date: "9/3/2023",
          content: "Auto einai to prwto post tou Comboard apo to development!",
        },
        {
          id: 2,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP2I0IL6HN3k4H3AsEV0VHBYhoD2vHB5L9zQ&usqp=CAU",
          firstname: "Panos",
          lastname: "Machairas",
          date: "9/3/2023",
          content: "Auto einai to deutero post tou Comboard apo to development!",
        },
        {
          id: 3,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC1BfJUBAGyB8eSCKJT1VJIx7kfshsuRqztK1q3g&s",
          firstname: "Minas",
          lastname: "Charakopoulos",
          date: "9/3/2023",
          content: "Auto einai to trito post tou Comboard apo to development!",
        },
        {
          id: 4,
          pictureLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
          firstname: "Giorgos",
          lastname: "Askianakis",
          date: "9/3/2023",
          content: "Auto einai to tetarto post tou Comboard apo to development!",
        },
      ],
    };
  },
  components: { CreatePostBox, PostBox, ConnectionSuggestionList, NewsList, OrganizationPageTab },
};
</script>

<style scoped>
.main-section {
  width: calc(70% - 100px);
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.side-section {
  width: calc(30% - 100px);
}

/* Responsiveness */
@media (max-width: 1250px) {
  .side-section {
    width: calc(30% - 80px);
  }
}
@media (max-width: 1150px) {
  .main-section {
    width: calc(70% - 50px);
  }
  .side-section {
    width: calc(30% - 30px);
  }
}
@media (max-width: 1050px) {
  .main-section {
    width: calc(100% - 80px);
  }
  .side-section {
    display: none;
  }
}

@media (max-width: 700px) {
  .main-section {
    width: calc(100% - 55px);
  }
}
@media (max-width: 450px) {
  .main-section {
    width: calc(100% - 45px);
  }
}
</style>
