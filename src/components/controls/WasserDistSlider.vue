<template>
  <div>
    <label class="mt-1" for="wasser-dist">d(W): {{ wasserDist }} %</label>
    <input type="range" min="0" max="5" step="0.01" class="form-control-range slider" v-model="wasserDist"
           id="wasser-dist">

    <label class="form-check-label mt-1">Remove outlier</label>
    <input type="checkbox" class="form-check-input mt-2" id="outliers" v-model="checked">
    <span v-if="checked">
      <br>
          <label for="stdv-dist"> stdv *  {{ stdvMultiplier }}</label>
          <input type="range" min="0" max="2" step="0.1" class="form-control-range slider" v-model="stdvMultiplier"
                 id="stdv-dist">
      </span>
  </div>
</template>

<script>
export default {
  name: "sliders",
  data (){
    return {
      wasserDist: this.$store.getters.wasserDist,
      checked: this.$store.getters.checked,
      stdvMultiplier: this.$store.getters.stdvMultiplier
    }
  },
  watch: {
    wasserDist: function (val) {
      this.$store.commit("updateWasserDist", val)
    },
    checked: function (val) {
      this.$store.commit("updateChecked", val)
    },
    stdvMultiplier: function (val) {
      this.$store.commit("updateStdvMultiplier", val)
    },
  },
}
</script>

<style scoped>

.form-check-input {
  margin-left: 1rem;
}

.slider {
  width: 260px;
}
</style>