<template>
<div class="register_wrap">
	<!--<div class="head_wrap">
		<header>
			<router-link to="/">
				<img src="../../assets/img/home/home_logo.png" alt="" />
			</router-link>
			<router-link to="/">
				<span>返回首页</span>
			</router-link>
		</header>
	</div>-->
	<top></top>
	<section>
		<div class="bg">
		<div class="register">
			<ul >
				<li v-for="(item,index) in items"  :class="liIndex==index?'active':''"  :key="index">{{item.text}}</li>
			</ul>
			<div class="register_con" v-show="s1">
				<!-- <input type="text" placeholder="请输入商户名" ref="username"/> -->
				<input type="text" placeholder="请输入手机号" ref="userphone"/>
				<input type="password" placeholder="设置登录密码" ref="phonepwd"/>
				<!--6-14字符-->
				<input type="password" placeholder="确认密码" ref="phonepwd2"/>
				<div class="phone"><input type="text" placeholder="验证码" ref="pcode"/><a @click="getCode()" class="getCode" style="cursor:pointer;">获取验证码</a></div>
				<!--<input type="checkbox" v-model="checked"/>-->
				<span>注册并同意并遵守</span><router-link to="/agreement">《用户服务与隐私协议
》</router-link>
				<h1 v-show="phone1" ><img src="../../assets/img/login_register/login_prompt.png" alt="" /><span id="show">请输入正确的手机号或邮箱地址</span></h1>
				
				<button @click="registerP()">注册</button>
				<p><span>已有账号？</span><router-link to="/login">立即登录</router-link></p>
			</div>
			<!--<div class="register_con" v-show="s2">
				<input type="text" placeholder="请输入邮箱号" ref="useremail"/>
				<input type="password" placeholder="设置登录密码" ref="emailpwd"/>
				<input type="password" placeholder="确认密码" ref="emailpwd2"/>
				<div class="email"><input type="text" placeholder="验证码" ref="ecode"/><div class="yzm">VQKR</div><span>换一张</span></div>
				<input type="checkbox" /><span>同意并遵守</span><a >《服务条款》</a>
				<h1 v-show="email1" ><img src="../../assets/img/login_register/login_prompt.png" alt="" /><span id="sw"></span></h1>
				
				<button @click="registerE">注册</button>
				<p><span>已有账号？</span><router-link to="/login">立即登录</router-link></p>
			</div>-->
			
		</div>
		</div>
	</section>
	<foot></foot>
	
</div>
</template>

