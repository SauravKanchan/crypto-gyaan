<script>
    export let address;
    import {
        Container, Button, CardBody, CardHeader, CardText, CardTitle
    } from 'sveltestrap';
</script>
<div class="jumbotron mt-5">
    <div class="row">
        <div class="col-sm">
            <h1 class="display-3">Welcome to Crypto Gyaan</h1>
            <p class="lead">
                Place where you can buy and sell your gyaan.
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col-sm">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Create new wallet</h5>
                    <p class="card-text">
                        Obtain an ETH address and generate your private key. Saving and safekeeping the key will be your
                        responsibility.
                    </p>
                    <a href="/createNewWallet" class="card-link">Create</a>
                </div>
            </div>
        </div>
        <div class="col-sm">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Access my wallet</h5>
                    <p class="card-text">
                        Buy and sell your precious gyaan by interacting with crypto gyaan smart contract.
                    </p>
                    <a href="/accessMyWallet" class="card-link">Access</a>
                </div>
            </div>
        </div>

    </div>
</div>