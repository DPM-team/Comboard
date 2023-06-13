<template>
  <div>
    <dashboard-header></dashboard-header>
    <base-spinner v-if="loading"></base-spinner>
    <div v-else class="container">
      <form enctype="multipart/form-data" class="personal-information" @submit.prevent="updateNonSensitiveData()">
        <h2 class="form--title">Non sensitive information</h2>
        <div class="inputBox">
          <input type="text" name="firstname" :placeholder="userObj?.name || '-'" v-model="newFirstname" />
          <label id="fixed">Firstname <span class="required--field">*</span></label>
        </div>
        <div class="inputBox">
          <input type="text" name="lastname" :placeholder="userObj?.surname || '-'" v-model="newLastname" />
          <label id="fixed">Lastname <span class="required--field">*</span></label>
        </div>
        <div class="inputBox">
          <input type="text" name="telephone" :placeholder="userObj?.telephone || '-'" v-model="newTelephone" />
          <label id="fixed">Telephone</label>
        </div>
        <div class="inputBox">
          <input type="text" name="address" :placeholder="userObj?.address || '-'" v-model="newAddress" />
          <label id="fixed">Address</label>
        </div>
        <div class="inputBox">
          <input type="text" name="gender" :placeholder="userObj?.gender || '-'" v-model="newGender" />
          <label id="fixed">Gender</label>
        </div>
        <div class="inputBox">
          <input type="date" name="birthday" v-model="newBirthday" />
          <label id="fixed">Birthday</label>
        </div>
        <div class="inputBox">
          <input type="text" name="linkedInLink" :placeholder="userObj?.linkedinLink || '-'" v-model="newLinkedIn" />
          <label id="fixed">LinkedIn</label>
        </div>
        <div class="inputBox">
          <input type="submit" name="submit-non-sensitive" value="Update" id="submit-non-sensitive" />
        </div>
        <base-message v-if="updatesMessageForNonSensitive" class="updates-message" :mode="messageModeForNonSensitive" :message="updatesMessageForNonSensitive"></base-message>
      </form>
      <form enctype="multipart/form-data" class="personal-information" @submit.prevent="updateSensitiveInfo()">
        <h2 class="form--title">Sensitive information</h2>
        <div class="inputBox">
          <input type="text" name="username" :placeholder="userObj?.username || '-'" v-model="newUsername" />
          <label id="fixed">Username <span class="required--field">*</span></label>
        </div>
        <div class="inputBox">
          <input type="email" name="email" :placeholder="userObj?.email || '-'" v-model="newEmail" />
          <label id="fixed">Email <span class="required--field">*</span></label>
        </div>
        <div class="inputBox">
          <input type="password" name="new-password" v-model="currPassword" />
          <label id="fixed">Current Password <span class="required--field">*</span></label>
        </div>
        <div class="inputBox">
          <input type="password" name="new-password" />
          <label id="fixed">New Password</label>
        </div>
        <div class="inputBox">
          <input type="password" name="confirm-new-password" />
          <label id="fixed">Confirm new password</label>
        </div>
        <div class="inputBox">
          <input type="submit" name="submit-sensitive" value="Update" id="submit-sensitive" />
        </div>
        <base-message v-if="updatesMessageForSensitive" class="updates-message" :mode="messageModeForSensitive" :message="updatesMessageForSensitive"></base-message>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BaseSpinner from "../basic-components/BaseSpinner.vue";
import DashboardHeader from "../layout/headers/DashboardHeader.vue";

