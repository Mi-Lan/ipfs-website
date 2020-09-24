<template>
  <v-content>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Product Form</span>
          </v-card-title>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-card-text>
              <v-container>

                <v-text-field
                    v-model="productObject.name"
                    label="Product Name"
                    type="string"
                    hint="enter name of your product"
                    :rules="[v => !!v || 'Name is required']"
                    persistent-hint
                    required
                ></v-text-field>

                <v-text-field
                    type="number"
                    v-model="productObject.price"
                    label="Price"
                    hint="specify price of product"
                    :rules="[v => !!v || 'Price is required']"
                    persistent-hint
                    required
                ></v-text-field>

                <v-text-field
                    v-model="productObject.description"
                    label="Description"
                    type="string"
                    hint="brief product description"
                    :rules="[v => !!v || 'Description is required']"
                    persistent-hint
                    required
                ></v-text-field>


                <v-text-field
                    type="number"
                    v-model="productObject.quantity"
                    :rules="[v => !!v || 'Quantity is required']"
                    label="Quantity"
                    hint="quantity of product at disposal"
                    persistent-hint
                    required
                ></v-text-field>

                <v-text-field
                    type="string"
                    :rules="[v => !!v || 'Url is required']"
                    v-model="productObject.image"
                    label="Image Url"
                    hint="url of image for your product"
                    persistent-hint
                    required
                ></v-text-field>

              </v-container>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text :disabled="!valid" @click="formValidate()">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- Card element -->
    <v-container style="margin-top: 70px;">
      <v-row>
        <v-col v-for="item in productsFetched" :key="item.index" class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
          <v-card>
            <v-list-item>

              <v-list-item-content>
                <v-list-item-title class="headline">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>#{{ item.index }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
                :src=item.imageUrl
                height="194"
            ></v-img>

            <v-card-text>
              {{ item.description }}
            </v-card-text>

            <v-card-actions>
              <v-btn
                  text
                  color="deep-purple accent-4"
              >
                EDIT
              </v-btn>


              <v-spacer></v-spacer>
              <v-card-text>
                Price: {{ item.price }}
              </v-card-text>
              <v-card-text>
                Quantity:{{ item.quantity }}
              </v-card-text>
            </v-card-actions>
          </v-card>
        </v-col>


      </v-row>
    </v-container>


    <v-btn v-if="this.currentUserSC!='0x0000000000000000000000000000000000000000'||this.currentUserSC==''"
           :loading="loader" block color="success" style="margin-top:70px;" @click="dialog=true" dark>Add New Item
    </v-btn>
    <v-btn v-else :loading="loader" color="success" style="margin-top:70px;" block @click="intitializeAccount">
      Intitialize account
    </v-btn>
    <!--    <v-dialog-->
    <!--        v-model="dialogError"-->
    <!--        max-width="290"-->
    <!--    >-->
    <!--      <v-card>-->
    <!--        <v-card-title class="headline">{{ dialogue.title }}</v-card-title>-->

    <!--        <v-card-text>-->
    <!--          {{dialogue.text}}-->
    <!--        </v-card-text>-->

    <!--        <v-card-actions>-->
    <!--          <v-spacer></v-spacer>-->

    <!--          <v-btn-->
    <!--              color="green darken-1"-->
    <!--              text-->
    <!--              @click="dialogError = false"-->
    <!--          >-->
    <!--           OK-->
    <!--          </v-btn>-->
    <!--        </v-card-actions>-->
    <!--      </v-card>-->
    <!--    </v-dialog>-->
    <v-overlay

        opacity="0,59"
        :value="overlay.display"
        z-index="10"
    >
      <v-card
          class="mx-auto"
          max-width="400"
          tile
      >

        <v-list
            dense
            two-line
            subheader
            rounded
        >
          <v-subheader>METAMASK CHECKLIST</v-subheader>
          <v-list-item-group v-model="overlay.item" color="primary">
            <v-list-item
                v-for="(item, i) in current"
                :key="i"
            >
              <v-list-item-avatar>
                <v-responsive
                    :class="item.bool ? 'green' : 'red'"

                    class="text-center  lighten-2 rounded-circle d-inline-flex align-center justify-center ma-3"
                    height="20"
                    width="20"
                >

                </v-responsive>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-btn
          v-if="isInitializeReady"
          color="primary"
          @click="click()"
      >
        Initialize User
      </v-btn>
    </v-overlay>
  </v-content>


</template>

<script>
//ovde znaci hvatamo individualne oglase za item-e
import {mapActions, mapState,mapGetters} from 'vuex';

import {mainContract, userContract} from "../../smart-contracts/deployment"

