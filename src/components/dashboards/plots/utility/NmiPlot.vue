<template>
  <div></div>
</template>

<script>
import * as d3 from "d3";
import {col_map} from "@/services/colors";
import {getVariancePlot} from "@/services/datasource";

export default {
  name: "NmiPlot",
  props: ['mode', 'plotData'],
  watch: {
    plotData: function (plotData) {
      if (this.mode) {
        this.plot(plotData)
      }
    },
    mode: function (mode) {
      if (mode) {
        this.plot(this.$store.getters.plotData)
      }
    }
  },
  methods: {
    plot: function (plotData) {
      d3.selectAll("svg").remove()

      const margin = {top: 5, right: 10, bottom: 30, left: 25},
          width = 1500 - margin.left - margin.right,
          height = 200 - margin.top - margin.bottom;

      const svg = d3.select("#my_variance_viz")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scaleLinear()
          .domain([plotData[0].wasser_margin * 100, plotData[plotData.length - 1].wasser_margin * 100])
          .range([0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

      svg.append("text")
          .attr("transform",
              "translate(" + (width / 2) + " ," +
              (height + margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .style("font-size", 10)
          .text("margin added to min wasser distance in % ");

      // Add Y axis
      var y = d3.scaleLinear()
          .domain([0, 1])
          .range([height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y));

      // Add the line
      svg.append("path")
          .datum(plotData)
          .attr("fill", "none")
          .attr("stroke", "black")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
              .x(function (d) {
                return x(d.wasser_margin * 100)
              })
              .y(function (d) {
                return y(d.nmi)
              })
          )

      if (0 < plotData[0].skinny_nmi) {
        // SKINNY
        svg.append("path")
            .datum(plotData)
            .attr("fill", "none")
            .attr("stroke", "grey")
            .attr("stroke-width", 1.5)
            .attr("stroke-dasharray", 5, 5)
            .attr("d", d3.line()
                .x(function (d) {
                  return x(d.wasser_margin * 100)
                })
                .y(function (d) {
                  return y(d.skinny_nmi)
                })
            )

        svg.append("text")
            .data(plotData)
            .attr("x", function () {
              return x(plotData[0].wasser_margin * 100) + 5;
            })
            .attr("y", function (d) {
              return y(d.skinny_nmi + 0.06)
            })
            .attr("dy", ".30em")
            .attr("fill", "grey")
            .text(function () {
              return "Skinny Dip";
            });
      }

      if (0 < plotData[0].ada_nmi) {
        // ADAWAVE
        svg.append("path")
            .datum(plotData)
            .attr("fill", "none")
            .attr("stroke", "pink")
            .attr("stroke-width", 1.5)
            .attr("stroke-dasharray", 5, 5)
            .attr("d", d3.line()
                .x(function (d) {
                  return x(d.wasser_margin * 100)
                })
                .y(function (d) {
                  return y(d.ada_nmi)
                })
            )

        svg.append("text")
            .data(plotData)
            .attr("x", function () {
              return x(plotData[plotData.length - 1].wasser_margin * 100) - 70;
            })
            .attr("y", function (d) {
              return y(d.ada_nmi  + 0.06)
            })
            .attr("dy", ".30em")
            .attr("fill", "pink")
            .text(function () {
              return "AdaWave";
            });
      }

      let store = this.$store;
      svg.append('g')
          .selectAll("dot")
          .data(plotData)
          .enter()
          .append("circle")
          .attr("cx", function (d) {
            return x(d.wasser_margin * 100);
          })
          .attr("cy", function (d) {
            return y(d.nmi);
          })
          .attr("r", function (d) {
            if (d.significant) {
              return 5;
            }

            return 2.5;
          })
          .style("fill", function (d) {
            if (d.significant) {
              return col_map[2];
            }

            return col_map[6];
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
                    return col_map[2];
                  }

                  return col_map[6];
                })
          })
          .on("click", function (d) {
            store.commit("updatePlotIdentity", d.target.__data__.identity)
            getVariancePlot()
          })
    }
  }
}

</script>

<style scoped>

</style>