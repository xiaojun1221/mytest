<template>
	<div id="pcdemo_wrap">
	<header>
		<router-link to="/">
			<img src="../../assets/img/demo/demo_pc_logo.png" alt="" />
		</router-link>
		<router-link to="/">
			<span>返回首页</span>
		</router-link>
	</header>
	<div class="pay_fail" v-if="fail">
		<img src="../../assets/img/demo/demo_pc_pay_fail.png" alt="" />
		<h1>抱歉，订单支付失败</h1>
		<h2>可能原因:订单已关闭</h2>
		<button>继续支付</button>
	</div>
	<div class="pay_success" v-if="success">
		<img src="../../assets/img/demo/demo_pc_pay_success.png" alt="" />
		<h1>支付成功！</h1>
	</div>
	<payContent v-if="content" @up="change"></payContent>
	<vfooter></vfooter>
	</div>
	
</template>

<script>
	import vfooter from '../footer/footer'
	import payContent from './payContent'
	export default {
		data(){
			return{
				content:true,
				fail:false,
				success:false,
			}
		},

  		components:{
    		vfooter, 
    		payContent
		  },
		  methods:{
			  change(msg){
				  console.log(msg)
				  this.fail=msg.fail
				  this.success=msg.success
				  this.content=false
			  }
		  }

}
</script>

<style>
	
</style>