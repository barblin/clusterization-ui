<template>
  <div id="app">
    <div class="plot-menu row">
      <div class="col-sm-1"></div>
      <div class="col-lg-10">
        <view-file-selection :fileSel="fileSel" :viewSel="viewSel"
                             @fileSelected="fileSelected" @viewSelected="viewSelected">
        </view-file-selection>
        <span v-if="isWasser() || isCluster()">
        <clusters :numClusters="numClusters" @clusSelected="clusSelected"></clusters>
          <sliders :wasserDist="wasserDist"
                   :checked="checked"
                   :stdvMultiplier="stdvMultiplier"
                   @wasserErrSelected="wasserErrSelected"
                   @stdvMultiplierSelected="stdvMultiplierSelected"
                   @checkedSelected="checkedSelected">
          </sliders>
      </span>
        <button type="button" class="btn btn-primary" @click="loadData">Plot</button>
      </div>
      <div class="col-sm">
        <span class="alert alert-info menu-status-indicator" v-show="loading">Loading...</span>
        <span class="alert alert-danger menu-status-indicator" v-show="errored">An error occured</span>
        <span class="alert alert-success menu-status-indicator" v-show="!loading && !errored">Ready</span>
      </div>
    </div>

    <!--<stop-watch></stop-watch>-->
    <tri-plot v-if="isDelaunay()" :plotData="plotData"></tri-plot>
    <simple-plot v-else-if="isScatter()" :plotData="plotData"></simple-plot>
    <min-tree-plot v-else-if="isTree()" :plotData="plotData"></min-tree-plot>
    <div id="my_dataviz" class="simple-plot"></div>
  </div>
</template>

<script>
//import StopWatch from "@/components/StopWatch";
import SimplePlot from "@/components/plots/SimplePlot";
import TriangulationPlot from "@/components/plots/TriangulationPlot";
import MinimumTreePlot from "@/components/plots/MinimumTreePlot";
import Sliders from "@/components/controls/Sliders";
import Clusters from "@/components/controls/Clusters";
import ViewAndFileSelection from "@/components/controls/ViewAndFileSelection";
import * as d3 from "d3";

const axios = require('axios');

export default {
  name: "app",
  components: {
    'simple-plot': SimplePlot,
    'tri-plot': TriangulationPlot,
    'min-tree-plot': MinimumTreePlot,
    'sliders': Sliders,
    'clusters': Clusters,
    'view-file-selection': ViewAndFileSelection
  },
  data() {
    return {
      plotData: "",
      fileSel: "Select File",
      viewSel: "simple-plots",
      numClusters: 6,
      wasserDist: 0.1,
      stdvMultiplier: 2,
      checked: false,
      loading: false,
      errored: false
    }
  },
  methods: {
    isTree() {
      return this.viewSel == 'minimum-spanning-tree' || this.viewSel == 'minimum-spanning-tree-wasser'
    },
    isWasser() {
      return this.viewSel == 'clusters-min-tree-wasser' || this.viewSel == 'minimum-spanning-tree-wasser'
    },
    isScatter() {
      return this.viewSel == 'simple-plots' || this.viewSel == 'clusters'
          || this.viewSel == 'clusters-min-tree-wasser'
    },
    isDelaunay() {
      return this.viewSel == 'delaunay-triangulation'
    },
    isCluster() {
      return this.viewSel == 'clusters-min-tree-wasser'
    },
    fileSelected(file) {
      this.fileSel = file
    },
    viewSelected(view) {
      this.viewSel = view
    },
    clusSelected(comp) {
      this.numClusters = comp
    },
    wasserErrSelected(wasser) {
      this.wasserDist = wasser
    },
    checkedSelected(checked) {
      this.checked = checked
    },
    stdvMultiplierSelected(stdvMultiplier){
      this.stdvMultiplier = stdvMultiplier
    },
    setLoad(loading) {
      this.loading = loading
    },
    setError(errored) {
      this.errored = errored
    },
    loadData() {
      this.loading = true
      this.errored = false

      axios.get("http://localhost:5000/api/v1/views/" + this.viewSel + "/files/" + this.fileSel
          + "?numClusters=" + this.numClusters + "&wasserError=" + this.wasserDist/100
          + "&remOutliers=" + this.checked + "&stdvMultiplier=" + this.stdvMultiplier)
          .then(resp => {
                d3.select("#my_dataviz").selectAll("svg").remove()
                this.plotData = resp.data
              }
          )
          .catch(error => {
            this.errored = true
            console.error(error);
          })
          .finally(() => (
              this.loading = false
          ));
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
}

.plot-menu {
  margin-top: 1rem;

}

.menu-status-indicator {
  display: inline-block;
  position: absolute;
  margin-right: 1rem;
}

.simple-plot {
  margin-top: 1rem;
}
</style>
