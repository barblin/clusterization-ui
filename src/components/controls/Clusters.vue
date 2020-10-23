<template>
  <span>
    | Min clusters
    <b-dropdown :text="numClusters" class="m-md-2">
      <b-dropdown-item v-for="n in 11" :key="n" @click="onClusSel(n)">{{ n }}</b-dropdown-item>
    </b-dropdown>
  </span>
</template>

<script>
import {col_map} from "../../services/colors";

export default {
  name: "Components",
  props: ['numClusters'],
  data() {
    return {
      col_map: col_map
    }
  },
  methods: {
    onClusSel(comp) {
      this.$emit('clusSelected', comp)
    }
  }
}
</script>

<style scoped>

</style>