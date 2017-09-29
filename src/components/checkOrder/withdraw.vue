<template>
    <div class="withdraw_wrap">
        <div class="content_top">
                <h1>提款</h1>
                <p class="heading">提款资料 (注: 提款到商户注册绑定银行卡)</p>
                <h2>可用余额</h2>
                <p>可用余额 <span>{{balance}}</span></p> 
                <h2>限额</h2>
                <p>限额最低 <span>1000.00</span></p>
                <p>限额最高 <span>200000.00</span></p>
        </div>
        <div class="content_bottom">              
            <h2>提款信息</h2>
            <span>提款金额</span>
            <input type="text" placeholder="提款金额" ref="withdraw" id="withdraw_sum">
            <i>手续费收取方式: 商户可用余额</i> 
            <br>              
            <span>提款备注</span>                
            <textarea name="" id="remark"  rows="4" placeholder="请输入备注的内容" ref="remark"></textarea>              
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
                balance:null
            }
        },
        // created(){
        //     var that=this
        //     $.ajax({
        //         url:"",
        //         type:"get",
        //         data:{},
        //         success:function(data){
        //             console.log(data)
        //         }
        //     })
        // },
        methods:{
            reset(){
                document.getElementById("withdraw_sum").value="";
                document.getElementById("remark").value="";
                // console.log(this.$refs.withdraw.value)
                // console.log(this.$refs.remark.value)
            },
            submit(){
                if(this.$refs.withdraw.value){
                    if(Number(this.$refs.withdraw.value)>=1000){
                    // var that=this
                    // $.ajax({
                    //     url:"",
                    //     type:"post",
                    //     data:{},
                    //     success:function(data){
                    //         console.log(data)
                    //     }
                    // })
                    }else{
                        alert("提款金额不能小于最低提款限额!")
                    }
                }else{
                    alert("请输入正确的金额")
                }
                
            }
        }
    }
</script>
<style>

</style>
