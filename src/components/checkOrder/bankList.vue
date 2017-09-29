<template>
    <div class="bankCard_wrap">
        <div class="content_top">
            <h1>银行卡管理 <router-link to="/checkOrder/addCard" style="color:#000;">+添加银行卡</router-link></h1>
            <div class="search">
                <div class="num">
                    <span>编号:</span>
                    <input type="text" placeholder="请输入编号">
                </div> 
                <div class="name">
                    <span>名称:</span>
                    <input type="text" placeholder="请输入名称">
                </div>                         
                <div class="search_info">
                    <span>状态:</span>
                    <select name="" id="">
                        <option value="" selected>所有状态</option>
                        <option value="">启用</option>
                        <option value="">禁止</option>
                    </select>                            
                    <button>查询</button>
                </div>    
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <td>编号</td>
                    <td>类型</td>
                    <td>账户类型</td>
                    <td>开户银行</td>
                    <td>开户人</td>
                    <td>账号</td>
                    <td>状态</td>
                    <td>操作</td>                                
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in cardList" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.account_type}}</td>
                    <td>{{item.bank}}</td>
                    <td>{{item.user}}</td>
                    <td>{{item.account_number}}</td>
                    <td>{{item.statu}}</td>
                    <td>
                        <router-link :to="{path:'/checkOrder/detail',query:{id:item.id}}">详细</router-link>
                        <router-link :to="{path:'/checkOrder/editCard',query:{id:item.id}}">编辑</router-link>
                        <router-link to="">删除</router-link>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        <vpage></vpage>
    </div>    
</template>

<script>
import vpage from './pagination'
import $ from '../../../static/libs/jquery-1.10.1.min.js';
    export default{
        data(){
            return{
                cardList:null,
            }
        },
        components:{
            vpage,
        },
        created(){
            var that=this
            $.ajax({
                url:'../../../static/cardInfo.json',
                type:"get",
                success:function(data){
                    console.log(data)
                    that.cardList=data
                }
            })
        }
    }
</script>
<style>

</style>
