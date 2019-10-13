<script>
    export let address;

    import {onMount} from 'svelte';
    let balance = 0;
    const axios = require('axios');
    const config = require('../../config.json');
    const erc721 = require('../../build/MyERC721.json');
    const crypto_gyaan_json = require('../../build/CryptoGyaan.json');

    let my_tokens = [];
    let token_images = [];
    let token_title = [];
    let token_description = [];
    let token_exist = false;
    let total_tokens = 1;
    let token_price = [];
    let success = false;

    let message = "";
    let order_status = [];
    let orders = [];

    async function add_token(token_id, price, order_id) {
        token_exist = true;
        let token_uri = await window.erc721.functions.tokenURI(token_id);
        let res = await axios.get("https://ipfs.io/ipfs/" + token_uri);
        let data = res.data;
        my_tokens.unshift(token_id);
        token_title.unshift(data.title);
        token_description.unshift(data.description);
        token_images.unshift(" data:image/jpeg;base64,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");
        token_price.unshift(parseFloat(ethers.utils.formatEther(String(price))));
        orders.unshift(order_id);
        orders = orders;
        token_price = token_price;
        my_tokens = my_tokens;
        token_title = token_title;
        token_description = token_description;
        token_images = token_images;
        let image_res = await axios.get("https://ipfs.io/ipfs/" + data.image);
        token_images[my_tokens.indexOf(token_id)] = image_res.data;
        token_images = token_images;
        console.log(`Loaded ${token_id}`);
    }


    onMount(async () => {
        let provider = new ethers.providers.InfuraProvider(config.network);
        window.erc721 = new ethers.Contract(config.MyERC721, erc721.abi, provider);
        window.cryptoGyaan = new ethers.Contract(config.CryptoGyaan, crypto_gyaan_json.abi, provider);
        total_tokens = parseInt(await cryptoGyaan.functions.total_order_count());
        for (let i = 0; i < total_tokens; i++) {
            let order = await cryptoGyaan.functions.total_order(i);
            if (parseInt(order.status) === 1) {
                add_token(parseInt(order.token_id), parseInt(order.price), parseInt(order.order_id));
            }
        }

    });



</script>

<div class="jumbotron mt-5">
    <div class="row">
        <div class="col-sm">
            <h1 class="display-3">Welcome to Crypto Gyaan</h1>
            <p class="lead">
                Place where you can buy and sell your gyaan.
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Create new wallet</h5>
                    <p class="card-text">
                        Obtain an ETH address and generate your private key. Saving and safekeeping the key will be your
                        responsibility.
                    </p>
                    <a href="/createNewWallet" class="card-link">Create</a>
                </div>
            </div>
        </div>
        <div class="col-sm">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Access my wallet</h5>
                    <p class="card-text">
                        Buy and sell your precious gyaan by interacting with crypto gyaan smart contract.
                    </p>
                    <a href="/accessMyWallet" class="card-link">Access</a>
                </div>
            </div>
        </div>

    </div>
</div>
{#if token_exist }
    <div class="row mt-4">
        <div class="col-md-12 mt-4">
            <div class="h2 strong">Gyaans for sale:</div>
        </div>
        {#if my_tokens.length}
            <div class="card-columns">
                {#each my_tokens as token, i}
                    <div class="card">
                        <img class="card-img-top" src={token_images[i]} alt="Token Image">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Token Id: {token}</h6>
                            <h5 class="card-title">{token_title[i]}</h5>
                            <p class="card-text">{token_description[i]}</p>
                            <p class="card-text">{token_price[i]} ETH</p>

                        </div>
                    </div>
                {/each}
            </div>

        {:else}
            <div class="h2 strong">Gyaans are yet to be loaded.</div>
        {/if}
    </div>
{/if}
