<template>
  <div>
    <div v-if="$store.getters.isStart">
      <blockquote class="blockquote text-center">
        <p class="mb-0">This is the introductory section of the clustering tool, taking you along to explore the main
          algorithm.</p>
      </blockquote>
      <br>
      <br>
      <br>
      <p class="text-center">By clicking on the button below, you will start the journey through each major part of the
        algorithm. <br>
        Every step will include a plot of that step and a description of what took part.

        <br><br>So dont hesitate to start!
        <br>
        <br>
        <button type="button" class="btn btn-primary" @click="simplePlot()">START</button>
      </p>
    </div>
    <journey-simple-plot v-else-if="$store.getters.isSimple"></journey-simple-plot>
    <journey-tri-plot v-else-if="$store.getters.isDelaunay"></journey-tri-plot>
    <journey-tree-plot v-else-if="$store.getters.isMinTree"></journey-tree-plot>
    <journey-tree-wasser-plot v-else-if="$store.getters.isMinTreeWasser"></journey-tree-wasser-plot>
    <journey-cluster-wasser-plot v-else-if="$store.getters.isClusterWasser"></journey-cluster-wasser-plot>
    <journey-multi-plot v-else-if="$store.getters.isMulti"></journey-multi-plot>
  </div>
</template>

<script>
import JourneySimplePlot from "@/components/dashboards/journey/journey-simple-plot";
import JourneyTriPlot from "@/components/dashboards/journey/journey-delaunay";
import JourneyTreePlot from "@/components/dashboards/journey/journey-tree";
import JourneyTreeWasserPlot from "@/components/dashboards/journey/journey-tree-wasser";
import JourneyClusterWasserPlot from "@/components/dashboards/journey/journey-cluster-wasser";
import JourneyMultiPlot from "@/components/dashboards/journey/journey-multi";
import {PROGRESS} from "../../services/progress";

export default {
  name: "customer",
  data() {
    return {
      progress: PROGRESS.START,
      PROGRESS_ENUM: PROGRESS
    }
  },
  mounted() {
    this.$store.commit('width', 500)
    this.$store.commit('height', 400)
    this.$store.commit('updateViewSel', PROGRESS.START)
  },
  components: {
    'journey-simple-plot': JourneySimplePlot,
    'journey-tri-plot': JourneyTriPlot,
    'journey-tree-plot': JourneyTreePlot,
    'journey-tree-wasser-plot': JourneyTreeWasserPlot,
    'journey-cluster-wasser-plot': JourneyClusterWasserPlot,
    'journey-multi-plot': JourneyMultiPlot,
  },
  methods: {
    simplePlot(){
      this.$store.commit('updateViewSel', PROGRESS.SIMPLE_PLOT)
    }
  }
}
</script>

<style scoped>

</style>