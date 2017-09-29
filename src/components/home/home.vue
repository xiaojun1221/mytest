<template>
  <div>
      <vheader></vheader>
      <router-view></router-view>
      <vfooter></vfooter>
  </div>
</template>
<script>
import swiper from '../swiper/swiper'
import vheader from '../header/header'
import vfooter from '../footer/footer'
import vhomeBody from '../homeBody/homeBody'
//import vguide from '../guide/guide'
export default {
  data () {
    return {}
  },
  components:{
//	vguide,   
    vheader,
    //swiper,
    vhomeBody,
    vfooter,
  }
}
</script>

<style>

</style>
