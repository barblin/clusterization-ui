<template>
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
    <div class="row plot-menu"><span v-if="plotState.isWasserCluster()"><wasser-sliders></wasser-sliders></span></div>
    <div class="row plot-menu"><span v-if="plotState.isOutlierSlider()"><outlier-sliders></outlier-sliders></span></div>
    <div class="row plot-menu" v-if="$store.getters.isVars">
      <vars-sliders></vars-sliders>
    </div>
    <div class="row plot-menu">
      <div class="mt-4">
        <button type="button" class="btn btn-primary slider"
                :disabled="$store.getters.fileSel == 'Select File' || $store.getters.loading"
                @click="loadData">Plot
        </button>
      </div>
    </div>
    <br>
    <div v-if="$store.getters.isMulti && $store.getters.plotData.clustered_points" class="row plot-menu">
      <div class="badge badge-success">
        Clustered vertices: {{ $store.getters.plotData.clustered_points }}
      </div>
    </div>
    <div v-if="$store.getters.isMulti && $store.getters.plotData.clustered_points_match" class="row plot-menu">
      <div class="badge badge-success">
        Matched vetices: {{ $store.getters.plotData.clustered_points_match }}
      </div>
    </div>
    <div v-if="$store.getters.isMulti && $store.getters.plotData.clustered_points_match" class="row plot-menu">
      <div class="badge badge-success">
        Match in % : {{
          Math.round($store.getters.plotData.clustered_points_match /
              $store.getters.plotData.clustered_points * 100)
        }}
      </div>
    </div>
    <div v-if="$store.getters.isClusterWasser" class="row plot-menu">
      <div class="badge badge-success">
        <span class="badge badge-success">Total {{$store.getters.overallTime}} sec.</span>
      </div>
    </div>
  </div>

</template>

<script>
import {updatePlot} from "../../services/datasource";
import OutlierSlider from "@/components/controls/OutlierSlider";
import WasserSlider from "@/components/controls/WasserSlider";
import VarsSliders from "@/components/controls/VarsSlider";
import ViewAndFileSelection from "@/components/controls/Selectors";
import {PlotState} from "../../services/plot-state";

export default {
  name: "ControlPanel",
  components: {
    'outlier-sliders': OutlierSlider,
    'wasser-sliders': WasserSlider,
    'vars-sliders': VarsSliders,
    'view-file-selection': ViewAndFileSelection
  },
  data() {
    return {
      plotState: PlotState,
    }
  },
  methods: {
    loadData() {
      updatePlot()
    }
  }
}
</script>

<style scoped>
.plot-menu {
  margin-top: 1rem;
  padding-left: 2rem;

}

.full-width {
  width: 250px;
  text-align: center;
}

.sidebar-background {
  height: 100%;
}

.slider {
  width: 250px;
}
</style>