<template>
  <v-content>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Buy Form</span>
          </v-card-title>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-card-text>
              <v-container>

                <v-text-field
                    v-model="buyObject.quantity"
                    label="Quantity"
                    type="number"
                    hint="desired quantity"
                    :rules="[v => !!v || 'Quantity is required']"
                    persistent-hint
                    required
                ></v-text-field>

                <v-text-field
                    type="string"
                    v-model="buyObject.userData"
                    label="User Data"
                    hint="address for shipping"
                    :rules="[v => !!v || 'Shipping data is required']"
                    persistent-hint
                    required
                ></v-text-field>

              </v-container>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text :disabled="!valid" @click="formValidate()" >Buy</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
<!--    above is dialog-->
    <v-container style="margin-top: 70px;">
      <v-row>
        <v-col v-for="item in arrayOfProducs" :key="item.index+item.price+item.quantity" class="col-md-6 col-lg-6 col-sm-6 col-xs-12">
          <v-card>
            <v-list-item>

              <v-list-item-content>
                <v-list-item-title class="headline">{{item.name}}</v-list-item-title>
                <v-list-item-subtitle>#{{item.index}}</v-list-item-subtitle>
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
                  @click="dialog=true, buyObject.contract=item.smartContract,buyObject.price=item.price,buyObject.index=item.index"
              >
                BUY
              </v-btn>


              <v-spacer></v-spacer>
              <v-card-text>
                Price: {{item.price}}
              </v-card-text>
              <v-card-text>
                Quantity:{{item.quantity}}
              </v-card-text>
            </v-card-actions>
          </v-card>
        </v-col>


      </v-row>
    </v-container>
  </v-content>

</template>

<script>
import {mainContract, userContract} from "../../smart-contracts/deployment"
//ovde ce biti komponenta za prikazivanje svih postavljenih oglasa
export default {
  name: "MainStore"
  ,
  data(){
    return {
      arrayOfProducs:[],
      dialog:false,
      valid:true,
      buyObject:{
      },
      overrides:{
        value:0
      }
    }
  },
  methods:{
    handleMessage(publicAddress, nonce){

        return new Promise((resolve, reject) =>
            window.web3.personal.sign(
                window.web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
                publicAddress,
                (err, signature) => {
                  if (err) return reject(err);
                  return resolve({ publicAddress, signature });
                }
            )
        );

    },
    async buyItem(){
      const {price,quantity,index,contract,userData}=this.buyObject;
      let contractInterface=await userContract(contract);

      let calculatedValue=(price*quantity)*2;

      this.overrides.value=calculatedValue;
       contractInterface.acceptPaymentAndEmitEvent(index,+quantity,userData,this.overrides);
    },
    formValidate(){

      if(this.$refs.form.validate()){
        this.dialog=false;
        this.buyItem();
      }
    },
    async smartContractFetching(){
      await mainContract.returnAllSmartContracts().then((res)=>{
        this.smartContractIterator(res);
      })
    },
    async smartContractIterator(arrayOfContracts){
        for(var address of arrayOfContracts){

          let contractInterface = await userContract(address)

          contractInterface.returnArrayOfItems().then(res => {

            for(var item of res){

              this.arrayOfProducs.push({
                smartContract:address,
                price:parseInt(item.priceWei),
                name:item.name,
                quantity:parseInt(item.quantity),
                description:item.description,
                imageUrl:item.imageUrl,
                index:parseInt(item.index)
              })
            }
          })
        }
    }
  },
  mounted(){
    console.log(window.ethereum.selectedAddress)
    this.handleMessage("0x90d16E094Ee5026517d85C3386bB096F17E3f60c",1232452)





    this.smartContractFetching()
  }

}
</script>

<style scoped>

</style>
