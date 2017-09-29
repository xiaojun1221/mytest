<template>
	<div class="about_us">
		<div class="about_banner">
			<p>做最有温度的</p>
			<h1>支/付/服/务/商</h1>
		</div>
		<div class="about_content">
			<div class="content">
				<div class="word">
					<h1>关于我们</h1>
					<span></span>
					<p>我们是一群志在专心、专注于支付服务行业的创业年轻人。</p>
					<p>我们是一群有信心挑战支付服务行业的年轻人。</p>
					<p>我们是一群敢创新支付服务行业的年轻人。</p>
				</div>
			</div>
			
		</div>
		<div class="about_bg">
			<div class="about_info">
				<div class="companyInfo">
					<h1>武汉海羽毛网络科技有限公司</h1>
					<span></span>
					<p>地址 : 湖北省武汉市东湖高新技术开发区光谷大道光谷智慧园1栋1201</p>
					<p>电话 : 027-65384408</p>
					<p>微信 : wx51paypay</p>
					<p>QQ : 2369425991</p>
					<p>邮箱 : support@51paypay.net</p>
				</div>
				
				<div id="map"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	
	export default{
		data(){
			return {
				
			}
		},
		mounted(){
			 //创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
    	//实例化地图对象
      map = new BMap.Map("map"); 
      //具体经纬度
      map.centerAndZoom(new BMap.Point(114.431006,30.469141),17);
    }
    function setMapEvent(){
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
    	//标记点信息
      var markers = [
        {content:"",title:"武汉海羽毛网络科技有限公司",imageOffset: {width:0,height:3},position:{lat:30.468768,lng:114.430952}}
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);
        addClickHandler(marker,infoWindow);
        map.addOverlay(marker);
      };
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
      map.addControl(navControl);
    }
    var map;
      initMap();
		}
	}
</script>