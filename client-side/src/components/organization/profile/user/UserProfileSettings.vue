<template>
  <div class="profile-settings">
    <base-spinner v-if="isLoading"></base-spinner>
    <h4 v-else-if="!isLoading && message">{{ message }}</h4>
    <form v-else enctype="multipart/form-data" class="personal-information" method="post">
      <h2>Update your profile</h2>
      <div class="inputBox">
        <input class="disabled" type="text" name="firstname" :value="userObj.firstname || '-'" disabled title="Can changed on dashboard profile settings" />
        <span id="fixed">Name</span>
      </div>
      <div class="inputBox">
        <input class="disabled" type="text" name="lastname" :value="userObj.lastname || '-'" disabled title="Can changed on dashboard profile settings" />
        <span id="fixed">Surname</span>
      </div>
      <div class="inputBox">
        <input class="disabled" type="text" name="location" :value="userObj.address || '-'" disabled title="Can changed on dashboard profile settings" />
        <span id="fixed">Location</span>
      </div>
      <div class="inputBox">
        <input class="disabled" type="text" name="gender" :value="userObj.gender || '-'" disabled title="Can be changed on dashboard profile settings" />
        <span id="fixed">Gender</span>
      </div>
      <div class="inputBox">
        <input class="disabled" type="text" name="birthday" :value="userObj.birthday || '-'" disabled title="Can be changed on dashboard profile settings" />
        <span id="fixed">Birthday</span>
      </div>
      <div class="inputBox">
        <input class="disabled" type="text" name="linkedin" :value="userObj.linkedinLink || '-'" disabled title="Can changed on dashboard profile settings" />
        <span id="fixed">LinkedIn</span>
      </div>
      <div class="inputBox">
        <input type="text" name="specialization" :value="userObj.specialization" />
        <span v-if="!userObj.specialization">Specialization</span>
        <span v-else id="fixed">Specialization</span>
      </div>
      <div class="inputBox">
        <input type="email" name="organization-email" :value="userObj.email" />
        <span v-if="!userObj.email">Organization email</span>
        <span v-else>Organization email</span>
      </div>
      <div class="inputBox">
        <input type="email" name="organization-phone" :value="userObj.telephone" />
        <span v-if="!userObj.telephone">Organization phone</span>
        <span v-else>Organization phone</span>
      </div>
      <div class="inputBox">
        <textarea type="text" name="bio" :value="userObj.bio" />
        <span>Bio</span>
      </div>
      <div class="inputBox">
        <input type="file" name="profile-picture" value="" />
        <span id="fixed">Profile picture</span>
      </div>
      <div class="inputBox">
        <input type="file" name="profile-banner" value="" />
        <span id="fixed">Profile banner</span>
      </div>
      <div class="inputBox">
        <input type="submit" name="submit-non-sensitive" value="Save" id="submit-non-sensitive" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userObj: null,
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async loadUserPublicData() {
      try {
        this.isLoading = true;

        this.userObj = await this.$store.dispatch("getUserDataForAnOrganization", {
          userID: this.$store.getters.loggedUserID,
          organizationID: this.$store.getters.selectedOrganizationID,
        });

        this.isLoading = false;

        if (!this.userObj) {
          this.$router.push("/not-found");
        }
      } catch (error) {
        console.log(error.message || "Something went wrong!");
        this.$router.push("/not-found");
      }
    },
  },
  created() {
    this.loadUserPublicData();
  },
};
</script>

<style scoped>
.profile-settings {
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
}

.profile-settings,
.sensitive-information {
  margin-left: 2%;
}

.personal-information {
  width: 90%;
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
.personal-information .inputBox textarea {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
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

.personal-information .inputBox span {
  position: absolute;
  left: 0;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  pointer-events: none;
  transition: 0.5s;
  color: #666;
}

.personal-information .inputBox input:focus ~ span,
.personal-information .inputBox textarea:focus ~ span,
.personal-information .inputBox textarea:valid ~ span {
  color: var(--color-primary);
  font-size: 12px;
  transform: translateY(-20px);
}

#fixed {
  color: var(--color-primary);
  font-size: 12px;
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
  background-color: #000875;
  border-color: #000875;
}

.disabled {
  cursor: not-allowed;
}
</style>
