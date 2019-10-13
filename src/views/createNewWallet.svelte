<script>

    let size = 128;
    let is_256 = false;
    let clipboard = bip39.generateMnemonic(size).split(" ");
    let mnemonic = [...clipboard];
    let wallet_password = "";
    let status = 1;  // 1=> noted mnemonic 2=> submit mnemonic 3=> generate wallet 4=> Loading 5=> Login
    let noted = false;
    let difficulty = 4;
    let correct = new Set();
    let message = "";
    let success = false;
    let link = "";

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

        message = "";
        link = "";
        success = false;
        status = 1;
        noted = false;
        let size = is_256 ? 256 : 128;
        clipboard = bip39.generateMnemonic(size).split(" ");
        mnemonic = [...clipboard];
    }

    function noted_down() {
        status = 2;
        let indexs = getRandom(mnemonic, difficulty);
        for (let i = 0; i < difficulty; i++) {
            mnemonic[indexs[i]] = ""
        }
        message = "Please fill blank spots";
        link = "";
        success = false;
    }

    function toggle_count() {
        is_256 = !is_256;
        generate_random();
    }

    function check_mnemonic(e) {
        if (e.srcElement.attributes.data.value === e.srcElement.value) {
            correct.add(e.srcElement.attributes.data.value);
        }
        if (correct.size === difficulty) {
            status = 3
        }
        console.log(correct.size, e.srcElement.attributes.data.value, e.srcElement.value, e.srcElement.attributes.data.value === e.srcElement.value);
    }

    async function generate_keystore() {
        success = false;
        message = "Encrypting wallet by entered password...";
        let wallet = await ethers.Wallet.fromMnemonic(clipboard.join(" "));
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent((await wallet.encrypt(wallet_password)));
        let dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "UTC-" + wallet.address + ".json");
        dlAnchorElem.click();
        message = "Keystore generated. You can access your wallet ";
        link = "/accessMyWallet";
        success = true;
    }
</script>
<style>
    .hide {
        display: none;
    }
</style>
{#if message}
    <div class="alert" class:alert-success={success} class:alert-primary={!success} role="alert">
        {message}
        {#if link}<a href={link}>here</a>
        {/if}
    </div>
{/if}
<div class="row mt-4">
    <button class="btn btn-primary mr-3" on:click={generate_random}>Generate Random</button>
    <button class="btn btn-primary mr-3" on:click={noted_down} class:hide={status!=1}>Noted Mnemonic Phrase</button>
    <button class="btn btn-primary mr-3" class:hide={status==1} class:btn-dark={status!=3} disabled={status!=3}
            on:click={generate_keystore}>Submit
    </button>
    <div class="form-inline" class:hide={status!==3}>
        <label for="wallet_password">Wallet Password: </label>
        <input class="form-control" type="password" id="wallet_password" bind:value={wallet_password}>
    </div>
    <button class="btn" class:btn-secondary={!is_256} class:btn-primary={is_256} on:click={toggle_count}>24 Words
    </button>
</div>
<div class="row mt-4">
    {#each mnemonic as word, i}
        {#if word}
            <div class="col-md-3 p-1" data={word}>{i+1}. {word}</div>
        {:else}
            <div class="col-md-3 p-1">{i+1}. <input data={clipboard[i]} on:change={check_mnemonic} type="text"></div>
        {/if}
    {/each}
</div>
<a id="downloadAnchorElem" href="/" style="display:none">Download</a>