<template>
  <div class="container">
    <div class="block">
      <div class="row">
        <div class="col-md-6">
          <div class="content-heading"><h3>Delaunay Triangulation </h3></div>
          <p>As you can see, the coordinates of the point data serve as our start and endpoint for edges. These edges will
          be collected and added to a tree that will grow until you see what is plotted here.</p>
          <p>We are mainly interested in these edges for our algorithm. For each source and end vertex we create an
          edge with the cost needed to travel from one vertex to another. We also add additional information, like the
          original label, the coordinates of source and destination vertex, and all the neighbours for a specific vertex.
            These details will help us later, to create various other views and execute additional algorithms.</p>
          <p> But for now we just would like to transform these edges into something that we can work with.
            How about a min tree? We would definitely benefit from a Union Find in this case. </p>
          <button type="button" class="btn btn-primary" @click="click()">Find min tree!</button>
        </div>
        <div class="col-md-3">
          <div class="alert alert-info menu-status-indicator full-width"
               v-show="$store.getters.loading">Loading...
          </div>
          <div id="my_dataviz" class="simple-plot"></div>
          <tri-plot :plotData="$store.getters.plotData"></tri-plot>
        </div>
      </div>
      <br/>
    </div>
  </div>
</template>

<script>
import TriPlot from "@/components/dashboards/plots/TriangulationPlot";
import {updatePlot} from "../../../services/datasource";
import {PROGRESS} from "@/services/progress";

export default {
  name: "journey-simple-plot",
  components: {
    'tri-plot': TriPlot,
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
      this.$store.commit('updateViewSel', PROGRESS.MIN_TREE)
    }
  }
}
</script>

<style scoped>
. plot {
  margin-left: 100px
}
</style>