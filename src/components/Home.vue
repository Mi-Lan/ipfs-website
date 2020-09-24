<template>
  <div id="app">
      <v-content class="ma-0 pa-0">
        <section id="hero">
          <v-row no-gutters>
            <v-img
                :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
                :src="require('../assets/universe.jpeg')"
            >
              <v-theme-provider dark>
                <v-container fill-height>
                  <v-row
                      align="center"
                      class="white--text mx-auto"
                      justify="center"
                  >
                    <v-col
                        class="white--text text-center"
                        cols="12"
                        tag="h1"
                    >
                    <span
                        :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                        class="font-weight-light"
                    >
                      FULLY
                    </span>

                      <br>

                      <span
                          :class="[$vuetify.breakpoint.smAndDown ? 'display-1': 'display-4']"
                          class="font-weight-black"
                      >
                      DECENTRALIZED
                    </span>

                    </v-col>

                    <v-btn
                        class="align-self-end"
                        fab
                        outlined
                        @click="$vuetify.goTo('#about-me')"
                    >
                      <v-icon>mdi-chevron-double-down</v-icon>
                    </v-btn>
                  </v-row>
                </v-container>
              </v-theme-provider>
            </v-img>
          </v-row>
        </section>

    <AboutMe/>


        <Idea/>

        <Blog/>
      <Donate/>

      </v-content>

  </div>

</template>

<script>
import AboutMe from "@/components/HomeContent/AboutMe";
import Idea from "@/components/HomeContent/Idea";
import Blog from "@/components/HomeContent/Blog";
import Donate from "@/components/HomeContent/Donate";

export default {
  components: {Donate, Blog, Idea, AboutMe},

}
</script>