export default {
  components: { DashboardHeader, BaseSpinner },
  data() {
    return {
      loading: false,
      userObj: null,
      /* Non sensitive data for update */
      newFirstname: "",
      newLastname: "",
      newTelephone: "",
      newAddress: "",
      newGender: "",
      newBirthday: "",
      newLinkedIn: "",
      updatesMessageForNonSensitive: "",
      messageModeForNonSensitive: "",
      /* Sensitive data for update */
      currPassword: "",
      newUsername: "",
      newEmail: "",
      updatesMessageForSensitive: "",
      messageModeForSensitive: "",
    };
  },
  methods: {
    async loadUserData() {
      try {
        this.loading = true;

        const successData = await this.$store.dispatch("getUser", { userID: this.$store.getters.loggedUserID });

        this.userObj = successData.userObj;
        this.newBirthday = this.userObj.birthday = moment(this.userObj.birthday).format("YYYY-MM-DD");

        this.loading = false;
      } catch (error) {
        console.log(error.message || "Failed to create organization.");
      }
    },
    async updateNonSensitiveData() {
      let updated = false;
      const updates = new Object();

      if (this.newFirstname.trim() && this.newFirstname !== this.userObj.name) {
        updates.name = this.newFirstname;
        updated = true;
      }

      if (this.newLastname.trim() && this.newLastname !== this.userObj.surname) {
        updates.surname = this.newLastname;
        updated = true;
      }

      if (this.newTelephone.trim() && this.newTelephone !== this.userObj.telephone) {
        updates.telephone = this.newTelephone;
        updated = true;
      }

      if (this.newAddress.trim() && this.newAddress !== this.userObj.address) {
        updates.address = this.newAddress;
        updated = true;
      }

      if (this.newGender.trim() && this.newGender !== this.userObj.gender) {
        updates.gender = this.newGender;
        updated = true;
      }

      if (this.newBirthday.trim() && this.newBirthday !== this.userObj.birthday) {
        updates.birthday = new Date(this.newBirthday);
        updated = true;
      }

      if (this.newLinkedIn.trim() && this.newLinkedIn !== this.userObj.linkedinLink) {
        updates.linkedinLink = this.newLinkedIn;
        updated = true;
      }

      if (updated) {
        try {
          const successData = await this.$store.dispatch("updateUserNonSensitiveData", { userID: this.$store.getters.loggedUserID, updates });
          /* Configure the success mesage */
          this.messageModeForNonSensitive = "success";
          this.updatesMessageForNonSensitive = successData.successMessage;
          /* Update the data on the front - end */
          this.userObj.name = successData.newFirstname;
          this.userObj.surname = successData.newLastname;
          this.userObj.telephone = successData.newTelephone;
          this.userObj.address = successData.newAddress;
          this.userObj.gender = successData.newGender;
          this.newBirthday = this.userObj.birthday = moment(successData.newBirthday).format("YYYY-MM-DD");
          this.userObj.linkedinLink = successData.newLinkedinLink;
          /* Init the new values */
          this.newFirstname = "";
          this.newLastname = "";
          this.newTelephone = "";
          this.newAddress = "";
          this.newGender = "";
          this.newLinkedIn = "";
        } catch (error) {
          this.messageModeForNonSensitive = "error";
          this.updatesMessageForNonSensitive = error.message || "Something went wrong!";
        }

        setTimeout(() => {
          this.messageModeForNonSensitive = "";
          this.updatesMessageForNonSensitive = "";
        }, 3000);
      }
    },
    async updateSensitiveInfo() {
      let updated = false;
      const updates = new Object();

      if (this.newUsername.trim() && this.newUsername !== this.userObj?.username) {
        updates.username = this.newUsername;
        updated = true;
      }

      if (this.newEmail.trim() && this.newEmail !== this.userObj?.email) {
        updates.email = this.newEmail;
        updated = true;
      }

      if (updated) {
        try {
          if (!this.currPassword.trim()) {
            throw new Error("You need to confirm your password!");
          }

          const successData = await this.$store.dispatch("updateUserSensitiveData", {
            userID: this.$store.getters.loggedUserID,
            updates,
            credentials: {
              username: this.userObj?.username,
              password: this.currPassword,
            },
          });
          /* Configure the success mesage */
          this.messageModeForSensitive = "success";
          this.updatesMessageForSensitive = successData.successMessage;
          /* Update the data on the front - end */
          this.userObj.username = successData.newUsername;
          this.userObj.email = successData.newEmail;
          /* Init the new values */
          this.newUsername = "";
          this.newEmail = "";
          this.currPassword = "";
        } catch (error) {
          this.messageModeForSensitive = "error";
          this.updatesMessageForSensitive = error.message || "Something went wrong!";
        }

        setTimeout(() => {
          this.messageModeForSensitive = "";
          this.updatesMessageForSensitive = "";
        }, 3000);
      }
    },
  },
  created() {
    this.loadUserData();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.profile-settings,
.sensitive-information {
  margin-left: 2%;
}

.personal-information {
  width: 70%;
  padding: 20px;
  background: white;
}

.personal-information h2 {
  font-size: 28px;
  color: var(--color-fourth);
  font-weight: 600;
}

.personal-information .inputBox {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.personal-information .inputBox input[type="text"],
.personal-information .inputBox input[type="email"],
.personal-information .inputBox input[type="password"],
.personal-information .inputBox input[type="date"],
.personal-information .inputBox textarea {
  width: 100%;
  padding: 5px 0;
  font-size: 13px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid var(--color-fourth);
  outline: none;
  resize: none;
}

.personal-information .inputBox input[type="file"] {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  border: none;
  outline: none;
  resize: none;
}

.updates-message {
  margin-top: 10px;
}

.personal-information .inputBox label {
  position: absolute;
  left: 0;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  pointer-events: none;
  transition: 0.5s;
  color: #666;
}

.personal-information .inputBox input:focus ~ label,
.personal-information .inputBox textarea:focus ~ label,
.personal-information .inputBox textarea:valid ~ label {
  color: var(--color-primary);
  font-size: 12px;
  transform: translateY(-20px);
}

#fixed {
  color: var(--color-primary);
  font-size: 14px;
  transform: translateY(-20px);
}

.personal-information .inputBox input[type="submit"] {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

.personal-information .inputBox input[type="submit"]:hover,
.personal-information .inputBox input[type="submit"]:active {
  background-color: var(--color-third);
  border-color: var(--color-third);
}

.required--field {
  color: red;
}
</style>
