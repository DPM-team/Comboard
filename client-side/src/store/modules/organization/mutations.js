export default {
  setSelectedOrganizationID(state, payload) {
    state.selectedOrganizationID = payload.organizationID;
  },
  setOrganizations(state, payload) {
    state.organizations = payload;
  },
};
