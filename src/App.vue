<template>
  <div id="app">
    <div v-if="isSandbox()">
      <button type="button" class="btn btn-info mode-button rounded-0"
              @click="switchToCustomer()">
        <font-awesome-icon icon="home"/> Journey-Mode
      </button>
      <sandbox></sandbox>
    </div>
    <div v-else-if="isCustomer()">
      <div class="row">
        <div class="col-md-1">
          <button type="button" class="btn btn-info mode-button rounded-0" @click="switchToSandbox()">
            <font-awesome-icon icon="tools"/> Pro-Mode
          </button>
        </div>
        <progress-bar></progress-bar>
      </div>
      <customer></customer>
    </div>
  </div>
</template>

<script>
import Sandbox from "@/components/dashboards/sandbox";
import Customer from "@/components/dashboards/customer";
import Progress from "@/components/controls/Progress";
import {MODES} from "./services/modes";
import {PROGRESS} from "./services/progress";

export default {
  name: "app",
  components: {
    'sandbox': Sandbox,
    'customer': Customer,
    'progress-bar':Progress
  },
  data() {
    return {
      mode: MODES.CUSTOMER,
      modes: MODES
    }
  },
  methods: {
    isCustomer() {
      return this.mode.valueOf() === MODES.CUSTOMER.valueOf()
    },
    isSandbox() {
      return this.mode.valueOf() === MODES.EXPERT.valueOf()
    },
    switchToCustomer(){
      this.$store.commit('updatePlot', {})
      this.$store.commit('updateViewSel', PROGRESS.START)
      this.mode= this.modes.CUSTOMER
    },
    switchToSandbox(){
      this.$store.commit('updatePlot', {})
      this.$store.commit('updateViewSel', PROGRESS.SIMPLE_PLOT)
      this.$store.commit('updateFileSel', "Select File")
      this.$store.commit('height', 800)
      this.$store.commit('width', 1500)
      this.mode= this.modes.EXPERT
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.mode-button {
  width: 100%;
  height:70px;
}
</style>
