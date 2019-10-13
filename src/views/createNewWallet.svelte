<script>

    let size = 128;
    let is_256 = false;
    let clipboard = bip39.generateMnemonic(size);
    let mnemonic = clipboard.split(" ");
    let saved_mnemonic = mnemonic;
    let wallet_password="";
    let wallet = "";
    let status = 1;  // 1=> noted mnemonic 2=> submit mnemonic 3=> generate wallet 4=> Loading 5=> Login
    let noted = false;
    let difficulty = 2;

    function getRandom(arr, n) {
        var result = new Array(n),
                len = arr.length,
                taken = new Array(len);
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = x in taken ? taken[x] : x;
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    function generate_random() {
        status = 1;
        noted = false;
        let size = is_256? 256: 128;
        clipboard = bip39.generateMnemonic(size)
        mnemonic = clipboard.split(" ");
    }
    
    function noted_down() {
        status = 2;
        let indexs = getRandom(mnemonic, difficulty);
        for(let i =0 ; i<difficulty;i++){
            mnemonic[indexs[i]] = ""
        }
    }

    function toggle_count() {
        is_256 = !is_256;
        generate_random();
    }
</script>
<div class="row mt-4">
    <button class="btn btn-primary mr-3" on:click={generate_random}>Generate Random</button>
    <button  class="btn btn-primary mr-3"  on:click={noted_down} class:hide={status!=1}>I Wrote down My Mnemonic Phrase</button>
    <button class="btn" class:btn-secondary={!is_256} class:btn-primary={is_256} on:click={toggle_count}>24 Words</button>
</div>
<div class="row mt-4">
    {#each mnemonic as word, i}
        <div class="col-md-3 p-1" data={word}>{i+1}. {word}</div>
    {/each}
</div>