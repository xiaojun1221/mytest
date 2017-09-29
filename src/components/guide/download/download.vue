<template>
	<div class="content_wrap">
		<div class="title">
			<span>SDK下载</span>
		</div>
		<div class="con_head">
			<h1>我要付聚合支付</h1>
			<img src="../../../assets/img/guide/wyf_jrzn_sdk_line.png" alt="" />
		</div>
		<ul class="tab_icon" @click = "change">
			<li @click = "toggleTabs(andriod)">
				<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_andriod_n.png" class="active"/>
				<img src="../../../assets/img/guide/wyf_jrzn_sdk_icon_andriod_s.png" />
			</li>
			<li @click = "toggleTabs(ios)">
				<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_ios_n.png"/>
				<!--<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_ios_s.png"/>-->
				<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_ios_s.png"/>
			</li>
			<li @click = "toggleTabs(html5)">
				<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_html_n.png"/>
				<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_html_s.png"/>
			</li>
			<li @click = "toggleTabs(pc)">
				<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_pc_n.png"/>
				<img  src="../../../assets/img/guide/wyf_jrzn_sdk_icon_pc_s.png"/>
			</li>
		</ul>
		<first :is="currentView" keep-alive></first>
	</div>
</template>

<script>
	import andriod from './andriod';
	import ios from './ios';
	import html5 from './html5';
	import pc from './pc';
	//import $ from '../../../../static/libs/jquery-1.10.1.min.js'	
	export default {
		data(){
			return{
				andriod: "andriod", 
                ios: "ios", 
                html5: "html5", 
                pc:"pc",
                currentView: 'andriod', //默认选中first子组件
			}
		},
		
		components:{
			andriod,
			ios,
			html5,
			pc
		},
		methods:{
			change(e) {
				let result = e.target
				let img = result.parentNode.parentNode.getElementsByTagName("img")
				for (let i=0;i<img.length;i++) {
					img[i].className=""
				}
				if(result&&result.nodeName == 'IMG'){		
					result.className = "active"
					
				}
			},
			toggleTabs (tabText) {
                 this.currentView = tabText;
             }
		}

	}
</script>

<style>
</style>