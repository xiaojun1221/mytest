<template>
    <div class="settlement_wrap">
        <div class="content_top">
                <h1>委托结算</h1>
                <p class="heading">委托结算资料 (注: 提款到商户注册绑定银行卡)</p>
                <h2>可用余额</h2>
                <p>可用余额 <span>{{balance}}</span></p> 
                <h2>限额</h2>
                <p>限额最低 <span>1000.00</span></p>
                <p>限额最高 <span>200000.00</span></p>
        </div>
        <div class="content_bottom">              
            <h2>提款信息</h2>
            <span>提款银行卡</span>
            <select name="" id="settlement_card" ref="bank">
                <option value="">请选择</option>
                <option  v-for="(i,index) in bankCard" :key="index" :value="i.Id">{{i.Name}}</option>
            </select>
            <br/>
            <span>提款金额</span>
            <input type="text" placeholder="提款金额" id="settlement_sum" ref="settlement">
            <i>手续费收取方式: 商户可用余额</i> 
            <br>              
            <span>提款备注</span>                
            <textarea name="" id="s_remark"  rows="4" placeholder="请输入备注的内容" ref="s_remark"></textarea>              
            <button @click="submit()">提交</button>
            <button @click="reset()">重置</button>
        </div>
    </div>    
</template>

<script>
import $ from '../../../static/libs/jquery-1.10.1.min.js';
    export default{
        data(){
            return{
                bankCard:[],
                balance:null
            }
        },
        methods:{
           submit(){
               if(this.$refs.bank.value){
                   if(this.$refs.settlement.value){
                       if(Number(this.$refs.settlement.value)>=1000){
                           console.log("success")
                       }else{
                           alert("提款金额不能小于最低提款限额!")
                       }
                   }else{
                       alert("请输入正确的金额")
                   }
               }else{
                   alert("请选择提款银行卡")
               }
           },
           reset(){
               document.getElementById("settlement_sum").value="";
               document.getElementById("s_remark").value="";
               document.getElementById("settlement_card").selectedIndex=0;
           }
        },
        created(){
            var that=this
             $.ajax({
                url:'../../../static/userBank.json',
                type:'get',
                data:'',
                success:function(data){
                    console.log(data)
                    that.bankCard=data
                }
            })
        }
    }
</script>
<style>
 
</style>
