<template>
  <div>
    <div class="row">
      <div class="btn-group btn-group-toggle mt-3" data-toggle="buttons">
        <label class="btn btn-secondary btn-sm" v-bind:class="{ active: $store.getters.isVarsL }"
               @click="updateLineMode(line_mode.VARIANCE)">
          <input type="radio" name="options" id="option1"> Variance
        </label>
        <label class="btn btn-secondary btn-sm" v-bind:class="{ active: $store.getters.isNmiL }"
               @click="updateLineMode(line_mode.NMI)">
          <input type="radio" name="options" id="option2"> NMI
        </label>
        <label class="btn btn-secondary btn-sm" v-bind:class="{ active: $store.getters.isDBCVL }"
               @click="updateLineMode(line_mode.DBCV)">
          <input type="radio" name="options" id="option3"> DBCV
        </label>
        <label class="btn btn-secondary btn-sm" v-bind:class="{ active: $store.getters.isRuntime }"
               @click="updateLineMode(line_mode.RUNTIME)">
          <input type="radio" name="options" id="option4">
          Runtime <span class="badge badge-success">{{ $store.getters.overallTime }} sec.</span>
        </label>
      </div>
    </div>
    <div id="accordion" class="plot-menu">
      <div id="my_variance_viz" class="simple-plot"></div>
      <div class="row">
        <div class="col-md-8">
          <div id="my_variance_detail" class="simple-plot"></div>
          <div v-if="$store.getters.varianceDetail != null"></div>
        </div>
        <div class="col-md-4 mt-3">
          <div class="alert alert-dark bg-dark float-right" v-if="$store.getters.varianceDetail != null">
            {{ plot($store.getters.varianceDetail) }}
            <span style="color:white"> NMI: {{ $store.getters.varianceDetail.nmi }} </span> <br>
            <span style="color:white"> W(v,u): {{ $store.getters.varianceDetail.wasser_margin * 100 }} </span> <br>
            <span style="color:white"> Amount: {{ $store.getters.varianceDetail.sum_sz }} </span> <br><br>
            <span v-for="clus in $store.getters.varianceDetail.data" :key="clus.id">
              <span v-if="clus[0] == -1">
                <span v-bind:style="{ color: col_map[clus[1]] }">
                  Noise Cluster - Size: {{ clus[2] }} -
                  <!-- W-Sum: {{ clus[4].toFixed(9) }} /--> W-Var: {{ clus[5].toFixed(9) }}
                </span>
              </span>
              <span v-else>
                <span v-bind:style="{ color: col_map[clus[1]] }">
                  Cluster: {{ clus[0] }} - Size: {{ clus[2] }} -
                  <!-- W-Sum: {{ clus[4].toFixed(9) }} /--> W-Var: {{ clus[5].toFixed(9) }}
                </span>
              </span> <br><br>
            </span>
          </div>
        </div>
      </div>
      <wasserstein-variance-plot :mode="$store.getters.isVarsL" :plotData="plotData"></wasserstein-variance-plot>
      <nmi-plot :mode="$store.getters.isNmiL" :plotData="plotData"></nmi-plot>
      <runtime-plot :mode="$store.getters.isRuntime" :plotData="plotData"></runtime-plot>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import {col_map} from "../../../services/colors";
import WassersteinVariancePlot from "./utility/WassersteinVariancePlot"
import NmiPlot from "./utility/NmiPlot"
import RuntimePlot from "./utility/RuntimePlot"
import {LINE_GRAPH} from "../../../services/modes";

export default {
  name: "VariancesView",
  props: ['plotData'],
  components: {
    'wasserstein-variance-plot': WassersteinVariancePlot,
    'nmi-plot': NmiPlot,
    'runtime-plot': RuntimePlot
  },
  data() {
    return {
      col_map: col_map,
      line_mode: LINE_GRAPH,
      overall_time: 0
    }
  },
  mounted() {
    this.$store.commit("varianceDetail", null)
    this.$store.commit("lineGraphMode", LINE_GRAPH.VARIANCE)
  },
  watch: {
    plotData: function (plotData) {
      this.$store.commit("overallTime", plotData[plotData.length - 1].overall_time)
    }
  },
  methods: {
    updateLineMode: function (mode) {
      this.$store.commit("lineGraphMode", mode)
      this.$store.commit("varianceDetail", null)
    },
    plot: function (plotData) {
      d3.selectAll("#var-det").remove()

      const margin = {top: 20, right: 10, bottom: 30, left: 25},
          width = this.$store.getters.width - margin.left - margin.right,
          height = this.$store.getters.height - margin.top - margin.bottom;

      const svg = d3.select("#my_variance_detail")
          .append("svg")
          .attr("id", "var-det")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      const x = d3.scaleLinear()
          .domain([0, plotData.max_X])
          .range([0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
          .domain([0, plotData.max_Y])
          .range([height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y));

      let clusters = plotData.data

      clusters.forEach(clus => {
        svg.append('g')
            .selectAll("dot")
            .data(clus[3])
            .enter()
            .append("circle")
            .attr("cx", function (d) {
              return x(d[0]);
            })
            .attr("cy", function (d) {
              return y(d[1]);
            })
            .attr("r", 1.0)
            .style("fill", function () {
              return col_map[clus[1]];
            })
      })
    }
  }
}

</script>

<style scoped>
.plot-menu {
  margin-top: 1rem;
}

</style>