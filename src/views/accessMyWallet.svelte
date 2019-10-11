<script>
    const config = require('../../config.json');
    let mnemonic = "";
    let error_message = "";
    let keystore = "";
    let wallet_password = "";
    let private_key = "";
    let provider = new ethers.providers.InfuraProvider(config.provider);
    let load_wallet_by = "mnemonic";

    function load_wallet() {
        try {
            let wallet = ethers.Wallet.fromMnemonic(mnemonic);
            window.wallet = new ethers.Wallet(wallet.privateKey, provider)
            document.getElementById("dashboard").click()
        } catch (e) {
            error_message = "Invalid Mnemonic";
        }
    }

    function load_keystore(event) {
        let uploadedFile = event.target.files[0];

        let filename = uploadedFile.name;

        let readFile = new FileReader();
        readFile.onload = function (e) {
            let contents = e.target.result;
            let json = JSON.parse(contents);
            keystore = json;
        };
        readFile.readAsText(uploadedFile);
    }

    async function load_by_keystore() {
        load_wallet_message = "Loading..."
        try {
            if (keystore, typeof (keystore) != "string") {
                keystore = JSON.stringify(keystore)
            }
            window.wallet = await ethers.Wallet.fromEncryptedJson(keystore, wallet_password)
            window.wallet = new ethers.Wallet(wallet.privateKey, provider)
            document.getElementById("dashboard").click()
        } catch (e) {
            console.log(e);
            error_message = "Password and keystore do not match"
        }
        load_wallet_message = "Load Wallet";
    }

    async function load_by_private() {
        try {
            window.wallet = await new ethers.Wallet(private_key);
            window.wallet = new ethers.Wallet(wallet.privateKey, provider)
            document.getElementById("dashboard").click()
        } catch (e) {
            error_message = "Invalid private key";
        }
    }

    function mnemonic_click() {
        load_wallet_by = "mnemonic";
    }

    function pk_click() {
        load_wallet_by = "pk";
    }

    function keystore_click() {
        load_wallet_by = "keystore";
    }

    function metamask_click() {
        load_wallet_by = "metamask";
    }
</script>

<div class="d-flex justify-content-center m-4">
    <div class="h2">Access your wallet through</div>
</div>

<div class="d-flex justify-content-center m-4">
    <div>
        <button type="button" class="btn" class:btn-primary={load_wallet_by==="mnemonic"} on:click="{mnemonic_click}">
            Mnemonic
        </button>
        <button type="button" class="btn" class:btn-primary={load_wallet_by==="pk"} on:click="{pk_click}">Private Key
        </button>
        <button type="button" class="btn" class:btn-primary={load_wallet_by==="keystore"} on:click="{keystore_click}">
            Keystore
        </button>
        <button type="button" class="btn" class:btn-primary={load_wallet_by==="metamask"} on:click="{metamask_click}">
            MetaMask
        </button>
    </div>
</div>

<div class="d-flex justify-content-center m-4">
    <div class="card">

        {#if load_wallet_by==="mnemonic"}
            <div class="card-body">
                <textarea bind:value={mnemonic} placeholder="Enter Your mnemonic"></textarea><br>
                <button type="button" class="btn btn-success" on:click={load_wallet}>Load Wallet</button>
            </div>
        {/if}


    </div>
</div>
<a href="/dashboard" id="dashboard" style="display: none">Access</a>