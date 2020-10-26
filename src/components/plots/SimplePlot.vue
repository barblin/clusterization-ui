<template>
  <div></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "SimplePlot",
  props: ['plotData'],
  watch: {
    plotData: function (plotData) {
      console.log(plotData)

      let col_map = {
        0: '#a6cee3', 1: '#1f78b4', 2: '#b2df8a',
        3: '#33a02c', 4: '#fb9a99', 5: '#e31a1c', 6: '#fdbf6f', 7: '#ff7f00', 8: '#cab2d6'
      }

      const margin = {top: 10, right: 30, bottom: 30, left: 60},
          width = 1400 - margin.left - margin.right,
          height = 740 - margin.top - margin.bottom;

      const svg = d3.select("#my_dataviz")
          .append("svg")
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

      svg.append('g')
          .selectAll("dot")
          .data(plotData.data)
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