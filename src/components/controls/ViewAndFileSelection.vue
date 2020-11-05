<template>
  <div>
      <b-dropdown :text="$store.getters.viewSel" class="mt-1">
        <b-dropdown-item v-for="view in views" :value="view" :key="view" @click="onViewSel(view)">{{ view }}
        </b-dropdown-item>
      </b-dropdown><br>
      <b-dropdown :text="$store.getters.fileSel" class="mt-1">
        <b-dropdown-item v-for="file in files" :key="file" @click="onFileSel(file)">{{ file }}
        </b-dropdown-item>
      </b-dropdown>
  </div>
</template>

<script>
import axios from "axios";
import {host} from "../../services/datasource";

export default {
  name: "ViewAndFileSelection",
  data() {
    return {
      files: [],
      views: []
    }
  },
  mounted: function () {
    axios
        .get(host + '/files')
        .then(response => (this.files = response.data))
    axios
        .get(host + '/views')
        .then(response => (this.views = response.data))
  },
  methods: {
    onFileSel(file) {
      this.$store.commit('updateFileSel', file)
    },
    onViewSel(view) {
      this.$store.commit('updateViewSel', view)
    }
  }
}
</script>

<style scoped>
</style>