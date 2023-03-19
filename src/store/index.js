import {createStore} from "vuex";

const getInitialState = () => {
    return {
        isLoggedIn: false,
        username: null,
        password: null,
        avatar: null
    }
}

const store = createStore({
    state: getInitialState(),
    getters: {},
    mutations: {
        initialiseStore(state) {
            const persistedStore = localStorage.getItem('vue-project1-gamabunta');

            if (persistedStore) {
                this.replaceState(
                    Object.assign(state, JSON.parse(persistedStore))
                )
            }
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