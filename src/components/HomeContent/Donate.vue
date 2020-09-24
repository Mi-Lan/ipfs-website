<template>
  <v-sheet
      id="contact"
      color="#333333"
      dark
      tag="section"
      tile
  >
    <div class="py-12"></div>

    <v-container class="mx-auto">
      <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Contact Me</h2>

      <v-responsive
          class="mx-auto mb-12"
          width="56"
      >
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>
      <div class='title font-weight-regular text-center'> Feel free to get in touch! For any purpose whatsoever!
      </div>
      <div class="text-center green--text font-italic">milan.kripto@gmail.com</div>

      <v-btn @click="metamaskTransaction" class="mt-10 mb-5" color="teal darken-2" :loading="loader" rounded block
             primary>
        Donate
      </v-btn>


    </v-container>


  </v-sheet>
</template>

<script>
import ethers from "ethers";

export default {
  name: "Donate",
  data() {
    return {
      loader: false
    }
  },
  methods: {
    async metamaskTransaction() {
      this.loader = true;
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        try{
          await window.ethereum.enable()
        }catch{
          this.loader = false;
          return;
        }


        const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();

        const transactionParameters = {

          to: '0x26358E62C2eDEd350e311bfde51588b8383A9315', // Required except during contract publications.
          from: await signer.getAddress(), // must match user's active address.
          value: '10000000000000', // Only required to send ether to the recipient from the initiating external account.
        };
        try {
          await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
        } catch {
          this.loader = false;
        }
        this.loader = false;


      } else {
        console.log('display popup')
      }
      this.loader = false;
    }
  }
}
</script>

<style scoped>

</style>
