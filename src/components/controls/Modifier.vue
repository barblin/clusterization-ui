<template>
  <div>
    <div class="alert alert-dark">
      <label class="mt-1" for="wasser-dist">W(v,u) - margin from min W</label>
      <br>
      <span class="badge font-size-md">{{ wasserDist }} %</span>
      <input type="range" min="0" max="5" step="0.01" class="form-control-range slider" v-model="wasserDist"
             id="wasser-dist">
    </div>
    <div class="alert alert-dark">
      <label class="form-check-label mt-1">Remove outlier</label>
      <input type="checkbox" class="form-check-input mt-2" id="outliers" v-model="checked">
      <br>
      <span v-if="checked">
          <span class="badge font-size-md"> σ *  {{ stdvMultiplier }}</span>
          <input type="range" min="0" max="2" step="0.1" class="form-control-range slider" v-model="stdvMultiplier"
                 id="stdv-dist">
      </span>
    </div>
    <div class="alert alert-dark">
      <label class="form-check-label mt-1">Normalize neighbour dists </label>
      <input type="checkbox" class="form-check-input mt-2" id="normalize" v-model="normalizeNeighDist">
    </div>
  </div>
</template>

<script>
export default {
  name: "sliders",
  data() {
    return {
      wasserDist: this.$store.getters.wasserDist,
      checked: this.$store.getters.checked,
      stdvMultiplier: this.$store.getters.stdvMultiplier,
      normalizeNeighDist: this.$store.getters.normalizeNeighDist,
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
    normalizeNeighDist: function (val) {
      this.$store.commit("updateNormalizeNeighDist", val)
    }
  },
}
</script>

<style scoped>

.form-check-input {
  margin-left: 1rem;
}

.slider {
  width: 230px;
}

.font-size-md {
  font-size: 18px;
}
</style>