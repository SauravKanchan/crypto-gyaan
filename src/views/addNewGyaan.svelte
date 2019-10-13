<script>
    let image = "", logs = [], image_path = "", hash = "", title = "", description = "", gyaan_hash = "",
            image_uploaded = false, message = "";
    let config = require('../../config.json');

    async function upload(e) {
        if (this.files && this.files[0]) {
            var FR = new FileReader();

            FR.addEventListener("load", async function (e) {
                let base64 = e.target.result;
                image_uploaded = false;
                logs.unshift("Adding image to IPFS...");
                logs = logs;
                hash = await ipfs.add(base64);
                logs.unshift("Added image to IPFS. IPFS hash: " + hash + ". Ready to submit.");
                logs = logs;
                image_uploaded = true;
            });

            FR.readAsDataURL(this.files[0]);
        }
    }

    async function upload_gyaan(e) {
        message = "";
        e.preventDefault();
        logs.unshift("Adding gyaan to IPFS...");
        logs = logs;
        gyaan_hash = await ipfs.addJSON({
            title: title,
            description: description,
            image: hash
        });
        logs.unshift("Added Gyaan to ipfs. IPFS hash: " + gyaan_hash + ". Adding to ethereum blockchain...");
        logs = logs;
        let tx = await erc721.functions.mintUniqueTokenTo(await wallet.getAddress(), gyaan_hash);
        logs.unshift("Transaction added. Transaction hash: " + tx.hash + " Waiting for transaction to be mined...");
        logs = logs;
        let block = await tx.wait();
        logs.unshift("Transaction mined. Block Number: " + block.blockNumber);
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
    <div class="h2 col-md-6 offset-md-3">Add New Gyaan</div>

    <div class="card col-md-6">
        <form class="m-5" on:submit={upload_gyaan}>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" bind:value={title}>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text" class="form-control" id="description" bind:value={description}></textarea>
            </div>
            <div class="form-group">
                <label for="pwd">Image: </label>
                <input type="file" name="photo" id="photo" class="form-control" bind:value={image_path}
                       on:change={upload}>
            </div>
            <div class="form-group">
                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary mr-2" class:disabled={!image_uploaded}
                            disabled={!image_uploaded}>Submit
                    </button>
                    <a class="btn btn-danger ml-2" href="/dashboard">Close</a>
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