	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import address from '@/views/address/list'
	import shangpinxinxi from '@/views/shangpinxinxi/list'
	import discussforum from '@/views/discussforum/list'
	import syslog from '@/views/syslog/list'
	import storeup from '@/views/storeup/list'
	import users from '@/views/users/list'
	import cart from '@/views/cart/list'
	import forum from '@/views/forum/list'
	import yonghu from '@/views/yonghu/list'
	import chat from '@/views/chat/list'
	import discussshangpinxinxi from '@/views/discussshangpinxinxi/list'
	import orders from '@/views/orders/list'
	import config from '@/views/config/list'
	import shangpinleixing from '@/views/shangpinleixing/list'
	import usersCenter from '@/views/users/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/usersCenter',
			name: '管理员个人中心',
			component: usersCenter
		}
		,{
			path: '/news',
			name: '新闻资讯',
			component: news
		}
		,{
			path: '/address',
			name: '地址',
			component: address
		}
		,{
			path: '/shangpinxinxi',
			name: '商品信息',
			component: shangpinxinxi
		}
		,{
			path: '/discussforum',
			name: '论坛交流-评论',
			component: discussforum
		}
		,{
			path: '/syslog',
			name: '操作日志',
			component: syslog
		}
		,{
			path: '/storeup',
			name: '我的收藏',
			component: storeup
		}
		,{
			path: '/users',
			name: '管理员',
			component: users
		}
		,{
			path: '/cart',
			name: '购物车',
			component: cart
		}
		,{
			path: '/forum',
			name: '我的发布',
			component: forum
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/chat',
			name: '客服聊天',
			component: chat
		}
		,{
			path: '/discussshangpinxinxi',
			name: '商品信息评论-评论',
			component: discussshangpinxinxi
		}
		,{
			path: '/orders',
			name: '订单管理',
			component: orders
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		,{
			path: '/shangpinleixing',
			name: '商品类型',
			component: shangpinleixing
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
