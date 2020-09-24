<template>
  <!--needs rework-->
  <section id="blog">
    <div class="py-12"></div>

    <v-container>
      <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Articles</h2>

      <v-responsive
          class="mx-auto mb-12"
          width="56"
      >
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>

      <v-row>
        <v-col
            v-for="({ src, text, title }, i) in articles"
            :key="i"
            cols="12"
            md="4"
        >
          <v-img
              :src=src
              class="mb-4"
              height="275"
              max-width="100%"
          ></v-img>

          <h3
              class="font-weight-black mb-4 text-uppercase"
              v-text="title"
          ></h3>

          <div
              @click="expand"
              class="title font-weight-light mb-5 d-inline-block"
              style="text-overflow: ellipsis;height:193px;"
              :style="{overflow:whatIsOverflow}"
              v-text="text"

          ></div>

        </v-col>
      </v-row>
    </v-container>

    <div class="py-12"></div>
  </section>
</template>

<script>
export default {
  name: "Blog",

  methods: {
    expand() {
      if (this.whatIsOverflow == 'hidden') {
        this.whatIsOverflow = "visible";
      } else {
        this.whatIsOverflow = "hidden";
      }
    }
  },
  data() {
    return {
      whatIsOverflow: 'hidden',
      articles: [
        {
          src: require('../../assets/ipfs+ens.png'),
          title: 'Ipfs+Ens for hosting decentralized website',
          text: 'Here i will try to explain how i did this without going too much into detail. First i registered decentralized ethereum domain over ens, which costs about 5 bucks. Then i uploaded vue project dist file to ipns. Ipns is subset of ipfs and its a bit different in that you have root hash which points to somewhere, and you can change where it points to. That is useful because when you later input that hash into ens content you dont have to pay everytime you make small change to website. But can just tell that hash to look at different hash for project. And at the end we connect that hash to the ens domain over ens service.',
        },

        {
          src: require('../../assets/metmask.png'),
          title: 'Metamask transactions',
          text: 'I also use ethers library for donate button to initialize transaction for donation. You just need to have metamask extension with wallet and money on it!',
        },
        {
          src: require('../../assets/lightbulb.jpg'),
          title: 'More ideas',
          text: 'Im thinking about more ideas but this is just boilerplate and done in a day of work. Main focus is deploying this beast!',
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
