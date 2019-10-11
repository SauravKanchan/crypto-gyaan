{#if wallet}
<div class="h2">
    {wallet.address}
</div>
{:else}
    <div class="h1">
        Wallet Not loaded. Load your wallet <a href="/accessMyWallet">here</a>
    </div>
{/if}
