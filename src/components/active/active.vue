<template>
<div class="active_wrap">
	<top></top>
	<section v-if="active">
		<img src="../../assets/img/login_register/login_email.png" alt="" />
		<h1>账号激活</h1>
		<p>注册激活邮件已发送至{{user}}邮箱，请在<span>48</span>小时内登录邮箱点击链接完成激活</p>
		<p><span>已有账号？</span><router-link to="/login">立即登录</router-link></p>
	</section>
	<section v-if="active1">
		<img src="../../assets/img/login_register/login_sucess.png" alt="" />
		<h1>账号激活成功！</h1>
		<p>该邮箱地址将作为您的邮箱登录账号</p>
		<p><span><span id="time">{{mytime}}</span>s后将自动跳转注册前页面，</span><router-link to="/login">点击立即前往</router-link></p>
	</section>
	<foot></foot>
</div>
</template>

<script>
	import foot from '../register/foot';
	import top from '../register/head';
	import router from "../../router/index.js";
export default{
	data(){
		return{
			user:this.$route.query.user,
			active:false,
			active1:true,
			mytime:5
		}
	},
	mounted(){
		this.times();
	},
	methods:{
		times(){
  				var that=this;
  				var interval=setInterval(function(){  					
  					console.log(that.mytime)
  					if((that.mytime--)<=0){
  						 						
  						clearInterval(interval);
  						router.push({path:"/login",query:{}})
  					} 					
  				},1000)
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