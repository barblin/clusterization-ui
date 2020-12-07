import {store} from '../store/application-state-store'

export const PlotState = {
    isTree() {
        if (store.getters.isMinTree || store.getters.isMinTreeWasser) {
            store.commit('width', 1500)
            store.commit('height', 800)

            return true;
        }

        return false;
    },

    isScatter() {
        if (store.getters.isSimple) {
            store.commit('width', 1500)
            store.commit('height', 800)

            return true;
        }

        return false;
    },

    isClusterWasser() {
        if (store.getters.isClusterWasser) {
            store.commit('width', 1500)
            store.commit('height', 800)

            return true;
        }

        return false;
    },

    isDelaunay() {
        if (store.getters.isDelaunay) {
            store.commit('width', 1500)
            store.commit('height', 800)
        }

        return store.getters.isDelaunay
    },

    isWasser() {
        if (store.getters.isClusterWasser || store.getters.isMinTreeWasser) {
            store.commit('width', 1500)
            store.commit('height', 800)

            return true;
        }

        return false;
    },

    isWasserCluster() {
        return this.isWasser() || this.isCluster();
    },

    isCluster() {
        if (this.isMultiView()) {
            return true;
        }

        if (store.getters.isClusterWasser) {
            store.commit('width', 1500)
            store.commit('height', 800)

            return true;
        }

        return false;
    },

    isMultiView() {
        if (store.getters.isMulti) {
            store.commit('width', 580)
            store.commit('height', 430)
        }

        return store.getters.isMulti
    },

    isVariancesView() {
        if (store.getters.isVars) {
            store.commit('width', 1000)
            store.commit('height', 600)
            store.commit('updateStdvMultiplier', 2)
            store.commit('updateChecked', true)
        }

        return store.getters.isVars
    }
}