import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


const store = new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        tabsNumber:"",
        // insPolicyNumber2: "",
        insPolicyNumber: "",
        applicant: "",
        assured: "",
        history: [],
        queryData: null,
        singleInsPolicyData: null,
        domain: "",
        // user: "",
        // token: "",
        // refreshToken: "",
        // isLoggedIn: false,
        // menu: [],
        // index: [],
        // keepAlivePages: [],
        // tab4Models: {},
    },
    //* MUTATIONS ONLY SET STATE, BUSINESS LOGIC IN ACTIONS
    mutations: {
        setInsPolicyNumber(state, payload) {
            state.insPolicyNumber = payload;
        },
        // setInsPolicyNumber2(state, payload) {
        //     state.insPolicyNumber2 = payload;
        // },
        settabsNumber(state, payload) {
            state.tabsNumber = payload;
        },
      
        setApplicant(state, payload) {
            state.applicant = payload;
        },
        setAssured(state, payload) {
            state.assured = payload;
        },
        setHistory(state, payload) {
            state.history = payload;
        },
        setQueryData(state, payload) {
            state.queryData = payload;
        },
        setSingleInsPolicyData(state, payload) {
            state.singleInsPolicyData = payload;
        },
        setDomain(state, payload) {
           state.domain = payload;
        },
        // setUser(state, payload) {
        //   state.user = payload;
        // },
        // setToken(state, payload) {
        //   state.token = payload;
        // },
        // setRefreshToken(state, payload){
        //   state.refreshToken = payload;
        // },
        // setLoginStatus(state, payload) {
        //   state.isLoggedIn = payload;
        // },
        // setMenu(state, payload) {
        //   state.menu = payload;
        // },
        // setIndex(state, payload) {
        //   state.index = payload;
        // },
        // setKeepAlivePages(state, payload){
        //   state.keepAlivePages = payload;
        // },
        // setTab4Models(state, models) {
        //   state.tab4Models = models;
        // }
    },
    actions: {
        addHistory({ state, commit}, payload) {
            let history = state.history;
            if (payload.name) {
                if (history.length === 10) {
                    history.unshift({
                        name: payload.name,
                        path: payload.path,
                        cName: payload.cName,
                        id: payload.id
                    })
                    history.pop();
                } else {
                    history.unshift({
                        name: payload.name,
                        path: payload.path,
                        cName: payload.cName,
                        id: payload.id
                    })
                }
            }
            commit("setHistory", history);
        },
        deleteHistory({ state, commit}, payload) {
            let history = state.history;
            history = history.filter(h => {
                return h.id !== payload
            })
            commit("setHistory", history);
        },
        clearHistory({
            commit
        }) {
            commit("setHistory", []);
        }
    },
    // getters: {
    //   getDomain(state){
    //     return state.domain
    //   },
    //   getUser(state){
    //     return state.user
    //   },
    //   getToken(state){
    //     return state.token
    //   },
    //   getLoginStatus(state){
    //     return state.isLoggedIn
    //   },
    //   getMenu(state){
    //     return state.menu
    //   },
    //   getIndex(state){
    //     return state.index
    //   }
    // }
})

export default store;