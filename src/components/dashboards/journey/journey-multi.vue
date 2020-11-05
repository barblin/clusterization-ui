<template>
  <div class="container">
    <div class="block">
      <div class="row">
        <div class="col-md-6">
          <div class="content-heading"><h3>Results</h3></div>
          <p>As you can see, and as you will be able to explore in pro-mode, our algorithm is able to create clusters
          from any of multiple different input files. The clustering algorithm just requires a maximum Wasserstein Distance
          as input parameter, to create clusters that resemble the original pretty much.</p>
          <p>We have also created multiple additional controls to create different results in clustering. The results
          that you see below, are based on predefined values, that produce an optimal result. You can set different
          values in Pro-Mode.</p>
          <p>The views below show on the left upper corner the original plot. On the right upper corner the resulting
          clusters from the algorithm. And on the lower left, we have a small view highlighting the points that match
          between original and resulting clusters.</p>
          <p>You can now go back to the home screen or just switch to Pro-Mode to learn more.</p>
          <div class="alert alert-info menu-status-indicator full-width"
               v-show="$store.getters.loading">Loading...
          </div>
          <div id="my_dataviz" class="simple-plot"></div>
          <plot :plotData="$store.getters.plotData"></plot>

          <button type="button" class="btn btn-primary" @click="click()">Back home</button>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>

<script>
import Plot from "@/components/dashboards/plots/Multiview";
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
      this.$store.commit('updateViewSel', PROGRESS.START)
      this.$store.commit('updateClusters', 9)
      this.$store.commit('updateWasserDist', 1.8)
      this.$store.commit('updateChecked', false)
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