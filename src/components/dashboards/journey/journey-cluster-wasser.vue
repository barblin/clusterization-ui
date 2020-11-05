<template>
  <div class="container">
    <div class="block">
      <div class="row">
        <div class="col-md-6">
          <div class="content-heading"><h3>Our Clusters</h3></div>
          <p>This looks much better! By taking the edges, we actually can create a scatter plot again. We just walk
          through our edges, take the coordinates and the new label from the source and destination vertex and create
          points again.</p>
          <p>By labeling them with the original colours, we are able to compare them later with the original plot.
          The original colour is in fact just the original colour of the root vertex of the overall cluster. Each vertex
          now belongs to certain cluster.</p>
          <p>To be able to filter out the noise, and just plot the interesting clusters, we sort the clusters by size
          and just take the largest clusters into consideration.</p>
          <p>Now the last task that remains is to compare our resulting cluster to the original and to find out, if
          our clustering algorithm has performed well.</p>
          <button type="button" class="btn btn-primary" @click="click()">Cross compare with original</button>
        </div>
        <div class="col-md-3">
          <div id="my_dataviz" class="simple-plot"></div>
          <div class="alert alert-info menu-status-indicator full-width"
               v-show="$store.getters.loading">Loading...
          </div>
          <simple-plot :plotData="$store.getters.plotData"></simple-plot>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>

<script>
import SimplePlot from "@/components/dashboards/plots/SimplePlot";
import {updatePlot} from "../../../services/datasource";
import {PROGRESS} from "@/services/progress";

export default {
  name: "journey-simple-plot",
  components: {
    'simple-plot': SimplePlot,
  },
  data() {
    return {
      plotData: {},
    }
  },
  mounted() {
    this.$store.commit('updateFileSel', 'waveData_5.csv')

    updatePlot()
  },
  methods: {
    click (){
      this.$store.commit('updateViewSel', PROGRESS.MULTI)
      this.$store.commit('updateClusters', 9)
      this.$store.commit('updateWasserDist', 1.42)
      this.$store.commit('updateStdvMultiplier', 2)
      this.$store.commit('updateChecked', false)
      this.$store.commit('width', 350)
      this.$store.commit('height', 300)
    }
  }
}
</script>

<style scoped>
. plot {
  margin-left: 100px
}
</style>