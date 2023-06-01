export default {
  setAllProjectsArray(state, payload) {
    state.allProjects = payload.allProjects;
  },
  setMyProjectsArray(state, payload) {
    state.myProjects = payload.myProjects;
  },
  addProjectThatICreate(state, payload) {
    state.allProjects = [...state.allProjects, payload.newProjectObj];
    state.myProjects = [...state.myProjects, payload.newProjectObj];
  },
};
