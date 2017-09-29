<template>
	<div class="head_wrap">
		<header>
			<router-link to="/">
				<img src="../../assets/img/home/home_logo.png" alt="" />
			</router-link>
			<router-link to="/">
				<span>返回首页</span>
			</router-link>
		</header>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head_wrap{
        width: 100%;
        border-bottom: 1px solid #e0e0e0;
        background: #fff;
        header{
            width: 1190px;
            height: 80px;
            line-height: 80px;
            margin: 0 auto;           
           a:nth-child(1){
               float: left;
               height: 100%;
               img{              
                   height: 100%;
               }
           }
           a:nth-child(2){
              text-decoration: none;
              /*background: url(../img/ic_back.png) no-repeat left center;*/
              float: right;
              span{
                 color:#999;
                 font-size: 16px; 
                 margin-left: 20px;
              }
              
           }
        }
    }
</style>