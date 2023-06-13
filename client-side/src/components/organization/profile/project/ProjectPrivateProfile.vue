<template>
  <div>
    <organization-page-header>
      <back-header-button></back-header-button>
    </organization-page-header>
    <div v-if="projectObj && gotAccess && loaded">
      <router-view name="dialog"></router-view>
      <div class="project-page-container">
        <div class="left-col">
          <h1 class="project-name">
            <!-- Blue highlight effect -->
            <span class="highlight hover--cursor" title="View project" @click="viewProjectPublicProfile()">{{ projectObj.name }}</span>
          </h1>
          <form enctype="multipart/form-data" class="project-information" method="post" @submit.prevent="updateProject()">
            <h2>Update your project's profile</h2>
            <span class="input-title">Supervisor:</span>
            <h3 v-if="supervisorObj" class="supervisor-name--text" @click="viewSupervisor()">{{ supervisorObj?.fullname }}</h3>
            <div class="inputBox">
              <span class="input-title">Project name:</span>
              <input type="text" name="projectName" :placeholder="projectObj.name" v-model="newProjectName" />
            </div>
            <div class="inputBox">
              <span class="input-title">Project's goal (for who?):</span>
              <input type="text" name="projectGoal" :placeholder="projectObj.belongsTo" v-model="newProjectGoal" />
            </div>
            <div class="inputBox">
              <span class="input-title">Status:</span>
              <label class="input-title radio-button--label" for="project-completed">Completed!</label>
              <input type="radio" id="project-completed" name="project-status" :value="true" :checked="projectObj.completed" v-model="newProjectStatus" />
              <label class="input-title radio-button--label" for="project-on-going">On going...</label>
              <input type="radio" id="project-on-going" name="project-status" :value="false" :checked="!projectObj.completed" v-model="newProjectStatus" />
            </div>
            <div class="inputBox">
              <span class="input-title">Description:</span>
              <textarea type="text" name="description" :placeholder="projectObj.description" v-model="newProjectDescription" />
            </div>
            <div class="inputBox">
              <input type="submit" name="submit-non-sensitive" value="Save" />
            </div>
            <base-message v-if="updatesMessage" class="updates-message" :mode="messageMode" :message="updatesMessage"></base-message>
          </form>
        </div>
        <div class="right-col">
          <div class="members-list">
            <h2 class="my-h2">Project members</h2>
            <p class="my-p" v-if="members.length === 0 && loaded">No members found</p>
            <ul v-else>
              <button-options-item-list v-for="member in members" :key="member.id" :text="member.fullname" :isPrivateProfile="false" itemCategory="user" :itemID="member.id"></button-options-item-list>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <loading-spinner v-if="!loaded"></loading-spinner>
  </div>
</template>

<script>
import BackHeaderButton from "../../../layout/headers/BackHeaderButton.vue";
import OrganizationPageHeader from "../../../layout/headers/OrganizationPageHeader.vue";
import ButtonOptionsItemList from "../ButtonOptionsItemList.vue";

