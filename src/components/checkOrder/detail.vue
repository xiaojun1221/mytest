<template>
    <div class="detail_wrap">
        <div class="content">
            <h1>查看银行卡详情</h1>
            <div class="detail">
                <h2>银行卡详情</h2>
                <p>编号</p>
                <p>账户类型<span>企业</span></p>
                <p>开户行<span>招商银行</span></p>
                <p>开户分行<span>中国</span><span>湖北省</span><span>武汉市</span><span>洪山区</span><span>关山街道</span><span>金融港</span></p>
                <p>开户人<span>于建华</span></p>
                <p>银行卡号<span>1279101896010101</span></p>
                <hr>
                <p>添加时间</p>
                <p>添加IP</p>
                <hr>
                <p>状态<span>启用</span></p>
                <hr>
                <p>备注</p>
            </div>
            <button @click="goback()">返回列表</button>
        </div>
        
    </div>    
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            goback(){
               this.$router.go(-1) 
            }
        },
        created(){
            console.log(this.$route.query.id)
        }

    }
</script>
<style>

</style>
