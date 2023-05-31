<template>
  <base-dialog title="Privacy Policy" @close="closeDialog">
    <template #main>
      <div class="pop-up">
        <h2>Privacy Policy</h2>

        <h4>
          This Privacy Policy ("Policy") explains how DPM Team ("we," "us," or "our") collects, uses, and protects the personal information of users ("User" or "you") when you access and use the
          Comboard web app ("Web App"). We are committed to safeguarding your privacy and ensuring the confidentiality of any personal information you provide.
        </h4>

        <h3>1. Information Collection and Use</h3>

        <h4>
          As of June 2023, the Web App does not collect any personal information from users. However, please note that during the testing phase of the thesis project, user data may be temporarily
          stored in a MongoDB database. This data is used solely for academic purposes and will not be shared with any third parties.
        </h4>

        <h3>2. Data Security</h3>

        <h4>
          We take reasonable measures to protect the confidentiality and integrity of any user data collected during the testing phase. However, as the Web App is a thesis project, we cannot guarantee
          the absolute security of data transmission over the internet or its storage in the database.
        </h4>

        <h3>3. Cookies</h3>

        <h4>The Web App does not use cookies or any similar technologies for tracking or collecting user information.</h4>

        <h3>4. Third-Party Links</h3>

        <h4>
          The Web App may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the privacy practices or content of these third-party
          sites. We encourage you to review the privacy policies of those websites before providing any personal information.
        </h4>

        <h3>Children's Privacy</h3>

        <h4>
          The Web App is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that personal information of a
          child has been inadvertently collected, we will take immediate steps to delete it from our records.
        </h4>

        <h3>6. Changes to the Privacy Policy</h3>

        <h4>
          We may update this Privacy Policy from time to time. Any changes will be effective upon posting the revised Policy on the Web App. It is your responsibility to review the Policy periodically
          for any updates.
        </h4>

        <h3>7. Contact Us</h3>

        <h5>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <span class="span-link">dpmcomboard@gmail.com.</span></h5>
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
