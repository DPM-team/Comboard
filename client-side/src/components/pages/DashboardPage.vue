<template>
  <div>
    <dashboard-header></dashboard-header>
    <base-dialog v-if="dialogIsOpen" title="Join organization" @close="closeDialog">
      <template #main>
        <base-message v-if="submitMessage" :message="submitMessage" :mode="messageType"></base-message>
        <h3>Insert your organization's key to join!</h3>
        <form id="join-org--form" @submit.prevent="submitFormToJoin">
          <auth-form-input @data="getOrgsKey" id="join-org--input" type="text" name="join-org" placeholder="Organization's key..." required></auth-form-input>
          <base-button>Join</base-button>
          <h4 id="support-message--h4">Having any problems? <a>Contact us</a></h4>
        </form>
      </template>
    </base-dialog>
    <div class="main">
      <base-card :width="'80%'">
        <dashboard-searchbar-container @open-join-form="openDialog"></dashboard-searchbar-container>
        <organization-list></organization-list>
      </base-card>
    </div>
    <dashboard-footer></dashboard-footer>
  </div>
</template>

<script>
import DashboardFooter from "../layout/footers/DashboardFooter.vue";
import DashboardHeader from "../layout/headers/DashboardHeader.vue";
import BaseCard from "../basic-components/BaseCard.vue";
import OrganizationList from "../dashboard/OrganizationList.vue";
import DashboardSearchbarContainer from "../dashboard/DashboardSearchbarContainer.vue";
import AuthFormInput from "../auth/AuthFormInput.vue";

export default {
  components: { DashboardHeader, DashboardFooter, BaseCard, OrganizationList, DashboardSearchbarContainer, AuthFormInput },
  data() {
    return {
      organizationKeyInput: "",
      dialogIsOpen: false,
      submitMessage: "",
      messageType: "",
    };
  },
  methods: {
    async submitFormToJoin() {
      try {
        const successData = await this.$store.dispatch("joinOrganization", {
          organizationKey: this.organizationKeyInput,
          userID: this.$store.getters.loggedUserID,
        });

        this.submitMessage = successData.message;
        this.messageType = "success";
      } catch (error) {
        this.submitMessage = error.message || "Failed to join organization.";
        this.messageType = "error";
      }
    },
    closeDialog() {
      this.dialogIsOpen = false;

      this.submitMessage = "";
    },
    openDialog() {
      this.dialogIsOpen = true;
    },
    getOrgsKey(inputValue) {
      this.organizationKeyInput = inputValue;
    },
  },
};
</script>

<style scoped>
.main {
  min-height: 80vh;
  background: linear-gradient(#ffffff, var(--color-primary));
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

#join-org--input {
  margin-left: 0;
}

#join-org--form {
  width: 60%;
}

#support-message--h4 {
  margin-top: 10px;
}
</style>
