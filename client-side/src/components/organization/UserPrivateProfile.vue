<template>
  <div>
    <organization-page-header></organization-page-header>
    <div class="header__wrapper">
      <div class="profile-header"><img class="backgroundImage" :src="backgroundImage" alt="User Background Image" /></div>
      <div class="cols__container">
        <div class="left__col">
          <div class="img__container">
            <img :src="pfp" alt="User Profile Pic" />
            <span></span>
          </div>
          <h2>{{ firstname }} {{ lastname }}</h2>
          <h4>{{ location }}</h4>
          <p>{{ bio }}</p>
          <div class="content">
            <ul class="profile-ul">
              <div class="icon">
                <a :href="phoneLink"><font-awesome-icon :icon="['fas', 'phone']" /></a>
              </div>
              <div class="icon">
                <a href="mailto:<?php echo $patientObj->email ?>"><font-awesome-icon :icon="['fas', 'envelope']" /></a>
              </div>
              <div class="icon">
                <a href="https://www.google.com/maps/place/<?php echo $patientObj->location ?>" target="_blank"> <font-awesome-icon :icon="['fab', 'linkedin']" /></a>
              </div>
            </ul>
          </div>
        </div>
        <div class="right__col">
          <!-- <?php 
          if($updatesMessage == "Successful update!"){
            echo "
            <div class='success-message handle-visibility'>
              <i class='fa-solid fa-check' style='color:white; margin-top: 2px; margin-left:2px; '></i>
              <h3>Successful update!</h3>
            </div>";}
          else if($updatesMessage == "Fields are missing!"){
            echo "
            <div class='reject-message handle-visibility'>
            <i class='fa-solid fa-xmark' style='color:white; margin-top: 2px; margin-left:2px;'></i>
            <h3>Fields are missing..</h3></div>";
          }
        ?> -->
          <nav>
            <ul class="profile-ul">
              <li><a class="selected">Posts</a></li>
              <li><a>Connections</a></li>
              <li><a>Settings</a></li>
            </ul>
          </nav>
          <div class="card-container" id="card-container"></div>
          <div class="profile-settings hide" id="profile-settings">
            <form class="personal-information" action="" method="post">
              <h2>Update your profile</h2>
              <div class="inputBox">
                <input type="text" name="firstname" class="<?php echo (!empty($firstnameSetError)) ? 'is-invalid-update' : ''; ?>" value="<?php echo $currFirstname ?>" required />
                <span>First name</span>
                <!-- <p class="invalid-feedback-form"><?php echo $firstnameSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="text" name="lastname" class="<?php echo (!empty($lastnameSetError)) ? 'is-invalid-update' : ''; ?>" value="<?php echo $currLastname ?>" required />
                <span>Last name</span>
                <!-- <p class="invalid-feedback-form"><?php echo $lastnameSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="text" name="phone" class="<?php echo (!empty($phoneSetError)) ? 'is-invalid-update' : ''; ?>" value="<?php echo $currPhone ?>" required />
                <span>Phone</span>
                <!-- <p class="invalid-feedback-form"><?php echo $phoneSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="text" name="location" value="<?php echo $currLocation ?>" />
                <span>Location</span>
              </div>
              <div class="inputBox">
                <input type="file" name="profile-picture" />
                <span>Profile picture</span>
              </div>
              <div class="inputBox">
                <input type="submit" name="submit-non-sensitive" value="Save" id="submit-non-sensitive" />
              </div>
            </form>
          </div>
          <div class="sensitive-information hide" id="sensitive-information">
            <form class="personal-information" action="" method="post">
              <h2>Settings</h2>
              <div class="inputBox">
                <input type="text" name="username" class="<?php echo (!empty($usernameSetError)) ? 'is-invalid-update' : ''; ?>" value="<?php echo $currUsername ?>" required />
                <span>Username</span>
                <!-- <p class="invalid-feedback-form"><?php echo $usernameSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="text" name="email" class="<?php echo (!empty($emailSetError)) ? 'is-invalid-update' : ''; ?>" value="<?php echo $currEmail ?>" required />
                <span>Email</span>
                <!-- <p class="invalid-feedback-form"><?php echo $emailSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="password" name="current-password" class="<?php echo (!empty($currPasswordSetError)) ? 'is-invalid-update' : ''; ?>" placeholder="**********" />
                <span>Your current password</span>
                <!-- <p class="invalid-feedback-form"><?php echo $currPasswordSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="password" name="new-password" class="<?php echo (!empty($newPasswordSetError)) ? 'is-invalid-update' : ''; ?>" placeholder="**********" />
                <span>New password</span>
                <!-- <p class="invalid-feedback-form"><?php echo $newPasswordSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="password" name="confirm-new-password" class="<?php echo (!empty($confirmNewPasswordSetError)) ? 'is-invalid-update' : ''; ?>" placeholder="**********" />
                <span>Confirm new password</span>
                <!-- <p class="invalid-feedback-form"><?php echo $confirmNewPasswordSetError; ?></p> -->
              </div>
              <div class="inputBox">
                <input type="submit" name="submit-sensitive" value="Save" id="submit-sensitive" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrganizationPageHeader from "../layout/headers/OrganizationPageHeader.vue";

export default {
  components: { OrganizationPageHeader },
  data() {
    return {
      userID: "",
      organizationID: "",
      firstname: "Dionisis",
      lastname: "Lougaris",
      location: "Thessaloniki",
      phoneLink: "tel:69999999999",
      bio: "Hello fellow Uom Members, I am Dionisis and I am a senior at the Uom Computer Science Dept.",
      pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtQWy2SSj5JE7pG87OSTvNp402SDCNd2O_5hsKAg-BUQ&s",
      backgroundImage: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000",
    };
  },
  created() {
    // document.body.classList.add("no-scrolling");

    this.userID = this.$store.getters.loggedUserID;
    this.organizationID = this.$store.getters.selectedOrganizationID;
  },
};
</script>
<style scoped>
.profile-header img {
  width: 100%;
  background: no-repeat 50% 20% / cover;
  /* min-height: calc(50px + 15vw); */
  height: calc(100px + 15vw);
}

.profile-ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.profile-a {
  text-decoration: none;
}

.header__wrapper .cols__container .left__col {
  padding: 25px 20px;
  text-align: center;
  max-width: 350px;
  position: relative;
  margin: 0 auto;
}

.header__wrapper .cols__container .left__col .img__container {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translatex(-50%);
}
.header__wrapper .cols__container .left__col .img__container img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.18);
}
.header__wrapper .cols__container .left__col .img__container span {
  position: absolute;
  background: #2afa6a;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  bottom: 3px;
  right: 11px;
  border: 2px solid #fff;
}
.header__wrapper .cols__container .left__col h2 {
  margin-top: 60px;
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 5px;
}
.header__wrapper .cols__container .left__col p {
  font-size: 0.9rem;
  color: #818181;
  margin: 0;
}
.header__wrapper .cols__container .left__col .about {
  justify-content: space-between;
  position: relative;
  margin: 35px 0;
}
.header__wrapper .cols__container .left__col .about li {
  display: flex;
  flex-direction: column;
  color: #818181;
  font-size: 0.9rem;
}
.header__wrapper .cols__container .left__col .about li span {
  color: #1d1d1d;
  font-weight: 600;
}
.header__wrapper .cols__container .left__col .about:after {
  position: absolute;
  content: "";
  bottom: -16px;
  display: block;
  background: #cccccc;
  height: 1px;
  width: 100%;
}
.header__wrapper .cols__container .content p {
  font-size: 1rem;
  color: #1d1d1d;
  line-height: 1.8em;
}
.header__wrapper .cols__container .content ul {
  gap: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}
