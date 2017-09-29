<template>
<div class="find_wrap_p">
	<top></top>
	<div class="bg">
		<section >
			<h1>密码找回</h1>
			<h2>请发送验证码到手机 {{userinfo.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</h2>
			<div class="phone"><input type="text" placeholder="验证码" ref="pcode"/><a @click="getCode()" class="getCode" style="cursor:pointer;">获取验证码</a></div>		
			<input type="password" placeholder="设置新的密码（6-14位之间）" ref="phonepwd"/>
			<!--6-14字符-->
			<input type="password" placeholder="确认密码" ref="phonepwd2"/>		
			<h1 v-show="findtState" ><img src="../../assets/img/login_register/login_prompt.png" alt="" /><span class="show"></span></h1>
			<button @click="changePwd">确定</button>
			<p><span>已有账号？</span><router-link to="/login">立即登录</router-link></p>
		</section>
	</div>
	<foot></foot>
</div>
</template>

<script>
	import foot from '../register/foot';
	import top from '../register/head';
	import router from "../../router/index.js";
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
export default{
	data(){
		return{
			findtState:false,
			code:'',
			userinfo:this.$route.query.userinfo,
		}
	},
	created(){
		
		console.log(typeof(this.userinfo))
	},
	methods:{
		getCode(){
//			var timer
//			setInterval(function(){},60000)
  			var pcode = this.$refs.pcode.value;
  			var userphone = this.$route.query.userinfo; 
			var phonepwd = this.$refs.phonepwd.value;
			var phonepwd2 = this.$refs.phonepwd2.value;
			var that=this
				$.ajax({
					url:"http://pay.51paypay.net/admin/auth/authcodes",
					type:"get",
					data:{
						phone:userphone,
						use:'changepwd'
					},
					success:function(data){
								console.log(JSON.parse(data))
								console.log(JSON.parse(data).status)
								if(JSON.parse(data).status=='0'){
									$(".getCode").html("验证码已发送")
								}
//								if(JSON.parse(data).msg=='SMSCodeAlreadySent'){
//									
//								}
//								that.code=data;
//								console.log(that.code)	
//								$(".getCode").html("验证码已发送")
					},
					error:function(e){
						console.log(e)
					}
				}) 			
		},
		changePwd(){			
			var phonepwd = this.$refs.phonepwd.value; 
			var phonepwd2 = this.$refs.phonepwd2.value; 
			var userphone=this.userinfo;
			var pcode= this.$refs.pcode.value; 
			var reg1 = /\w{6,14}/;
			if(phonepwd&&phonepwd2&&pcode){
//				if(this.code==pcode){
					if(reg1.test(phonepwd)){
						if(phonepwd2==phonepwd){
						var that=this
						$.ajax({
						url:"http://pay.51paypay.net/admin/auth/account/doforget",
						type:"post",
//						phone passwd code
						data:{phone:userphone,passwd:phonepwd,code:pcode},
						success:function(data){
							console.log(data)
								if(JSON.parse(data).status=='0'){
									that.findtState=false;
									router.push({path:"/login",query:{}})
								}else{
									that.findtState=true;			
									$(".show").html("验证码错误")
								}
							
							}
							})
						}else{
						this.findtState=true;			
						$(".show").html("两次输入的密码不一致")
		//				console.log("1111")
						}
					}else{
						this.findtState=true;			
						$(".show").html("请确认密码长度为6-14位")
					}
//				}else{
//					this.findtState=true;
//					$(".show").html("验证码错误")
//				}	
			}else{
				this.findtState=true;			
				$(".show").html("请确认信息是否为空")
			}
	},	
	},
	components:{
		foot,
		top
	}
}
</script>
	
<style>
</style>