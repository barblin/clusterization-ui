<template>
  <span class="fixed">
      <span class="slider-margin">
        d(W): {{ wasserDist }} %
        <input type="range" min="0" max="5" step="0.01" class="slider" v-model="wasserDist" id="wasser-dist">
      </span>
      <span class="outlier-checkbox">
          <input type="checkbox" class="form-check-input" id="outliers" v-model="checked">
          <label class="form-check-label" for="outliers">Remove outliers</label>
      </span>
    <span v-if="checked">
      <br>
      <span class="slider-margin">
        STDV * {{ stdvMultiplier }}
        <input type="range" min="1" max="2" step="0.1" class="slider" v-model="stdvMultiplier" id="stdv-dist">
      </span>
    </span>
    </span>
</template>

<script>
export default {
  name: "sliders",
  props: ['wasserDist', 'checked', 'stdvMultiplier'],
  watch: {
    wasserDist: function (val) {
      this.$emit('wasserErrSelected', val)
    },
    checked: function (val) {
      this.$emit('checkedSelected', val)
    },
    stdvMultiplier: function (val) {
      this.$emit('stdvMultiplierSelected', val)
    },
  },
}
</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 300px;
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

.outlier-checkbox {
  margin-left: 30px;
  margin-right: 20px;
}

.form-check-input {
  margin-top: 18px;
}

.slider-margin {
  margin-left: 30px;
  margin-right: 10px;
}

.fixed {
  position: relative;
}
</style>