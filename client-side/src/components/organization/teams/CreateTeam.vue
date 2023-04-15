<template>
  <base-dialog title="Create Team" @close="closeDialog">
    <template #main>
      <form id="create-team--form" @submit.prevent="submitFormToCreate">
        <auth-form-input @data="getTeamName" id="team-name" class="create-team--input" type="text" name="team-name" placeholder="Team's name" required></auth-form-input>
        <div class="textarea-control">
          <label for="team-description">Team's description</label>
          <textarea v-model="teamDescription" rows="5" id="team-description"></textarea>
        </div>
        <div class="members">
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
import AuthFormInput from "../../auth/AuthFormInput.vue";
import MemberItem from "./MemberItem.vue";
import { VueDraggableNext } from "vue-draggable-next";

export default {
  components: { AuthFormInput, draggable: VueDraggableNext, MemberItem },
  data() {
    return {
      teamName: "",
      teamDescription: "",
      orgMembers: [],
      teamMembers: [],
    };
  },
  methods: {
    async loadOrganizationMembers() {
      try {
        const members = await this.$store.dispatch("getOrganizationUsers", { organizationID: this.$store.getters.selectedOrganizationID });

        this.orgMembers = members;
      } catch (error) {
        console.log(error.message || "Something went wrong!");
      }
    },
    submitFormToCreate() {},
    closeDialog() {
      this.$router.back();
    },
    getTeamName(inputValue) {
      this.teamName = inputValue;
    },
  },
  created() {
    this.loadOrganizationMembers();
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
