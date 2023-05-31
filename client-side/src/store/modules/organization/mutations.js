export default {
  setSelectedOrganization(state, payload) {
    state.selectedOrganizationID = payload.organizationID;
  },
  setOrganizations(state, payload) {
    state.organizations = payload;
  },
  setSearchedOrganizations(state, payload) {
    state.searchedOrganizations = payload;
  },
  toogleSearchIsMade(state, payload) {
    state.searchIsMade = payload;
  },
  addOrganization(state, payload) {
    const organizationObj = {
      id: payload.organizationID,
      name: payload.organizationName,
    };

    state.organizations.push(organizationObj);
  },
};