<script>
	import foot from './foot';
	import top from './head';
	import router from "../../router/index.js";
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
	export default {
  		data () {
   		 return {
   		 	liIndex:0,
   		 	phone1:false,
   		 	email1:false,
   		 	s1:true,
   		 	s2:false,
// 		 	checked:'',
   		 	code:'',
   		 	items:[
   		 		{text:"手机号注册",component:"phone"},
// 		 		{text:"邮箱号注册",component:"email"}
   		 	]
   		 }
  	},
  	methods:{
  		getCode(){
  			var pcode = this.$refs.pcode.value;
  			var userphone = this.$refs.userphone.value; 
			var phonepwd = this.$refs.phonepwd.value;
			var phonepwd2 = this.$refs.phonepwd2.value;
			var that=this
			if(userphone&&phonepwd&&phonepwd2){
				$.ajax({
					url:"http://pay.51paypay.net/admin/auth/authcodes",
					type:"get",
					data:{
						phone:userphone,
						use:'register'
					},
					success:function(data){
								console.log(data)
								// console.log(JSON.parse(data).status==0)	
								if(JSON.parse(data).status==0){
									$(".getCode").html("验证码已发送")
									that.phone1=false;
								}							
								// that.code=data;
								// console.log(that.code)	
								// $(".getCode").html("验证码已发送")
					},
					error:function(e){
						// console.log(e.responseJSON.status)
						if(e.responseJSON.status==104){
							that.phone1=true;
							$("#show").html("账户已存在")
						}
						if(e.responseJSON.status==301){
							that.phone1=true;
							$("#show").html("操作频繁，请稍后再试")
						}
					}
				})
			}else{
				this.phone1=true;
				$("#show").html("请先输入用户名和密码")			
			}
  			
  		},
//		changeIndex(index){				
//				this.liIndex=index;				
//			if(this.liIndex==0){
//				this.s1=true
//				this.s2=false
//			}else{
//				this.s1=false
//				this.s2=true
//			}
//		},
		registerE(){
			
		var useremail = this.$refs.useremail.value; 
		
		var emailpwd = this.$refs.emailpwd.value;
		var emailpwd2 = this.$refs.emailpwd2.value;
		
		var ecode = this.$refs.ecode.value;
		//邮箱注册验证
		if(useremail&&emailpwd&&ecode&&emailpwd2){
			//正则验证 手机号和密码
			var reg2 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
			var reg1 = /\w{6,14}/
			
			if(reg2.test(useremail)){
				if(reg1.test(emailpwd)){
					if(emailpwd==emailpwd2){
						var that=this
						$.ajax({
							url:"http://192.168.0.46:7000/registerE",
							type:"post",
							data:{useremail:useremail,password:emailpwd},
							success:function(data){
								console.log(data)
								//后台判断用户是否存在并返回，若存在就显示在页面
								if((typeof (data))=="string"){									
									that.email1=true;
									$("#sw").html(data)
								}else{
									that.email1=false;
									that.$router.push({path:"/active",query:{user:useremail}})
								}
							}
						})
					}else{
						this.email1=true;
						$("#sw").html("两次输入的密码不一致")	
					}					
				}else{this.email1=true;
					$("#sw").html("请确认密码长度为6-14位")
				}
			}else{this.email1=true;
				console.log("e false")
					$("#sw").html("请输入正确的手机号或邮箱地址")}			
			}else{this.email1=true;			
				$("#sw").html("请确认信息是否为空")
			}		
		},
		registerP(){
		
		var userphone = this.$refs.userphone.value; 
		var phonepwd = this.$refs.phonepwd.value;
		var phonepwd2 = this.$refs.phonepwd2.value;		
		var pcode = this.$refs.pcode.value;
//		var phone_prefix=86
		//手机注册验证
		if(userphone&&phonepwd&&pcode&&phonepwd2){
			//正则验证 手机号和密码
			var reg = /^[1][3,4,5,7,8][0-9]{9}$/
			var reg1 = /\w{6,14}/
			
			if(reg.test(userphone)){
				if(reg1.test(phonepwd)){
					if(phonepwd==phonepwd2){
							var that=this
							$.ajax({
								url:" http://pay.51paypay.net/admin/auth/register",							
								type:"post",						
								data:{phone:userphone,passwd:phonepwd,code:pcode},						
								success:function(data){
									// console.log(data)
									//后台判断用户是否存在并返回，若存在就显示在页面
									if(JSON.parse(data).status==0){										
										that.phone1=false;
										router.push({path:"/login",query:{}})
									}
								},
								error:function(e){
									console.log(e)
									if(e.responseJSON.status==103){
										that.phone1=true;
										$("#show").html("验证码错误")
									}
								}
							})
//						}else{
//							this.phone1=true;
//							$("#show").html("验证码错误")	
//						}						
					}else{
						this.phone1=true;
						$("#show").html("两次输入的密码不一致")	
					}					
				}else{this.phone1=true;
					$("#show").html("请确认密码长度为6-10位")
				}
			}else{this.phone1=true;
					$("#show").html("请输入正确的手机号或邮箱地址")}
			
		}else{this.phone1=true;
			$("#show").html("请确认信息是否为空")
		}
		},
//		toggleTabs (tabText) {
//               this.currentView = tabText;
//     },
//     change(e) {
//				let result = e.target
//				
//				let li = result.parentNode.getElementsByTagName("li")
//				for (let i=0;i<li.length;i++) {
//					li[i].className=""
//				}
//				if(result&&result.nodeName == 'LI'){		
//					result.className = "active"
//					
//				}
//			}
  	},
	components:{
		foot,
		top
	}
}
</script>

<style>
</style>