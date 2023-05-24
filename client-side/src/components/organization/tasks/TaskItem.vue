<template>
  <div>
    <base-dialog v-if="dialogIsOpen" :title="title" @close="closeDialog">
      <template #main>
        <base-message v-if="updateTaskMessage" :message="updateTaskMessage" :mode="messageType"></base-message>
        <form @submit.prevent="updateTask()">
          <div class="input-control">
            <label for="task-name" class="pop-up-text">Edit task's name</label>
            <input type="text" v-model="mutableTitle" name="task-name" required />
          </div>
          <div class="input-control">
            <label for="task-description" class="pop-up-text">Task's description</label>
            <textarea v-model="mutableDescription" rows="5" id="task-description"></textarea>
          </div>
          <div class="dates-control">
            <div>
              <label for="start" class="pop-up-text-2">Start date:</label>
              <input type="date" id="start" name="task-start" v-model="mutableDateStarts" />
            </div>
            <div>
              <label for="end" class="pop-up-text-2">End date:</label>
              <input type="date" id="end" name="task-end" v-model="mutableDateExpires" :min="mutableDateStarts" />
            </div>
          </div>
          <div class="actions">
            <div>
              <input type="submit" value="Submit changes" />
            </div>
            <base-button :mode="'close-btn'" @click.prevent="cancelChanges()" :isDisabled="updatesSubmitted">Cancel</base-button>
            <font-awesome-icon class="delete-task--icon" icon="fa-solid fa-trash-can" size="xl" style="color: #c70000" @click="deleteTask()" />
          </div>
        </form>
      </template>
    </base-dialog>
    <div class="list-item" @click="openDialog()">
      <p>{{ mutableTitle || title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    taskListID: {
      type: String,
      required: true,
    },
    taskID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    dateStarts: {
      // yyyy-mm-dd
      type: String,
      required: false,
      default: "",
    },
    dateExpires: {
      // yyyy-mm-dd
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      dialogIsOpen: false,
      mutableTitle: this.title,
      mutableDescription: this.description,
      mutableDateStarts: this.dateStarts,
      mutableDateExpires: this.dateExpires,
      updateTaskMessage: "",
      messageType: "",
      updatesSubmitted: false,
    };
  },
  methods: {
    async updateTask() {
      if (this.changesHappened()) {
        try {
          const successData = await this.$store.dispatch("updateTask", {
            taskListID: this.taskListID,
            taskBoardID: this.$store.getters.getSelectedBoardID,
            updatedTaskObj: {
              _id: this.taskID,
              title: this.mutableTitle,
              description: this.mutableDescription,
              fromDate: this.mutableDateStarts,
              toDate: this.mutableDateExpires,
            },
          });

          this.updateTaskMessage = successData?.successMessage;
          this.messageType = "success";
          this.updatesSubmitted = true;
        } catch (error) {
          this.updateTaskMessage = error?.message || "Can't update task!";
          this.messageType = "error";
        }
      }
    },
    deleteTask() {
      console.log("Delete task");
    },
    cancelChanges() {
      this.mutableTitle = this.title;
      this.mutableDescription = this.description;
      this.mutableDateStarts = this.dateStarts;
      this.mutableDateExpires = this.dateExpires;
      this.closeDialog();
    },
    closeDialog() {
      this.dialogIsOpen = false;
      this.updateTaskMessage = "";
      this.updatesSubmitted = false;
    },
    openDialog() {
      this.dialogIsOpen = true;
    },
    changesHappened() {
      return this.title !== this.mutableTitle || this.description !== this.mutableDescription || this.dateStarts !== this.mutableDateStarts || this.dateExpires !== this.mutableDateExpires;
    },
  },
};
</script>

<style scoped>
input[type="submit"] {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: white;
  cursor: pointer;
}

input[type="submit"]:hover,
input[type="submit"]:active {
  background-color: #000875;
  border-color: #000875;
}

.pop-up-text {
  font-size: 17px;
  font-weight: 600;
}

.pop-up-text-2 {
  font-size: 15px;
  font-weight: 600;
}

.list-item {
  background: white;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 2px;
  color: blue;
  cursor: pointer;
}

.list-item p {
  color: black;
  font-size: 12px;
  margin-left: 5px;
}

.input-control {
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

.dates-control {
  margin-top: 20px;
  display: flex;
  column-gap: 20px;
}

.actions {
  margin-top: 10px;
  display: flex;
  column-gap: 20px;
  flex-direction: row-reverse;
}

.delete-task--icon {
  cursor: pointer;
  margin-top: 8px;
}
</style>