<template>
  <div id="app">
    <h1>
      Lorem ipsum dolor sit amet
    </h1>
    <div class="filter-items">
      <!--Комнаты -->
      <div class="filter-item d-inline-block" >
        <span class="d-block ml-3">Комнаты</span>
        <div class=" btn-group-toggle" data-toggle="buttons">
          <label class=" btn btn-light">
            <input type="radio" v-model="selectRoom" value="s" id="room-s" autocomplete="off" >S
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
                @click.prevent="filterItems"
                class="btn-light-green btn d-inline-block">Применить</button>
        <span
            class="filter__clear ml-5 mr-0"
            @click.prevent="dropFilter"
            > Сбросить </span>
      </div>
    </div>

    <!--Квартиры -->
    <div class="container mt-5">
      <div class="row row__height-375px mb-4" v-for="chunk in flatChunks">
        <div class="col-lg-3 col-md-6 col-sm-6 " v-for="flat of chunk">
          <div class="flat">
            <div class="flat__top-wrapper">
              <span class="flat__floor">{{ flat.floor }}</span>
              <span class="flat__rooms">{{ flat.rooms }} комната</span> –
              <span class="flat__square">{{ flat.square }}м2</span>
            </div>
            <div class="flexible flat__image-wrapper">
              <span class="flat__number">№ {{ flat.number }}</span>
              <img  class="flat__plan-image" src="@/assets/img/1.svg" alt="">
            </div>
            <span class="flat__price">{{  flat.price_full.toLocaleString()  }}р.</span>
            <span class="flat__price-for-square">
              {{Math.round(flat.price_full/flat.square).toLocaleString()}}р. за м2
            </span>
            <button type="button" class="flat__about-item">Подробнее</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'

export default {
  name:'App',
  data:()=>({
    selectRoom:'',
    flats:[],
    flatsFiltered:[],
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
  computed:{
    flatChunks(){
      return _.chunk(Object.values(this.flatsFiltered), 4)
    },
  },
  methods:{
    dropFilter(){
      return this.flatsFiltered = this.flats
    },
    filterItems(){

      const rooms = parseInt(this.selectRoom)
      const minF = parseInt(this.$refs.minFloorSelected.value)
      const maxF = parseInt(this.$refs.maxFloorSelected.value)
      const minS = parseInt(this.$refs.minSquareSelected.value)
      const maxS = parseInt(this.$refs.maxSquareSelected.value)
      const minP = parseFloat(this.$refs.minPriceSelected.value) * 1000000
      const maxP = parseFloat(this.$refs.maxPriceSelected.value) * 1000000

      if(!isNaN(rooms)){

        this.flatsFiltered = this.flats
            .filter(flat => flat['rooms'] === rooms)
            .filter(flat => flat['floor'] >= minF && flat['floor'] <= maxF)
            .filter(flat => flat['square'] >= minS && flat['square'] <= maxS)
            .filter(flat => flat['price_full'] >= minP && flat['price_full'] <= maxP)

      }else{

        this.flatsFiltered = this.flats
            .filter(flat => flat['floor'] >= minF && flat['floor'] <= maxF)
            .filter(flat => flat['square'] >= minS && flat['square'] <= maxS)
            .filter(flat => flat['price_full'] >= minP && flat['price_full'] <= maxP)
      }
    }
  },
  async created(){
    await this.$store.commit('setData')
  },
  async mounted() {
    this.flats = await this.$store.getters.flats
    this.flatsFiltered = this.flats
    console.log(this.$refs)
  },
  components: {VueRangeSlider}
}
</script>

<style lang="sass">

</style>