.header__wrapper .cols__container .content ul li {
  display: flex;
}
.header__wrapper .cols__container .content ul i {
  font-size: 1.3rem;
}
.header__wrapper .cols__container .right__col nav {
  display: flex;
  align-items: center;
  padding: 30px 0;
  justify-content: space-between;
  flex-direction: column;
}
.header__wrapper .cols__container .right__col nav ul {
  display: flex;
  gap: 20px;
  flex-direction: column;
}
.profile-ul li {
  cursor: pointer;
  text-align: center;
}

.selected {
  font-weight: bold;
  color: var(--color-primary);
}
.visible {
  display: block;
}
.hide {
  display: none;
}

.is-invalid-update {
  border-bottom: 2px solid red !important;
}

.invalid-feedback-form {
  color: red;
  font-size: 15px;
}

.success-message {
  margin-top: 10px;
  border: 1px solid rgb(38, 144, 38);
  background-color: #4bb543;
  display: flex;
  width: 30%;
  padding: 5px 2px;
}
.success-message h3 {
  color: white;
  font-weight: bold;
  width: max-content;
  padding-left: 7px;
}
.reject-message {
  margin-top: 10px;
  border: 1px solid rgb(94, 16, 16);
  background-color: rgb(177, 87, 86);
  display: flex;
  width: 30%;
  padding: 5px 2px;
}
.reject-message h3 {
  color: white;
  font-weight: bold;
  width: max-content;
  padding-left: 7px;
}

