<template>
	 <div class="wrap_h">
        <div class="container header">
            <div class="header-img"><img src="../../assets/img/home/home_logo.png" alt="" /></div>
            <div>
              <ul>
                <li>
                    <router-link  to='/'  >首页</router-link>
                </li>
                <li>
                    <router-link  to='/guide' active-class='head-li'>接入指南</router-link>
                </li>
                <li>
                    <router-link  to='/about' >关于我们</router-link>
                </li>
                <li>
                    <router-link  to='/server' >咨询服务</router-link>
                </li>
                <li v-if="info?true:false" >
                	<router-link  to='/checkOrder' style="color: #108EE9;">{{info.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")}}</router-link>
                    
                </li>
                <li v-if="info?true:false" style="color: #999;" @click="exit()">
                  [退出]
                </li>
                <li class="loginbox" v-if="info?false:true">
                    <router-link to="/login">商户登录</router-link>
                </li>
                <li class="registerbox" v-if="info?false:true">               	
                    <router-link to="/register">注册</router-link>                    
                </li>
              </ul>
            </div>
           
        </div>
      </div>
</template>
<script type="text/javascript">
	import $ from '../../../static/libs/jquery-1.10.1.min.js'
	export default {
		data(){
			return{
				info:window.sessionStorage.userphone
			}
		},
		methods:{
			exit(){
				window.sessionStorage.userphone=""
				this.info=""
			},	
		},
	}
</script>
<style scoped="scoped">
	
</style>