<template>
	<div class="payInfo_wrap">
		<div class="head_wrap">
			<header>
				<router-link to="/">
					<img src="../../assets/img/demo/demo_pc_logo.png" alt="" />
				</router-link>
				<router-link to="/server">
					<span>返回咨询服务</span>
				</router-link>
			</header>
		</div>
		<div class="pay_bg">
		<section v-show="pay">
			<div class="title">
				<p>商品名称 &nbsp;: &nbsp;<span>{{server}}</span></p>
				<p>订单编号 &nbsp;: &nbsp;<span>32441707071639208331</span></p>
				<p>金额: &nbsp;<span>¥{{goodsPrice}}</span></p>
			</div>
			<div class="userInfo">
				<h1>请填写收货信息</h1>
				<p><i>收货人姓名</i><input type="text" placeholder="请填写有效的收货人姓名"/></p>
				<p><i>公司名称</i><input type="text" placeholder="请填写公司全称"/></p>
				<div>
					<i>联系电话</i>
					<input type="tel" placeholder="请输入手机号" ref="userNumber" @blur="check()"/>
					<h1 v-show="user" >
						<img src="../../assets/img/login_register/login_prompt.png" alt="" />
						<span class="show"></span>
					</h1>
				</div>
			</div>
			<div class="pay_way">
				<h1>请选择支付方式</h1>
				<ul>
					<li v-for="(item,index) in list" :key="index" @click="changeIndex(index)" :class="liIndex==index?'active':''">
						<img :src="item.src" alt="" />
						<span>{{item.payway}}</span>
					</li>
				</ul>
			</div>
			<div class="paybox">
				<p>需支付 &nbsp;: &nbsp;{{goodsPrice}}元</p>
				<router-link to="">
					<div @click="change()">立即支付</div>
				</router-link>
			</div>
			<p class="ask"><span>*</span>购买前请咨询QQ:1141493445</p>
		</section>
		
		<aside v-show="fail">
			<div>
				<img src="../../assets/img/server/demo_pc_pay_fail.png" alt="" />
				<h1>抱歉，订单支付失败</h1>
			</div>
			<p class="ask"><span>*</span>购买前请咨询QQ:1141493445</p>
		</aside>
		</div>
		<vfooter></vfooter>
	</div>
</template>

<script>
	import vfooter from '../footer/footer'
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
	export default{
		data(){
			return{
				goodsPrice:this.$route.query.goodsPrice,
				server:this.$route.query.server,
				list:[
   		 		{src:require("../../assets/img/demo/demo_pc_wechat.png"),payway:"微信支付"},  		 		
   		 		{src:require("../../assets/img/demo/demo_pc_ali.png"),payway:"支付宝"}
   		 		],
   		 		liIndex:0,
   		 		user:false,
   		 		pay:true,
   		 		fail:false,
			}
		},
		created(){
			console.log(this.$route.query.goodsPrice)
		},
		methods:{
			changeIndex(index){  				
				this.liIndex=index;				
  			},
  			check(){
  				var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  				var userNumber=this.$refs.userNumber.value;
  				if(reg.test(userNumber)){
  					this.user=false;
  				}else{
  					this.user=true;
					$(".show").html("请输入正确的手机号")
  				}
  			},
  			change(){  				
  				this.pay=false;
  				this.fail=true;
  				
  			}
		},
		components:{
			vfooter,
		}
	}
</script>

<style>
</style>