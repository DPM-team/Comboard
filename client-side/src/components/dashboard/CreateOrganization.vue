<template>
  <base-section @keyup.esc="closeDialog">
    <base-dialog v-if="dialogIsOpen" title="Share your organization's key!" :overlay="false" @close="closeDialog">
      <template #main>
        <base-message v-if="emailSended" mode="success" :message="emailSuccessMessage"></base-message>
        <h3>Here is your key to copy!</h3>
        <br />
        <div class="key--container">
          <h4>{{ orgKeyToJoin }}</h4>
          <div class="copy--container">
            <font-awesome-icon class="copy--icon" icon="fa-regular fa-clipboard" size="lg" title="Copy to clickboard!" @click="copyToClickBoard()" />
            <div class="copy--message" v-if="isCopied">Key copied!</div>
          </div>
        </div>
        <form class="send-key--form" @submit.prevent="sendKey()">
          <input class="send-key--input" type="email" name="receiver-email" placeholder="Send to..." v-model="receiverEmail" required />
          <font-awesome-icon class="send-key--icon" icon="user-plus" size="lg" title="Send the key" @click.prevent="sendKey()" />
        </form>
        <base-message v-if="emailError" mode="error" :message="emailErrorMessage"></base-message>
      </template>
      <template #actions>
        <base-button @click="goToDashboard()">Completed</base-button>
      </template>
    </base-dialog>
    <base-card v-if="errorMessage" width="25%" bgColor="#f4725b">{{ errorMessage }}</base-card>
    <auth-form @submit.prevent="submitForm">
      <auth-header>
        <h2 class="header-title">Create an organization</h2>
      </auth-header>
      <auth-form-input @data="getOrgName" id="organization-name" type="text" name="organization-name" placeholder="Organization's name" phdIcon="pen" required />
      <auth-form-input @data="getOrgEmail" id="organization-email" type="email" name="organization-email" placeholder="Organization's email" phdIcon="envelope" required />
      <auth-form-input @data="getOrgPhone" id="organization-phone" type="tel" name="organization-phone" placeholder="Organization's phone" phdIcon="phone" required />
      <auth-form-input @data="getOrgVatNumber" id="organization-vat" type="text" name="organization-vat" placeholder="Organization's VAT number" phdIcon="file-signature" />
      <auth-form-input @data="getOrgLocation" id="organization-location" type="text" name="organization-location" placeholder="Organization's location" phdIcon="location-dot" required />
      <auth-form-input @data="getOrgWebsite" id="organization-website" type="url" name="organization-website" placeholder="Organization's website" phdIcon="globe" />
      <auth-form-input id="submit-btn" type="submit" name="submit-btn" value="Create Organization" />
    </auth-form>
  </base-section>
</template>

<script>
import AuthForm from "../auth/AuthForm.vue";
import AuthFormInput from "../auth/AuthFormInput.vue";
import AuthHeader from "../auth/AuthHeader.vue";
import BaseSection from "../basic-components/BaseSection.vue";

import emailValidationMixin from "../../mixins/email-validation.js";

export default {
  mixins: [emailValidationMixin],
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
      isCopied: false,
      /* For sending the key via email */
      receivers: new Array(),
      receiverEmail: "",
      emailError: false,
      emailErrorMessage: "",
      emailSended: false,
      emailSuccessMessage: "",
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
    async copyToClickBoard() {
      try {
        await navigator.clipboard.writeText(this.orgKeyToJoin);
        this.isCopied = true;
        setTimeout(() => {
          this.isCopied = false;
        }, 2000); // Hide the message after 3 seconds
      } catch (error) {
        console.log(error);
      }
    },
    async sendKey() {
      if (this.receiverEmail.trim() && this.validateEmail(this.receiverEmail)) {
        this.emailError = false;
        this.emailErrorMessage = "";

        if (!this.receivers.includes(this.receiverEmail)) {
          this.emailError = false;
          this.emailErrorMessage = "";

          this.receivers.push(this.receiverEmail);

          try {
            await this.$store.dispatch("sendJoinInvitation", {
              organizationName: this.organizationObj.name,
              organizationPublicKey: this.orgKeyToJoin,
              receiverEmail: this.receiverEmail,
            });

            this.emailSuccessMessage = `Request has sended with success to ${this.receiverEmail}`;
            this.emailSended = true;

            this.receiverEmail = "";
          } catch (error) {
            console.log(error);
          }
        } else {
          this.emailSended = false;
          this.emailSuccessMessage = "";
          this.emailError = true;
          this.emailErrorMessage = "Request has already sended!";
        }
      } else {
        this.emailSended = false;
        this.emailSuccessMessage = "";
        this.emailErrorMessage = "Wrong email format!";
        this.emailError = true;
      }
    },
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    closeDialog() {
      this.dialogIsOpen = false;
      this.emailErrorMessage = "";
      this.emailError = false;
      this.emailSuccessMessage = "";
      this.emailSended = false;
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

<style scoped>
.header-title {
  text-align: center;
}

.key--container {
  display: flex;
  column-gap: 15px;
}

.copy--icon {
  cursor: pointer;
}

.copy--container {
  position: relative;
  display: inline-block;
}

.copy--message {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #555;
  color: #fff;
  width: 90px;
  margin-bottom: 7px;
  padding: 5px 15px 5px 15px;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
}

.send-key--form {
  margin-top: 20px;
}

.send-key--icon {
  margin-left: 8px;
  cursor: pointer;
}

.send-key--input {
  width: 200px;
  padding: 0.5rem;
  border: 1.5px solid var(--color-primary);
}
</style>
