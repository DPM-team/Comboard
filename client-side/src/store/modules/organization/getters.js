export default {
  selectedOrganizationID(state) {
    return state.selectedOrganizationID;
  },
  organizations(state) {
    if (state.searchIsMade) {
      return state.searchedOrganizations;
    }

    return state.organizations;
  },
  isSearchMade(state) {
    return state.searchIsMade;
  },
  isOrganizationSelected(state) {
    return !!state.selectedOrganizationID;
  },
};
