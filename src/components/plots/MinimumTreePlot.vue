<template>
  <div></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "MinimumTreePlot",
  props: ['plotData'],
  data() {
    return {}
  },
  watch: {
    plotData: function (plotData) {
      console.log(plotData)

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

      plotData.data.forEach(d => {
        let trianglePoints = x(d[0].coords[0]) + ',' + y(d[0].coords[1]) + ' ' +
            x(d[1].coords[0]) + ',' + y(d[1].coords[1]);

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

.simple-plot {
  margin-top: 2rem;
}

</style>