<template>
  <li class="file-item" @dblclick="openFile()" @contextmenu.prevent="openOptions($event)">
    <base-spinner v-if="fileLoading" class="base-spinner"></base-spinner>
    <div class="file-item-content-iframe" :class="{ visibility: fileLoading }">
      <iframe v-if="allowPreview()" class="frame" :src="`/api/storage/file/${this.id}?preview=true`" @load="onFileLoaded()" ref="frame"> </iframe>
      <div :class="{ 'content-name': allowPreview() }">
        <span style="padding-left: 5px"></span><font-awesome-icon :icon="getIcon()" :class="{ icon: !allowPreview() }" />
        <p :title="name">{{ fileName }}</p>
      </div>
    </div>
  </li>
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
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fileName: this.name?.length > 30 ? this.name.slice(0, 27) + "..." : this.name,
      fileLoading: true,
      iconMap: {
        doc: "fa-regular fa-file-word",
        docx: "fa-regular fa-file-word",
        xls: "fa-regular fa-file-excel",
        xlsx: "fa-regular fa-file-excel",
        ppt: "fa-regular fa-file-powerpoint",
        pptx: "fa-regular fa-file-powerpoint",
        pdf: "fa-regular fa-file-pdf",
        txt: "fa-regular fa-file-lines",
        csv: "fa-regular fa-file-lines",
        rtf: "fa-regular fa-file-lines",
        html: "fa-regular fa-file-code",
        htm: "fa-regular fa-file-code",
        xml: "fa-regular fa-file-code",
        json: "fa-regular fa-file-code",
        js: "fa-regular fa-file-code",
        css: "fa-regular fa-file-code",
        java: "fa-regular fa-file-code",
        py: "fa-regular fa-file-code",
        vue: "fa-regular fa-file-code",
        c: "fa-regular fa-file-code",
        zip: "fa-regular fa-file-zipper",
        rar: "fa-regular fa-file-zipper",
        "7z": "fa-regular fa-file-zipper",
        tar: "fa-regular fa-file-zipper",
        gz: "fa-regular fa-file-zipper",
        gzip: "fa-regular fa-file-zipper",
        bmp: "fa-regular fa-file-image",
        jpg: "fa-regular fa-file-image",
        jpeg: "fa-regular fa-file-image",
        png: "fa-regular fa-file-image",
        gif: "fa-regular fa-file-image",
        tiff: "fa-regular fa-file-image",
        tif: "fa-regular fa-file-image",
        mp3: "fa-regular fa-file-audio",
        mp4: "fa-regular fa-file-video",
        svg: "fa-regular fa-file-video",
        wav: "fa-regular fa-file-video",
        aac: "fa-regular fa-file-video",
        ogg: "fa-regular fa-file-video",
        mov: "fa-regular fa-file-video",
        avi: "fa-regular fa-file-video",
        wmv: "fa-regular fa-file-video",
        flv: "fa-regular fa-file-video",
      },
    };
  },
  methods: {
    getIcon() {
      const extension = this.name.split(".").pop().toLowerCase();
      return this.iconMap[extension] || "fa-regular fa-file";
    },
    allowPreview() {
      if (this.name.match(".pdf") || this.name.match(".png") || this.name.match(".jpg") || this.name.match(".jpeg")) {
        return true;
      } else {
        this.fileLoading = false;
        return false;
      }
    },
    onFileLoaded() {
      this.fileLoading = false;
    },
    openFile() {
      window.open(`/api/storage/file/${this.id}`, "_blank");
    },
    openOptions(evt) {
      const leftNavBarWidth = document.querySelector("#organization-left-navbar").getBoundingClientRect()?.width || 150;
      this.$emit("open-options", evt.pageX - leftNavBarWidth, evt.pageY - 60, this.id);
    },
  },
};
</script>

<style scoped>
.file-item {
  text-align: center;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  width: 20%;
  border-radius: 4px;
  margin: 30px;
  margin-bottom: 60px;
  background: white;
  cursor: pointer;
}

.visibility {
  display: none;
}

.spinner {
  background-color: gray;
}

.file-item-content-icon {
  padding: 30px 20px 30px 20px;
  width: 100%;
}
.file-item-content-iframe {
  padding: 7px 3px 7px 3px;
  width: 100%;
}

.base-spinner {
  padding: 70px;
}

.frame {
  width: 100%;
  pointer-events: none;
  /* Make the iframe content can't be selected */
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

.icon {
  justify-content: center;
  display: block;
  margin-left: auto;
  margin-bottom: 1rem;
  margin-right: auto;
  width: 115px;
  font-size: 45px;
}

.content-name {
  display: flex;
}

.content-name p {
  margin-left: 7px;
}

.file-item-content p {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

@media screen and (max-width: 1400px) {
  .file-item {
    width: 25%;
  }
}

@media screen and (max-width: 1200px) {
  .file-item {
    width: 35%;
  }
}

@media screen and (max-width: 900px) {
  .file-item {
    width: 40%;
  }
}

@media screen and (max-width: 750px) {
  .file-item {
    width: 35%;
  }
}

@media screen and (max-width: 700px) {
  .file-item {
    width: 60%;
  }
}

@media screen and (max-width: 600px) {
  .file-item {
    width: 65%;
  }
}

@media screen and (max-width: 400px) {
  .file-item {
    width: 90%;
  }
}
</style>
