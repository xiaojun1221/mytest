<template>
	<div class="checkOrder_wrap">
		<header>
			<div class="logo"><router-link to="/"><img src="../../assets/img/ht.png" alt="" /></router-link></div>
			<ul>
				<li v-if="info?true:false" style="color: #fff;">
					{{info.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}} 
				</li>
				<li v-if="info?true:false" style="color: #fff;" @click="exit()">
					[退出]
				</li>
			</ul>
		 </header>
		 <nav class="liList">
			<ul>
				<li class="b_wrap"><router-link to="/checkOrder/product"><img src="../../assets/img/product.png" alt="" /><span>产品管理</span></router-link></li>
				<li class="b_wrap"><router-link to="/checkOrder/sum"><img src="../../assets/img/ht_menu_ic_yytj.png" alt="" /><span>交易统计</span></router-link></li>
				<li class="b_wrap"><router-link to="/checkOrder/settlementInfo"><img src="../../assets/img/ht_menu_ic_jsxx.png" alt="" /><span>结算信息</span></router-link></li>

				<li class="b_wrap">
					<a id="withdraw_wrap" @click="showList($event)"><img src="../../assets/img/settlement.png" alt="" /><span>提款结算</span><img src="../../assets/img/ht_xl.png" alt=""><img src="../../assets/img/ht_xl2.png" alt="" class="open2"></a>					
					<ul id="withdraw">						
						<li ><router-link to="/checkOrder/withdraw"><span>提款</span></router-link></a></li>
						<li ><router-link to="/checkOrder/settlement"><span>委托结算</span></router-link></li>
						<li ><router-link to="/checkOrder/withdrawRecord"><span>提款记录</span></router-link></li>
					</ul>
				</li>
				
				<li class="b_wrap">
					<a id="bank_wrap" @click="showBank($event)"><img src="../../assets/img/bank_card.png" alt="" /><span>银行卡管理</span><img src="../../assets/img/ht_xl.png" alt=""><img src="../../assets/img/ht_xl2.png" alt="" class="open2"></a>
					<ul id="bankList">
						<li class="b_wrap"><router-link to="/checkOrder/bankList"><span>银行卡列表</span></router-link></a></li>
					</ul>
				</li>

			</ul>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
	import vsum from './sum';
	import vwithdraw from './withdraw';
	import router from "../../router/index.js";
	export default{
		data(){
			return{
				info:window.sessionStorage.userphone
			}
		},
		methods:{
			exit(){
				window.sessionStorage.userphone="";
				window.sessionStorage.token="";
				window.sessionStorage.userid="";
				this.info="";
				router.push("/");
			},
			showList(e){
				$("#withdraw").slideToggle(400)
				$("#withdraw_wrap").toggleClass("open1")
				
				
				
				
			},
			showBank(e){
				$("#bankList").slideToggle(400)	
				$("#bank_wrap").toggleClass("open1")
			}
		},
		components:{
			// vsum,
			// vwithdraw
		},
		created(){
			// $.ajax({
			// 	url:"http://192.168.0.46/provinces.php",
			// 	type:"get",
			// 	success:function(data){
			// 		console.log(JSON.parse(data.split('result":')[1].split('}"')[0]).splice(0,34))
			// 	},
			// 	error:function(e){
			// 		console.log(e)
			// 	}
			// })
		}
	}
</script>

<style>
</style>