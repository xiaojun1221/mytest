<template>
    <div class="settlementInfo_wrap">
        <div class="content">
            <h1>结算信息</h1>
            <p>开户姓名 &nbsp;:&nbsp;<span>{{settlementInfo.name}}</span></p>
            <p>公司名称&nbsp;:&nbsp;<span>{{settlementInfo.mchname}}</span></p>
            <p>银行卡号&nbsp;:&nbsp;<span>{{settlementInfo.bankaccount}}</span></p>
            <p>开户行&nbsp;:&nbsp;<span>{{settlementInfo.bank}}</span></p>
        </div>        
    </div>    
</template>

<script>
import $ from '../../../static/libs/jquery-1.10.1.min.js';
    export default{
        data(){
            return{
              settlementInfo:[],  
            }
        },
        created(){
            var token=window.sessionStorage.token;
            var userid=window.sessionStorage.userid;
            var that=this;
			$.ajax({
				url:"http://pay.51paypay.net/admin/auth/info",
				type:"get",
				success:function(data){
					console.log(JSON.parse(data))
					that.settlementInfo=JSON.parse(data).data
				},
				error:function(e){
					console.log(e)
				},
				beforeSend: function(xhr) {
						xhr.setRequestHeader("X-AUTH-TOKEN",token);
						xhr.setRequestHeader("X-AUTH-USER",userid);
				} 
			})
        }
    }
</script>
<style>

</style>
