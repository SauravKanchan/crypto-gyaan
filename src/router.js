import { writable } from 'svelte/store'
import router from 'page'

export const page = writable({
  component: null,
  props: {}
});

router('/', () =>
  import(/* webpackChunkName: "index" */ './views/Index.svelte').then(module =>
    page.set({ component: module.default })
  )
);

router('/createNewWallet', () =>
  import(/* webpackChunkName: "something" */ './views/createNewWallet.svelte').then(
    module => page.set({ component: module.default })
  )
);

router('/accessMyWallet', () =>
    import('./views/accessMyWallet.svelte').then(
        module => page.set({ component: module.default })
    )
);

router('/dashboard', () =>
    import('./views/Dashboard.svelte').then(
        module => page.set({ component: module.default })
    )
);
router('/addNewGyaan', () =>
    import('./views/addNewGyaan.svelte').then(
        module => page.set({ component: module.default })
    )
);
router('/AddGyaanToSale/:token_id', ctx =>
    import(/* webpackChunkName: "hello" */ './views/AddGyaanToSale.svelte').then(module =>
        page.set({ component: module.default, props: ctx.params })
    )
);
export default router
