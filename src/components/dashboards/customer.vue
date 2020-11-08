<template>
  <div>
    <div v-if="$store.getters.isStart">
      <div class="container">
        <div class="block">
          <div class="row">
            <div class="col-md-10">
              <div class="content-heading"><h3>This is the introductory section of the clustering tool,
                taking you along to explore the main algorithm of this tool.</h3></div>
              <br>
              <p> By clicking on the button below, you will start the journey through each major part of the
                algorithm that we use to produce clusters from point data. Attempts in this direction are very important,
              due to the fact, that there is a huge variety of areas were clustering algorithms can be helpful. But
              clustering data is very expensive in terms of runtime complexity.</p>
              <p>To find a simple, fast and exact approach to solve clustering problems is an important field and we
              wanted to contribute our approach to this problem. To guide you through our approach, we have provided you
              with two different views, the Introduction view and the pro view. Within the pro view, you will be able
              to tweak key parameters in the algorithm to understand the workings behind better and to achieve
              even better clustering results yourself. To do that, just click the button in the upper left corner to
              switch the view.</p>
              <p> If you choose to follow the introduction first, just click on the button below.
                Every step will include a plot of the results of this step and a description of what happened. Each
              plot is calculated live, to give an impression of how long the sub-step takes.</p>
              <p>So dont hesitate to start!</p>
              <button type="button" class="btn btn-primary" @click="simplePlot()">START</button>
            </div>
            <div class="col-md-3">
            </div>
          </div>
          <br/>
        </div>
      </div>
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