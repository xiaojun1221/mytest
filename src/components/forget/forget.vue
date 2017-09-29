<template>
<div class="forget_wrap">
	<top></top>
	<div class="bg">
		<div class="bg_wrap">
			<section >
				<h1>密码找回</h1>
				<input type="text" placeholder="请输入手机号" ref="userinfo"/>
				<div class="code">
					<input type="text" placeholder="验证码" ref="code"/>
					<div id="code_wrap">
						<div class="yzm"><img :src="_url()" alt=""></div>
						<span @click="changeImg()">换一张</span>
					</div>
				</div>
				<h1 v-show="forgetState" ><img src="../../assets/img/login_register/login_prompt.png" alt="" /><span class="show"></span></h1>
				<button @click="next()">下一步</button>
				<p><span>已有账号？</span><router-link to="/login">立即登录</router-link></p>
			</section>
		</div>
	</div>
	<foot></foot>
</div>
</template>

<script>
	import foot from '../register/foot';
	import top from '../register/head';
	import router from "../../router/index.js";
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
	import '../../../static/libs/gVerify.js';
export default{
	data(){
		return{
			forgetState:false,
			codeNumber:'',
			number:parseInt(Math.random()*9000+1000),
			
		}
	},	
	components:{
		foot,
		top
	},
	created(){
		this.changeImg()
//		this.number=parseInt(Math.random()*9000+1000)
//		console.log(this.codeNumber)
//		var verifyCode = new GVerify("code_wrap");
//console.log(this)
//	this.getYzm()

	},
	methods:{
		_url() {
			
		 	return 'http://pay.51paypay.net/admin/auth/get-id-code?id='+this.number+''
		},
		next(){			
			var userinfo = this.$refs.userinfo.value; 
			var code= this.$refs.code.value; 	
			
			if(userinfo&&code){
				var that=this
				$.support.cors = true//ie9 的$ajax兼容
				$.ajax({
  					url:"http://pay.51paypay.net/admin/auth/account/preforget",
  					type:"post",
  					data:{userinfo:userinfo,code:code,id:that.number},
  					success:function(data){ 
  						console.log(data) 
  						if(data=="AccountFail"){
  							console.log(1111)
  							that.forgetState=true;			
							$(".show").html("用户不存在")
  						}else{
  							console.log(2222)
  							if(data=="CodeFail"){
  								that.forgetState=true;			
								$(".show").html("验证码不正确")
  							}else{
  								var reg_e = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
								var reg_p = /^[1][3,4,5,7,8][0-9]{9}$/	
							       if(reg_e.test(userinfo)){
										console.log("email")
										that.forgetState=false;
										router.push({path:"/findE",query:{userinfo:userinfo}})
									}else{
										console.log("phone")
										that.forgetState=false;
										router.push({path:"/findP",query:{userinfo:userinfo}})
									}
  							}
  						}
  						
//						else{
//							
//						}
  						
//						if(data.length!=0){
//							 if(pwd!==data[0].password){
//							 	that.loginState=true;			
//								$("#tip").html("密码错误")
//							 }else{
//							 	that.loginState=false;
//							 	window.localStorage.username=data[0].userphone||data[0].email;
//							 	 router.push("/");
//							 }

//      				var reg_e = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
//						var reg_p = /^[1][3,4,5,7,8][0-9]{9}$/	
//						       if(reg_e.test(userinfo)){
//									console.log("email")
//									that.forgetState=false;
//									router.push({path:"/findE",query:{userinfo:userinfo}})
//								}else{
//									console.log("phone")
//									that.forgetState=false;
//									router.push({path:"/findP",query:{userinfo:userinfo}})
//								}

////						}
//						else{
//							that.forgetState=true;			
//							$(".show").html("该用户不存在")
//						}
  				},
  				error:function(e){
  					console.log(e)
  				}
  	})				
			}else{
				this.forgetState=true;			
				$(".show").html("请确认信息是否为空")
			}
		},
		changeImg(){
			$(".yzm").find("img").remove()
			$(".yzm").append('<img src="http://pay.51paypay.net/admin/auth/get-id-code?id='+this.number+'&'+parseInt(Math.random()*9)+'">')
			
			var phone_prefix=86;
			var phone=this.$refs.userinfo;
			this.codeNumber=parseInt(Math.random()*9)
			console.log(this.number)
			// $.ajax({
			// 		url:"http://192.168.200.127:5000/get-id-code",
			// 		type:"get",
			// 		data:{codeNumber:this.codeNumber},
			// 		success:function(data){
			// 			console.log(data)

			// 		}
			// })
		}
	}
}
</script>
	
<style>
</style>