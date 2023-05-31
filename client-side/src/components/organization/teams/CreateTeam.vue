<template>
  <base-dialog title="Create Team" @close="closeDialog">
    <template #main>
      <base-message v-if="submitMessage" :message="submitMessage" :mode="messageType"></base-message>
      <form id="create-team--form" @submit.prevent="submitFormToCreate()">
        <input v-model="teamName" id="team-name" class="create-team--input" type="text" name="team-name" placeholder="Team's name" required />
        <div class="textarea-control">
          <label for="team-description">Team's description</label>
          <textarea v-model="teamDescription" rows="5" id="team-description" required></textarea>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <div class="members" v-else>
          <div class="col-50">
            <h3>Organization's Members</h3>
            <draggable class="list-group" :list="orgMembers" group="members" itemKey="id">
              <member-item v-for="item in orgMembers" :key="item.id" :fullname="item.fullname" :speciality="item.speciality"></member-item>
            </draggable>
          </div>
          <div class="col-50">
            <h3>Team's Members</h3>
            <draggable class="list-group" :list="teamMembers" group="members" itemKey="id">
              <member-item v-for="item in teamMembers" :key="item.id" :fullname="item.fullname" :speciality="item.speciality"></member-item>
            </draggable>
          </div>
        </div>
        <base-button>Create Team</base-button>
      </form>
    </template>
  </base-dialog>
</template>

<script>
import MemberItem from "./MemberItem.vue";
import BaseSpinner from "../../basic-components/BaseSpinner.vue";
import BaseMessage from "../../basic-components/BaseMessage.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: { BaseMessage, MemberItem, BaseSpinner, draggable: VueDraggableNext },
  data() {
    return {
      teamName: "",
      teamDescription: "",
      orgMembers: [],
      isLoading: false,
      teamMembers: [],
      submitMessage: "",
      messageType: "",
    };
  },
  methods: {
    async loadOrganizationMembers() {
      try {
        this.isLoading = true;

        const members = await this.$store.dispatch("getOrganizationUsers", { organizationID: this.$store.getters.selectedOrganizationID });

        this.isLoading = false;

        // We use filter, because the logged user will be the supervisor by default, and we don't want to can move himself from the on list to the other
        this.orgMembers = members.filter((memberObj) => memberObj.id !== this.$store.getters.loggedUserID);
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    async submitFormToCreate() {
      try {
        const teamObj = {
          name: this.teamName,
          description: this.teamDescription,
          supervisor: this.$store.getters.loggedUserID,
          // We store to the team only the id of the members, so we should use map to fill the array only with the id
          members: this.teamMembers.map((memberObj) => memberObj.id),
        };

        const successData = await this.$store.dispatch("createTeam", { teamObj });

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
  },
  created() {
    this.loadOrganizationMembers();
  },
};
</script>

<style scoped>
.create-team--input {
  display: block;
  width: 75%;
  padding: 0.75rem;
  border: 1.5px solid #ccc;
  border-color: #1e306084;
  /* border-radius: 0.25rem; */
  background: no-repeat left;
  padding-left: 15px;
  /* margin: 1rem auto; */
}
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
