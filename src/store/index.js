import Vue from 'vue'
import Vuex from 'vuex'
import {mainContract} from "../smart-contracts/deployment";

Vue.use(Vuex)

export default new Vuex.Store({

modules:{
    contracts:{
        state:{
            currentUserSC:  '0x0000000000000000000000000000000000000000'
        },
        mutations:{
            updateCurrentUserSc(state,user){
                state.currentUserSC=user;
            }
        },
        actions:{
            async fetchCurrentUserSC({commit}){
                const user = window.ethereum.selectedAddress;
                try {
                    await mainContract.scAndAccountAddress(user).then(res => {

                        commit('updateCurrentUserSc',res)
                    })
                } catch (e) {

                    console.log(e)
                }

            }
        }
    },
    metamask:{

        state: {
            metamaskCheckList: {
                isMetamaskInstalled: {bool:false,title:"Is metamask installed?",
                    subtitle:'Install metamask plugin from chrome store.'},
                isLoggedIn: {bool:false,title:"Are you logged in?",
    subtitle:"You need to login to metamask!"},
                isConnected: {bool:false,title:"Are you connected?",
                    subtitle:'Select metamask icon and click connect.'},
                isCorrectChain: {bool:false,title:"Are you on correct chain?",
                    subtitle:'Please select rinkeby testnet network!'},
                userExists: {bool:false,title:'Are you registered?',
                subtitle:'If everything else is good we will init you account!'}
            },
            stateLoaders: {
                isMetamaskInstalled: false,
                isLoggedIn: false,
                isConnected: false,
                isCorrectChain:false,
                userExists:false

            }
        },
        getters: {
            isInitializeReady(state){
                const {metamaskChecklist}=state;

                if(metamaskChecklist.isMetamaskInstalled.bool&&metamaskChecklist.isLoggedIn.bool&&metamaskChecklist.isConnected.bool&&metamaskChecklist.isCorrectChain.bool){
                    return true;
                }else{
                    return false;
                }

            }

        },
        mutations: {
            updateLoader(state, payload) {

                state.stateLoaders[payload.where] = payload
            },
            updateisMetamaskInstalledState(state, payload) {
                state.metamaskCheckList.isMetamaskInstalled.bool = payload;
            },
            updateisLoggedInState(state, payload) {
                state.metamaskCheckList.isLoggedIn.bool = payload;
            },
            updateIsConnected(state, payload) {

                state.metamaskCheckList.isConnected.bool = payload;
            },
            updateIsCorrectChain(state,payload){
                state.metamaskCheckList.isCorrectChain.bool=payload;
            },
            updateUserExists(state,payload){
                state.metamaskCheckList.userExists.bool=payload
            }
        },
        actions: {
            async metamaskChecker({dispatch,state,rootState,commit}){
                // eslint-disable-next-line no-constant-condition

                await dispatch('checkIfMetamaskIsInstalled')
                if(state.metamaskCheckList.isMetamaskInstalled){
                    console.log('Metamask Installed')
                    await dispatch('checkIfUserIsLoggedIn')
                    if(state.metamaskCheckList.isLoggedIn){
                        console.log('UserLoggedIn')
                        await dispatch('askAndCheckIfUSerIsConnected')
                        if(state.metamaskCheckList.isConnected){
                            console.log('is Connected')
                            await dispatch("checkIfOnCorrectChain")
                            if(state.metamaskCheckList.isCorrectChain){
                                console.log('on correct chain')
                                commit('updateLoader',{where:'userExists',bool:true})
                                await dispatch('fetchCurrentUserSC');
                                commit('updateLoader',{where:'userExists',bool:false})
                                if(rootState.contracts.currentUserSC!=="0x0000000000000000000000000000000000000000"){
                                    console.log('user exists')
                                    commit('updateUserExists',true)
                                }else{
                                    commit('updateUserExists',false)
                                    console.log('user doesent exist')
                                }
                            }

                        }

                    }
                }

                //call this function every 10 seconds in order to keep state of metamask updated
                setTimeout(async function () {
                    await dispatch('metamaskChecker');
                },5000);

            },
            async checkIfOnCorrectChain({commit}){
                commit('updateLoader',{where:'isCorrectChain',bool:true})
                if (window.ethereum.chainId == "0x4") {
                    commit('updateIsCorrectChain',true)
                }else{
                    commit('updateIsCorrectChain',false)
                }
                commit('updateLoader',{where:'isCorrectChain',bool:false})

            },
            async checkIfMetamaskIsInstalled({commit}) {
                commit("updateLoader", {where: 'isMetamaskInstalled', bool: true})
                const {ethereum}=window;

                if (ethereum && ethereum.isMetaMask) {
                    commit('updateisMetamaskInstalledState', true)
                } else {
                    commit('updateisMetamaskInstalledState', false)
                }
                commit("updateLoader", {where: 'isMetamaskInstalled', bool: false})
            },
            async checkIfUserIsLoggedIn({commit}) {
                commit("updateLoader", {where: 'isLoggedIn', bool: true})
                await window.ethereum._metamask.isUnlocked().then((bool) => {
                    commit("updateisLoggedInState", bool)
                })
                    .finally(() => {
                        commit("updateLoader", {where: 'isLoggedIn', bool: false})
                    })

            },
            async askAndCheckIfUSerIsConnected({commit, dispatch}) {
                commit("updateLoader", {where: 'isConnected', bool: true})
                await window.ethereum
                    .request({method: 'eth_accounts'})
                    .then(async (res) => {


                        if (res.length == 0) {
                            console.log('jere')
                            // await setTimeout(()=>{},10000);
                            await window.ethereum.request({method: 'eth_requestAccounts'})
                                .then(() => {
                                    commit('updateIsConnected', true);
                                })
                                .catch(() => {
                                    commit('updateIsConnected', false);
                                    console.log("You can go into metmask to accept connection!Reloading page in 10 seconds")
                                })
                        } else {

                            commit('updateIsConnected', true);
                        }
                    })
                    .catch((e) => {

                        console.log('cathces error', e);
                    })
                    .finally(() => {
                        dispatch('checkIfUserIsLoggedIn')
                        commit("updateLoader", {where: 'isConnected', bool: false})
                    })

            }
        }
    }
}



})
