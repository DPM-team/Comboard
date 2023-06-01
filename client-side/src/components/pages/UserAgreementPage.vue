<template>
  <base-dialog title="User Agreement" @close="closeDialog">
    <template #main>
      <div class="pop-up">
        <h2>User Agreement</h2>

        <h4>
          This User Agreement ("Agreement") is a legal agreement between you ("User") and DPM Team, regarding your use of the Comboard web app ("Web App"). By accessing or using the Web App, you
          acknowledge that you have read, understood, and agree to be bound by this Agreement.
        </h4>

        <h3>1. Services Description</h3>

        <h4>The Web App provides the following services:</h4>

        <h4>
          Networking inside each organization Personal Calendar Personal, Project, and Team task manager File storage for personal documents in each organization Viewing of users, teams, projects,
          etc.
        </h4>

        <h3>2. User Responsibilities</h3>

        <h4>User acknowledges that the Web App is a thesis project and may contain errors or safety risks. User agrees to use the Web App at their own risk and take necessary precautions.</h4>

        <h3>3. User Data Collection</h3>

        <h4>
          User data collected during the use of the Web App is stored in a MongoDB database. However, as of June 2023, no user data will be used under any circumstances, as this is a thesis project
          and not a real company application.
        </h4>

        <h3>4. Intellectual Property</h3>

        <h4>
          All intellectual property rights for the content within the Web App and any user-generated content belong to the creators and their academic institution. User agrees not to reproduce or
          distribute any copyrighted materials without prior permission.
        </h4>

        <h3>5. Liability</h3>

        <h4>
          The creators and their academic institution will not be held liable for any issues or damages that may arise from the use of the Web App during the thesis project. User understands and
          accepts this limitation of liability.
        </h4>

        <h3>6. Termination</h3>

        <h4>
          Access to the Web App may be terminated at the conclusion of the thesis project if the creators decide to relaunch the app for commercial use. User acknowledges and agrees to this
          termination provision.
        </h4>

        <h3>7. Governing Law</h3>

        <h4>This Agreement shall be governed by and construed in accordance with the laws of Greece, without regard to its conflict of laws principles.</h4>

        <h3>8. Modifications</h3>

        <h4>This User Agreement may be subject to modifications or updates as necessary during the course of the thesis project. Users will be notified of any significant changes.</h4>

        <h3>9. Contact Information</h3>

        <h5>For any questions or concerns related to the Web App or the thesis project, users can reach out to DPM Team via email at <span class="span-link">dpmcomboard@gmail.com.</span></h5>
      </div>
    </template>
  </base-dialog>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.pop-up {
  height: 70vh;
  overflow-y: auto;
}

h4 {
  color: #808082;
}
</style>
