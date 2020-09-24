<template>
  <section id="stats">
    <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
        :src="require('../../assets/coolDude.jpeg')"
    >
      <v-container fill-height>
        <v-row class="mx-auto">
          <v-col

          >
            <div class="text-center">
              <div
                  class="display-3 font-weight-black mb-4"

              >IDEA
              </div>

              <div
                  class="title font-weight-regular text-uppercase"

              >Hmmmm...
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </section>
</template>

<script>
export default {
name: "Idea"
}
</script>

<style scoped>

</style>
