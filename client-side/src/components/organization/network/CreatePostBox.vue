<template>
  <form @submit.prevent="createPost">
    <div class="create-post-box">
      <div class="visibility-button-container"><font-awesome-icon @click="toggleVisibilityOptions" class="visibility-button" :icon="['fas', 'earth-europe']" /></div>
      <div v-if="showVisibilityOptions" class="visibilty-options">
        <input type="radio" name="visibility" value="Connections" required @click="toogleVisibility" />
        <span>Connections</span>
        <input type="radio" name="visibility" value="Organization" required @click="toogleVisibility" checked />
        <span>Organization</span>
      </div>
      <div class="pfp-container">
        <img class="user-pfp" :src="pictureLink" />
      </div>
      <input v-model="postContent" required class="post-input" type="text" id="create-post" name="create-post" placeholder="Share your thoughts..." />
      <!-- <input type="button" name="file" id="file" @click="openModal" /> -->
      <font-awesome-icon class="post-image-btn" :icon="['far', 'image']" @click="openModal" />
      <base-dialog v-if="modal" :title="'Add an image to your post!'">
        <template #main>
          <form @submit.prevent="createdPost">
            <base-card v-if="warning" :width="100" :bgColor="'#D9AC0C'">You must have at least text or media</base-card>
            <div class="button-container">
              <label class="button" for="image">Add Image</label>
              <input type="file" ref="file" />
            </div>
            <input v-model="postContent" type="text" class="post-input" @input="setWarning(false)" />
            <input type="submit" @click="createPost" class="post-button" value="Post" />
          </form>
        </template>
      </base-dialog>
      <input class="post-button" value="Post" type="submit" />
    </div>
  </form>
</template>

<script>
import BaseCard from "../../basic-components/BaseCard.vue";
import BaseDialog from "../../basic-components/BaseDialog.vue";
export default {
  components: { BaseDialog, BaseCard },
  props: ["firstname", "pictureLink"],
  data() {
    return {
      visibilityPost: "Organization",
      showVisibilityOptions: false,
      postContent: "",
      postFile: null,
      submitMessage: "",
      modal: false,
      warning: false,
    };
  },
  methods: {
    async createPost() {
      this.postMedia = this.$refs.file?.files[0] || null;

      if (!this.postContent && !this.postMedia) {
        this.setWarning(true);
        return;
      }

      const postObj = {
        creatorID: this.$store.getters.loggedUserID,
        contentString: this.postContent,
        visibilityPost: this.visibilityPost,
      };
      const postMedia = this.postMedia;

      try {
        const successData = await this.$store.dispatch("createPost", {
          postObj,
          postMedia,
          organizationID: this.$store.getters.selectedOrganizationID,
        });
        this.submitMessage = successData.successMessage;
        this.$emit("createPost", successData.createdPost);
      } catch (error) {
        this.submitMessage = error.message || "Something went wrong!";
      }

      console.log(this.submitMessage);
    },
    setWarning(boolean) {
      this.warning = boolean;
    },
    openModal() {
      this.modal = !this.modal;
    },
    toogleVisibility(e) {
      this.visibilityPost = e.srcElement.value;
    },
    toggleVisibilityOptions() {
      this.showVisibilityOptions = !this.showVisibilityOptions;
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}

.button-wrap {
  position: relative;
}

.button {
  display: inline-block;
  background-color: var(--color-primary);
  border-radius: 10px;
  border: 4px double #cccccc;
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  padding: 7px;
  width: 100px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button:hover {
  opacity: 0.9;
}

.button-container {
  display: inline-block;
}
.post-image-btn {
  color: var(--color-primary);
  margin-left: 10px;
  font-size: 18px;
}
.visibilty-options {
  display: block;
  width: 100%;
  padding-right: 30px;
}
.visibilty-options input[type="radio"],
.visibilty-options span {
  font-size: 13px;
  float: right;
  margin-right: 4px;
}
.visibility-button-container {
  display: block;
  width: 100%;
}
.visibility-button {
  color: var(--color-primary);
  float: right;
  padding-right: 15px;
  padding-top: 10px;
  cursor: pointer;
  font-size: 18px;
}
.create-post-box {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border: solid 1px rgba(14, 42, 128, 0.397);
  /* border-radius: 10px; */
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  padding-bottom: 20px;
}
.pfp-container {
  width: 35px;
  height: 35px;
  background-color: var(--color-fourth);
  padding: 0.3em;
  border-radius: 50%;
  margin-right: 35px;
}
.user-pfp {
  width: 100%;
  border-radius: 50%;
}
.post-button {
  background-color: var(--color-primary);
  color: white;
  font-size: 12px;
  border: 1px solid black;
  display: block;
  cursor: pointer;
  text-align: center;
  border-radius: 15px;
  transition-duration: 0.4s;
  /* font-weight: bold; */
  height: 30px;
  width: 60px;
  margin-left: 35px;
  display: inline-block;
}
.post-input {
  width: 350px;
  padding: 5px 0;
  font-size: 13px;
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid var(--color-fourth);
  outline: none;
  resize: none;
}

@media (max-width: 770px) {
  .post-input {
    width: 300px;
  }
  .create-post-box {
    width: 500px;
  }
  .pfp-container {
    margin-right: 25px;
  }
  .post-button {
    margin-left: 25px;
  }
}
@media (max-width: 600px) {
  .post-input {
    width: 200px;
  }
  .create-post-box {
    width: 400px;
    height: 80px;
  }
  .pfp-container {
    margin-right: 20px;
  }
  .post-button {
    margin-left: 20px;
  }
}
@media (max-width: 500px) {
  .post-input {
    width: 180px;
  }
  .create-post-box {
    width: 350px;
    height: 75px;
  }
  .pfp-container {
    margin-right: 15px;
  }
  .post-button {
    margin-left: 15px;
  }
}
@media (max-width: 430px) {
  .post-input {
    width: 160px;
  }
  .create-post-box {
    width: 330px;
    height: 70px;
  }
  .pfp-container {
    margin-right: 13px;
  }
  .post-button {
    margin-left: 13px;
  }
}
@media (max-width: 400px) {
  .post-image-btn {
    display: none;
  }
  .post-input {
    width: 140px;
  }
  .create-post-box {
    width: 290px;
    /* height: 60px; */
  }
  .pfp-container {
    margin-right: 12px;
  }
  .post-button {
    margin-left: 12px;
  }
  .post-image-btn {
    margin-left: 2px;
  }
}
</style>
