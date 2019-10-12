<script>
    let image = "";

    async function upload(evt) {
// canvas

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext("2d");
        var fileinput = document.getElementById('photo'); // input file
        var img = new Image();

            var files = evt.target.files; // FileList object
            var file = files[0];
            if(file.type.match('image.*')) {
                var reader = new FileReader();
                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
                reader.onload = async function(evt){
                    if( evt.target.readyState == FileReader.DONE) {
                        img.src = evt.target.result;
                        context.drawImage(img,100,100);
                        console.log(await ipfs.add(canvas.toDataURL()))
                    }
                }

            } else {
                alert("not an image");
            }
    }
</script>

<div class="d-flex justify-content-center m-4 row">
    <div class="h2 col-md-6 offset-md-3">Add New Gyaan</div>

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
                <input type="file" name="photo" id="photo" class="form-control" bind:value={image} on:change={upload}>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
<canvas id="canvas" width="5" height="5"></canvas>