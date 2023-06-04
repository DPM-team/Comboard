<template>
  <div class="organization-container" :title="name">
    <router-link @click="setOrganization()" to="organization" class="organization" @contextmenu.prevent="openOptions($event)">
      <img v-if="organizationImage" :src="organizationImage" />
      <img v-else src="../../assets/images/common-images/default-organization-photo.png" />
      <h1 class="organization-name">{{ newTitle }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    organizationFileName: {
      type: String,
      required: false,
      default: "pamak.png",
    },
  },
  data() {
    return {
      organizationImage: "",
    };
  },
  computed: {
    newTitle() {
      if (this.name.length > 14) {
        return this.name.substring(0, 14) + "...";
      } else {
        return this.name;
      }
    },
  },
  methods: {
    async takeOrganizationImage() {
      try {
        const blob = await this.$store.dispatch("takeOrganizationImage", {
          organizationID: this.id,
        });

        if (blob.size !== 0) {
          this.changeBlobToImage(blob);
        }
      } catch (e) {
        console.log(e);
      }
    },
    changeBlobToImage(blob) {
      const fileSend = new File([blob], "");
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.organizationImage = fileReader.result;
      };

      fileReader.readAsDataURL(fileSend);
    },
    setOrganization() {
      this.$store.dispatch("selectOrganization", { organizationID: this.id });
    },
    openOptions(evt) {
      this.$emit("open-options", evt.pageX, evt.pageY, this.id);
    },
  },
  created() {
    this.takeOrganizationImage();
  },
};
</script>

<style scoped>
.organization-container {
  flex: 33.33%;
  text-align: center;
  max-width: 33.33%;
  box-sizing: border-box;
  padding: 15px;
}

.organization {
  background: var(--tab-grey-background);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.445);
  padding: 25px 50px;
  display: inline-block;
  justify-content: center;
  text-align: center;
}

.organization:hover {
  cursor: pointer;
  scale: 1.05;
  transition: 0.2s;
}

.organization img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
  margin: 0 auto;
  /* border: 3px solid var(--color-primary); */
}

.organization-name {
  padding-top: 15px;
  font-size: 20px;
  color: var(--color-primary);
}

a {
  text-decoration: none;
}

@media (max-width: 1150px) {
  .organization-container {
    flex: 50%;
    max-width: 50%;
  }
}
@media (max-width: 800px) {
  .organization {
    padding: 17px 35px;
  }

  .organization img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: 0 auto;
  }

  .organization-name {
    padding-top: 5px;
    font-size: 14px;
  }
}

@media (max-width: 620px) {
  .organization-container {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
