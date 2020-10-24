<template>
  <div id="app">
    <div class="plot-menu">
      <view-file-selection :fileSel="fileSel" :viewSel="viewSel"
                           @fileSelected="fileSelected" @viewSelected="viewSelected">
      </view-file-selection>
      <span v-if="isWasser() || isCluster()">
        <clusters :numClusters="numClusters" @clusSelected="clusSelected"></clusters>
          <sliders :wasserDist="wasserDist" :checked="checked" @wasserErrSelected="wasserErrSelected"
                   @checkedSelected="checkedSelected"></sliders>
      </span>
      <button type="button" class="btn btn-primary" @click="plot">Plot</button>
    </div>

    <div class="alert alert-info" v-show="loading">Loading...</div>
    <div class="alert alert-danger" v-show="errored">An error occured</div>

    <!--<stop-watch></stop-watch>-->
    <simple-plot :fileSel="fileSel"
                 :viewSel="viewSel"
                 :numClusters="numClusters"
                 :wasserError="wasserDist"
                 :checked="checked" @loading="setLoad" @errored="setError" ref="scatter">
    </simple-plot>
    <tri-plot :fileSel="fileSel" :viewSel="viewSel" @loading="setLoad" @errored="setError" ref="tri"></tri-plot>
    <min-tree-plot :fileSel="fileSel"
                   :viewSel="viewSel"
                   :numClusters="numClusters"
                   :wasserError="wasserDist"
                   :checked="checked" @loading="setLoad" @errored="setError" ref="tree">
    </min-tree-plot>
  </div>
</template>

<script>
//import StopWatch from "@/components/StopWatch";
import SimplePlot from "@/components/SimplePlot";
import TriangulationPlot from "@/components/TriangulationPlot";
import MinimumTreePlot from "@/components/MinimumTreePlot";
import Sliders from "@/components/controls/Sliders";
import Clusters from "@/components/controls/Clusters";
import ViewAndFileSelection from "@/components/controls/ViewAndFileSelection";

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
      repository: "",
      fileSel: "Select File",
      viewSel: "simple-plots",
      numClusters: 6,
      wasserDist: 0.1,
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
    clusSelected(comp){
      this.numClusters = comp
    },
    wasserErrSelected(wasser){
      this.wasserDist = wasser
    },
    checkedSelected(checked){
      this.checked = checked
    },
    setLoad(loading){
      this.loading = loading
    },
    setError(errored){
      this.errored = errored
    },
    plot() {
      if(this.isScatter()) {
        this.$refs.scatter.getIssues()
      } else if(this.isDelaunay()){
        this.$refs.tri.getIssues()
      } else if (this.isTree()){
        this.$refs.tree.getIssues()
      }
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
</style>
