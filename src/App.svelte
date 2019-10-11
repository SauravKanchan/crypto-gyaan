<script>
    import router, {page} from './router'

    router.start();


    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink,
        Container,
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
<Container>

    <svelte:component this={$page.component} {...$page.props}/>
</Container>
