<template>
  <div>
    <div class="alert alert-dark slider">
      Plot for W(v,u) - margin
      <div class="form-group marg-top">
        <input type="number" :min="0" :max="5" step="0.01" lang="en-150"
               id="rangeFrom" placeholder="Margin from" v-model="varsFrom">
        From %
      </div>
      <div class="form-group">
        <input type="number" :min="0" max="5" step="0.01" lang="en-150"
               placeholder="Margin until" v-model="varsUntil">
        Until %
      </div>
      <div class="form-group">
        <input type="number" min="0.01" :max="$store.getters.varsUntil" lang="en-150"
               step="0.01" placeholder="Step size" v-model="varsStepSize">
        Step size
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vars-slider",
  data() {
    return {
      varsFrom: this.$store.getters.varsFrom,
      varsUntil: this.$store.getters.varsUntil,
      varsStepSize: this.$store.getters.varsStepSize
    }
  },
  watch: {
    varsFrom: function (val) {
      this.$store.commit("updateVarsFrom", val)
    },
    varsUntil: function (val) {
      this.$store.commit("updateVarsUntil", val)
    },
    varsStepSize: function (val) {
      this.$store.commit("updateStepSize", val)
    }
  },
}
</script>

<style scoped>

.marg-top {
  margin-top: 1rem;
}

.slider {
  width: 230px;
}

</style>
