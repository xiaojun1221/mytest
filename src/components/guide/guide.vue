<template>
	<div class="guide_wrap">
		<div class="guide">
			<nav>
				<ul>
					<li><router-link to="/guide">SDK下载</router-link></li>
					<li><router-link to="/guide/feel">体验DEMO</router-link></li>
					<li><router-link to="/guide/howLink">如何接入我要付？</router-link></li>
					<li class="link_guide"><router-link to="#">客户端接入指南<span></span></router-link></li>
					<li class="link_guide"><router-link to="/guide/serverGuide">服务端接入指南<span></span></router-link></li>
					<li><router-link to="/guide/problem">常见问题</router-link></li>
					<li><router-link to="/guide/errorCode">错误码</router-link></li>
				</ul>
			</nav>
			<router-view></router-view>
			
		</div>
	</div>
</template>
<script type="text/javascript">
import router from "../../router/index.js";
import vdownload from './download/download'
import vfeel from './feel/feel'
import vhowLink from './howLink/howLink'
import vserverGuide from './serverGuide/serverGuide'
import vproblem from './problem/problem'
import verrorCode from './errorCode/errorCode'
import $ from '../../../static/libs/jquery-1.10.1.min.js';
	export default{
		data(){
			return{
				
			}
		},
		components:{
			vdownload,
			vfeel,
			vhowLink,
			vserverGuide,
			vproblem,
			verrorCode
		},
		
		methods:{
//			add(){
//			this.$nextTick(()=>{
//				$(".header li").eq(1).addClass("aaaa")	
//			})
//			},
			
//			}
		},
		mounted() {
//			console.log(this.$route)
//			console.log(this.$route.path.indexOf("guide")>-1)
				
//			if(this.$route.path.indexOf("guide")>-1){
//				$(".container li").eq(1).addClass("aaaa")
//			}else{
//				$(".container li").eq(1).removeClass("aaaa")
//			}
//			if($(".guide a").hasClass("router-link-exact-active router-link-active")){
//				$(".head-li-active").eq(2).addClass("aaa")
//			}
//			this.add()
		},
//		destroyed() {
//			this.removeadd()
//		}
//		watch:{
//		'$route':'addClass'	
//		}
	}
</script>