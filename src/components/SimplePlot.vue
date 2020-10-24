<template>
  <div id="my_dataviz" class="simple-plot"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "SimplePlot",
  props: ['fileSel', 'viewSel', 'numClusters', 'wasserError', 'checked'],
  methods: {
    getIssues() {
      this.$emit('loading', true)
      this.$emit('errored', false)

      let col_map = {0: '#a6cee3', 1: '#1f78b4', 2: '#b2df8a',
        3: '#33a02c', 4:'#fb9a99', 5:'#e31a1c', 6:'#fdbf6f', 7:'#ff7f00', 8:'#cab2d6'}

      d3.select("#my_dataviz").selectAll("svg").remove()
      //2_TwoNum.csv
      d3.json("http://localhost:5000/api/v1/views/" + this.viewSel + "/files/" + this.fileSel
          + "?numClusters=" + this.numClusters + "&wasserError=" + this.wasserError + "&remOutliers=" + this.checked)
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

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data.data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
              return x(d[0]);
            })
            .attr("cy", function (d) {
              return y(d[1]);
            })
            .attr("r", 1.5)
            .style("fill", function (d) {
              return col_map[d[2]];
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