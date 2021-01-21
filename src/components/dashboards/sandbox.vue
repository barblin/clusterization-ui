<template>
  <div class="row">
    <control-panel></control-panel>
    <div class="col-lg-10">
      <tri-plot v-if="plotState.isDelaunay()" :plotData="$store.getters.plotData"></tri-plot>
      <simple-plot v-else-if="plotState.isScatter()" :plotData="$store.getters.plotData"></simple-plot>
      <cluster-plot v-else-if="plotState.isClusterWasser()" :plotData="$store.getters.plotData"></cluster-plot>
      <min-tree-plot v-else-if="plotState.isTree()" :plotData="$store.getters.plotData"></min-tree-plot>
      <multi-view v-else-if="plotState.isMultiView()" :plotData="$store.getters.plotData"></multi-view>
      <vars-view v-if="plotState.isVariancesView()" :plotData="$store.getters.plotData"></vars-view>
      <div id="my_dataviz" class="simple-plot"></div>
    </div>
  </div>
</template>

<script>
import ControlPanel from "@/components/controls/ControlPanel";
import SimplePlot from "@/components/dashboards/plots/SimplePlot";
import ClusterPlot from "@/components/dashboards/plots/ClusterPlot";
import TriangulationPlot from "@/components/dashboards/plots/TriangulationPlot";
import MinimumTreePlot from "@/components/dashboards/plots/MinimumTreePlot";
import Multiview from "@/components/dashboards/plots/Multiview";
import VarsView from "@/components/dashboards/plots/VariancesView";
import {PlotState} from '../../services/plot-state'

export default {
  name: "expert",
  components: {
    'control-panel': ControlPanel,
    'simple-plot': SimplePlot,
    'tri-plot': TriangulationPlot,
    'min-tree-plot': MinimumTreePlot,
    'multi-view': Multiview,
    'vars-view': VarsView,
    'cluster-plot': ClusterPlot
  },
  data() {
    return {
      plotState: PlotState,
    }
  },
};
</script>

<style scoped>

.simple-plot {
  margin-top: 1rem;
}

</style>
