<script>
    const config = require('../../config.json');
    let mnemonic = "";
    let error_message = "";
    let keystore = "";
    let wallet_password = "";
    let private_key = "";
    let provider = new ethers.providers.InfuraProvider(config.network);
    let load_wallet_by = "mnemonic";
    let load_wallet_message = "Load Wallet";

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

    async function load_by_metamask() {
        try{
            await window.ethereum.enable();
        }catch (e) {
            console.error(e);
        }

        provider = new ethers.providers.Web3Provider(web3.currentProvider);
        window.wallet = provider.getSigner();
        document.getElementById("dashboard").click();
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

<div class="d-flex justify-content-center m-5">
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

<div class="mx-auto mt-4 row">
    <div class="card col-md-6 offset-md-3">
        <div class="card-body form-group ">

            {#if load_wallet_by==="mnemonic"}
                <textarea bind:value={mnemonic} class="form-control" placeholder="Enter Your mnemonic"></textarea><br>
                <button type="button" class="btn btn-success" on:click={load_wallet}>Load Wallet</button>
            {/if}

            {#if load_wallet_by==="pk"}
                <input type="text" bind:value={private_key} class="form-control" placeholder="Enter Private Key">
                <button type="button" class="btn btn-success" on:click={load_by_private}>Load Wallet</button>
            {/if}

            {#if load_wallet_by==="keystore"}
                <input type="file" class="form-control" on:change={load_keystore}><br>
                <input type="password" class="form-control" bind:value={wallet_password}
                       placeholder="Enter the Password"><br>
                <button type="button" class="btn btn-success" on:click={load_by_keystore}>{load_wallet_message}</button>
            {/if}

            {#if load_wallet_by==="metamask"}
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-success center" on:click={load_by_metamask}>Connect Metamask
                    </button>
                </div>
            {/if}


        </div>

    </div>
</div>
<a href="/dashboard" id="dashboard" style="display: none">Access</a>