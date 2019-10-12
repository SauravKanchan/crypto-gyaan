const startTimestamp = Date.now();
const ethers = require('ethers');
const config = require('./config.json');
const fs = require('fs-extra');

const provider = ethers.getDefaultProvider(config["network"]);

const wallet = new ethers.Wallet(config["private_key"], provider);
console.log(`Loaded wallet ${wallet.address}`);

let contract_name = "MyERC721";
erc721_address = "";

async function deploy(contract_name) {
    let compiled = require(`./build/${contract_name}.json`);

    console.log(`\nDeploying ${contract_name} in ${config["network"]}...`);
    let contract = new ethers.ContractFactory(
        compiled.abi,
        compiled.bytecode,
        wallet
    );
    if (contract_name === "MyERC721") {
        instance = await contract.deploy("Kanchan Coin", "KNK");
    } else {
        instance = await contract.deploy(erc721_address);
    }
    console.log(`deployed at ${instance.address}`);
    config[`${contract_name}`] = instance.address;
    console.log("Waiting for the contract to get mined...");
    await instance.deployed();
    console.log("Contract deployed");
    erc721_address = instance.address;
    fs.outputJsonSync(
        'config.json',
        config,
        {
            spaces: 2,
            EOL: "\n"
        }
    );

}

(async () => {
    await deploy("MyERC721");
    await deploy("CryptoGyaan");
})().catch(err => {
    console.error(err);
});