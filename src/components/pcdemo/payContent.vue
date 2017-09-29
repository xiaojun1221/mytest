<template>
	<div class="sec_bg">
	<section>
		<div class="title">
			<p>商品名称 &nbsp;: &nbsp;<span>测试应用-支付功能体验（非商品消费）</span></p>
			<p>订单编号 &nbsp;: &nbsp;<span>{{this.orderid}}</span></p>
			<p>金额: &nbsp;<span>¥{{amount}}</span></p>
		</div>
		<div class="pay_content" v-show="show">
			<div class="pay_way">
				<h1>请选择支付方式</h1>
				<ul>
					<li v-for="(i,index) in list" :key="index" @click="changeIndex(index)" :class="liIndex==index?'li-active':''">
						<img :src="i.src" alt="" />
						<span>{{i.payway}}</span>
					</li>
				</ul>
			</div>
			<div class="paybox">
				<p>需支付:{{amount}}元</p>
				<router-link to="">
					<div @click="showCon">立即支付</div>
				</router-link>
			</div>
			<div class="pay_word">
				<p><span>*</span>本页面仅用于支付测试及体验，任何利用本页面产生的订单信息于其他用途等行为，我要付不承担任何责任，并保留追究法律责任的权利</p>
				<p><span>*</span>本次体验为真实付款，体验金额不予退还，请勿大额支付</p>
			</div>
			
		</div>
		<div class="wx_pay" v-if="wx">
			<h1><img src="../../assets/img/demo/demo_pc_wechat.png" alt="" />微信支付</h1>
			<h2>通过微信 &nbsp;[扫一扫] &nbsp;扫描二维码进行支付</h2>
			<div class="img_box">
				<!-- <img src="https://cli.im/api/qrcode/code?text=&mhid=sELPDFnok80gPHovKdI" alt="" /> -->
				<div id="qrcode">
			    
			    </div>
				<img src="../../assets/img/demo/demo_pc_wechat_phone.png" alt="" />
			</div>
			<p @click="showOther()">其他支付方式 &nbsp;></p>
			<div class="layout" v-show="layout">
				<p>订单支付超时，二维码已失效</p>
				<p><span>{{mytime}}</span>秒后将自动返回到商户</p>
				<!--<span @click="times()">k</span>-->
			</div>
		</div>
		<div class="yl_pay" v-if="yl">
			<h1><img src="../../assets/img/demo/demo_pc_yl.png" alt="" />银联支付</h1>
			<div><i>银行卡号</i><input type="number" placeholder="请输入银行卡号"/></div>
			<div><i>手机号</i><input type="tel" placeholder="请输入手机号"/></div>
			<div><i>验证码</i><input type="text" placeholder="请输入验证码"/><span>点击获取</span></div>
			<button>立即支付</button>
			<p @click="showOther()">其他支付方式 &nbsp;></p>
		</div>
		<div class="ali_pay" v-if="ali">
			<h1><img src="../../assets/img/demo/demo_pc_ali.png" alt="" />支付宝付款</h1>
			<h2>请通过支付宝 &nbsp;[扫一扫] &nbsp;扫描二维码进行支付</h2>
			<div class="img_box">
				<!-- <img src="../../assets/img/demo/demo_pc_ewm.png" alt="" />				 -->
				<div id="qrcode">
			    
			    </div>
				<img src="../../assets/img/demo/demo_pc_ali_phone.png" alt="" />
			</div>
			<p @click="showOther()">其他支付方式 &nbsp;></p>
		</div>
		
		
	</section>
	</div>
</template>

