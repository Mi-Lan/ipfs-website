const path=require('path');
const fs=require('fs');
const solc=require('solc')


const mainHub=path.resolve(__dirname,'erc20.sol');
const source=fs.readFileSync(mainHub,'utf-8');

const input = {
    language: "Solidity",
    sources: {
        "erc20Impl.sol": {
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

//const erc20Abi=output.contracts['erc20Impl.sol'].ERC20Token.abi;
const erc20Bytecode=output.contracts['erc20Impl.sol']
console.log(erc20Bytecode)
const stringified=JSON.stringify(erc20Bytecode);
console.log(stringified)

// const stringified=JSON.stringify(erc20Abi);
//
// fs.writeFile(path.resolve(__dirname, `./compiled-contracts/${item.file}`), stringified, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved.");
// });

//console.log(output.contracts['erc20Impl.sol'].ERC20Token.abi)
