import { createStore } from 'vuex';

const store =createStore({
    state() {
        return {
            seasonPicked: "2022",
            drivers: []
        }
    },
    getters: {
        seasonPicked(state) {
            return state.seasonPicked;
        },
        driversStore(state) {
            return state.drivers;
        }
    },
    mutations: {
        pickSeason(state,payload) {
            state.seasonPicked = payload;
        },
        setDrivers(state,payload) {
            state.drivers.push(payload);
        }
    }
});

export default store;