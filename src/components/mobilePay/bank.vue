<template>
	<div class="bank_wrap">
		<header>
			<span @click="back()"><</span>
			银联支付
		</header>
		<div class="pay_info">
			<h1>¥0.01</h1>
			<h2>测试应用-支付功能体验（非消费商品）</h2>
			<h3>32441707071639208331</h3>
		</div>
		<div class="card">
			<div><i>银行卡号</i><input type="number" placeholder="请输入银行卡号"/></div>
			<div><i>手机号</i><input type="tel" placeholder="请输入手机号"/></div>
			<div><i>验证码</i><input type="text" placeholder="请输入验证码"/><span>点击获取</span></div>
		</div>
		<button >确认支付¥0.01</button>
		<div class="pay_word">
				<p><span>*</span>本页面仅用于支付测试及体验，任何利用本页面产生的订单信息于其他用途等行为，我要付不承担任何责任，并保留追究法律责任的权利</p>
				<p><span>*</span>本次体验为真实付款，体验金额不予退还，请勿大额支付</p>
		</div>
		
	</div>
</template>

<script>
	import router from "../../router/index.js";
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
export default {
	data(){
		return{
			
		}
	},
	methods:{
		back(){
			router.go(-1)
		}
	}
	
}	
</script>

<style>
</style>