<template>
  <base-section>
    <base-card v-if="errorMessage" width="25%" bgColor="#f4725b">{{ errorMessage }}</base-card>
    <auth-form @submit.prevent="submitForm">
      <auth-header>
        <h2>Create an organization</h2>
      </auth-header>
      <auth-form-input @data="getOrgName" id="organization-name" type="text" name="organization-name" placeholder="Organization's name" required />
      <auth-form-input @data="getOrgEmail" id="organization-email" type="email" name="organization-email" placeholder="Organization's email" required />
      <auth-form-input @data="getOrgPhone" id="organization-phone" type="tel" name="organization-phone" placeholder="Organization's phone" required />
      <auth-form-input @data="getOrgVatNumber" id="organization-vat" type="text" name="organization-vat" placeholder="Organization's VAT number" required />
      <auth-form-input @data="getOrgLocation" id="organization-location" type="text" name="organization-location" placeholder="Organization's location" required />
      <auth-form-input @data="getOrgWebsite" id="organization-website" type="text" name="organization-website" placeholder="Organization's website" />
      <auth-form-input id="submit-btn" type="submit" name="submit-btn" value="Create Organization" />
    </auth-form>
    <base-card v-if="orgKeyToJoin" width="25%" bgColor="#FFFFFF">{{ orgKeyToJoin }}</base-card>
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
    };
  },
  methods: {
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
    async submitForm() {
      try {
        await this.$store
          .dispatch("registerOrganization", this.organizationObj)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.error) {
              throw data.error;
            }

            this.orgKeyToJoin = data.publicKey;

            this.errorMessage = "";
          });
      } catch (error) {
        this.errorMessage = error || "Failed to create organization.";
      }
    },
  },
};
</script>

<style scoped>
h4 {
  color: #a0a6b0;
}

h2,
h4 {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2px;
}
</style>
