<template>
  <div>
    <div class="row">
      <div class="col-lg-9" id="scatter"></div>
      <div class="col-lg-3" id="min_wasser_cluster"></div>
    </div>
    <div class="row">
      <div class="col-lg-3" id="overlap"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import {col_map} from "../../../services/colors";

export default {
  name: "SimplePlot",
  props: ['plotData'],
  watch: {
    plotData: function (plotData) {
      this.leftPlot(plotData)
      this.rightPlot(plotData)
      this.overlap(plotData)
    }
  },
  methods : {
    leftPlot: function (plotData) {
      const margin = {top: 20, right: 10, bottom: 30, left: 25},
          width = this.$store.getters.width - margin.left - margin.right,
          height = this.$store.getters.height - margin.top - margin.bottom;

      const svg = d3.select("#scatter")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      const x = d3.scaleLinear()
          .domain([0, plotData.scatter_max_x])
          .range([0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
          .domain([0, plotData.scatter_max_y])
          .range([height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y));

      svg.append('g')
          .selectAll("dot")
          .data(plotData.scatter_data)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return x(d[0]);
          })
          .attr("cy", function (d) {
            return y(d[1]);
          })
          .attr("r", 1.0)
          .style("fill", function (d) {
            return col_map[d[2]];
          })
    },
    rightPlot: function (plotData) {
      const margin = {top: 20, right: 10, bottom: 30, left: 25},
          width = this.$store.getters.width - margin.left - margin.right,
          height = this.$store.getters.height - margin.top - margin.bottom;

      const svg = d3.select("#min_wasser_cluster")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      const x = d3.scaleLinear()
          .domain([0, plotData.tree_max_x])
          .range([0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
          .domain([0, plotData.tree_max_y])
          .range([height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y));

      svg.append('g')
          .selectAll("dot")
          .data(plotData.tree_data)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return x(d[0]);
          })
          .attr("cy", function (d) {
            return y(d[1]);
          })
          .attr("r", 1.0)
          .style("fill", function (d) {
            return col_map[d[2]];
          })
    },
    overlap: function (plotData) {
      const margin = {top: 20, right: 10, bottom: 30, left: 25},
          width = this.$store.getters.width - margin.left - margin.right,
          height = this.$store.getters.height - margin.top - margin.bottom;

      const svg = d3.select("#overlap")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      const x = d3.scaleLinear()
          .domain([0, plotData.tree_max_x])
          .range([0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      const y = d3.scaleLinear()
          .domain([0, plotData.tree_max_y])
          .range([height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y));

      svg.append('g')
          .selectAll("dot")
          .data(plotData.cluster_compare)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return x(d[0]);
          })
          .attr("cy", function (d) {
            return y(d[1]);
          })
          .attr("r", 1.0)
          .style("fill", function (d) {
            return col_map[d[2]];
          })
    }
  }
}

</script>

<style scoped>
</style>