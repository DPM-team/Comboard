export default {
  setPosts(state, payload) {
    console.log("sefd");
    state.posts = payload.posts;
  },
};
