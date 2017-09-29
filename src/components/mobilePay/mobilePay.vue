<template>
	<div class="mobile_wrap">
		<header>
			<img src="../../assets/img/demo/demo_h5_logo.png" alt="" />
		
		</header>
		<div class="pay_info">
			<h1>¥0.01</h1>
			<h2>测试应用-支付功能体验（非消费商品）</h2>
			<h3>32441707071639208331</h3>
		</div>
		<div class="pay_way">
			<ul>
				<li v-for="(item,index) in imgList" :key="index" @click="changeIndex(index)" :class="liIndex==index?'active':''">
					<img :src="item.src" alt="" />
					<span>{{item.payway}}</span>
					<img :src="item.icon" alt="" />
				</li>
			</ul>
		</div>
		<button @click="pay()">确认支付¥0.01</button>
		<div class="pay_word">
				<p><span>*</span>本页面仅用于支付测试及体验，任何利用本页面产生的订单信息于其他用途等行为，我要付不承担任何责任，并保留追究法律责任的权利</p>
				<p><span>*</span>本次体验为真实付款，体验金额不予退还，请勿大额支付</p>
		</div>
		<div class="shadow" v-show="shadow">
			<div class="alert" >
				<div class="del" @click="del()">×</div>
				<h1>订单支付超时，请返回商户重新下单</h1>
				<button @click="del()">再次支付</button>
			</div>
		</div>
	</div>
</template>

<script>
import  '../../../static/flexible/flexible.js';
import $ from '../../../static/libs/jquery-1.10.1.min.js';
import router from "../../router/index.js";
//import  '../../../static/layer_mobile/layer.js';
export default {
  		data () {
	   		 return {
	   		 	imgList:[
	   		 		{src:require("../../assets/img/demo/demo_pc_wechat.png"),payway:"微信支付",icon:require("../../assets/img/demo/demo_h5_check.png")},  				
	   		 		{src:require("../../assets/img/demo/demo_pc_ali.png"),payway:"支付宝支付",icon:require("../../assets/img/demo/demo_h5_check.png")},
	   		 		{src:require("../../assets/img/demo/demo_pc_yl.png"),payway:"银联支付",icon:require("../../assets/img/demo/demo_h5_check.png")}
	   		 	],
	   		 	liIndex:0,
	   		 	shadow:false,
	   		 	
	   		 	
	   		 }
   	},
   	methods:{
   		changeIndex(index){
  				console.log(index);
				this.liIndex=index;
				console.log(this.liIndex);
  			},
  			pay(){
  				if(this.liIndex==2){
  					router.push("/bank");
  				}
//				this.$layer.alert('正在加载...',2,1)
  			},
  			del(){
  				this.shadow=false;
  			}
   	},
   	created() {
   		

   	}
}
	
</script>

<!--<script type="text/javascript" src="../../../../flexible/flexible.js"></script>-->
<!--<link rel="stylesheet" href="../../../../flexible/flexible.css" />-->
<style>
	
</style>