import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import guide from '@/components/guide/guide'
import about from '@/components/about/about'
import homeBody from '@/components/homeBody/homeBody'
import login from '@/components/login/login'
import register from '@/components/register/register'
import download from '@/components/guide/download/download'
import feel from '@/components/guide/feel/feel'
import howLink from '@/components/guide/howLink/howLink'
import problem from '@/components/guide/problem/problem'
import errorCode from '@/components/guide/errorCode/errorCode'
import pcdemo from '@/components/pcdemo/pcdemo'
import server from '@/components/server/server'
import active from '@/components/active/active'
import forget from '@/components/forget/forget'
import findP from '@/components/forget/findP'
import findE from '@/components/forget/findE'
import mobilePay from '@/components/mobilePay/mobilePay'
import bank from '@/components/mobilePay/bank'
import payResult from '@/components/mobilePay/payResult'
import payInfo from '@/components/server/payInfo'
import agreement from '@/components/agreement/agreement'
import checkOrder from '@/components/checkOrder/checkOrder'
import sum from '@/components/checkOrder/sum'
import settlementInfo from '@/components/checkOrder/settlementInfo'
import serverGuide from '@/components/guide/serverGuide/serverGuide'
import withdraw from '@/components/checkOrder/withdraw'
import settlement from '@/components/checkOrder/settlement'
import withdrawRecord from '@/components/checkOrder/withdrawRecord'
import bankList from '@/components/checkOrder/bankList'
import addCard from '@/components/checkOrder/addCard'
import editCard from '@/components/checkOrder/editCard'
import detail from '@/components/checkOrder/detail'
import product from '@/components/checkOrder/product'
import addProduct from '@/components/checkOrder/addProduct'
import notFound from '@/components/notFound/notFound'
Vue.use(Router)
const vueRouteres =[
	{
		path:'/',
		component: home,
		children:[
					{
						path:'/',
						component: homeBody
					},
					{
						path:'/guide',
						component: guide,
						children:[
									{
										path:'/guide',
										component: download
									},
									{
										path:'/guide/feel',
										component: feel
									},
									{
										path:'/guide/howLink',
										component: howLink
									},
									{
										path:'/guide/serverGuide',
										component: serverGuide
									},
									{
										path:'/guide/problem',
										component: problem
									},
									{
										path:'/guide/errorCode',
										component: errorCode
									},
									
						]
					},
					{
						path:'/about',
						component: about
					},
					{
						path:'/server',
						component:server
					},
					{
						path:'/agreement',
						component:agreement
					},
				]
	},
	{
		path:'/login',
		component:login
	},
	{
		path:'/register',
		component:register
	},
	
	{
		path:'/pcdemo',
		component:pcdemo
	},
	{
		path:'/active',
		component:active
	},
	{
		path:'/forget',
		component:forget
	},
	{
		path:'/findP',
		component:findP
	},
	{
		path:'/findE',
		component:findE
	},
	{
		path:'/mobilePay',
		component:mobilePay
	},
	{
		path:'/bank',
		component:bank
	},
	{
		path:'/payResult',
		component:payResult
	},
	{
		path:'/payInfo',
		component:payInfo
	},
	{
		path:'/checkOrder',
		component:checkOrder,
		children:[
			{
				path:'/checkOrder/sum',
				component:sum
			},
			{
				path:'/checkOrder/settlementInfo',
				component:settlementInfo
			},
			{
				path:'/checkOrder/withdraw',
				component:withdraw
			},
			{
				path:'/checkOrder/settlement',
				component:settlement
			},
			{
				path:'/checkOrder/withdrawRecord',
				component:withdrawRecord
			},
			{
				path:'/checkOrder/bankList',
				component:bankList
			},
			{
				path:'/checkOrder/addCard',
				component:addCard
			},
			{
				path:'/checkOrder/editCard',
				component:editCard
			},
			{
				path:'/checkOrder/detail',
				component:detail
			},
			{
				path:'/checkOrder/product',
				component:product
			},
			{
				path:'/checkOrder/addProduct',
				component:addProduct
			}
		]
	},
	 { path: '*', component: notFound }
]
export default new Router({
  routes:vueRouteres,
  
mode: 'history'
})
