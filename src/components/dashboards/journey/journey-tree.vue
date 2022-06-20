<template>
  <div class="container">
    <div class="block">
      <div class="row">
        <div class="col-md-6">
          <div class="content-heading"><h3>Minimal Tree from our Delaunay Triangles</h3></div>
          <p>This is definitely a good looking tree!</p>
          <p>This tree is based on the triangulation data from before. We simply performed a custom Kruskal Algorithm
            on the data. Why is that import? Well the Kruskal Algorithm will actually be used to create
            different clusters at a later point. These unions for the clusters will depend on a maximum Wasserstein Distance.</p>
          <p>Like that, we can control with input parameters how many clusters we want to have and what the criteria
        for the clusters will be. Based on these input parameters, we will sort the edges by cost of travelling
        between source and destination. But the decision if a vertex will join a cluster, is based on a maximum
        Wasserstein Distance difference between the two vertices connected by that edge.</p>
          <p>With these tools in hand, I think it might be time that you find some clusters!</p>
          <button type="button" class="btn btn-primary" @click="click()">Cluster!</button>
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
      this.$store.commit('updateViewSel', PROGRESS.MIN_TREE_WASSER)
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