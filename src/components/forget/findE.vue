<template>
<div class="find_wrap_E">
	<top></top>
	
	<section v-if="findEmailState1">
		<img src="../../assets/img/login_register/login_send_email.png" alt="" />
		<h1>密码找回</h1>
		<p>已发送邮件至{{userinfo}}，<br/>请登录邮箱重置密码，该邮件的有效期为<span>24</span>小时</p>
		<p><span>已有账号？</span><router-link to="/login">立即登录</router-link></p>
	</section>
	<aside v-if="findEmailState2">
		<h1>密码找回</h1>
		<input type="password" placeholder="设置新的密码（6-14位之间）" ref="emailpwd"/>
		<input type="password" placeholder="确认密码" ref="emailpwd2"/>
		<h1 v-show="errorState" ><img src="../../assets/img/login_register/login_prompt.png" alt="" /><span class="show"></span></h1>
		<button @click="changePassword()">确定</button>
		<p><span>已有账号？</span><router-link to="/login">立即登录</router-link></p>
	</aside>
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
			findEmailState1:true,
			findEmailState2:false,
			errorState:false,
			userinfo:this.$route.query.userinfo,
		}
	},
	methods:{
		changePassword(){
			var emailpwd = this.$refs.emailpwd.value; 
			var emailpwd2 = this.$refs.emailpwd2.value; 
			var useremail=this.userinfo;
			var reg = /\w{6,14}/;
			if(emailpwd&&emailpwd2){
				if(reg.test(emailpwd)){
					if(emailpwd2==emailpwd){
						var that=this
						$.ajax({
						url:"http://192.168.0.46:7000/updateEmail",
						type:"post",
						data:{useremail:useremail,emailpwd:emailpwd},
						success:function(data){
							console.log(data)
							that.errorState=false;
							router.push({path:"/login",query:{}})
						}
						})
					}else{
						this.errorState=true;			
						$(".show").html("两次输入的密码不一致")
					}					
				}else{
					this.errorState=true;			
					$(".show").html("请确认密码长度为6-14位")
				}
			}else{
				this.errorState=true;			
				$(".show").html("请确认信息是否为空")
			}
		}
	},
	components:{
		foot,
		top
	}
}
</script>
	
<style>
</style>