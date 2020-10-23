<template>
  <div id="my_dataviz" class="simple-plot"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "MinimumTreePlot",
  props: ['fileSel', 'viewSel', 'numClusters', 'wasserError', 'distError'],
  data() {
    return {
    }
  },
  methods: {
    getIssues() {
      this.$emit('loading', true)
      this.$emit('errored', false)

      d3.select("#my_dataviz").selectAll("svg").remove()
      //2_TwoNum.csv
      d3.json("http://localhost:5000/api/v1/views/" + this.viewSel + "/files/" + this.fileSel
          + "?numClusters=" + this.numClusters + "&wasserError=" + this.wasserError + "&distError=" + this.distError)
          .then(function (data) {

        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 1400 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, data.max_X])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, data.max_Y])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        data.data.forEach(d => {
          let trianglePoints = x(d[0].coords[0]) + ',' + y(d[0].coords[1]) + ' ' +
              x(d[1].coords[0]) + ',' + y(d[1].coords[1]);

          svg.append("polygon")
              .attr("points", trianglePoints)
              .style('fill', 'none')
              .style('stroke', 'violet')
              .style("stroke-width", 0.5);

        })
      })
          .catch(error => {
            this.$emit('errored', true)
            console.error(error);
          })
          .finally(() => (
              this.$emit('loading', false)
          ));
    }

  }
}

</script>

<style scoped>

.simple-plot {
  margin-top: 2rem;
}

</style>