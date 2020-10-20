<template>
  <div id="my_dataviz" class="simple-plot">
    <div class="alert alert-info" v-show="loading">Loading...</div>
    <div class="alert alert-danger" v-show="errored">An error occured</div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "SimplePlot",
  props: ['fileSelection', 'viewSelection'],
  data() {
    return {
      loading: false,
      errored: false
    }
  },
  watch: {
    fileSelection: function () {
      this.getIssues()
    }
  },
  methods: {
    getIssues() {
      this.loading = true;
      this.errored = false;

      d3.select("#my_dataviz").selectAll("svg").remove()
      //2_TwoNum.csv
      d3.json("http://localhost:5000/api/v1/views/" + this.viewSelection + "/files/"
          + this.fileSelection).then(function (data) {

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

        let col_map = {0: '#a50026', 1: '#d73027', 2: '#f46d43',
          3: '#fdae61', 4:'#886700', 5:'#ba01c3', 6:'#708f00', 7:'#a6d96a', 8:'#66bd63', 9:'#1a9850', 10:'#006837'}

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
            this.errored = true;
            console.error(error);
          })
          .finally(() => (this.loading = false));
    }

  }
}

</script>

<style scoped>

.simple-plot {
  margin-top: 2rem;
}

</style>