<template>
  <div>
    <div id="accordion" class="plot-menu">
      <div id="my_variance_viz" class="simple-plot"></div>
      <div class="row">
        <div class="col-md-9">
          <div id="my_variance_detail" class="simple-plot"></div>
          <div v-if="$store.getters.varianceDetail != null">
            <br>
            <br>
            <span>Total vertices clustered: {{ $store.getters.varianceDetail.sum_sz }}</span>
          </div>
        </div>
        <div class="col-md-3">
          <br>
          <div v-if="$store.getters.varianceDetail != null">
            {{ plot($store.getters.varianceDetail) }}
            <p v-for="clus in $store.getters.varianceDetail.data" :key="clus.id">
              <span v-if="clus[0] == -1">
                <span v-bind:style="{ color: col_map[clus[1]] }">
                  Noise Cluster / Size: {{ clus[2] }}
                  <br> Sum W-Cost: {{ clus[4] }} <br> W-Variance: {{ clus[5] }}
                </span>
              </span>
              <span v-else>
                <span v-bind:style="{ color: col_map[clus[1]] }">
                  Cluster: {{ clus[0] }} / Size: {{ clus[2] }}
                  <br> Sum W-Cost: {{ clus[4] }} <br> W-Variance: {{ clus[5] }}
                </span>
              </span>
            </p>
            <br>
          </div>
        </div>
      </div>
      <wasserstein-variance-plot :plotData="plotData"></wasserstein-variance-plot>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import {col_map} from "../../../services/colors";
import WassersteinVariancePlot from "./utility/WassersteinVariancePlot"

export default {
  name: "VariancesView",
  props: ['plotData'],
  components: {
    'wasserstein-variance-plot': WassersteinVariancePlot,
  },
  data() {
    return {
      col_map: col_map,
    }
  },
  mounted() {
    this.$store.commit("varianceDetail", null)
  },
  methods: {
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