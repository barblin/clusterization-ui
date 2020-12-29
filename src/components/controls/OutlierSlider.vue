<template>
  <div>
    <div class="alert alert-dark slider">
      <label class="form-check-label mt-1">Remove outlier</label>
      <input type="checkbox" class="form-check-input mt-2" id="outliers" v-model="checked">
      <br>
      <span v-if="checked">
          <span class="badge font-size-md"> σ *  {{ stdvMultiplier }}</span>
          <input type="range" min="0" max="2" step="0.1" class="form-control-range" v-model="stdvMultiplier"
                 id="stdv-dist">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutlierSlider",
  data() {
    return {
      checked: this.$store.getters.checked,
      stdvMultiplier: this.$store.getters.stdvMultiplier
    }
  },
  watch: {
    checked: function (val) {
      this.$store.commit("updateChecked", val)
    },
    stdvMultiplier: function (val) {
      this.$store.commit("updateStdvMultiplier", val)
    }
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