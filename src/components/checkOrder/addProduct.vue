<template>
    <div class="addProduct_wrap">
        <div class="content">
            <h1>添加产品<span @click="goback()"><img src="../../assets/img/ic_back2.png" alt="">返回</span></h1>
            <div class="name">
                <span>产品名称</span>
                <input type="text" placeholder="请输入产品名称" id="p_name" ref="p_name" @input="checkName()">
                <p v-show="name" ><img src="../../assets/img/login_register/login_prompt.png" alt="" /><span id="show_err">产品名称重复，请重新输入</span></p>
            </div>
            <div class="type">
                <span>产品类型</span>
                <select name="" id="p_type" @change="change_($event)" ref="p_type">
                    <option value="3">应用</option>
                    <option value="1">H5网页</option>
                    <option value="2">PC网页</option>
                </select>
            </div>
            <div class="pay_type">
                <span>支付类型</span>
                <div class="check_box" v-if="app" @change="check($event)" ref="p_pay">
                    <label for="check1"><input type="checkbox" name="check" id="check1" value="3"><div>微信APP</div></label>
                    <label for="check2"><input type="checkbox" name="check" id="check2" value="1"><div>微信H5</div></label>
                    <label for="check3"><input type="checkbox" name="check" id="check3" value="21"><div>支付宝H5</div></label>
                </div>
                <div class="check_box" v-if="h5" @change="check($event)" ref="p_pay">                    
                    <label for="check2"><input type="checkbox" name="check" id="check2" value="1"><div>微信H5</div></label>
                    <label for="check3"><input type="checkbox" name="check" id="check3" value="21"><div>支付宝H5</div></label>
                </div>
                <div class="check_box" v-if="pc" @change="check($event)" ref="p_pay">
                    <label for="check1"><input type="checkbox" name="check" id="check1" value="2"><div>微信扫码</div></label>
                    <label for="check2"><input type="checkbox" name="check" id="check2" value="21"><div>支付宝扫码</div></label>
                    <label for="check3"><input type="checkbox" name="check" id="check3" value="11"><div>QQ钱包扫码</div></label>
                    <label for="check4"><input type="checkbox" name="check" id="check4" value="41"><div>京东钱包扫码</div></label>
                    <label for="check5"><input type="checkbox" name="check" id="check5" value="31"><div>百度钱包扫码</div></label>
                </div>
            </div>
            <button @click="creat()">创建</button>
            <button @click="reset()">重置</button>
        </div>       
    </div>    
</template>

<script>
import $ from '../../../static/libs/jquery-1.10.1.min.js';
    export default{
        data(){
            return{
                app:true,
                h5:false,
                pc:false,
                pay_type:null,
                name:false,
                token:window.sessionStorage.token,
                userid:window.sessionStorage.userid
            }
        },
        methods:{
            checkName(){
                var that=this
               $.ajax({
                    url:"http://pay.51paypay.net/admin/auth/appmanage",
                    type:"get",
                    // data:{product_name:that.$refs.p_name.value},
                    success:function(data){
                        var arr=[]
                        // console.log(JSON.parse(data))
                        for(var a in JSON.parse(data).data){
                            arr.push(JSON.parse(data).data[a].name)
                            console.log(arr)
                        }
                        for(var i=0;i<arr.length;i++){
                            if(arr.indexOf(that.$refs.p_name.value)!=-1){
                                that.name=true
                            }else{
                                that.name=false
                                // console.log(arr.indexOf(that.$refs.p_name.value))
                            }
                        }
                    },
                    error:function(e){
                        console.log(e)
                    },
                    beforeSend: function(xhr) {
                            xhr.setRequestHeader("X-AUTH-TOKEN",that.token);
                            xhr.setRequestHeader("X-AUTH-USER",that.userid);
                    } 
               }) 
            },
            goback(){
                this.$router.go(-1)
            },
            change_(event){               
                // console.log(event.target.value)
                if(event.target.value=='3'){
                    this.app=true
                    this.h5=false
                    this.pc=false
                }
                if(event.target.value=='1'){
                    this.app=false
                    this.h5=true
                    this.pc=false
                }
                if(event.target.value=='2'){
                    this.app=false
                    this.h5=false
                    this.pc=true
                }
            },
            check(e){
                // console.log(e.target)
                var input=document.querySelectorAll("input");
                var arr=[]
                for(var i=0;i<input.length;i++){
                    if(input[i].checked){
                        arr.push(input[i].value)
                    }
                }
                this.pay_type=arr.join(',')
                // console.log(this.pay_type)                
            },
            reset(){
                document.getElementById("p_name").value="";
                document.getElementById("p_type").selectedIndex=0;
               $('input:checkbox').removeAttr('checked');
               this.pay_type=[];
               this.app=true
                    this.h5=false
                    this.pc=false                         
            },
            creat(){
                var that=this                
                // console.log(that.$refs.p_type.value)
                if(that.$refs.p_name.value&&that.$refs.p_type.value&&that.pay_type&&that.name==false){
                    $.ajax({
                        url:"http://pay.51paypay.net/admin/auth/appmanage",
                        type:"post",
                        data:{  
                                name:that.$refs.p_name.value,
                                app_type:that.$refs.p_type.value,
                                pay_type:'['+that.pay_type+']'
                            },
                        success:function(data){
                            // console.log(JSON.parse(data))
                            if(JSON.parse(data).status==0){
                                alert("产品创建成功")
                                that.$router.push({path:"./product",query:{}})
                            }
                        },
                        error:function(e){
                            console.log(e)
                        },
                        beforeSend: function(xhr) {
                                xhr.setRequestHeader("X-AUTH-TOKEN",that.token);
                                xhr.setRequestHeader("X-AUTH-USER",that.userid);
                        } 
                    }) 
                }else{
                    alert("请确认信息是否正确")
                }    
            }
        }
    }
</script>
<style>

</style>
