<template>
    <div class="record_wrap">        
        <div class="search">
            <h1>提款记录</h1>
            <div class="num">
                <span>编号:</span>
                <input type="text" placeholder="-请填写编号-" ref="order" id="order" @input="change($event)">
            </div> 
           <div class="time">
				<span>统计时间</span>
				<input type="text" id="date1" class="laydate-icon" placeholder="-日期选择-"  ref="start" @click="change( $event)"/>
				<span>至</span>
				<input type="text" id="date2" class="laydate-icon" placeholder="-日期选择-"  ref="end" @click="change( $event)"/>
				<button @click="today()">今天</button>
				<button @click="yesterday()">昨天</button>
			</div> 
            <div class="search_info">
                <span>类型</span>
                <select name="" id="way" ref="way"  @change="change($event)">
                    <option value="" >-提款类型-</option>
                    <option value="1">提款</option>
                    <option value="2">委托结算</option>
                </select>
                <span>状态</span>
                <select name="" id="pay_status" ref="status" @change="change($event)">
                    <option value="" >-提款状态-</option>
                    <option value="1">待处理</option>
                    <option value="2">已处理</option>
                    <option value="3">已撤销</option>
                </select>
                <!-- <button>搜索</button> -->
            </div>   
        </div>
        <div class="totle">
			<p>单数:<span></span>笔</p>
			<p>提款金额:<span></span>元</p>
			<p>提款手续费:<span></span>元</p>			
		</div>
        <table>
            <thead>
                <tr>
                    <td>编号</td>
                    <td>类型</td>
                    <td>币种</td>
                    <td>申请金额</td>
                    <td>打款金额</td>
                    <td>手续费类型</td>
                    <td>手续费</td>
                    <td>收款银行</td>
                    <td>收款开户人</td>
                    <td>收款账号</td>
                    <td>时间</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in recordList" :key="index">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                       <router-link :to="{path:'/checkOrder/detail',query:{id:item}}">详细</router-link>
                        <router-link :to="{path:'/checkOrder/editCard',query:{id:item}}">编辑</router-link> 
                    </td>
                </tr>
            </tbody>
        </table>
       <!-- 分页 -->
        <div class="page_wrap">
            <div class="left">
                <span>每页显示</span>
                <select name="" id="size" ref="size" @change="change($event)">
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
import '../../../static/laydate/laydate.js';
import $ from '../../../static/libs/jquery-1.10.1.min.js';
// import vpage from './pagination'
    export default{
        data(){
            return{                
                recordList:null,
                current:1,
                showItem:1,
                allpage:1,
                sum:null,
                count:null,
                poundage:null,
                token:window.sessionStorage.token,
                userid:window.sessionStorage.userid,
            }
        },
        // components:{
        //     vpage,
        // },        
      methods:{ 
          today(){//今天按钮
				var day2 = new Date();
				day2.setTime(day2.getTime());
				var month2=day2.getMonth()+1;
				var tian2=day2.getDate();
				var s2 = day2.getFullYear()+"-" + (month2<=9?'0'+month2:month2) + "-" + (tian2<=9?'0'+tian2:tian2);				
				$("#date1").val(s2)
				$("#date2").val(s2)
				var that=this
				this.ajax(s2,s2,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,that.$refs.order.value)
			},
			yesterday(){//昨天按钮
				var day1 = new Date();
				 day1.setTime(day1.getTime()-24*60*60*1000);
				 var month1=day1.getMonth()+1;
				 var tian1=day1.getDate();
				 var s1 = day1.getFullYear()+"-" + (month1<=9?'0'+month1:month1) + "-" + (tian1<=9?'0'+tian1:tian1);	 
				 $("#date1").val(s1)
				$("#date2").val(s1)
				var that=this
				this.ajax(s1,s1,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,that.$refs.order.value)
			},
            change(event){//筛选内容发生变化
				let someValue=event.target.value
				let that = this
				let target = event.target.id
				if(target=="way"){
					this.ajax(that.$refs.start.value,that.$refs.end.value,1,that.$refs.size.value,someValue,that.$refs.status.value,that.$refs.order.value)	
				}
				if(target=="pay_status"){
					this.ajax(that.$refs.start.value,that.$refs.end.value,1,that.$refs.size.value,that.$refs.way.value,someValue,that.$refs.order.value)
				}
				if(target=="date1"){
						laydate({
						elem:'#'+target+'',						
						choose: function(datas){ //选择日期完毕的回调
							that.ajax(datas,that.$refs.end.value,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,that.$refs.order.value)
					    }
					})
				}
				if(target=="date2")	{
					laydate({
						elem:'#'+target+'',					
						choose: function(datas){ //选择日期完毕的回调				       
							that.ajax(that.$refs.start.value,datas,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,that.$refs.order.value)
					    }
					})
				}
				// if(target=="appid"){					
				// 	this.ajax(that.$refs.start.value,that.$refs.end.value,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,'',someValue)
				// }
				if(target=="order"){
					this.ajax(that.$refs.start.value,that.$refs.end.value,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,someValue)
				}
				if(target=="size"){
					var a = this.$refs.start.value;
					this.ajax(a,that.$refs.end.value,1,someValue,that.$refs.way.value,that.$refs.status.value,that.$refs.order.value)
				}								
			},  
            goto(index){
	          if(index == this.current) return;
	            this.current = index;
	            //这里可以发送ajax请求
				var that=this
	           this.ajax(that.$refs.start.value,that.$refs.end.value,that.current,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,that.$refs.order.value)
	        }, 
            ajax(start,end,page,size,type,status,order) {
				var that=this;
	             $.ajax({	
					 url:"http://pay.51paypay.net/admin/bill/query_bill",
					  type:"get",
					 data:{start_date:start,end_date:end,page:page,size:size,pay_status:status,pay_type:type,order:order},
	                 success:function(data){
					//    console.log(JSON.parse(data)) 
					var data=JSON.parse(data).data
					// that.recordList=data.bills
					// that.allpage=data.pages
					// that.count=data.counts
					// that.poundage=data.fee
					// that.sum=data.amount_sum
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-AUTH-TOKEN",that.token);
						xhr.setRequestHeader("X-AUTH-USER",that.userid);
					} 
	             })
	            // this.allpage = page
	        },      
      },
        created(){
                var that=this
                $.ajax({
                    url:'../../../static/cardInfo.json',
                    type:"get",
                    success:function(data){
                        console.log(data)
                        that.recordList=data
                    }
                })
                
        },
        mounted(){
            var day= new Date();
			var month=day.getMonth()+1;
			var tian=day.getDate();
			var s = day.getFullYear()+"-" + (month<=9?'0'+month:month) + "-" + (tian<=9?'0'+tian:tian);
			// this.t_day=s;	
			var that=this          
			// this.ajax(that.$refs.start.value,s,that.current,that.$refs.size.value,'','','')
            //  console.log(this.recordList)
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
<style  type="text/css" scoped="scoped">
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
      	
      }
      .page_wrap a,li,.pagination{
      	cursor:pointer;
      }
</style>
