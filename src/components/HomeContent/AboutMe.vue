<template>
  <section id="about-me">
    <div class="py-12"></div>

    <v-container class="text-center">
      <h2 class="display-2 font-weight-bold mb-3">ABOUT</h2>

      <v-responsive
          class="mx-auto mb-8"
          width="56"
      >
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>

      <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
      >
        Hello my name is Milan. I am Front-end developer from Serbia with passion for decentralized technology!
        This is simple site to demonstrate to myself and world that it is possible to make fully decentralized
        website that isn't slow and is functional...hopefully! I used: IPFS-for hosting, ENS-domain,
        Vue+Vuetify-frontend.
      </v-responsive>

      <v-avatar
          class="elevation-12 mb-12"
          size="128"
      >
        <v-img :src="require('../../assets/randomlogo.png')"></v-img>
      </v-avatar>

      <div></div>

      <v-btn
          color="grey"
          href="/Milan-Rašović-CV-final.pdf" download
          outlined
          large
      >

            <span class="grey--text text--darken-1 font-weight-bold">
              CV
            </span>
      </v-btn>
    </v-container>

    <div class="py-12"></div>
  </section>
</template>

<script>
export default {
name: "AboutMe"
}
</script>

<style scoped>

</style>
