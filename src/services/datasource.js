import * as d3 from "d3";
import { store } from '../store/application-state-store'

const axios = require('axios');
export const host = "http://localhost:5000/api/v1/"

export function updatePlot() {
    store.commit('updateLoading', true)
    store.commit('updateErrored', false)

    axios.get( host + "views/" + store.getters.viewSel + "/files/" + store.getters.fileSel
        + "?numClusters=" + store.getters.clusters + "&wasserError=" + store.getters.wasserDist / 100
        + "&remOutliers=" + store.getters.checked + "&stdvMultiplier=" + store.getters.stdvMultiplier)
        .then(resp => {
                d3.select("#my_dataviz").selectAll("svg").remove()
                d3.select("#scatter").selectAll("svg").remove()
                d3.select("#min_wasser_cluster").selectAll("svg").remove()
                d3.select("#overlap").selectAll("svg").remove()
                store.commit('updatePlot', resp.data)
            }
        )
        .catch(error => {
            store.commit('updateErrored', true)
            console.error(error);
        })
        .finally(() => (
            store.commit('updateLoading', false)
        ));
}