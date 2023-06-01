<template>
  <div>
    <dashboard-header></dashboard-header>
    <div class="container">
      <form enctype="multipart/form-data" class="personal-information" @submit.prevent="updateProfile">
        <h2>Update your profile</h2>
        <div class="inputBox">
          <input type="text" name="firstname" />
          <span id="fixed">Firstname</span>
        </div>
        <div class="inputBox">
          <input type="text" name="lastname" />
          <span id="fixed">Lastname</span>
        </div>
        <div class="inputBox">
          <input type="text" name="username" />
          <span id="fixed">Username</span>
        </div>
        <div class="inputBox">
          <input type="email" name="email" />
          <span id="fixed">Email</span>
        </div>
        <div class="inputBox">
          <input type="password" name="password" />
          <span id="fixed">Password</span>
        </div>
        <div class="inputBox">
          <input type="text" name="telephone" />
          <span id="fixed">Telephone</span>
        </div>
        <div class="inputBox">
          <input type="text" name="address" />
          <span id="fixed">Address</span>
        </div>
        <div class="inputBox">
          <input type="text" name="gender" />
          <span id="fixed">Gender</span>
        </div>
        <div class="inputBox">
          <input type="date" name="birthday" />
          <span id="fixed">Birthday</span>
        </div>
        <div class="inputBox">
          <input type="text" name="linkedInLink" />
          <span id="fixed">LinkedIn</span>
        </div>
        <div class="inputBox">
          <input type="file" name="profile-picture" ref="file" />
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
  </div>
</template>
<script>
import DashboardHeader from "../layout/headers/DashboardHeader.vue";

export default {
  components: { DashboardHeader },
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
</style>
