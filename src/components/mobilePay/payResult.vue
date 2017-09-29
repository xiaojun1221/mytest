<template>
	<div class="result_wrap">
		<header>
			<span @click="back()"><</span>
			支付结果
		</header>
		<section v-if="result1">
			<img src="../../assets/img/demo/demo_h5_fail.png" alt="" />
			<h1>抱歉，订单支付失败</h1>
			<h2>可能原因:订单已关闭</h2>
			<button @click="goback()">继续支付</button>
		</section>
		<section v-if="result2">
			<img src="../../assets/img/demo/demo_h5_success.png" alt="" />
			<h1>支付成功</h1>			
			<button @click="goback()">返回商户</button>
		</section>
	</div>
</template>

<script>
	import router from "../../router/index.js";
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
export default {
	data(){
		return{
			result1:false,
			result2:true,
		}
	},
	methods:{
		back(){
			router.go(-1)
		},
		goback(){
			router.push({path:"/mobilePay",query:{}})
		}
	}
	
}	
</script>

<style>
</style>