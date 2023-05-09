<template>
  <base-section @keyup.esc="closeDialog">
    <base-dialog v-if="dialogIsOpen" title="Share your organization's key!" @close="closeDialog">
      <template #main>
        <h3>Here is your key to copy!</h3>
        <br />
        <h4>{{ orgKeyToJoin }}</h4>
      </template>
    </base-dialog>
    <base-card v-if="errorMessage" width="25%" bgColor="#f4725b">{{ errorMessage }}</base-card>
    <auth-form @submit.prevent="submitForm">
      <auth-header>
        <h2>Create an organization</h2>
      </auth-header>
      <auth-form-input @data="getOrgName" id="organization-name" type="text" name="organization-name" placeholder="Organization's name" phdIcon="pen" required />
      <auth-form-input @data="getOrgEmail" id="organization-email" type="email" name="organization-email" placeholder="Organization's email" phdIcon="envelope" required />
      <auth-form-input @data="getOrgPhone" id="organization-phone" type="tel" name="organization-phone" placeholder="Organization's phone" phdIcon="phone" required />
      <auth-form-input @data="getOrgVatNumber" id="organization-vat" type="text" name="organization-vat" placeholder="Organization's VAT number" phdIcon="file-signature" />
      <auth-form-input @data="getOrgLocation" id="organization-location" type="text" name="organization-location" placeholder="Organization's location" phdIcon="location-dot" required />
      <auth-form-input @data="getOrgWebsite" id="organization-website" type="text" name="organization-website" placeholder="Organization's website" phdIcon="globe" />
      <auth-form-input id="submit-btn" type="submit" name="submit-btn" value="Create Organization" />
    </auth-form>
  </base-section>
</template>

<script>
import AuthForm from "../auth/AuthForm.vue";
import AuthFormInput from "../auth/AuthFormInput.vue";
import AuthHeader from "../auth/AuthHeader.vue";
import BaseSection from "../basic-components/BaseSection.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthHeader,
    BaseSection,
  },
  data() {
    return {
      organizationObj: {
        name: "",
        email: "",
        phone: "",
        vatNumber: "",
        location: "",
        website: "",
      },
      orgKeyToJoin: "",
      errorMessage: "",
      dialogIsOpen: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const successData = await this.$store.dispatch("registerOrganization", this.organizationObj);

        this.orgKeyToJoin = successData.publicKey;

        this.openDialog();

        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = error.message || "Failed to create organization.";
        this.orgKeyToJoin = "";
      }
    },
    closeDialog() {
      this.dialogIsOpen = false;
    },
    openDialog() {
      this.dialogIsOpen = true;
    },
    getOrgName(inputValue) {
      this.organizationObj.name = inputValue;
    },
    getOrgEmail(inputValue) {
      this.organizationObj.email = inputValue.trim();
    },
    getOrgPhone(inputValue) {
      this.organizationObj.phone = inputValue.trim();
    },
    getOrgVatNumber(inputValue) {
      this.organizationObj.vatNumber = inputValue;
    },
    getOrgLocation(inputValue) {
      this.organizationObj.location = inputValue;
    },
    getOrgWebsite(inputValue) {
      this.organizationObj.website = inputValue.trim();
    },
  },
};
</script>

<style scoped></style>