export default {
  name: "SelfItems",
  data() {
    return {

      overlay: {
        item: 5,
        display: true
      },
      loader: true,
      valid: true,
      productObject: {},
      productsFetched: [],
      currentUserSC: '',
      userItems: [],
      dialogError: false,
      dialogue: {
        text: '',
        title: ''
      },
      dialog: false,
      overrides: {
        value: 10000
      }

    }
  },
  computed: {
    gapBridger() {
      console.log('here')
      return false
    },
    ...mapGetters(['isInitializeReady']),

    ...mapState(
        {
          current:state=>state.metamask.metamaskCheckList,
          installed: state => state.metamask.metamaskCheckList.isMetamaskInstalled,
          logged: state => state.metamask.metamaskCheckList.isLoggedIn,
          connected: state => state.metamask.metamaskCheckList.isConnected,
          chain: state => state.metamask.metamaskCheckList.isCorrectChain,
          userExist: state => state.metamask.metamaskCheckList.userExists,
        }
    )
  },
  methods: {
    ...mapActions(['metamaskChecker',/*'fetchCurrentUserSC'*/]),

    formValidate() {

      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.addItemToCurrentUser()

      }
    },
    async addItemToCurrentUser() {
      let contractInterface = await userContract(this.currentUserSC)

      const {name, price, quantity, description, image} = this.productObject;

      await contractInterface.addItem(price, description, quantity, image, name);
    },
    async intitializeAccount() {
      mainContract.createNewUser(this.overrides);
    },

    async fetchAllItemsFromContract() {

      if (this.currentUserSC != 0x0000000000000000000000000000000000000000) {
        let contractInterface = await userContract(this.currentUserSC)

        contractInterface.returnArrayOfItems().then(res => {

          for (var item of res) {

            this.productsFetched.push({
              price: parseInt(item.priceWei),
              name: item.name,
              quantity: parseInt(item.quantity),
              description: item.description,
              imageUrl: item.imageUrl,
              index: parseInt(item.index)
            })
          }
        })
      } else {
        console.log('jhere')
      }


    },

    async checkIfUserExistsOnContract() {

      const user = window.ethereum.selectedAddress;

      try {
        await mainContract.scAndAccountAddress(user).then(res => {

          this.currentUserSC = res;
          this.loading = false;
          if (res == '0x0000000000000000000000000000000000000000') {
            return false;
          } else {
            return true;
          }
        })
      } catch (e) {

        console.log(e)
      }


    }
  },

  async mounted() {
    await this.metamaskChecker()
    // await this.fetchCurrentUserSC()

    //reload on account and chain change
    let currentChain = window.ethereum.chainId;
    window.ethereum.on('chainChanged', (_chainId) => ((_chainId == currentChain) ? console.log('all is good') : window.location.reload()));
    window.ethereum.on('accountsChanged', () => window.location.reload());

    //console.log(this.metamaskCheckList.isConnected);
    // console.log(window.ethereum.isConnected())
    // try{
    //   await window.ethereum.request({ method: 'eth_requestAccounts' })
    // }
    // catch (e) {
    //   console.log(e)
    //   this.dialogError=true
    // }
    //
    // window.ethereum._metamask.isApproved().then((res)=>{
    //   console.log('isApproved',res)
    // })
    // console.log("isEnabled",window.ethereum._metamask.isEnabled())
    // window.ethereum._metamask.isUnlocked().then((res)=>{
    //   console.log('isUnlocked',res)
    // })

    //console.log(await window.ethereum.request({method: 'eth_requestAccounts'}));

    // if (window.ethereum.isMetaMask) {
    //   await window.ethereum.request({method: 'eth_requestAccounts'});
    //   let currentChain = window.ethereum.chainId;
    //   //let currentAccount=window.ethereum.selectedAddress;
    //   await window.ethereum.enable()
    //   console.log('MetaMask is installed!');
    //   window.ethereum.on('chainChanged', (_chainId) => ((_chainId == currentChain) ? console.log('all is good') : window.location.reload()));
    //   window.ethereum.on('accountsChanged', () => window.location.reload());
    //
    //   if (window.ethereum.chainId == "0x4") {
    //     console.log('On correct chain!')
    //
    //     await this.checkIfUserExistsOnContract()
    //
    //     if (this.currentUserSC) {
    //
    //       //pokreni funkciju koja pokrece user smart contract i vraca sve item-e na njemu
    //       this.fetchAllItemsFromContract();
    //
    //     } else {
    //       this.loader = false;
    //       //otkrij dugme koje ce da inicijalizuje smart contract za pravljenje novog user-a
    //     }
    //
    //
    //   } else {
    //     console.log('You need to switch to Rinkeby testnet network! And add some ethereum with rinkeby faucet to the appropiate wallet!')
    //   }
    // } else {
    //   console.log('here')
    //
    //   this.dialogue.text='You need to have metamask browser extension installed with network set to rinkeby!';
    //   this.dialogue.title='METAMASK NOT INSTALLED';
    //   this.dialogError=true;
    //   await window.ethereum.enable();
    //
    // }
    this.loader = false;

  }
}
</script>

<style scoped>

</style>
