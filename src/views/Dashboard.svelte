<script>
    let address = "loading...";
    let balance = "loading...";
    (async () => {
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
