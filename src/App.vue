<template>
  <div id="app">
    <div class="plot-menu">
      <b-dropdown :text="viewSelection" class="m-md-2">
        <b-dropdown-item v-for="view in views" :value="view"
                         @click="viewSelection = view; fileSelection = 'Select File'"
                         :key="view">{{view}}</b-dropdown-item>
      </b-dropdown>
      <b-dropdown :text="fileSelection" class="m-md-2">
        <b-dropdown-item v-for="file in files" :key="file"
                         @click="fileSelection = file">{{file}}</b-dropdown-item>
      </b-dropdown>
    </div>
    <!--<stop-watch></stop-watch>-->
    <simple-plot v-if="viewSelection == 'simple-plots' || viewSelection == 'clusters'" :fileSelection="fileSelection"
                 :viewSelection="viewSelection"></simple-plot>
    <triangle-plot v-else-if="viewSelection == 'delaunay-triangulation'" :fileSelection="fileSelection"
                   :viewSelection="viewSelection"></triangle-plot>
    <minimum-tree-plot v-else-if="viewSelection == 'minimum-spanning-tree'" :fileSelection="fileSelection"
                   :viewSelection="viewSelection"></minimum-tree-plot>
  </div>
</template>

<script>
import axios from 'axios'
//import StopWatch from "@/components/StopWatch";
import SimplePlot from "@/components/SimplePlot";
import TriangulationPlot from "@/components/TriangulationPlot";
import MinimumTreePlot from "@/components/MinimumTreePlot";


export default {
  name: "app",
  components: {
    'simple-plot': SimplePlot,
    'triangle-plot': TriangulationPlot,
    'minimum-tree-plot': MinimumTreePlot
  },
  data() {
    return {
      repository: "",
      fileSelection: "Select File",
      viewSelection: "simple-plots",
      files: [],
      views: []
    };
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
    getIssues(file){
      this.$refs.simplePlot.getIssues(file)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.plot-menu {
  margin-top: -3rem;
}
</style>
