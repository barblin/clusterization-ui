<template>
  <span>
      d(W): {{ wasserDist * 100 }} %
      <input type="range" min="0.1" max="1" step="0.1" class="slider" v-model="wasserDist" id="wasser-dist">
      d(E): {{ euclidDist * 100 }} %
      <input type="range" min="0.1" max="1" step="0.1" class="slider" v-model="euclidDist" id="euclid-dist">
    </span>
</template>

<script>
export default {
  name: "sliders",
  props: ['wasserDist', 'euclidDist'],
  watch: {
    wasserDist: function (val) {
      this.$emit('wasserErrSelected', val)
    },
    euclidDist: function (val) {
      this.$emit('distErrSelected', val)
    }
  },
}
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100px;
  height: 15px;
  margin-left: 10px;
  margin-right: 20px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: #4CAF50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4CAF50;
  cursor: pointer;
}
</style>