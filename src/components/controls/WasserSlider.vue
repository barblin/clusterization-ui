<template>
  <div>
    <div class="alert alert-dark slider">
      <label class="mt-1" for="wasser-dist">W(v,u) - margin from min W</label>
      <br>
      <span class="badge font-size-md">{{ wasserDist }} %</span>
      <input type="range" min="0" max="10" step="0.01" class="form-control-range" v-model="wasserDist"
             id="wasser-dist">
    </div>
  </div>
</template>

<script>
export default {
  name: "WasserSlider",
  data() {
    return {
      wasserDist: this.$store.getters.wasserDist,
    }
  },
  watch: {
    wasserDist: function (val) {
      this.$store.commit("updateWasserDist", val)
    },
  },
}
</script>

<style scoped>

.form-check-input {
  margin-left: 1rem;
}

.slider {
  width: 250px;
}

.font-size-md {
  font-size: 18px;
}
</style>