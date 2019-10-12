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
            assert.ok(parseInt(await erc721.functions.totalSupply()) === i + 1, `total supply is ${i + 1}`);
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

    it('Add new order', async () => {
        let tx1 = await erc721.functions.approve(cryptoGyaan.address, 0);
        await tx1.wait();
        let tx2 = await cryptoGyaan.functions.place_order(0, 10 ** 8);
        await tx2.wait();

        let tx3 = await erc721.functions.approve(cryptoGyaan.address, 1);
        await tx3.wait();
        let tx4 = await cryptoGyaan.functions.place_order(1, 10 ** 8);
        await tx4.wait();

        assert.ok(await cryptoGyaan.functions.total_order(0), "Order placed");
    });


    it('Buy order with incorrect amount', async () => {
        try {
            let tx = await cryptoGyaan.functions.buy_order(0, {value: 1});
            await tx.wait();
            assert.ok(await cryptoGyaan.functions.total_order(0), "Buy order")
        } catch (e) {
            assert.ok(e.message.includes('revert'), e.message)
        }
    });

    it('Buy order with correct amount', async () => {
        let tx = await cryptoGyaan.functions.buy_order(0, {value: 10 ** 8});
        await tx.wait();
        assert.ok(await cryptoGyaan.functions.total_order(0), "Buy order")
    });

    it('Buy order with correct amount but same order', async () => {
        try {
            let tx = await cryptoGyaan.functions.buy_order(0, {value: 10 ** 8});
            await tx.wait();
            assert.ok(await cryptoGyaan.functions.total_order(0), "Buy order")
        } catch (e) {
            // console.log(await cryptoGyaan.functions.total_order(0));
            assert.ok(e.message.includes('revert'), e.message)
        }
    });

    it('Cancel Order unsold', async () => {
        let tx = await cryptoGyaan.functions.cancel_order(1);
        await tx.wait();
        let order = await cryptoGyaan.functions.total_order(1)
        assert.ok(order.status === 3, "Check status of order to cancel");
    });

    it('Cancel Order sold', async () => {
        try {
            let tx = await cryptoGyaan.functions.cancel_order(0);
            await tx.wait();
        }catch (e) {
            let order = await cryptoGyaan.functions.total_order(0);
            assert.ok(order.status === 2, "Check status of order to sold");
        }
    });

    it('Cancel Order cancelled', async () => {
        try {
            let tx = await cryptoGyaan.functions.cancel_order(1);
            await tx.wait();
        }catch (e) {
            let order = await cryptoGyaan.functions.total_order(1);
            assert.ok(order.status === 3, "Check status of order to cancelled");
        }
    });

});

