<template>
  <div></div>
</template>

<script>
import * as d3 from "d3";
import {col_map} from "@/services/colors";

export default {
  name: "WassersteinVariancePlot",
  props: ['plotData'],
  watch: {
    plotData: function (plotData) {
      const margin = {top: 20, right: 10, bottom: 30, left: 25},
          width = 1500 - margin.left - margin.right,
          height = 150 - margin.top - margin.bottom;

      const svg = d3.select("#my_variance_viz")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear()
          .domain([plotData[0].wasser_margin, plotData[plotData.length - 1].wasser_margin])
          .range([0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
          .domain([d3.min(plotData, function (d) {
            return +d.cluster_variance;
          }),
            d3.max(plotData, function (d) {
              return +d.cluster_variance;
            })])
          .range([height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y));

      // Add the line
      svg.append("path")
          .datum(plotData)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
              .x(function (d) {
                return x(d.wasser_margin)
              })
              .y(function (d) {
                return y(d.cluster_variance)
              })
          )

      let store = this.$store;
      svg.append('g')
          .selectAll("dot")
          .data(plotData)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return x(d.wasser_margin);
          })
          .attr("cy", function (d) {
            return y(d.cluster_variance);
          })
          .attr("r", function (d) {
            if (d.significant) {
              return 5;
            }

            return 2.5;
          })
          .style("fill", function (d) {
            console.log(d.significant)
            if (d.significant) {
              return col_map[4];
            }

            return col_map[0];
          })
          .attr("id", function (d) {
            return d.identity;
          })
          .on('mouseover', function (d) {
            d3.select(this).style("cursor", "pointer");
            d3.selectAll("#" + d.target.__data__.identity).attr("r", 5.0)
                .style("fill", function () {
                  return col_map[3];
                })
          })
          .on('mouseout', function (d) {
            d3.selectAll("#" + d.target.__data__.identity)
                .attr("r", function (d) {
                  if (d.significant) {
                    return 5;
                  }

                  return 2.5;
                })
                .style("fill", function (d) {
                  if (d.significant) {
                    return col_map[4];
                  }

                  return col_map[0];
                })
          })
          .on("click", function (d) {
            store.commit("varianceDetail", d.target.__data__)
          })

    }
  }
}

</script>

<style scoped>

</style>