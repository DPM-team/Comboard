<template>
  <base-section>
    <base-card v-if="errorMessage" width="25%" bgColor="#f4725b">{{ errorMessage }} </base-card>
    <auth-form @submit.prevent="submitForm">
      <auth-header>
        <h2 class="h2-tag">Join Our Community!</h2>
        <h4 class="h4-tag" style="padding-bottom: 10px">Create an account with a few steps</h4>
      </auth-header>
      <auth-form-input @data="getName" id="firstname" name="name" :value="name" type="text" placeholder="Firstname" phdIcon="pen" required />
      <auth-form-input @data="getSurname" id="surname" name="surname" :value="surname" type="text" placeholder="Surname" phdIcon="pen" required />
      <auth-form-input @data="getUsername" id="username" name="username" :value="username" type="text" placeholder="Username" phdIcon="user" required />
      <auth-form-input @data="getEmail" id="email" name="email" type="email" :value="email" placeholder="Email" phdIcon="envelope" required />
      <auth-form-input @data="getPassword" id="password" name="password" :value="password" type="password" placeholder="Password" :minLength="8" phdIcon="lock" required />
      <p id="password-mandatory">Use 8 or more characters with a combination of letters, numbers and symbols</p>
      <auth-form-input
        @data="getPasswordConfirmation"
        id="confirm-password"
        name="confirmedPassword"
        :value="passwordConfirmation"
        type="password"
        placeholder="Confirm Password"
        :minLength="8"
        phdIcon="lock"
        required
      />
      <auth-form-input id="login-btn" name="loginButton" type="submit" value="Agree & Join" />
      <p id="agreement">
        By clicking Agree & Join, you agree to the comboard <span class="span-link" @click="toggleUAModal">User Agreement</span> and
        <span class="span-link" @click="togglePPModal">Privacy Policy.</span>
      </p>
      <base-dialog v-if="modalUA" :title="'User Agreement'" :overlay="true" @close="toggleUAModal">
        <template #main>
          <h2>User Agreement</h2>

          <h4>
            This User Agreement ("Agreement") is a legal agreement between you ("User") and DPM Team, regarding your use of the Comboard web app ("Web App"). By accessing or using the Web App, you
            acknowledge that you have read, understood, and agree to be bound by this Agreement.
          </h4>

          <h3>1. Services Description</h3>

          <h4>The Web App provides the following services:</h4>

          <h4>
            Networking inside each organization Personal Calendar Personal, Project, and Team task manager File storage for personal documents in each organization Viewing of users, teams, projects,
            etc.
          </h4>

          <h3>2. User Responsibilities</h3>

          <h4>User acknowledges that the Web App is a thesis project and may contain errors or safety risks. User agrees to use the Web App at their own risk and take necessary precautions.</h4>

          <h3>3. User Data Collection</h3>

          <h4>
            User data collected during the use of the Web App is stored in a MongoDB database. However, as of June 2023, no user data will be used under any circumstances, as this is a thesis project
            and not a real company application.
          </h4>

          <h3>4. Intellectual Property</h3>

          <h4>
            All intellectual property rights for the content within the Web App and any user-generated content belong to the creators and their academic institution. User agrees not to reproduce or
            distribute any copyrighted materials without prior permission.
          </h4>

          <h3>5. Liability</h3>

          <h4>
            The creators and their academic institution will not be held liable for any issues or damages that may arise from the use of the Web App during the thesis project. User understands and
            accepts this limitation of liability.
          </h4>

          <h3>6. Termination</h3>

          <h4>
            Access to the Web App may be terminated at the conclusion of the thesis project if the creators decide to relaunch the app for commercial use. User acknowledges and agrees to this
            termination provision.
          </h4>

          <h3>7. Governing Law</h3>

          <h4>This Agreement shall be governed by and construed in accordance with the laws of Greece, without regard to its conflict of laws principles.</h4>

          <h3>8. Modifications</h3>

          <h4>This User Agreement may be subject to modifications or updates as necessary during the course of the thesis project. Users will be notified of any significant changes.</h4>

          <h3>9. Contact Information</h3>

          <h5>For any questions or concerns related to the Web App or the thesis project, users can reach out to DPM Team via email at <span class="span-link">dpmcomboard@gmail.com.</span></h5>
        </template>
      </base-dialog>
      <base-dialog v-if="modalPP" :title="'Privacy Policy'" :overlay="true" @close="togglePPModal">
        <template #main>
          <h2>Privacy Policy</h2>

          <h4>
            This Privacy Policy ("Policy") explains how DPM Team ("we," "us," or "our") collects, uses, and protects the personal information of users ("User" or "you") when you access and use the
            Comboard web app ("Web App"). We are committed to safeguarding your privacy and ensuring the confidentiality of any personal information you provide.
          </h4>

          <h3>1. Information Collection and Use</h3>

          <h4>
            As of June 2023, the Web App does not collect any personal information from users. However, please note that during the testing phase of the thesis project, user data may be temporarily
            stored in a MongoDB database. This data is used solely for academic purposes and will not be shared with any third parties.
          </h4>

          <h3>2. Data Security</h3>

          <h4>
            We take reasonable measures to protect the confidentiality and integrity of any user data collected during the testing phase. However, as the Web App is a thesis project, we cannot
            guarantee the absolute security of data transmission over the internet or its storage in the database.
          </h4>

          <h3>3. Cookies</h3>

          <h4>The Web App does not use cookies or any similar technologies for tracking or collecting user information.</h4>

          <h3>4. Third-Party Links</h3>

          <h4>
            The Web App may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third-party
            sites. We encourage you to review the privacy policies of those websites before providing any personal information.
          </h4>

          <h3>Children's Privacy</h3>

          <h4>
            The Web App is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that personal information of a
            child has been inadvertently collected, we will take immediate steps to delete it from our records.
          </h4>

          <h3>6. Changes to the Privacy Policy</h3>

          <h4>
            We may update this Privacy Policy from time to time. Any changes will be effective upon posting the revised Policy on the Web App. It is your responsibility to review the Policy
            periodically for any updates.
          </h4>

          <h3>7. Contact Us</h3>

          <h5>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <span class="span-link">dpmcomboard@gmail.com.</span></h5>
        </template>
      </base-dialog>
    </auth-form>
    <p id="login-account">
      Already on Comboard?
      <router-link id="login-now" to="/login">Login</router-link>
    </p>
  </base-section>
