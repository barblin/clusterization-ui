<template>
  <div>
    <b-dropdown :text="$store.getters.clusters" class="mt-1 mr-1">
      <b-dropdown-item v-for="n in 9" :key="n" @click="onClusSel(n)" id="clusters">{{ n }}</b-dropdown-item>
    </b-dropdown>
    <label class="form-check-label" for="clusters"> Min clusters</label>
  </div>
</template>

<script>
import {col_map} from "../../services/colors";

export default {
  name: "Components",
  data() {
    return {
      col_map: col_map
    }
  },
  methods: {
    onClusSel(comp) {
      this.$store.commit('updateClusters', comp)
    }
  }
}
</script>

<style scoped>
</style>