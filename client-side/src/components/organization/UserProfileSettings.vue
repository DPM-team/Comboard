<template>
  <div class="profile-settings">
    <form enctype="multipart/form-data" class="personal-information" action="" method="post">
      <h2>Update your profile</h2>
      <div class="inputBox">
        <input type="text" name="firstname" class="" value="" required />
        <span>First name</span>
      </div>
      <div class="inputBox">
        <input type="text" name="lastname" class="" value="" required />
        <span>Last name</span>
      </div>
      <div class="inputBox">
        <input type="text" name="phone" class="" value="" required />
        <span>Phone</span>
      </div>
      <div class="inputBox">
        <input type="email" name="email" class="" value="" required />
        <span>Email</span>
      </div>
      <div class="inputBox">
        <input type="text" name="linkedin" value="" />
        <span>LinkedIn</span>
      </div>
      <div class="inputBox">
        <input type="text" name="location" value="" />
        <span>Location</span>
      </div>
      <div class="inputBox">
        <textarea type="text" name="Bio" value="" />
        <span>Bio</span>
      </div>
      <div class="inputBox">
        <input type="file" name="profile-picture" value="" />
        <span>Profile picture</span>
      </div>
      <div class="inputBox">
        <input type="file" name="profile-banner" value="" />
        <span>Profile banner</span>
      </div>
      <div class="inputBox">
        <input type="submit" name="submit-non-sensitive" value="Save" id="submit-non-sensitive" />
      </div>
    </form>
  </div>
</template>
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
.personal-information .inputBox input:valid ~ span,
.personal-information .inputBox textarea:focus ~ span,
.personal-information .inputBox textarea:valid ~ span {
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
