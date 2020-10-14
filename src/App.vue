<template>
  <div id="app">
    <form action="#" @submit.prevent="getIssues">
      <div class="form-group">
        <input
            type="text"
            placeholder="owner/repo Name"
            v-model="repository"
            class="col-md-2 col-md-offset-5"
        >
      </div>
      <div id="my_dataviz"></div>
      <div class="alert alert-info" v-show="loading">Loading...</div>
      <div class="alert alert-danger" v-show="errored">An error occured</div>
    </form>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "app",
  components: {},
  data() {
    return {
      loading: false,
      errored: false,
      repository: "",
      startDate: null,
      chart: null
    };
  },
  methods: {
    getIssues() {
      this.loading = true;
      this.errored = false;

      d3.select("#my_dataviz").selectAll("svg").remove()
      //2_TwoNum.csv
      d3.json("http://localhost:5000/api/v1/clusters/data/files/" + this.repository).then(function (data) {
        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 1000 - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom;

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
            .domain([0, 1])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 1])
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
            .style("fill", "#ff0000")
      })
          .catch(error => {
            this.errored = true;
            this.chart = null;
            console.error(error);
          })
          .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
