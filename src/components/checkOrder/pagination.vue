<template>
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
</template>
<script type="text/javascript">
  export default {
  	props:{
  		
  	},
     data:function(){
          return{
            current:1,
            showItem:2,
            allpage:2
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
      methods:{
        goto:function(index){
          if(index == this.current) return;
            this.current = index;
            //这里可以发送ajax请求
        },
        // ajax(page,num) {
        //     // $.ajax({
        //     //   url:"htto://sdasda?page="+page+"&number="+number+"",
        //     //    success:function(data){
        //     //       data.allpage 
        //     //    } 
        //     // })
        //     this.$data.allpage = page
        // }
      },
      // created() {
      //    this.ajax(4)
      //    console.log(this.childList)
      // }
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
      	
      }
      .page_wrap a,li,.pagination{
      	cursor:pointer;
      }
  </style>