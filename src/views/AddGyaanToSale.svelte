<script>
    export let token_id;

    let logs = [],  price = "", message = "";
    let config = require('../../config.json');

    async function sell_gyaan(e) {
        e.preventDefault();
        message = "";
        logs.unshift("Waiting for transaction 'approve' of "+token_id);
        logs = logs;
        let tx_approve = await erc721.functions.approve(cryptoGyaan.address, token_id);
        logs.unshift(`Transaction approved. Waiting for transaction ${tx_approve.hash} to get mined`);
        logs = logs;
        let block = await tx_approve.wait();
        logs.unshift(`Approve transaction added in block ${block.blockNumber}`);
        logs.unshift("Initiate Place order transaction.");
        logs = logs;
        let tx = await cryptoGyaan.functions.place_order(token_id, String(ethers.utils.parseEther(String(price))));
        logs.unshift("Transaction placed. Transaction hash: "+tx.hash);
        logs.unshift("Waiting for transaction to be mine." );
        logs = logs;
        block = await tx.wait();
        logs.unshift("transaction mined. Block Number:"+block.blockNumber);
        logs = logs;
        message = `Gyaan Added. You can check the transaction in https://${config.network}.etherscan.io/tx/${tx.hash}`
    }
</script>
{#if message}
    <div class="alert alert-success" role="alert">
        {message}
    </div>
{/if}
<div class="d-flex justify-content-center m-4 row">
    <div class="h2 col-md-6 offset-md-3">Sell Gyaan</div>

    <div class="card col-md-6">
        <form class="m-5" on:submit={sell_gyaan}>
            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" step="0.0001" class="form-control" id="price" bind:value={price}>
            </div>

            <div class="form-group">
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary m-2">Submit</button>
                    <a class="btn btn-danger m-2" href="/dashboard">Cancel</a>
                </div>
            </div>
        </form>
    </div>
</div>
<div class="d-flex justify-content-center m-4">
    <div class="h2">Logs</div>
</div>
<div class="d-flex justify-content-center m-4">
    <div class="card">
        <ul class="list-group list-group-flush">
            {#each logs as log}
                <li class="list-group-item">
                    {log}
                </li>
            {/each}
        </ul>
    </div>
</div>