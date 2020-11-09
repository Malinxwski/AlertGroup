import Vue from 'vue'
import Vuex from 'vuex'
import Data from '@/assets/test-data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flats:[]
  },
  mutations: {
    setData(state){
      state.flats = Data
    }
  },
  actions: {

  },
  getters:{
    flats: state => state.flats
  },

})
