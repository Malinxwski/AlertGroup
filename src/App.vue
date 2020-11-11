<template>
  <div id="app">
    <h1>
      Lorem ipsum dolor sit amet
    </h1>
    <div class="filter-items">
      <!--Комнаты -->
      <div class="filter-item d-inline-block mr-2" >
        <span class="d-block ml-3">Комнаты</span>
        <div class="btn-group-toggle" data-toggle="buttons">
          <label class=" btn btn-light">
            <input type="radio" v-model="selectRoom" value="0" id="room-s" autocomplete="off" >S
          </label>
          <label class="btn btn-light">
            <input type="radio" v-model="selectRoom" value="1" id="room-1" autocomplete="off">1K
          </label>
          <label class="btn btn-light">
            <input type="radio" v-model="selectRoom" value="2" id="room-2" autocomplete="off">2K
          </label>
          <label class="btn btn-light">
            <input type="radio" v-model="selectRoom" value="3" id="room-3" autocomplete="off">3K
          </label>
        </div>
      </div>

      <!--Этажи -->
      <div class="filter-item d-inline-block" >
        <span class="d-block ml-0">Этаж</span>
        <input type="text"
               ref="minFloorSelected"
               v-model="floor[0]"
               class="small d-inline-block ">
        -
        <input type="text"
               ref="maxFloorSelected"
               v-model="floor[1]"
               class="small d-inline-block">
        <VueRangeSlider
            :dot-size="15"
            :width="175['px']"
            v-model="floor"
            :tooltip-style="[{display:'none'},{display:'none',}]"
            :min="minFloor" :max="maxFloor"
            :enable-cross="enableCross">
        </VueRangeSlider>

      </div>

      <!--Площадь -->
      <div class="filter-item d-inline-block" >
        <span class="d-block ml-0">Площадь</span>
        <input type="text"
               ref="minSquareSelected"
               v-model="square[0]"
               class="small d-inline-block ">
        -
        <input type="text"
               ref="maxSquareSelected"
               v-model="square[1]"
               class="small d-inline-block">
        <VueRangeSlider
            :dot-size="15"
            :width="175['px']"
            v-model="square"
            :tooltip-style="[{display:'none'},{display:'none',}]"
            :min="minSquare" :max="maxSquare"
            :enable-cross="enableCross">
        </VueRangeSlider>
      </div>

      <!--Стоимость -->
      <div class="filter-item d-inline-block" >
        <span class="d-block ml-0">Стоимость</span>
        <input type="text"
               ref="minPriceSelected"
               v-model="price[0]"
               class="small d-inline-block ">
        -
        <input type="text"
               ref="maxPriceSelected"
               v-model="price[1]"
               class="small d-inline-block">
        <VueRangeSlider
            :dot-size="15"
            :width="175['px']"
            v-model="price"
            :step="0.1"
            :tooltip-style="[{display:'none'},{display:'none',}]"
            :min="minPrice"
            :max="maxPrice"
            :enable-cross="enableCross">
        </VueRangeSlider>
      </div>

      <!--Действия -->
      <div class="filter-submit filter-item align-bottom d-inline-block ">
        <button type="button"
                @click.prevent="setParams"
                class="btn-light-green btn d-inline-block">Применить</button>
        <span
            class="filter__clear ml-5 mr-0"
            @click="dropFilter"
            > Сбросить </span>
      </div>
    </div>

                                   <!-- Компонент квартир -->
    <Items :params="params" :flats="flats"></Items>

  </div>
</template>
<script>

import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import Items from "@/components/Items";

export default {
  name:'App',
  data:()=>({
    params:{},
    flats:[],
    selectRoom:'',
    minFloor: 1,
    maxFloor: 99,
    floor:[1, 99],
    minSquare:20,
    maxSquare:150,
    square:[20,150],
    minPrice:1.9,
    maxPrice:99.9,
    price:[1.9,99.9],
    enableCross: false
  }),
  async created(){
    await this.$store.commit('setData')
  },
  async mounted(){
    this.flats = await this.$store.getters.flats
  },
  methods:{
    setParams(){
      const rooms = parseInt(this.selectRoom)
      const minF = parseInt(this.$refs.minFloorSelected.value)
      const maxF = parseInt(this.$refs.maxFloorSelected.value)
      const minS = parseInt(this.$refs.minSquareSelected.value)
      const maxS = parseInt(this.$refs.maxSquareSelected.value)
      const minP = parseFloat(this.$refs.minPriceSelected.value) * 1000000
      const maxP = parseFloat(this.$refs.maxPriceSelected.value) * 1000000
      this.params = []
      this.params ={
        rooms,
        minF,
        maxF,
        minS,
        maxS,
        minP,
        maxP
      }
    },
    dropFilter(){

       return this.params = {}
    },
  },
  components: {VueRangeSlider, Items}
}
</script>

<style lang="sass">

</style>
