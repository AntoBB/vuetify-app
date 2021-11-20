<template>
<GmapMap
  :center="{lat:44.10, lng:12.51}"
  :zoom="7"
  map-type-id="hybrid"
  style="width: 1280px; height: 650px"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />
</GmapMap>
</template>

<script>
  export default {
    mounted () {
      // At this point, the child GmapMap has been mounted, but
      // its map has not been initialized.
      // Therefore we need to write mapRef.$mapPromise.then(() => ...)

      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({lat: 1.38, lng: 103.80})
      })
    }
  }
</script>