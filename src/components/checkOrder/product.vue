<template>
     <div class="product_wrap">
        <div class="content_top">
            <h1>产品管理 <router-link to="/checkOrder/addProduct" style="color:#000;">+添加产品</router-link></h1>
            <div class="search">
                <div class="name">
                    <span>产品名称</span>
                    <select name="" id="p_name" ref="p_name" @change="change_p($event)">
                        <option value="">全部</option>
                        <option  v-for="(i,index) in product" :key="index" :value="i" >{{i}}</option>
                    </select>
                </div> 
                <div class="status">
                    <span>激活状态</span>
                    <select name="" id="p_status" ref="p_status" @change="change_p($event)">
                        <option value="" >全部</option>
                        <option value="2">被拒绝</option>
                        <option value="0">待审核</option>
                        <option value="1">已激活</option>
                    </select>
                </div>                         
                <div class="type">
                    <span>产品类型</span>
                    <select name="" id="p_type" ref="p_type" @change="change_p($event)">
                        <option value="" >全部</option>
                        <option value="3">应用</option>
                        <option value="1">H5网页</option>
                        <option value="2">PC网页</option>
                    </select>                                               
                </div>
                
                <div class="search_button">
                    <span>产品名称</span> 
                    <input type="text" placeholder="请输入产品名称" ref="i_name">
                    <button @click="search()">查询</button>
                </div>    
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <td>产品名称</td>
                    <td>产品类型</td>
                    <!-- <td>Key</td> -->
                    <td>ID</td>
                    <td>激活状态</td>
                    <td >支付方式</td>
                    <td>创建时间</td>
                    <td>操作</td>                                
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in productList" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.app_type==1?'H5网页':item.app_type==2?'PC网页':'应用'}}</td>
                    <!-- <td>{{item.account_type}}</td> -->
                    <td>{{item.appid}}</td>
                    <td :class="item.status==0?'class_a':item.status==1?'class_b':'class_c'">{{item.status==0?'待审核':item.status==1?'已激活':'被拒绝'}}</td>
                    <td class="pay_type" ><span v-for="(i,index) in item.pay_type" :key="index">{{`${i==1?'微信H5':i==2?'微信扫码':i==3?'微信APP':i==11?'QQ钱包扫码':i==21?'支付宝扫码':i==31?'百度钱包扫码':'京东钱包扫码'}、`}}</span></td>
                    <td>{{item.created_at}}</td>
                    <td>    
                        <span v-if="item.status!=2">-</span>                    
                        <router-link :to="{path:'/checkOrder/addProduct',query:{id:item.id}}" v-if="item.status==2">编辑</router-link>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        <!-- 分页 -->
        <div class="page_wrap">
            <div class="left">
                <span>每页显示</span>
                <select name="" id="size" ref="size" @change="change_p($event)">
                    <option value="10" selected>10条</option>
                    <option value="20">20条</option>
                    <option value="50">50条</option>
                    <option value="100">100条</option>
                </select>
            </div>
            
            <ul class="pagination unselected"  >
                    <li v-show="current != 1" @click="current-- && goto(current--)" ><a class="last">上一页</a></li>
                    <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                    <a >{{index}}</a>
                    </li>
                    <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)" ><a class="next">下一页</a></li>
            </ul>	
            <div class="right">
            <span>共{{allpage}}页</span>
            <!-- <span>共计{{count}}笔交易</span> -->
            </div> 	        
        </div>
    </div>
</template>
<script>
import $ from '../../../static/libs/jquery-1.10.1.min.js';
export default {
  data(){
      return{
          productList:[],
          product:[],
          current:1,
          showItem:1,
          allpage:1,
          token:window.sessionStorage.token,
          userid:window.sessionStorage.userid,
          payWay:null
      }
  },
  created(){
          var that=this
          $.ajax({
              url:"http://pay.51paypay.net/admin/auth/appmanage",
              type:"get",
              data:{},
			  success:function(data){
                //   console.log(JSON.parse(data))
                  that.productList=JSON.parse(data).data
                  for(var a in JSON.parse(data).data){
                      that.product.push(JSON.parse(data).data[a].name)
                      that.payWay=JSON.parse(data).data[a].pay_type
                    //   console.log(that.payWay)
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
  methods:{
      search(){
          var that = this 
          this.getData(that.$refs.i_name.value,'','')
      },
      getData(name,status,type,page,size){
        var that=this
          $.ajax({
              url:"http://pay.51paypay.net/admin/auth/appmanage",
              type:"get",
              data:{name:name,status:status,app_type:type},
			  success:function(data){
                //   console.log(JSON.parse(data))
                  that.productList=JSON.parse(data).data
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
      change_p(e) {
          var value=e.target.value
          var that = this
          var target = event.target.id
          if(target=="p_name"){
              this.getData(value,that.$refs.p_status.value,that.$refs.p_type.value)
          }
          if(target=="p_status"){
              this.getData(that.$refs.p_name.value,value,that.$refs.p_type.value)
          }
          if(target=="p_type"){
              this.getData(that.$refs.p_name.value,that.$refs.p_status.value,value)
          }
          if(target=="size"){
              this.getData(that.$refs.p_name.value,that.$refs.p_status.value,that.$refs.p_type.value,that.current,value)
          }        
      },
      goto:function(index){
          if(index == this.current) return;
            this.current = index;
            var that=this
            //这里可以发送ajax请求
            this.getData(that.$refs.p_name.value,that.$refs.p_status.value,that.$refs.p_type.value,that.current,that.$refs.size.value)
        },
  },
  computed:{
          pages:function(){
                var pag = [];
                  if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
                       //总页数和要显示的条数那个大就显示多少条
                       var i = Math.min(this.showItem,this.allpage);
                       while(i){
                           pag.unshift(i--);
                       }
                   }else{ //当前页数大于显示页数了
                       var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
                           i = this.showItem;
                       if( middle >  (this.allpage - this.showItem)  ){
                           middle = (this.allpage - this.showItem) + 1
                       }
                       while(i--){
                           pag.push( middle++ );
                       }
                   }
                 return pag
               }
      },
}
</script>
<style scoped="scoped"> 
    li{
      list-style:none;
    }
    a{
      text-decoration:none;
    }
    .pagination {
        position: relative;
				/*width: 400px;*/
      }
      .pagination li{
        display: inline-block;
        margin:0 6px;
      }
      .pagination li a{
      	width: 30px;
      	height: 30px;
      	line-height: 30px;
      	text-align: center;
      	/*padding: 0 26px;*/
        display:inline-block;
        border:1px solid #bababa;
        background:#fff;
        color:#666;
      }
      .pagination li a:hover{
        background:#eee;
      }
      .pagination li.active a{
        border:1px solid #42a5df;
        color:#42a5df;
      }
      .last,.next{
      	display: block !important;
      	width: 64px !important;
      	height: 30px !important;
      }
      .left,.right,.pagination{
      	float: left;
      }
      .left,.right{
      	height: 32px;
      	line-height: 30px;
      }
      .left,.right span,option,select{
      		font-size: 14px;
      		color: #666;
      	}
      .page_wrap{
      	width: 800px;
      	height: 32px;
      	margin: 0 auto;
      	margin-top: 56px;
      	margin-bottom: 100px;
      }
      .page_wrap a,li,.pagination{
      	cursor:pointer;
      }
      table tbody tr .class_a{
          color:#34ac6c;
      }
      table tbody tr .class_b{
          color:#333;
      }
      table tbody tr .class_c{
          color:#ea703a;
      }
  </style>

