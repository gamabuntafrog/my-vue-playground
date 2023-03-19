import Home from "@/pages/Home";
import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/pages/Login";
import store from "@/store";
import Me from "@/pages/Me";
import Weather from "@/pages/Weather";

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
        meta: {
            hiddenForAuth: true
        }
    },
    {
        path: '/me',
        component: Me,
        meta: {
            hiddenForNotAuth: true
        }
    },
    {
        path: '/weather',
        component: Weather,
    }
    // {
    //     path: '/todo',
    //     component: Todo,
    //     meta: {
    //         hiddenForNotAuth: true
    //     }
    // }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.state.isLoggedIn
    const isHiddenForAuth = to.matched.some(record => record.meta.hiddenForAuth)
    const isHiddenForNotAuth = to.matched.some(record => record.meta.hiddenForNotAuth)

    console.log(isLoggedIn, isHiddenForAuth)

    if (isHiddenForAuth && isLoggedIn) {
        console.log('true')
        next({path: '/'})
    }
    if (isHiddenForNotAuth && !isLoggedIn) {
        next({path: '/'})
    }
    next()
})

export default router;