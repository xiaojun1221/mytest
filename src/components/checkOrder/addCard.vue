<template>
    <div class="addCard_wrap">
        
        <div class="content">
            <h1>添加银行卡</h1>            
            <div class="addCard_body">
                <div>
                    <span>账户类型</span>
                    <select name="" id="" ref="c_type">
                    <option value="" >请选择</option>
                    <option value="">个人</option>
                    <option value="">企业</option>
                    </select>
                </div>
                <div>
                    <span>开户行</span>
                    <select name="" id="" ref="c_bank">
                    <option value="" >请选择</option>
                    <option value="index" v-for="(i,index) in bankList" :key="index">{{i.Name}}</option>                   
                    </select>
                </div>
                
                <div class="bankInfo">
                    <span>开户分行</span>
                    <select name="" id="" ref="country">
                        <option value="" >请选择</option>
                    </select>
                    <select name="" id="" ref="province">
                        <option value=""></option>
                    </select>
                    <select name="" id="" ref="city">
                        <option value=""></option>
                    </select>
                    <select name="" id="" ref="zone">
                        <option value=""></option>
                    </select>
                    <select name="" id="" ref="street">
                        <option value=""></option>
                    </select>
                    <input type="text" name="" id="" placeholder="开户分行" ref="bank_name">
                </div>
                <div>
                    <span>开户人</span>
                    <input type="text" placeholder="开户人" ref="banker">
                </div>
                <div>
                    <span>银行卡号</span>
                    <input type="text" placeholder="银行卡号" ref="card_num">
                </div>           
                <hr>
                <div>
                    <span>状态</span>
                    <select name="" id="" ref="c_status">
                        <option value="" >启用</option>
                        <option value="">禁用</option>
                    </select>
                </div>
                <hr>
                <div>
                    <span>备注</span>
                    <textarea name="" id=""  rows="4" ref="c_remark"></textarea>
                </div>               
                <button @click="add()">添加</button>
                <button @click="reset()">重置</button>
            </div>
        </div>
    </div>    
</template>

<script>
import $ from '../../../static/libs/jquery-1.10.1.min.js';
    export default{
        data(){
            return{
                bankList:null,
            }
        },
        created(){
            var that=this
            $.ajax({
                url:'../../../static/bank.json',
                type:"get",
                success:function(data){
                    console.log(data)
                    that.bankList=data
                }
            })
        },
        methods:{
            reset(){
                var select=document.querySelectorAll('select');
                var input=document.querySelectorAll('input');
                for(var i=0;i<select.length;i++){
                    select[i].selectedIndex=0;
                }
                for(var i=0;i<input.length;i++){
                    input[i].value=""
                }
                document.querySelectorAll('textarea')[0].value='';
            },
            add(){

            }
        }
    }
</script>
<style>

</style>
