export default {
  selectedOrganizationID(state) {
    return state.selectedOrganizationID;
  },
  organizations(state) {
    return state.organizations;
  },
  isOrganizationSelected(state) {
    return !!state.selectedOrganizationID;
  },
};
