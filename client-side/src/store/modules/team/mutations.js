export default {
  setAllTeamsArray(state, payload) {
    state.allTeams = payload.allTeams;
  },
  setMyTeamsArray(state, payload) {
    state.myTeams = payload.myTeams;
  },
  addTeamThatICreate(state, payload) {
    state.allTeams = [...state.allTeams, payload.newTeamObj];
    state.myTeams = [...state.myTeams, payload.newTeamObj];
  },
};
