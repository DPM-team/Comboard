export default {
  setSelectedOrganizationID(state, payload) {
    state.selectedOrganizationID = payload.organizationID;
  },
  setOrganizations(state, payload) {
    state.organizations = payload;
  },
  addOrganization(state, payload) {
    const organizationObj = {
      _id: payload.organizationID,
      name: payload.organizationName,
    };

    state.organizations.push(organizationObj);
  },
};
