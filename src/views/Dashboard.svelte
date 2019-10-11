<script>
    let address = "loading...";
    let balance = "loading...";
    const config = require("../../config.json");
    const IPFS = require('ipfs')
    let provider = new ethers.providers.InfuraProvider(config.network);

    // Remove after completion
    wallet = new ethers.Wallet('0x652adffe7863446f24b0b849ea8d74b84a74164759e4cd6327999866d00f0c19',provider);

    (async () => {
        ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        address = await wallet.getAddress();
        balance = ethers.utils.formatEther(String(await wallet.getBalance()));
    })().catch(err => {
        console.error(err);

    });
</script>
{#if wallet}
    <div class="row">
        <div class="col-md-9 h3">
            Address: {address}
        </div>
        <div class="col-md-3 h3">

            Balance: {balance}
        </div>

    </div>
{:else}
    <div class="h1">
        Wallet Not loaded. Load your wallet <a href="/accessMyWallet">here</a>
    </div>
{/if}