</template>

<script>
import AuthForm from "../../auth/AuthForm.vue";
import AuthFormInput from "../../auth/AuthFormInput.vue";
import AuthHeader from "../../auth/AuthHeader.vue";
import BaseSection from "../../basic-components/BaseSection.vue";
import BaseCard from "../../basic-components/BaseCard.vue";

export default {
  components: {
    AuthForm,
    AuthFormInput,
    AuthHeader,
    BaseSection,
    BaseCard,
  },
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errorMessage: "",
      modalUA: false,
      modalPP: false,
    };
  },
  methods: {
    toggleUAModal() {
      this.modalUA = !this.modalUA;
    },
    togglePPModal() {
      this.modalPP = !this.modalPP;
    },
    async submitForm() {
      if (!this.confirmPassword()) {
        this.errorMessage = "Passwords doesn't match, please try again!";
        this.password = "";
        this.passwordConfirmation = "";
        return;
      }

      try {
        await this.$store.dispatch("register", {
          name: this.name,
          surname: this.surname,
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.$router.push("/dashboard");
      } catch (error) {
        this.errorMessage = error.message || "Failed to register.";
      }
    },
    confirmPassword() {
      return this.password === this.passwordConfirmation;
    },
    getName(inputValue) {
      this.name = inputValue;
    },
    getSurname(inputValue) {
      this.surname = inputValue;
    },
    getUsername(inputValue) {
      this.username = inputValue;
    },
    getEmail(inputValue) {
      this.email = inputValue;
    },
    getPassword(inputValue) {
      this.password = inputValue;
    },
    getPasswordConfirmation(inputValue) {
      this.passwordConfirmation = inputValue;
    },
  },
};
</script>

<style scoped>
.span-link {
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
}
#agreement,
#password-mandatory {
  text-align: center;
  font-size: small;
  padding-left: 40px;
  width: 75%;
}
#agreement,
#password-mandatory a {
  color: var(--color-primary);
}

h4 {
  color: #808082;
}

.h2-tag,
.h4-tag {
  text-align: center;
  margin-top: 0px;
  margin-bottom: 2px;
}

#login-account {
  text-align: center;
  font-size: medium;
  margin-top: 10px;
}

#login-now {
  color: #1a75ff;
  text-decoration: none;
  margin-left: 10px;
}
</style>
