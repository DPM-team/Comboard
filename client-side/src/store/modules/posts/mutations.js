export default {
  setPosts(state, payload) {
    console.log(payload);
    state.posts = payload.posts;
  },
};
