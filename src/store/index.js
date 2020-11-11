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
      console.log('data set')
    }
  },
  actions: {

  },
  getters:{
    flats: state => state.flats
  },

})
