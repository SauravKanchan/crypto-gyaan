<script>
    const axios = require('axios');
    let image = "", status = "", image_path = "", hash = "", title = "", description = "", gyaan_hash = "",
            image_uploaded = false;

    async function upload(e) {
        if (this.files && this.files[0]) {
            var FR = new FileReader();

            FR.addEventListener("load", async function (e) {
                let base64 = e.target.result;
                status = "Adding image to IPFS...";
                hash = await ipfs.add(base64);
                status = "Added image to IPFS " + hash;
                // let res = await axios.get("https://ipfs.io/ipfs/" + hash);
                // image = res.data;
                image_uploaded = true;
            });

            FR.readAsDataURL(this.files[0]);
        }
    }

    async function upload_gyaan(e) {
        e.preventDefault();
        status = "Adding gyaan to IPFS...";
        gyaan_hash = await ipfs.addJSON({
            title: title,
            description: description,
            image: hash
        });
        status = "Added Gyaan to ipfs " + gyaan_hash;
    }
</script>

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
                {#if status}
                    Status: {status}
                {/if}
            </div>
            <button type="submit" class="btn btn-primary" class:disabled={!image_uploaded}>Submit</button>
        </form>
    </div>
</div>
