<template>
	<div class="sum_wrap">
		<div class="search">			
			<div class="pay">
				<div class="pay_way">
					<span>交易类型</span>
					<select name="" id="way" ref="way"  @change="change($event)">
						<option value="">全部</option>
						<option value="2" >微信扫码</option>
						<option value="1">微信H5</option>
						<option value="21">支付宝扫码</option>
						<option value="3">微信sdk支付</option>
						<option value="11">QQ钱包支付</option>
						<option value="31">百度钱包支付</option>
						<option value="41">京东钱包支付</option>
					</select>
				</div>
				<div class="pay_state">
					<span>交易状态</span>
					<select name="" id="pay_status" ref="status" @change="change($event)">
						<option value="">全部</option>
						<option value="0" >预设(待支付)</option>
						<option value="1" >交易失败</option>
						<option value="2">交易成功</option>
						<!-- <option value="1">支付处理中</option> -->
					</select>
				</div>
			</div>
			<div class="time">
				<span>统计时间</span>
				<input type="text" id="date1" class="laydate-icon" placeholder="-日期选择-"  ref="start" @click="change( $event)"/>
				<span>至</span>
				<input type="text" id="date2" class="laydate-icon" placeholder="-日期选择-"  ref="end" @click="change( $event)"/>
				<button @click="today()">今天</button>
				<button @click="yesterday()">昨天</button>
			</div>
			<div class="goods">
				<div class="bank_num">
					<span>应用号</span>
					<select name="" id="appid" ref="appid" @change="change($event)">
						<option value="">全部</option>
						<option  v-for="(i,index) in appid" :key="index" :value="i" >{{i}}</option>
						<!-- <option value="2">2</option> -->
					</select>
					<!--<input type="text" placeholder="请输入银行商户号"  ref="order" @change="change($event)"/>-->
				</div>
				<div class="order">
					
					<span>流水单号</span>
					<input type="text" id="order" placeholder="请输入流水单号"  ref="order" @change="change($event)"/>
					<button>查询</button>
				</div>
			</div>
		</div>
		<div class="totle">
			<p>总交易笔数:<span>{{count}}</span>笔</p>
			<p>总交易额:<span>{{sum}}</span>元</p>
			<!-- <p></p> -->
			<p>手续费:<span>{{poundage}}</span>元</p>
			<p ><img src="../../assets/img/ht_excel.png" alt="" /><a :href="downUrl"><span style="cursor:default">导出Excel</span></a></p>
		</div>
		<table class="table table-striped" id="tableList">
  			<thead>
  				<tr>
					<td>商户号</td>
					<td>应用号</td>
  					<td>流水单号</td>
  					<!-- <td>银行商户号</td>
  					<td>接入方提交日期</td>
  					<td>接入方提交时间</td>
  					<td>平台流水号</td> -->
  					<td>交易日期</td>
  					<td>交易时间</td>
  					<!-- <td>账号</td> -->
  					<!-- <td>支付类型</td> -->
  					<td>交易类型</td>
  					<td>交易状态</td>
  					<td>交易金额</td>
  					<!-- <td>手续费</td> -->
  					<!-- <td>结算金额</td> -->
  				</tr> 
  			</thead>
  				<tbody>
  					<tr v-for="(i,index) in orderList" :key="index" >
  						<td >{{i.mchid}}</td>
  						<td>{{i.appid}}</td>
						<td>{{i.access_seq}}</td>
  						<td>{{i.created_at.substring(0,10)}}</td>
  						<td>{{i.created_at.substring(11)}}</td>
  						<td>{{i.pay_type==2?'微信扫码':'微信H5'}}</td>
  						<td>{{i.pay_status==0?'预设(待支付)':i.pay_status==1?'失败':'成功'}}</td>
  						<td>{{i.amount}}</td>
  						<!-- <td>{{i.account}}</td>
  						<td>{{i.pay_type=='wechat'?'微信':'QQ'}}</td>
  						<td>{{i.trade_type}}</td>
  						<td>{{i.pay_status}}</td>
  						<td class="color">{{i.trade_amount}}</td>
  						<td>{{i.poundage}}</td>
  						<td>{{i.settling_amount}}</td> -->
  					</tr>
  				</tbody> 			
		</table>
		
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
		    	<span>共计{{count}}笔交易</span>
		    </div>    
		</div>
	</div>
</template>

