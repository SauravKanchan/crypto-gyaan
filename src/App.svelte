<script>
    import router, {page} from './router'

    const IPFS = require('ipfs-mini');
    window.bip39 = require('bip39');
    window.ethers = require('ethers');
    const config = require('../config.json');
    window.ipfs = new IPFS({host: config.ipfs, port: 5001, protocol: 'https'});
    let address;
    router.start();
    const axios = require('axios');
    import {setupCache} from 'axios-cache-adapter'

    const cache = setupCache({
        maxAge: 24 * 60 * 60 * 1000
    });

    window.get = axios.create({
        adapter: cache.adapter
    });

    function logout() {
        address = "";

        window.location.href = "/"

    }

    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
    } from 'sveltestrap';

    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

</script>
<Navbar color="dark" dark expand="md">
    <NavbarBrand href="/">Crypto Gyaan</NavbarBrand>
    <NavbarToggler on:click={()=> (isOpen = !isOpen)} />
        <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
            <Nav class="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/createNewWallet">Create New Wallet</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/accessMyWallet">Access My Wallet</NavLink>
                </NavItem>
                {#if address}
                    <NavItem>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/addNewGyaan">Add New Gyaan</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/BuyGyaan">Buy Gyaan</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/" on:click={logout}>Logout</NavLink>
                    </NavItem>
                {/if}
            </Nav>
        </Collapse>
</Navbar>
<div class="container">
    <svelte:component this={$page.component} {...$page.props} bind:address={address}/>
</div>

