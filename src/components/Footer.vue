<template>
<div>
  <v-footer

      class="justify-center"
      color="#292929"
      height="100"
  >
    <div class="title font-weight-light grey--text text--lighten-1 text-center">
      &copy; {{ (new Date()).getFullYear() }} Hosted by IPFS
    </div>
  </v-footer>
</div>



</template>

<script>
export default {
name: "Footer"
}
</script>

<style scoped>

</style>
