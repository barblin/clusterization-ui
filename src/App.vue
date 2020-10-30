<template>
  <div id="app">
    <div class="row">
      <div class="sidebar-background col-md-2">
        <div class="row plot-menu">
            <div class="alert alert-info menu-status-indicator full-width" v-show="loading">Loading...</div>
            <div class="alert alert-danger menu-status-indicator full-width" v-show="errored">An error occured</div>
            <div class="alert alert-success menu-status-indicator full-width" v-show="!loading && !errored">Ready</div>
        </div>
        <div class="row plot-menu ">
          <view-file-selection :fileSel="fileSel" :viewSel="viewSel"
                             @fileSelected="fileSelected" @viewSelected="viewSelected">
          </view-file-selection>
        </div>
        <div v-if="isWasser() || isCluster() || isTree()" class="row plot-menu">
          <clusters :numClusters="numClusters" @clusSelected="clusSelected"></clusters>
        </div>
        <div class="row plot-menu">
          <span v-if="isWasser() || isCluster()">
            <sliders :wasserDist="wasserDist"
                     :checked="checked"
                     :stdvMultiplier="stdvMultiplier"
                     @wasserErrSelected="wasserErrSelected"
                     @stdvMultiplierSelected="stdvMultiplierSelected"
                     @checkedSelected="checkedSelected">
            </sliders>
          </span>
        </div>
        <div class="row plot-menu">
          <div class="mt-5">
            <button type="button" class="btn btn-primary" :disabled="fileSel == 'Select File'"
                    @click="loadData">Plot</button>
          </div>
        </div>
        <br>
        <div v-if="isMultiView() && plotData.clustered_points" class="row plot-menu">
          <div class="badge badge-success">
            Clustered vertices: {{plotData.clustered_points}}
          </div>
        </div>
        <div v-if="isMultiView() && plotData.clustered_points_match" class="row plot-menu">
          <div class="badge badge-success">
            Matched vetices: {{plotData.clustered_points_match}}
          </div>
        </div>
        <div v-if="isMultiView() && plotData.clustered_points_match" class="row plot-menu">
          <div class="badge badge-success">
            Match in % : {{ Math.round(plotData.clustered_points_match / plotData.clustered_points * 100) }}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <tri-plot v-if="isDelaunay()" :plotData="plotData"></tri-plot>
        <simple-plot v-else-if="isScatter()" :plotData="plotData"></simple-plot>
        <min-tree-plot v-else-if="isTree()" :plotData="plotData"></min-tree-plot>
        <multi-view v-else-if="isMultiView()" :plotData="plotData"></multi-view>
        <div id="my_dataviz" class="simple-plot"></div>
      </div>
    </div>

    <!--<stop-watch></stop-watch>-->

  </div>
</template>

<script>
//import StopWatch from "@/components/StopWatch";
import SimplePlot from "@/components/plots/SimplePlot";
import TriangulationPlot from "@/components/plots/TriangulationPlot";
import MinimumTreePlot from "@/components/plots/MinimumTreePlot";
import Multiview from "@/components/plots/Multiview";
import Sliders from "@/components/controls/WasserDistSlider";
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
    'view-file-selection': ViewAndFileSelection,
    'multi-view': Multiview
  },
  data() {
    return {
      plotData: {},
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
      return this.viewSel == 'clusters-min-tree-wasser' || this.viewSel == 'multi-plots'
    },
    isMultiView() {
      return this.viewSel == 'multi-plots'
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
    stdvMultiplierSelected(stdvMultiplier) {
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
          + "?numClusters=" + this.numClusters + "&wasserError=" + this.wasserDist / 100
          + "&remOutliers=" + this.checked + "&stdvMultiplier=" + this.stdvMultiplier)
          .then(resp => {
                d3.select("#my_dataviz").selectAll("svg").remove()
                d3.select("#scatter").selectAll("svg").remove()
                d3.select("#min_wasser_cluster").selectAll("svg").remove()
                d3.select("#overlap").selectAll("svg").remove()
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
  text-align: left;
  color: #2c3e50;
}

.plot-menu {
  margin-top: 1rem;
  padding-left: 2rem;

}

.simple-plot {
  margin-top: 1rem;
}

.full-width {
  width: 100%;
  margin-right: 4rem;
  text-align: center;
}

.sidebar-background {
  height: 100%;
}
</style>
