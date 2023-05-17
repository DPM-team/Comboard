export default {
  setSelectedBoardID(state, payload) {
    state.selectedBoardID = payload.boardID;
  },
  setSelectedTaskBoard(state, payload) {
    state.selectedTaskBoard = payload.selectedTaskBoard;
  },
  renameTaskBoard(state, payload) {
    state.selectedTaskBoard.name = payload.taskBoardNewName;
  },
};
