<template>
  <div class="container">
    <div class="block">
      <div class="row">
        <div class="col-md-6">
          <div class="content-heading"><h3>The Simple Plot </h3></div>
          <p>The journey starts by visiting with what we work with. We are provided with a simple scatter plot, showing the
            optimal clusters. This will be the plot that our algorithm has to compete with. If our clustering is perfect, the
            clusters will look identical.</p>
          <p>The data for this plot comes from a cluster service, written in python.
            The data is based on two coordinates and a color label.</p>
          <p>For our clustering to work, we have to transform this data into edges. For that reason we apply a
          Delaunay Triangulation on the data. Go ahead and try it for yourself. </p>
          <button type="button" class="btn btn-primary" @click="click()">Triangulate!</button>
        </div>
        <div class="col-md-3">
          <div class="alert alert-info menu-status-indicator full-width"
               v-show="$store.getters.loading">Loading...
          </div>
          <div id="my_dataviz" class="simple-plot"></div>
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
    this.$store.commit('width', 500)
    this.$store.commit('height', 400)
    this.$store.commit('updateFileSel', 'waveData_5.csv')

    updatePlot()
  },
  methods: {
    click (){
      this.$store.commit('updateViewSel', PROGRESS.DELAUNAY)
    }
  }
}
</script>

<style scoped>
.plot {
  margin-left: 100px
}
</style>