<script>
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
	import router from "../../router/index.js";
	
	export default {
  		data () {
   		 return {
   		 	list:[
   		 		{src:require("../../assets/img/demo/demo_pc_wechat.png"),payway:"微信支付"},
   		 		{src:require("../../assets/img/demo/demo_pc_yl.png"),payway:"银联支付"},
   		 		{src:require("../../assets/img/demo/demo_pc_ali.png"),payway:"支付宝"}
   		 	],
   		 	liIndex:0,
   		 	show:true,
   		 	wx:false,
   		 	yl:false,
   		 	ali:false,
   		 	layout:false,
			mytime:5,
			qrCode:"",
			orderid:"",
			timer:null,
			timeOut:null,
			amount:null	   		 	
   		 }
  		},
  		computed:{
  			
  		},
  		created(){		 							
			var that=this
			$.ajax({
				url:"http://p.51paypay.net/api/v1/pay/public/wechat_qr/",
				type:"get",
				// data:"",
				success:function(data){
						// console.log(JSON.parse(data))
						that.qrCode=JSON.parse(data).data.qrCode
						that.orderid=JSON.parse(data).data.orderid
						that.amount=JSON.parse(data).data.amount	
						// console.log(that.qrCode)
						// that.init(that.qrCode)	
				},
				error:function(e){
					console.log(e)
				}
			})
			// if(this.layout){
			// 	this.times()
			// }			
		  },
		  destroyed() {		//离开此页面清除计时器	 
			  clearInterval(this.$data.timer)
			  clearTimeout(this.timeOut)
		  },
	
  		methods:{
			  
  			changeIndex(index){  				
				this.liIndex=index;				
  			},
  			//设置一个方法，判断选中项下标，并将相应的v-if值改变来控制显示隐藏
			showCon(){ 				
				this.show=!this.show;				
				if(this.liIndex==0){
					this.wx=true//微信支付页面显示
					this.init(this.qrCode)	//生成二维码
					var that=this
					console.log(this.orderid)
					clearInterval(this.$data.timer)
										
					 this.$data.timer=setInterval(function(){//页面轮询支付结果
						$.ajax({
						url:"http://p.51paypay.net/api/v1/pay/public/wechat_qr/status/?orderid="+that.orderid+"",
						type:"get",
						success:function(data){//请求成功后根据状态值判断
							console.log(JSON.parse(data).data.pay_status)
							if(JSON.parse(data).data.pay_status==3||JSON.parse(data).data.pay_status==5){
								that.$emit('up',{
									fail:false,
									success:true									
								})
								clearInterval(this.$data.timer)									
							}
							if(JSON.parse(data).data.pay_status==4){
								that.$emit('up',{
									fail:true,
									success:false								
								})
								clearInterval(this.$data.timer)
							}	
						},
						error:function(err){
							console.log(err)
						}
					})	
					},2000)					
					this.timeOut=setTimeout(function(){//延时器，在请求超过1min后出现弹出层，停止轮询
							that.layout=true
							that.times()
							clearInterval(this.$data.timer)	
						},60000)						
					// 	console.log(this.$route)
					// 	if(this.$route.path!="/pcdemo"){
					// 		console.log(111111)
					// // 	console.log(this.$route.path)
					// 	clearInterval(timer)
						
					// }
				}
				if(this.liIndex==1){
					this.yl=true
				}
				if(this.liIndex==2){
					this.ali=true
					this.init(this.qrCode)
				}
				// console.log(this.wx);
				// console.log(this.yl);
				// console.log(this.ali);
  			},
  			//点击其他支付方式时，对应的v-show值控制显示隐藏
  			showOther(){
  				this.show=true;
  				this.wx=false;
  				this.yl=false;
  				this.ali=false;
  			},
  			//弹出层倒计时
  			times(){
  				var that=this;
  				var interval=setInterval(function(){  					
  					console.log(that.mytime)
  					if((that.mytime--)<=0){
  						that.layout=false; 		//弹出层出现				
						clearInterval(interval);//清除倒计时
						that.$router.go(0);//页面刷新
  					} 					
  				},1000)
  			},
		   init(url) {						   
		        	this.$nextTick(function(){
						var qrcode = new QRCode(document.getElementById("qrcode"), {
						width: 200, //设置宽高
						height: 200
                	});
                	qrcode.makeCode(url);//生成二维码
				  })  				   
		   },
		   		
		  },
		  
		  
}
</script>

<style>
</style>