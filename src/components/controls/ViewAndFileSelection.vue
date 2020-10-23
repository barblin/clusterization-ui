<template>
  <span>
    <b-dropdown :text="viewSel" class="m-md-2">
    <b-dropdown-item v-for="view in views" :value="view" :key="view" @click="onViewSel(view)">{{ view }}
    </b-dropdown-item>
    </b-dropdown>
    <b-dropdown :text="fileSel" class="m-md-2">
      <b-dropdown-item v-for="file in files" :key="file" @click="onFileSel(file)">{{ file }}
      </b-dropdown-item>
    </b-dropdown>
  </span>
</template>

<script>
import axios from "axios";

export default {
  name: "ViewAndFileSelection",
  props: ['viewSel', 'fileSel'],
  data() {
    return {
      files: [],
      views: []
    }
  },
  mounted: function () {
    axios
        .get('http://localhost:5000/api/v1/files')
        .then(response => (this.files = response.data))
    axios
        .get('http://localhost:5000/api/v1/views')
        .then(response => (this.views = response.data))
  },
  methods: {
    onFileSel(file) {
      this.$emit('fileSelected', file)
    },
    onViewSel(view) {
      this.$emit('viewSelected', view)
    }
  }
}
</script>

<style scoped>

</style>