<template>
  <div class="row">
    <div class="sidebar-background col-md-2">
      <div class="row plot-menu">
        <div class="alert alert-info menu-status-indicator full-width"
             v-show="$store.getters.loading">Loading...
        </div>
        <div class="alert alert-danger menu-status-indicator full-width"
             v-show="$store.getters.errored">An error occured
        </div>
        <div class="alert alert-success menu-status-indicator full-width"
             v-show="!$store.getters.loading && !$store.getters.errored">Ready
        </div>
      </div>
      <div class="row plot-menu ">
        <view-file-selection></view-file-selection>
      </div>
      <div v-if="isWasser() || isCluster() || isTree()" class="row plot-menu">
        <clusters></clusters>
      </div>
      <div class="row plot-menu"><span v-if="isWasser() || isCluster()"><sliders></sliders></span></div>
      <div class="row plot-menu">
        <div class="mt-5">
          <button type="button" class="btn btn-primary" :disabled="$store.getters.fileSel == 'Select File'"
                  @click="loadData">Plot
          </button>
        </div>
      </div>
      <br>
      <div v-if="isMultiView() && $store.getters.plotData.clustered_points" class="row plot-menu">
        <div class="badge badge-success">
          Clustered vertices: {{ $store.getters.plotData.clustered_points }}
        </div>
      </div>
      <div v-if="isMultiView() && $store.getters.plotData.clustered_points_match" class="row plot-menu">
        <div class="badge badge-success">
          Matched vetices: {{ $store.getters.plotData.clustered_points_match }}
        </div>
      </div>
      <div v-if="isMultiView() && $store.getters.plotData.clustered_points_match" class="row plot-menu">
        <div class="badge badge-success">
          Match in % : {{
            Math.round($store.getters.clustered_points_match /
                $store.getters.plotData.clustered_points * 100)
          }}
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <tri-plot v-if="isDelaunay()" :plotData="$store.getters.plotData"></tri-plot>
      <simple-plot v-else-if="isScatter()" :plotData="$store.getters.plotData"></simple-plot>
      <min-tree-plot v-else-if="isTree()" :plotData="$store.getters.plotData"></min-tree-plot>
      <multi-view v-else-if="isMultiView()" :plotData="$store.getters.plotData"></multi-view>
      <div id="my_dataviz" class="simple-plot"></div>
    </div>
  </div>
</template>

<script>
import SimplePlot from "@/components/dashboards/plots/SimplePlot";
import TriangulationPlot from "@/components/dashboards/plots/TriangulationPlot";
import MinimumTreePlot from "@/components/dashboards/plots/MinimumTreePlot";
import Multiview from "@/components/dashboards/plots/Multiview";
import Sliders from "@/components/controls/WasserDistSlider";
import Clusters from "@/components/controls/Clusters";
import ViewAndFileSelection from "@/components/controls/ViewAndFileSelection";
import {updatePlot} from "../../services/datasource";

export default {
  name: "expert",
  components: {
    'simple-plot': SimplePlot,
    'tri-plot': TriangulationPlot,
    'min-tree-plot': MinimumTreePlot,
    'sliders': Sliders,
    'clusters': Clusters,
    'view-file-selection': ViewAndFileSelection,
    'multi-view': Multiview
  },
  methods: {
    isTree() {
      return this.$store.getters.isMinTree || this.$store.getters.isMinTreeWasser
    },
    isWasser() {
      return this.$store.getters.isClusterWasser || this.$store.getters.isMinTreeWasser
    },
    isScatter() {
      return this.$store.getters.isSimple || this.$store.getters.isClusterWasser
    },
    isDelaunay() {
      return this.$store.getters.isDelaunay
    },
    isCluster() {
      return this.$store.getters.isClusterWasser || this.$store.getters.isMulti
    },
    isMultiView() {
      return this.$store.getters.isMulti
    },
    loadData() {
      updatePlot()
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
