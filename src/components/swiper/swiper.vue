<template>
	<div>
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		        <div class="swiper-slide">
		        
		        	<img src="../../assets/img/banner_01.png" alt="" />
		        	<p class="swiper-btn1"><router-link to="/guide/feel">Demo体验</router-link></p>
		        	<p class="swiper-btn2"><router-link to="/guide">开始集成</router-link></p>
		        </div>
		        <div class="swiper-slide"><img src="../../assets/img/banner_02.png" alt="" /></div>
		        <div class="swiper-slide"><img src="../../assets/img/banner03.png" alt="" /></div>
		    </div>
		    <!-- 如果需要分页器 -->
		    <div class="swiper-pagination"></div>
		    
		   
		 
		</div>
	</div>
</template>
<script type="text/javascript">
	import Swiper from '../../../static/libs/swiper.min.js'
	export default{
		data() {
			return {}
		},
		created() {
			this.$nextTick(()=>{
				var mySwiper = new Swiper ('.swiper-container', {
						    direction: 'horizontal',
						    loop: true, 
						    pagination: '.swiper-pagination',
						    autoplay:3000
						  })        
			})
		}
	} 
</script>
<style >
	@import '../../assets/css/swiper.min.css';
</style>
<style type="text/css">
	.swiper-container{
		width: 100%;
		
	}
	.swiper-slide{
		position: relative;
		
	}
	.swiper-btn1,.swiper-btn2{
		position: absolute;
		width:154px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 22px;
		bottom:16%;
		
	}
	.swiper-btn1{
		background: #108ee9;
		left:40%;
	}
	.swiper-btn2{
		background: #e79700;
		left:52%;
	}
	a{
		color: #fff;
		text-decoration: none;
	}
	.swiper-slide img{
		width: 100%;
		display: block;		
	}
</style>