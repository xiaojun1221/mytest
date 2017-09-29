<template>
	<div class="server_wrap">
		<section>
			<h1>购买前请咨询QQ:1141493445</h1>
			<ul>
				<li v-for="(item,index) in serverList" :key="index" >
					<img :src="item.img" alt="" />
					<h1>{{item.server}}</h1>
					<p>¥{{item.price}}</p>
					<button @click="buy(index)">立即支付</button>
				</li>				
			</ul>
		</section>
	</div>
</template>

<script>
	import router from "../../router/index.js";
export default{
	data(){
		return{
			serverList:[
   		 		{img:require("../../assets/img/server/zxfu_img_01.png"),server:"支付接口咨询",price:"5000",data_id:0},
   		 		{img:require("../../assets/img/server/zxfu_img_02.png"),server:"产品代上架咨询",price:"7000",data_id:2},
   		 		{img:require("../../assets/img/server/zxfu_img_03.png"),server:"游戏开发技术咨询",price:"6500",data_id:3},
   		 		{img:require("../../assets/img/server/zxfu_img_04.png"),server:"游戏联运咨询",price:"8000",data_id:4},
   		 		{img:require("../../assets/img/server/zxfu_img_05.png"),server:"ICP备案咨询",price:"6000",data_id:5}
   		 	],
   		 	
		}
	},
	methods:{
		buy(index){			
			router.push({path:"/payInfo",query:{goodsPrice:this.serverList[index].price,server:this.serverList[index].server}})			
		}
	}
}
</script>

<style>
</style>