<script>
	
	import $ from '../../../static/libs/jquery-1.10.1.min.js';
	import '../../../static/laydate/laydate.js';
	import '../../../static/libs/jquery.table2excel.min.js';
	export default{
		data(){
			return{
				orderList:null,
				count:null,
				sum:null,
				ways:'',
				current:1,
	            showItem:5,
	            allpage:15,
				poundage:null,
				appid:null,
				downUrl:null,
				t_day:null
			}
		},
		created(){	
			// console.log(this.downUrl)
		},
		mounted(){	
			var token=window.sessionStorage.token
			var userid=window.sessionStorage.userid
			$.ajax({
				url:"http://pay.51paypay.net/admin/auth/appids",
				type:"get",
				success:function(data){
					// console.log(JSON.parse(data).data)
					that.appid=JSON.parse(data).data
				},
				error:function(e){
					console.log(e)
				},
				beforeSend: function(xhr) {
						xhr.setRequestHeader("X-AUTH-TOKEN",token);
						xhr.setRequestHeader("X-AUTH-USER",userid);
				} 
			})
			// start,end,page,size,type,status,order,appid
			var day= new Date();
			var month=day.getMonth()+1;
			var tian=day.getDate();
			var s = day.getFullYear()+"-" + (month<=9?'0'+month:month) + "-" + (tian<=9?'0'+tian:tian);
			this.t_day=s;	
			var that=this
			this.ajax('',s,that.current,that.$refs.size.value,'','','',that.$refs.appid.value)					
			this.download()
			// console.log(this.downUrl)
		},
		methods:{
			getData(page,num,type,status,start,end,appid,order){
				var that=this
				$.ajax({
					url:"http://pay.51paypay.net/admin/bill/query_bill",				
					type:"get",				
					success:function(data){
//						console.log(data)
//						console.log(JSON.parse(data))
//						console.log(that.orderList)
//						console.log(JSON.parse(data).bills)
						that.orderList=JSON.parse(data).bills
						that.sum=JSON.parse(data).sum
						that.count=JSON.parse(data).counts
					}
				})	
			},
			today(){//今天按钮
				var day2 = new Date();
				day2.setTime(day2.getTime());
				var month2=day2.getMonth()+1;
				var tian2=day2.getDate();
				var s2 = day2.getFullYear()+"-" + (month2<=9?'0'+month2:month2) + "-" + (tian2<=9?'0'+tian2:tian2);				
				$("#date1").val(s2)
				$("#date2").val(s2)
				var that=this
				this.ajax(s2,s2,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,'',that.$refs.appid.value)
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
				this.ajax(s1,s1,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,'',that.$refs.appid.value)
			},
			change(event){//筛选内容发生变化
				let someValue=event.target.value
				let that = this
				let target = event.target.id
				if(target=="way"){
					this.ajax('','',1,that.$refs.size.value,someValue,that.$refs.status.value,'',that.$refs.appid.value)
					
				}
				if(target=="pay_status"){
					this.ajax('','',1,that.$refs.size.value,that.$refs.way.value,someValue,'',that.$refs.appid.value)
				}
				if(target=="date1"){
						laydate({
						elem:'#'+target+'',						
						choose: function(datas){ //选择日期完毕的回调
							that.ajax(datas,'',1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,'',that.$refs.appid.value)
					    }
					})
				}
				if(target=="date2")	{
					laydate({
						elem:'#'+target+'',					
						choose: function(datas){ //选择日期完毕的回调				       
							that.ajax(that.$refs.start.value,datas,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,'',that.$refs.appid.value)
					    }
					})
				}
				if(target=="appid"){					
					this.ajax(that.$refs.start.value,that.$refs.end.value,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,'',someValue)
				}
				if(target=="order"){
					this.ajax(that.$refs.start.value,that.$refs.end.value,1,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,someValue,that.$refs.appid.value)
				}
				if(target=="size"){
					var a = this.$refs.start.value;
					this.ajax(a,that.$refs.end.value,1,someValue,that.$refs.way.value,that.$refs.status.value,'',that.$refs.appid.value)
				}								
			},
			goto(index){
	          if(index == this.current) return;
	            this.current = index;
	            //这里可以发送ajax请求
				var that=this
	           this.ajax('','',that.current,that.$refs.size.value,that.$refs.way.value,that.$refs.status.value,'',that.$refs.appid.value)
	        },
	        ajax(start,end,page,size,type,status,order,appid) {
				var that=this;
				 var token=window.sessionStorage.token
				 var userid=window.sessionStorage.userid
				// console.log(window.sessionStorage.token)
	             $.ajax({	
					 url:"http://pay.51paypay.net/admin/bill/query_bill",
					  type:"get",
					 data:{start_date:start,end_date:end,page:page,size:size,pay_status:status,pay_type:type,order:order,appid:appid},
	                 success:function(data){
					//    console.log(JSON.parse(data)) 
					var data=JSON.parse(data).data
					that.orderList=data.bills
					that.allpage=data.pages
					that.count=data.counts
					that.poundage=data.fee
					that.sum=data.amount_sum
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-AUTH-TOKEN",token);
						xhr.setRequestHeader("X-AUTH-USER",userid);
					} 
	             })
	            // this.allpage = page
	        },
			excel(){//excel导出
			 $(".table").table2excel({
				exclude: ".noExl",//不导出的表格数据选择器，不导出的数据加class加上 noExl就可以了
                name: "Excel Document Name",
                filename: "myFileName",
                fileext: ".xls",
                exclude_img: true,
                exclude_links: true,
                exclude_inputs: true 
			 })					
			},
			download(){//调取后台excel的url
				
				var that=this
				var token=window.sessionStorage.token
				var userid=window.sessionStorage.userid
				$.ajax({
					url:"http://pay.51paypay.net/admin/bill/query_bill",
					type:"get",
					async:false,
					data:{
						start_date:that.$refs.start.value?that.$refs.start.value:'',
						end_date:that.$refs.end.value,
						page:1,
						size:that.$refs.size.value,
						pay_type:that.$refs.way.value,
						pay_status:that.$refs.status.value,
						order:that.$refs.order.value,
						appid:that.$refs.appid.value,
						export:1
						},
						
					success:function(data){
						// console.log(JSON.parse(data).data.url)
						that.downUrl=`http://51paypay.net${JSON.parse(data).data.url}`
						// console.log(that.downUrl)
					},
					beforeSend: function(xhr) {
						xhr.setRequestHeader("X-AUTH-TOKEN",token);
						xhr.setRequestHeader("X-AUTH-USER",userid);
					} 
				})
				
			}
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

	table{
		box-sizing: border-box;
	}
	tr{
		box-sizing: border-box;
	}
	tr:nth-of-type(odd) {
    background-color: #f9f9f9;
	}
	td{
		padding: 8px;
		text-align: center;
		box-sizing: border-box;
		border-top: 1px solid #ddd;
	}
	.pagination {
        position: relative;
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
		.unselected{
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
		}
</style>