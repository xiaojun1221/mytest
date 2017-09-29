<template>
<div class="login_wrap">
	<!--<header>
		<router-link to="/">
			<img src="../../assets/img/home/home_logo.png" alt="" />
		</router-link>
		<router-link to="/">
			<span>返回首页</span>
		</router-link>
	</header>-->
	<top></top>
	<section>
		<div class="login">
			<h1>登录</h1>
			<input type="text" placeholder="请输入手机号" ref="userinfo"/><br />
			<input type="password" placeholder="密码" ref="pwd"/><br />
			<!--<input type="checkbox" />-->
			<span class="agree">登录并同意并遵守</span><router-link to="/agreement">《用户服务与隐私协议
》</router-link>
			<input type="checkbox" /><span>15天内免登陆</span>
			<p v-show="loginState"><img src="../../assets/img/login_register/login_prompt.png" alt="" /><span id="tip">请输入正确的手机号或邮箱地址</span></p>
			<button @click="login()">登录</button><br />
			<router-link to="/forget">忘记密码？</router-link>
			<router-link to="/register">快速注册》</router-link>
		</div>
	</section>
	<foot></foot>
	<!--<footer>
		<p>Copyright &copy; 2016 武汉海羽毛网络科技有限公司 | 鄂ICP备17016770号</p>
	</footer>-->
</div>
</template>

<script>
	import foot from '../register/foot';
	import top from '../register/head';
	import router from "../../router/index.js";
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
	export default {
  		data () {
   		 return {
   		 	loginState:false,
   		 }
  	},
  	methods:{
  		login(){
  			let userinfo = this.$refs.userinfo.value; 
  			let pwd = this.$refs.pwd.value;   			
  			if(userinfo&&pwd){ 
  				var that=this
  				$.support.cors = true//ie9 的$ajax兼容 				
  				$.ajax({
  					url:"http://pay.51paypay.net/admin/auth/login",
  					type:"post",
  					data:{userinfo:userinfo,password:pwd},
  					success:function(data){
  						console.log(JSON.parse(data)) 
//						console.log(data=="success")
						if(JSON.parse(data).status!=0){
							that.loginState=true;
							$("#tip").html("用户名或密码错误")
						}else{
							that.loginState=false;
							//  window.sessionStorage.username=JSON.parse(data).data.name
							 window.sessionStorage.userphone=JSON.parse(data).data.phone
							 window.sessionStorage.token=JSON.parse(data).data.token;
							 window.sessionStorage.userid=JSON.parse(data).data.id;
						 	router.push("/checkOrder");
						}
//						if(data.length!=0){
//							 if(pwd!==data[0].password){
//							 	that.loginState=true;			
//								$("#tip").html("密码错误")
//							 }else{
//							 	that.loginState=false;
//							 	window.sessionStorage.username=data[0].userphone||data[0].email;
//							 	 router.push("/");
//							 }
//      
//						}else{
//							that.loginState=true;			
//							$("#tip").html("该用户不存在，请先注册")
//						}
					  },
					  error:function(e){
						//   console.log(e.responseJSON.status==102)
						  if(e.responseJSON.status==102){
							  that.loginState=true;
							$("#tip").html("用户名或密码错误")
						  }
						  if(e.responseJSON.status==101){
							  that.loginState=true;
							$("#tip").html("用户名不存在")
						  }
					  }
  				})
  			}else{
  				this.loginState=true;			
				$("#tip").html("请确认信息是否为空")
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