import Vue from 'vue'
import Vuex from 'vuex'
import {PROGRESS} from "../services/progress";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false,
        errored: false,
        viewSel: PROGRESS.SIMPLE_PLOT,
        fileSel: "Select File",
        numClusters: 6,
        wasserDist: 1,
        stdvMultiplier: 2,
        checked: false,
        normalizeNeighDist: false,

        varsFrom: 0.00,
        varsUntil: 2,
        varsStepSize: 0.01,

        plotData: {},
        width: 1500,
        height: 800,

        varianceDetail: null,
    },
    mutations: {
        updateLoading(state, isLoading) {
            state.loading = isLoading
        },
        updateErrored(state, hadError) {
            state.errored = hadError
        },
        updatePlot(state, data) {
            state.plotData = data
        },
        updateViewSel(state, viewSel) {
            state.viewSel = viewSel
        },
        updateFileSel(state, fileSel) {
            state.fileSel = fileSel
        },
        updateClusters(state, clusters) {
            state.numClusters = clusters
        },
        updateWasserDist(state, wasserDist) {
            state.wasserDist = wasserDist
        },
        updateStdvMultiplier(state, stdvMultiplier) {
            state.stdvMultiplier = stdvMultiplier
        },
        updateChecked(state, checked) {
            state.checked = checked
        },
        updateNormalizeNeighDist(state, normalizeNeighDist) {
            state.normalizeNeighDist = normalizeNeighDist
        },
        updateVarsFrom(state, from) {
            state.varsFrom = from
        },
        updateVarsUntil(state, until) {
            state.varsUntil = until
        },
        updateStepSize(state, step) {
            state.varsStepSize = step
        },
        height(state, height) {
            state.height = height
        },
        width(state, width) {
            state.width = width
        },
        varianceDetail(state, detail) {
            state.varianceDetail = detail
        }
    },
    getters: {
        loading: state => state.loading,
        errored: state => state.errored,
        plotData: state => state.plotData,
        viewSel: state => state.viewSel,
        fileSel: state => state.fileSel,
        clusters: state => state.numClusters,
        wasserDist: state => state.wasserDist,
        stdvMultiplier: state => state.stdvMultiplier,
        checked: state => state.checked,
        normalizeNeighDist: state => state.normalizeNeighDist,

        varsFrom: state => state.varsFrom,
        varsUntil: state => state.varsUntil,
        varsStepSize: state => state.varsStepSize,

        width: state => state.width,
        height: state => state.height,

        varianceDetail: state => state.varianceDetail,

        isStart: state => state.viewSel.valueOf() === PROGRESS.START.valueOf(),
        isSimple: state => state.viewSel.valueOf() === PROGRESS.SIMPLE_PLOT.valueOf(),
        isDelaunay: state => state.viewSel.valueOf() === PROGRESS.DELAUNAY.valueOf(),
        isMinTree: state => state.viewSel.valueOf() === PROGRESS.MIN_TREE.valueOf(),
        isMinTreeWasser: state => state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf(),
        isClusterWasser: state => state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf(),
        isMulti: state => state.viewSel.valueOf() === PROGRESS.MULTI.valueOf(),
        isVars: state => state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),

        isPSimple: state => state.viewSel.valueOf() === PROGRESS.SIMPLE_PLOT.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.DELAUNAY.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MULTI.valueOf(),
        isPDelaunay: state =>
            state.viewSel.valueOf() === PROGRESS.DELAUNAY.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MULTI.valueOf(),
        isPMinTree: state =>
            state.viewSel.valueOf() === PROGRESS.MIN_TREE.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MULTI.valueOf(),
        isPMinTreeWasser: state =>
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MULTI.valueOf(),
        isPClusterWasser: state =>
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MULTI.valueOf(),
        isPMulti: state =>
            state.viewSel.valueOf() === PROGRESS.MULTI.valueOf(),
    }
})