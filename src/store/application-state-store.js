import Vue from 'vue'
import Vuex from 'vuex'
import {PROGRESS} from "../services/progress";
import {LINE_GRAPH} from "../services/modes";
import * as d3 from "d3";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: false,
        errored: false,
        viewSel: PROGRESS.SIMPLE_PLOT,
        fileSel: "Select File",
        plotIdentity: "",
        wasserDist: 1,
        lineGraphMode: LINE_GRAPH.VARIANCE,

        varsFrom: 0.00,
        varsUntil: 2,
        varsStepSize: 0.01,

        plotData: {},
        width: 1500,
        height: 800,

        varianceDetail: null,
        overallTime: 0
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
            d3.selectAll("svg").remove()
            state.viewSel = viewSel
        },
        updateFileSel(state, fileSel) {
            state.fileSel = fileSel
        },
        updatePlotIdentity(state, plotIdentity) {
            state.plotIdentity = plotIdentity
        },
        updateWasserDist(state, wasserDist) {
            state.wasserDist = wasserDist
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
        },
        lineGraphMode(state, mode) {
            state.lineGraphMode = mode
        },
        overallTime(state, time) {
            state.overallTime = time.toFixed(9)
        }
    },
    getters: {
        loading: state => state.loading,
        errored: state => state.errored,
        plotData: state => state.plotData,
        viewSel: state => state.viewSel,
        fileSel: state => state.fileSel,
        plotIdentity: state => state.plotIdentity,
        wasserDist: state => state.wasserDist,

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
        isVars: state => state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),

        isVarsL: state => state.lineGraphMode.valueOf() === LINE_GRAPH.VARIANCE.valueOf(),
        isNmiL: state => state.lineGraphMode.valueOf() === LINE_GRAPH.NMI.valueOf(),
        isDBCVL: state => state.lineGraphMode.valueOf() === LINE_GRAPH.DBCV.valueOf(),
        isRuntime: state => state.lineGraphMode.valueOf() === LINE_GRAPH.RUNTIME.valueOf(),

        lineGraphMode: state => state.lineGraphMode,

        overallTime: state => state.overallTime,

        isPSimple: state => state.viewSel.valueOf() === PROGRESS.SIMPLE_PLOT.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.DELAUNAY.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),
        isPDelaunay: state =>
            state.viewSel.valueOf() === PROGRESS.DELAUNAY.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),
        isPMinTree: state =>
            state.viewSel.valueOf() === PROGRESS.MIN_TREE.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),
        isPMinTreeWasser: state =>
            state.viewSel.valueOf() === PROGRESS.MIN_TREE_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),
        isPClusterWasser: state =>
            state.viewSel.valueOf() === PROGRESS.CLUSTER_WASSER.valueOf() ||
            state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),
        isPVar: state =>
            state.viewSel.valueOf() === PROGRESS.VARIANCES.valueOf(),
    }
})