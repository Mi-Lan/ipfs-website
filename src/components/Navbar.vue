<template>
  <v-app-bar
      app
      color="#00ACC1"
      height="50"
  >
    <v-avatar
        class="mr-3"
        color="transparent"
        size="50"
    >
      <v-img
          @click="$router.push('/')"
          contain
          max-height="70%"
          :src="require('../assets/ipfs-icon-png.png')"
      ></v-img>
    </v-avatar>

    <v-toolbar-title class="font-weight-black headline white--text " color="white !important;" collapse>
      <span @click="$router.push('MainStore')" color="white" >MILAN RAŠOVIĆ</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title  class="mr-5 font-weight-black headline white--text " color="white !important;" collapse>
      <button @click="$router.push('MainStore')" color="white" >Marketplace</button>
    </v-toolbar-title>
    <v-toolbar-title class="font-weight-black headline white--text " color="white !important;" collapse>
      <button @click="$router.push('SelfItems')" color="white" >Your Items</button>
    </v-toolbar-title>
  </v-app-bar>

</template>

<script>
export default {
  name: "Navbar",
}
</script>

<style scoped>

</style>
