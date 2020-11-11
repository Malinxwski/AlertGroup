<template>

  <!--Квартиры-->
      <div class="container mt-5" style="z-index: -10">
        <div class="row row__height-375px mb-4 mr-1" v-for="chunk in flatChunks">
          <div class="col col-lg-3 col-md-6 col-sm-6 " v-for="flat of chunk">
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

</template>

<script>
  export default {
    name: "Items",
    props:{
      params:{
        type:Object,
        required:true
      },
      flats:{
        type: Array,
        required:true
      }
    },
    data:()=>({
      flatsFiltered:[],
    }),
    computed:{
      flatChunks(){
        return _.chunk(Object.values(this.flatsFiltered), 4)
      },
    },
    watch:{
      flats(){
        this.flatsFiltered = this.flats
      },
      params(){
        if(_.isEmpty(this.params)){
          this.flatsFiltered = this.flats
        }else {
          this.filterItems()
        }
      }
    },
    methods:{
      sliderParamsFilter(flats){

        const minF = this.params['minF']
        const maxF = this.params['maxF']
        const minS = this.params['minS']
        const maxS = this.params['maxS']
        const minP = this.params['minP']
        const maxP = this.params['maxP']

        return flats
            .filter(flat => flat['floor'] >= minF && flat['floor'] <= maxF)
            .filter(flat => flat['square'] >= minS && flat['square'] <= maxS)
            .filter(flat => flat['price_full'] >= minP && flat['price_full'] <= maxP)
      },
      filterItems(){

        const rooms = this.params['rooms']

        if(!isNaN(rooms)){
          if(rooms === 0){

            let arr = this.flats.filter(flat => flat['is_studio'] === 1)
            this.flatsFiltered = this.sliderParamsFilter(arr)

          }else{

            let arr = this.flats.filter(flat => flat['rooms'] === rooms)
            this.flatsFiltered = this.sliderParamsFilter(arr)

          }
        }else{

          this.flatsFiltered = this.sliderParamsFilter(this.flats)
      }
    },

   }
  }
</script>

<style scoped>

</style>
