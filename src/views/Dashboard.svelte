<script>
    let wallet_address = "loading...";
    let balance = "loading...";
    const config = require("../../config.json");
    let provider = new ethers.providers.InfuraProvider(config.network);
    const crypto_gyaan_json = require('../../build/CryptoGyaan.json');
    const erc721 = require('../../build/MyERC721.json');

    // Remove after completion
    window.wallet = new ethers.Wallet(config.private_key,provider);

    window.crypto_gyaan = new ethers.Contract( config.CryptoGyaan , crypto_gyaan_json.abi , wallet );
    window.erc721 = new ethers.Contract( config.MyERC721 , erc721.abi , wallet );

    (async () => {
        wallet_address = await wallet.getAddress();
        balance = ethers.utils.formatEther(String(await wallet.getBalance()));
    })().catch(err => {
        console.error(err);

    });
</script>
{#if wallet}
    <div class="row">
        <div class="col-md-7 h5">
            <strong>Address:</strong> {wallet_address}
        </div>
        <div class="col-md-3 h5">
            <strong>Balance:</strong> {balance}
        </div>
        <div class="col-md-2">
            <a href="/addNewGyaan" class="btn btn-primary">Add new gyaan</a>
        </div>
    </div>
{:else}
    <div class="h1">
        Wallet Not loaded. Load your wallet <a href="/accessMyWallet">here</a>
    </div>
{/if}
