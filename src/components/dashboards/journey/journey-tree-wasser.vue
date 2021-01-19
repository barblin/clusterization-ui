<template>
  <div class="container">
    <div class="block">
      <div class="row">
        <div class="col-md-6">
          <div class="content-heading"><h3>The Wasserstein Minimal Tree</h3></div>
          <p>This is pretty much the same tree as before, but the criteria for joining have changed.</p>
          <p>There are some details involved on how to deal with outliers or neighbours that are far away,
          but in general the steps involved are pretty simple. Like in a normal Kruskal Algorithm, you sort the
            edges by cost of travelling, you iterate through all the edges and you join them. But we added some
          additional steps to create clusters from this algorithm.</p>
          <p>Before the kruskal algorithm starts, we actually iterate through all the edges and calculate the
            Wasserstein Distance between the source and the destination vertex within the current edge
            and store in the edge. To calculate the Wasserstein Distance, we
          fetch the neighbour data (all the costs of all the edges connected to vertex), for source and destination,
            and calculate the cost to transform the source neighbour distribution into the destination neighbour
          distribution. This cost will decide, if a certain edge will join a cluster.</p>
          <p>And as a result, we receive a plot like the one to the right. Due to the fact that some of the edges
          could not be joined the plot looks quite splintered still. And some of the details are not as clear.
          So how about we take the original labels and assign them to the clusters?</p>
          <button type="button" class="btn btn-primary" @click="click()">Label the clusters</button>
        </div>
        <div class="col-md-3">
          <div class="alert alert-info menu-status-indicator full-width"
               v-show="$store.getters.loading">Loading...
          </div>
          <div id="my_dataviz" class="simple-plot"></div>
          <plot :plotData="$store.getters.plotData"></plot>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>

<script>
import Plot from "@/components/dashboards/plots/MinimumTreePlot";
import {updatePlot} from "../../../services/datasource";
import {PROGRESS} from "@/services/progress";

export default {
  name: "journey-simple-plot",
  components: {
    'plot': Plot,
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
      this.$store.commit('updateViewSel', PROGRESS.CLUSTER_WASSER)
      this.$store.commit('updateClusters', 9)
      this.$store.commit('updateWasserDist', 1.42)
      this.$store.commit('width', 500)
      this.$store.commit('height', 400)
    }
  }
}
</script>

<style scoped>
. plot {
  margin-left: 100px
}
</style>