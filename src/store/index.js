import {createStore} from "vuex";

const getInitialState = () => {
    return {
        isLoggedIn: false,
        username: null,
        password: null,
        avatar: null,
        isUserLoading: true
    }
}

const store = createStore({
    state: getInitialState(),
    getters: {},
    mutations: {
        async initialiseStore(state) {
            setTimeout(async () => {
                try {
                    const persistedStore = localStorage.getItem('vue-project1-gamabunta');

                    if (persistedStore) {
                        this.replaceState(
                            Object.assign(state, JSON.parse(persistedStore))
                        )
                    }
                } catch (e) {
                    console.log(e)
                } finally {
                    state.isUserLoading = false
                }
            }, 1300)
        },
        async login(state, userInfo) {
            const {username, password, avatar = null} = userInfo;

            state.isLoggedIn = true
            state.username = username
            state.password = password
            state.avatar = avatar
        },
        async logout(state) {
            Object.assign(state, getInitialState())
        },
        updateProfile(state, newInfo) {
            const {username} = newInfo

            state.username = username
        }
    },
    actions: {},
    modules: {}
})

store.subscribe((mutation, state) => {
    localStorage.setItem('vue-project1-gamabunta', JSON.stringify(state))
})

export default store;