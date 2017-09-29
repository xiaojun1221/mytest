<template>
    <div class="editCard_wrap">
        
        <div class="content">  
            <h1>编辑银行卡</h1>          
            <div class="edit_body">
                <div>
                    <span>账户类型</span>
                    <select name="" id="" >
                    <option value="" >请选择</option>
                    <option value="">个人</option>
                    <option value="">企业</option>
                    </select>
                </div>
                <div>
                    <span>开户行</span>
                    <select name="" id="">
                    <option value="" >请选择</option>
                    <option value="index" v-for="(i,index) in bankList" :key="index">{{i.Name}}</option>                   
                    </select>
                </div>
                
                <div class="bankInfo">
                    <span>开户分行</span>
                    <select name="" id="">
                        <option value="" >请选择</option>
                    </select>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                    <select name="" id="">
                        <option value=""></option>
                    </select>
                    <input type="text" name="" id="" placeholder="开户分行">
                </div>
                <div>
                    <span>开户人</span>
                    <input type="text" placeholder="开户人">
                </div>
                <div>
                    <span>银行卡号</span>
                    <input type="text" placeholder="银行卡号">
                </div>           
                <hr>
                <div>
                    <span>状态</span>
                    <select name="" id="">
                        <option value="" >启用</option>
                        <option value="">禁用</option>
                    </select>
                </div>
                <hr>
                <div>
                    <span>备注</span>
                    <textarea name="" id=""  rows="4"></textarea>
                </div>               
                <button>更新</button>
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
                    // console.log(data)
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
            }
        }
    }
</script>
<style>

</style>
