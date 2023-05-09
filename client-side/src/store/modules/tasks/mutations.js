export default {
  setSelectedBoardID(state, payload) {
    state.selectedBoardID = payload.boardID;
  },
  setSelectedTaskBoard(state, payload) {
    state.selectedTaskBoard = payload.selectedTaskBoard;
  },
};
