<template>
<div>
	<swiper></swiper>
	<div class="wrap_bg">
      	<div class="section">
          <h1>我们的产品<span></span></h1>          
      	</div>
	      <div class="section_content">
	          <div>
	              <ul>
	                <li>
	                    <img src="../../assets/img/home/home_01.png">
	                </li>
	                <li>
	                  多场景支付方式
	                </li>
	                <li>
	                  想怎么付，就怎么付
	                </li>
	              </ul>
	          </div>
	          <div>
	              <ul>
	                <li>
	                    <img src="../../assets/img/home/home_02.png">
	                </li>
	                <li>
	                    多渠道查账平台
	                </li>
	                <li>
	                  想怎么查，就怎么查
	                </li>
	              </ul>
	          </div>
	          <div>
	              <ul>
	                <li>
	                    <img src="../../assets/img/home/home_03.png">
	                </li>
	                <li>
	                  自定义支付方案
	                </li>
	                <li>
	                  想怎么调，就怎么调
	                </li>
	              </ul>
	          </div>
	          <div>
	              <ul>
	                <li>
	                    <img src="../../assets/img/home/home_04.png">
	                </li>
	                <li>
	                  全程贴心服务
	                </li>
	                <li>
	                  想怎么问，就怎么问
	                </li>
	              </ul>
	          </div>
	      </div> 
      </div>
      <!--center-->
      <div class="center">
        <p>现在开始，体验多场景支付方式</p>
        <router-link to="/guide/feel">立即体验</router-link>
        
      </div>
    <!--product_flow-->
      <div class="product_flow">
        <div class="section">
          <h1>产品集成流程<span></span></h1>          
      	</div>
        <img src="../../assets/img/home/home_liucheng.png" alt="" />       
      </div>
      <!--advantage-->
      <div class="advantage">
        <div class="section">
          <h1>我们的优势<span></span></h1>          
      	</div>
            <div class="a_contant">
              <ul>
                  <li>
                      <div>
                            <img src="../../assets/img/home/wyf_home_youshi_icon01.png">
                            <p>备付金账户结算</p>
                            <p>资金更安全</p>
                      </div>
                  </li>
                  <li>
                      <div>
                            <img src="../../assets/img/home/wyf_home_youshi_icon02.png">
                            <p>直连清算通道</p>
                            <p>成本更低</p>
                      </div>
                  </li>
                  <li>
                      <div>
                            <img src="../../assets/img/home/wyf_home_youshi_icon03.png">
                            <p>多渠道选择</p>
                            <p>支付更稳定</p>
                      </div>
                  </li>
                  <li>
                      <div>
                            <img src="../../assets/img/home/wyf_home_youshi_icon04.png">
                            <p>问题处理更及时</p>
                            <p>服务更有保障</p>
                      </div>
                  </li>
              </ul>
            </div>
      </div>
      <!--server-->
      <div class="server">
          <!-- hover前状态 -->
          <div class="h_before">
                <div class="company">
                	<span class="border"><img src="../../assets/img/home/wyf_home_youshi_icon_company.png"></span>
                      
                      <p>
                          企业支付服务
                      </p>
                </div>
                <div class="user">
                	<span class="border"><img src="../../assets/img/home/wyf_home_youshi_icon_user.png"></span>
                      
                      <p>
                          个人开发者
                      </p> 
                </div>
          </div>
          <!-- hover状态 -->
          <div class="h_active">
                <div class="company">
                      <img src="../../assets/img/home/wyf_home_youshi_icon_company.png">
                      <div>
                            <h1>企业支付服务</h1>
                            <ul>
                                <li>
                                     <span>资金安全</span>
                                </li>
                                <li>
                                     <span>开通快速</span>
                                </li>
                                <li>
                                     <span>一清通道</span>
                                </li>
                            </ul>
                      </div> 
                </div>
                 <div class="user">
                      <img src="../../assets/img/home/wyf_home_youshi_icon_user.png">
                      <div>
                            <h1>个人开发者</h1>
                            <ul>
                                <li>
                                     <span>无忧开通支付，以及其他服务</span>
                                </li>
                                <li>
                                     <span>资料少，最快24小时上线</span>
                                </li>
                                <li>
                                     <span>超低费率扶持创业开发者</span>
                                </li>
                                <li>
                                     <span>托管服务，专注项目开发</span>
                                </li>
                            </ul>
                      </div> 
                </div>
          </div>
          <div class="top"><a href="javascript:scroll(0,0)"><img src="../../assets/img/home/top.png" alt="" /></a></div>
      </div>
	
</div>
</template>

<script>
	import swiper from '../swiper/swiper'
	export default {
  		data () {
   		 return {}
  	},
  	components:{

    swiper,
    
  }
}
</script>

<style>
</style>