const assert = require('assert');
const ethers = require('ethers');

const ganache = require('ganache-cli');
const provider = new ethers.providers.Web3Provider(ganache.provider({gasLimit: 8000000}));

const ercJson = require('../build/MyERC721');
const cryptoGyaanJson = require('../build/CryptoGyaan');

let wallet, erc721, cryptoGyaan, accounts;

describe('Ganache Setup', async () => {
    it('initiates ganache and generates a bunch of demo accounts', async () => {
        accounts = await provider.listAccounts();
        wallet = provider.getSigner(accounts[0]);
        assert.ok(accounts.length >= 2, 'atleast 2 accounts should be present in the array');
    });
});

describe('ERC721', async () => {
    it('deploy ERC721', async () => {
        const ERCContract = new ethers.ContractFactory(
            ercJson.abi,
            ercJson.bytecode,
            wallet
        );
        erc721 = await ERCContract.deploy("Kanchan Coin", "KNK");
        await erc721.deployed();
        assert.ok(erc721.address, 'ERC721 deployed');
    });
    it('Make 4 new token', async () => {
        for (let i = 0; i < 4; i++) {
            let tx = await erc721.functions.mintUniqueTokenTo(accounts[0], "https://saurav.tech/");
            await tx.wait();
            assert.ok(parseInt( await  erc721.functions.totalSupply()) === i+1, `total supply is ${i+1}`);
        }
    });
});

describe('Crypto Gyaan', async () => {
    it('deploy Crypto Gyaan', async () => {
        const cryptoGyaanContract = new ethers.ContractFactory(
            cryptoGyaanJson.abi,
            cryptoGyaanJson.bytecode,
            wallet
        );
        cryptoGyaan = await cryptoGyaanContract.deploy(erc721.address);
        await cryptoGyaan.deployed();
        assert.ok(cryptoGyaan.address, 'crypto gyaan deployed');
    });
});