export default {
  components: { OrganizationPageHeader, ButtonOptionsItemList, BackHeaderButton },
  props: {
    projectID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      projectObj: null,
      supervisorObj: null,
      loaded: false,
      gotAccess: false,
      members: [],
      /* For project update */
      newProjectName: "",
      newProjectGoal: "",
      newProjectDescription: "",
      newProjectStatus: null,
      updatesMessage: "",
      messageMode: "",
    };
  },
  methods: {
    async loadProjectData() {
      try {
        this.projectObj = await this.$store.dispatch("getProjectData", { projectID: this.projectID });

        this.newProjectStatus = this.projectObj.completed;

        if (this.projectObj.supervisor != this.$store.getters.loggedUserID) {
          this.$router.push("/permission-denied");
        }

        this.gotAccess = true;
      } catch (error) {
        console.log(error.message || "Something went wrong!");
        this.$router.push("/not-found");
      }

      return this.projectObj;
    },
    async loadProjectMembers() {
      try {
        this.members = await this.$store.dispatch("getProjectMembers", { projectID: this.projectID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async getProjectSupervisor() {
      try {
        this.supervisorObj = await this.$store.dispatch("getProjectSupervisor", { projectID: this.projectID });
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async updateProject() {
      let updated = false;
      const updates = new Object();

      if (this.newProjectName.trim() && this.newProjectName !== this.projectObj.name) {
        updates.name = this.newProjectName;
        updated = true;
      }

      if (this.newProjectDescription.trim() && this.newProjectDescription !== this.projectObj.description) {
        updates.description = this.newProjectDescription;
        updated = true;
      }

      if (this.newProjectGoal.trim() && this.newProjectGoal !== this.projectObj.belongsTo) {
        updates.belongsTo = this.newProjectGoal;
        updated = true;
      }

      if (this.newProjectStatus !== this.projectObj.completed) {
        updates.completed = this.newProjectStatus;
        updated = true;
      }

      if (updated) {
        try {
          const successData = await this.$store.dispatch("updateProjectData", { projectID: this.projectID, updates });

          this.messageMode = "success";
          this.updatesMessage = successData.successMessage;
          this.projectObj.name = successData.newName;
          this.projectObj.description = successData.newDescription;
          this.projectObj.belongsTo = successData.newGoal;
          this.newProjectStatus = this.projectObj.completed = successData.newStatus;
          this.newProjectName = "";
          this.newProjectDescription = "";
          this.newProjectGoal = "";
        } catch (error) {
          this.messageMode = "error";
          this.updatesMessage = error.message || "Something went wrong!";
        }

        setTimeout(() => {
          this.messageMode = "";
          this.updatesMessage = "";
        }, 3000);
      }
    },
    viewSupervisor() {
      this.$router.push(`/organization/user/${this.supervisorObj.id}/posts`);
    },
    viewProjectPublicProfile() {
      this.$router.push(`/organization/project-public/${this.projectID}`);
    },
  },
  async created() {
    this.loaded = false;

    if (await this.loadProjectData()) {
      await this.loadProjectMembers();
      await this.getProjectSupervisor();
      this.loaded = true;
    }

    document.body.classList.remove("no-scrolling");
  },
};
</script>

<style scoped>
.my-h2 {
  color: var(--color-primary);
}

.hover--cursor {
  cursor: pointer;
}

.members-list {
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 70%;
  margin-top: 40px;
}

ul {
  list-style-type: none;
}

.create-project-title {
  font-size: 24px;
  padding-top: 50px;
  padding-bottom: 20px;
}

.search-area-demo {
  height: 100px;
  margin-top: 50px;
}

.radio-button--label {
  margin-left: 12px;
  margin-right: 3px;
}

.router-button {
  padding: 0.5rem 1.2rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
  text-decoration: none;
}

.router-button:hover,
.router-button:active {
  background-color: #000875;
  border-color: #000875;
}

.project-name {
  padding-top: 40px;
  font-size: 58px;
  line-height: 1.35;
  margin-top: 40px;
  text-align: center;
  font-size: 64px;
}

.highlight {
  position: relative;
}

.highlight::after {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.7;
  transform: scale(1.07, 1.05) skewX(-15deg);
  background-image: var(--gradient-project);
}

.updates-message {
  margin-top: 10px;
}

.project-page-container {
  display: flex;
  flex-wrap: wrap;
}

.left-col {
  width: 60%;
  padding-left: 40px;
  box-sizing: border-box;
}

.right-col {
  width: 40%;
  padding-left: 40px;

  box-sizing: border-box;
}

.input-title {
  color: var(--color-primary);
  font-size: 14px;
}

.project-information {
  width: 90%;
  padding: 20px;
  /* background: white; */
}

.project-information h2 {
  margin-bottom: 10px;
  font-size: 28px;
  color: var(--color-fourth);
  font-weight: 600;
}

.project-information h3 {
  font-size: 20px;
  color: var(--color-fourth);
  font-weight: 600;
}

.project-information .inputBox {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.supervisor-name--text {
  cursor: pointer;
}

.project-information .inputBox input[type="text"],
.project-information .inputBox textarea {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid var(--color-fourth);
  outline: none;
  resize: none;
}

.project-information .inputBox input[type="submit"] {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

.project-information .inputBox input[type="submit"]:hover {
  background-color: #000875;
  border-color: #000875;
}

@media (max-width: 900px) {
  .left-col {
    width: 100%;
    padding-left: 0;
  }
  .right-col {
    width: 100%;
    padding-left: 0;
  }
}
</style>
