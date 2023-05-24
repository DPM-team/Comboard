<template>
  <p>{{ userAgreement }}</p>
</template>

<script>
export default {
  data() {
    return {
      userAgreement: `User Agreement

This User Agreement ("Agreement") is a legal agreement between you ("User") and DPM Team, regarding your use of the Comboard web app ("Web App"). By accessing or using the Web App, you acknowledge that you have read, understood, and agree to be bound by this Agreement.

1. Services Description

The Web App provides the following services:

Networking inside each organization
Personal Calendar
Personal, Project, and Team task manager
File storage for personal documents in each organization
Viewing of users, teams, projects, etc.
2. User Responsibilities

User acknowledges that the Web App is a thesis project and may contain errors or safety risks. User agrees to use the Web App at their own risk and take necessary precautions.

3. User Data Collection

User data collected during the use of the Web App is stored in a MongoDB database. However, as of June 2023, no user data will be used under any circumstances, as this is a thesis project and not a real company application.

4. Intellectual Property

All intellectual property rights for the content within the Web App and any user-generated content belong to the creators and their academic institution. User agrees not to reproduce or distribute any copyrighted materials without prior permission.

5. Liability

The creators and their academic institution will not be held liable for any issues or damages that may arise from the use of the Web App during the thesis project. User understands and accepts this limitation of liability.

6. Termination

Access to the Web App may be terminated at the conclusion of the thesis project if the creators decide to relaunch the app for commercial use. User acknowledges and agrees to this termination provision.

7. Governing Law

This Agreement shall be governed by and construed in accordance with the laws of Greece, without regard to its conflict of laws principles.

8. Modifications

This User Agreement may be subject to modifications or updates as necessary during the course of the thesis project. Users will be notified of any significant changes.

9. Contact Information

For any questions or concerns related to the Web App or the thesis project, users can reach out to DPM Team via email at dpmcomboard@gmail.com.`,
    };
  },
};
</script>

<style scoped></style>
