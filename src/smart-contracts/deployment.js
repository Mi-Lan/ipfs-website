const ethers = require('ethers');
const mainAbi = require("./compiled-contracts/mainHubAbi.json");
const mainBytecode = require("./compiled-contracts/mainHubBytecode.json");
const userAbi = require('./compiled-contracts/userAbi.json');
const userBytecode = require("./compiled-contracts/userBytecode.json");

const web3Provider=new ethers.providers.Web3Provider(window.ethereum);
const signer = (web3Provider).getSigner();
const mainInstance = new ethers.ContractFactory(mainAbi, mainBytecode, signer);
const mainContract=new ethers.Contract("0xFbF134EBcea79eA70C98cB4C3693FAEf4448B83c", mainAbi, signer);
const userInstance = new ethers.ContractFactory(userAbi, userBytecode, signer);


async function userContract(address) {
    try{
        return new ethers.Contract(address, userAbi, signer)
    }catch(e){
        console.log(e)
    }
}


module.exports = {mainInstance, mainContract, userInstance, userContract,signer};
// module.exports=ethersInstance;







