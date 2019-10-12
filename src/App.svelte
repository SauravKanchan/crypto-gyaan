<script>
    import router, {page} from './router'
    const IPFS = require('ipfs-mini');
    window.ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

    router.start();


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
            </Nav>
        </Collapse>
</Navbar>
<div class="container">
    <svelte:component this={$page.component} {...$page.props}/>
</div>

