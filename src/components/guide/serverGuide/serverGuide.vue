<template>
   <div class="content_wrap">
		<div class="title">
			<span>服务端接入指南</span>
		</div>
		<div class="server_guide_wrap">
            <h1>海羽毛商户支付接口</h1>
            <h2>请求数据格式及签名</h2>
            <p>1. 请求参数按照名称字符升序排列,将平台支付合作密钥作为最后一个参数,参数名为key,用&拼接为待签名字符串,例如:<pre><code>amount=1&appid=wawafasfas&subject=测试商户&key=key</code></pre></p>
            <p>2. 将待签名字符串做MD5加密,得到signature.</p>
            <p>3. 用post进行传参,参数格式为json格式字符串,request body举例:<pre><code>
{
    "amount": 1,
    "appid": "wawafasfas",
    "subject": "测试商户",
    "signature": "xxxxxxxxx"
} 
                </code>
                </pre>
            </p>
            <h2>下单接口</h2>
            <p>1. 请求接口地址： http://p.51paypay.net/api/v1/submit_pay</p>
            <p>2. ​请求参数:</p>
            <table>
                <thead>
                    <tr>
                        <td>名称</td>
                        <td>含义</td>
                        <td>类型</td>
                        <td>必填</td>
                        <td>备注</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>amount</td>
                        <td>订单总金额</td>
                        <td>number</td>
                        <td> YES </td>
                        <td>单位为分</td>
                    </tr>
                    <tr>
                        <td>appid</td>
                        <td>给商户分配的应用ID</td>
                        <td>string</td>
                        <td>YES</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>subject</td>
                        <td>商品描述</td>
                        <td>string</td>
                        <td>NO</td>
                        <td>微信扫码付时非必填</td>
                    </tr>
                    <tr>
                        <td>clientip</td>
                        <td>客户端IP</td>
                        <td>string</td>
                        <td>NO</td>
                        <td>微信扫码付时非必填</td>
                    </tr>
                    <tr>
                        <td>currency</td>
                        <td>币种</td>
                        <td>string</td>
                        <td>NO</td>
                        <td>默认RMB</td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td>订单附加描述</td>
                        <td>string</td>
                        <td>NO</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>expireMs</td>
                        <td>过期时间毫秒数</td>
                        <td>number</td>
                        <td>NO</td>
                        <td>默认24小时过期</td>
                    </tr>
                    <tr>
                        <td>orderid</td>
                        <td>商户订单号</td>
                        <td>string</td>
                        <td>YES</td>
                        <td>不能重复</td>
                    </tr>
                    <tr>
                        <td>payType</td>
                        <td>支付类型</td>
                        <td>number</td>
                        <td>YES</td>
                        <td>1.-微信H5支付, 2-微信扫码付</td>
                    </tr>
                    <tr>
                        <td>notifyUrl</td>
                        <td>通知回调地址</td>
                        <td>string</td>
                        <td>YES</td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>signature</td>
                        <td>签名</td>
                        <td>string</td>
                        <td>YES</td>
                        <td>见签名算法</td>
                    </tr>
                </tbody>
            </table>
            <p>3. ​返回数据 ​​如果请求​错误,返回格式:</p>
            <p><pre><code>{
    "msg": "",
    "status": 0,
    "data": {
        "status": -1,
        "error": "unknown error"
          }
}</code></pre></p>
<p>微信H5支付正确返回结果:<br/><pre><code>{
    "msg": "",
    "status": 0,
     "data": {
         "status": 0,
          "url":"http://xxx.yyy"
          }
}</code></pre></p>
<p>微信扫码支付正确返回结果:<br/><pre><code>{
    "msg": "",
    "status": 0,
     "data": {
         "status": 0,
          "qrCode":"weixin://xxxxxxxxxxxx"
          }
}</code></pre></p>
        </div>
	</div>
</template>
<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>
<style type="text/css" scoped>
    
</style>
