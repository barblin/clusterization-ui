<template>
  <div></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "TriangulationPlot",
  props: ['plotData'],
  watch: {
    plotData: function (plotData) {
      const margin = {top: 10, right: 30, bottom: 30, left: 30},
          width = this.$store.getters.width - margin.left - margin.right,
          height = this.$store.getters.height - margin.top - margin.bottom;

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

      plotData.data.forEach(d => {
        let trianglePoints = x(d[0][0]) + ',' + y(d[0][1]) + ' ' +
            x(d[1][0]) + ',' + y(d[1][1]) + ' ' +
            x(d[2][0]) + ',' + y(d[2][1]);

        svg.append("polygon")
            .attr("points", trianglePoints)
            .style('fill', 'none')
            .style('stroke', 'violet')
            .style("stroke-width", 0.5);

      })
    }

  }
}

</script>

<style scoped>
</style>