.handle-visibility {
  animation: cssAnimation 0s 3s forwards;
  visibility: visible;
}

@keyframes cssAnimation {
  to {
    visibility: hidden;
  }
}

.header__wrapper .cols__container .right__col nav button {
  background: var(--color-fourth);
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-family: "Montserrat";
  font-weight: 600;
  margin-left: 5px;
}
.header__wrapper .cols__container .right__col nav button:hover {
  opacity: 0.8;
}
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
.personal-information .inputBox input:valid ~ span,
.personal-information .inputBox textarea:focus ~ span,
.personal-information .inputBox textarea:valid ~ span {
  color: var(--color-primary);
  font-size: 12px;
  transform: translateY(-20px);
}

.personal-information .inputBox input[type="submit"] {
  background: var(--color-fourth);
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 18px;
  font-family: "Montserrat";
  /* font-weight: 600; */
}
.personal-information .inputBox input[type="submit"]:active {
  opacity: 0.8;
}
/* ************************************ */

.card-container {
  padding-top: 20px;
  padding-bottom: 50px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  overflow-y: auto;
  height: 500px;
  margin-bottom: 30px;
}
.card-container .card {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 2.5em rgba(111, 110, 110, 0.131);
}
.card-container h3 {
  color: var(--color-primary);
}
.card-container h4 {
  color: var(--color-fourth);
}
.card-container p {
  color: var(--color-primary);
}
.profile-ul a i {
  color: var(--color-primary);
  text-decoration: none;
}

/* Responsiveness */

@media (min-width: 868px) {
  .header__wrapper .cols__container {
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 50px;
  }
  .header__wrapper .cols__container .left__col {
    padding: 25px 0px;
  }
  .header__wrapper .cols__container .right__col nav ul {
    flex-direction: row;
    gap: 30px;
  }
  .header__wrapper .cols__container .right__col .photos {
    height: 365px;
    overflow: auto;
    padding: 0 0 30px;
  }
}

@media (min-width: 1017px) {
  .header__wrapper .cols__container .left__col {
    margin: 0;
    margin-right: auto;
  }
  .header__wrapper .cols__container .right__col nav {
    flex-direction: row;
  }
  .header__wrapper .cols__container .right__col nav button {
    margin-top: 0;
  }
}

@media (max-width: 867px) {
  .card-container {
    width: 80%;
    margin: 0 auto;
  }
  .updates-message {
    text-align: center;
  }
}
</style>
