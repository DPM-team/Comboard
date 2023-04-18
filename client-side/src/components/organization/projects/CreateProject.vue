<template>
  <base-dialog title="Create Project" @close="closeDialog">
    <template #main>
      <base-message v-if="submitMessage" :message="submitMessage" :mode="messageType"></base-message>
      <form id="create-project--form" @submit.prevent="submitFormToCreate">
        <auth-form-input @data="getProjectName" id="project-name" class="create-project--input" type="text" name="project-name" placeholder="Project's name" required></auth-form-input>
        <auth-form-input @data="getIntention" id="intention" class="create-project--input" type="text" name="intention" placeholder="Intended for..." required></auth-form-input>
        <div class="textarea-control">
          <label for="project-description">Project's description</label>
          <textarea v-model="projectDescription" rows="5" id="project-description" required></textarea>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <div class="members" v-else>
          <div class="col-50">
            <h3>Team's Members</h3>
            <draggable class="list-group" :list="teamMembers" group="members" itemKey="id">
              <member-item v-for="item in teamMembers" :key="item.id" :fullname="item.fullname" :speciality="item.speciality"></member-item>
            </draggable>
          </div>
          <div class="col-50">
            <h3>Project's Members</h3>
            <draggable class="list-group" :list="projectMembers" group="members" itemKey="id">
              <member-item v-for="item in projectMembers" :key="item.id" :fullname="item.fullname" :speciality="item.speciality"></member-item>
            </draggable>
          </div>
        </div>
        <base-button>Create Project</base-button>
      </form>
    </template>
  </base-dialog>
</template>

<script>
import AuthFormInput from "../../auth/AuthFormInput.vue";
import MemberItem from "../teams/MemberItem.vue";
import BaseSpinner from "../../basic-components/BaseSpinner.vue";
import BaseMessage from "../../basic-components/BaseMessage.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: { AuthFormInput, BaseMessage, MemberItem, BaseSpinner, draggable: VueDraggableNext },
  data() {
    return {
      projectName: "",
      intention: "",
      projectDescription: "",
      teamMembers: [],
      isLoading: false,
      projectMembers: [],
      submitMessage: "",
      messageType: "",
      teamID: "643f1bf0b30121b048fa5f09",
    };
  },
  methods: {
    async loadTeamMembers() {
      try {
        this.isLoading = true;

        const members = await this.$store.dispatch("getTeamMembers", { teamID: this.teamID });

        this.isLoading = false;

        // We use filter, because the logged user will be the supervisor by default, and we don't want to can move himself from the on list to the other
        this.teamMembers = members.filter((memberObj) => memberObj.id !== this.$store.getters.loggedUserID);
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async submitFormToCreate() {
      try {
        const projectObj = {
          name: this.projectName,
          belongsTo: this.intention,
          description: this.projectDescription,
          supervisor: this.$store.getters.loggedUserID,
          // We store to the project only the id of the members, so we should use map to fill the array only with the id
          members: this.projectMembers.map((memberObj) => memberObj.id),
        };

        const successData = await this.$store.dispatch("createProject", { projectObj, teamID: this.teamID });

        this.submitMessage = successData.successMessage;
        this.messageType = "success";
      } catch (error) {
        this.submitMessage = error.message || "Something went wrong!";
        this.messageType = "error";
      }
    },
    closeDialog() {
      this.$router.back();
    },
    getProjectName(inputValue) {
      this.projectName = inputValue;
    },
    getIntention(inputValue) {
      this.intention = inputValue;
    },
  },
  created() {
    this.loadTeamMembers();
  },
};
</script>

<style scoped>
.textarea-control {
  margin: 0.5rem 0;
}

label {
  margin-bottom: 10px;
  display: block;
}

textarea {
  display: block;
  width: 75%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

textarea:focus {
  border-color: #000dc5;
  background-color: #faf6ff;
  outline: none;
}

.members {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-group {
  overflow-y: auto;
  height: 250px;
}

.col-50 {
  width: 50%;
}
</style>
