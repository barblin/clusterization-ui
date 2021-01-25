<template>
  <div class="col">
    <div class="progress rounded-0" style="height:40px">
      <div v-if="$store.getters.isPSimple" class="progress-bar bg-danger" role="progressbar"
           style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Simple Plot</div>
      <div v-if="$store.getters.isPDelaunay" class="progress-bar bg-warning" role="progressbar" style="width: 15%"
           aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Delaunay Triangulation</div>
      <div v-if="$store.getters.isPMinTree" class="progress-bar rounded-0" role="progressbar" style="width: 20%"
           aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Minimum Spanning Tree</div>
      <div v-if="$store.getters.isPMinTreeWasser" class="progress-bar bg-info rounded-0" role="progressbar"
           style="width: 15%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Minimum Spanning Tree by water distance</div>
      <div v-if="$store.getters.isPClusterWasser" class="progress-bar bg-success rounded-0" role="progressbar"
           style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Sort by distance and cluster by water distance</div>
      <div v-if="$store.getters.isPVar" class="progress-bar bg-dark rounded-0" role="progressbar" style="width: 15%"
           aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Compare to original plot</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Progress",
  methods: {
  }
}
</script>

<style scoped>
</style>