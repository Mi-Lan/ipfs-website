const path=require('path');
const fs=require('fs');
const solc=require('solc')


const mainHub=path.resolve(__dirname,'mainHub.sol');
const source=fs.readFileSync(mainHub,'utf-8');

const input = {
    language: "Solidity",
    sources: {
        "mainHub.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

const userAbi=output.contracts["mainHub.sol"].User.abi;
const userBytecode=output.contracts["mainHub.sol"].User.evm.bytecode;
const mainAbi=output.contracts["mainHub.sol"].mainHub.abi;
const mainBytecode=output.contracts["mainHub.sol"].mainHub.evm.bytecode;
// console.log(mainBytecode)
const arrayOfAbis=[
    {
        file:"userAbi.json",
        extension:userAbi
    },
    {
        file:"userBytecode.json",
        extension: userBytecode
    },
    {
        file:"mainHubAbi.json",
        extension:mainAbi
    },
    {
        file:"mainHubBytecode.json",
        extension: mainBytecode
    }
]
for(var item of arrayOfAbis){
    fs.unlinkSync(`./compiled-contracts/${item.file}`)

    const stringified=JSON.stringify(item.extension);

    fs.writeFile(path.resolve(__dirname, `./compiled-contracts/${item.file}`), stringified, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

}

