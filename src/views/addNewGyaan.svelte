<script>
    let image = "";
    const axios = require('axios');
    let status = "";
    let image_path = "";
    let hash = "";


    async function upload(e) {
        if (this.files && this.files[0]) {
            var FR= new FileReader();

            FR.addEventListener("load", async function(e) {
                let base64 = e.target.result;
                status = "Adding image to IPFS...";
                let hash = await ipfs.add(base64);
                status = "Added image to IPFS "+hash;
                let res = await axios.get("https://ipfs.io/ipfs/"+hash);
                image = res.data;
            });

            FR.readAsDataURL( this.files[0] );
        }
    }
</script>

<div class="d-flex justify-content-center m-4 row">
    <div class="h2 col-md-6 offset-md-3">Add New Gyaan {image_path}</div>

    <div class="card col-md-6">
        <form class="m-5">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title">
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text" class="form-control" id="description"></textarea>
            </div>
            <div class="form-group">
                <label for="pwd">Image: </label>
                <input type="file" name="photo" id="photo" class="form-control" bind:value={image_path} on:change={upload}>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
{#if status}
    <div class="d-flex justify-content-center row ">
        <div class="col-md-2">
            <div class="h2">
                status
            </div>
        </div>
        <div class="col-md-10 text-truncate">
            {status}
        </div>
        <div class="col-md-6 offset-md-3">
            <img src={image} class="img-fluid" alt="image"/>
        </div>
    </div>
{/if}
<canvas id="canvas" style="display: none"></canvas>
