<template>
	<div class="menu_wrapper">
		<el-scrollbar wrap-class="scrollbar-wrapper" class="menu_scrollbar">
			<el-menu :default-openeds="[]" :unique-opened="true" default-active="0" class="menu_view"
				:collapse="collapse">
				<el-menu-item class="first-item" :index="0" @click="menuHandler('')">
					<i class="iconfont icon-zhuye2" v-if="collapse?false:true"></i>
					<template #title>
						<span>首页</span>
					</template>
				</el-menu-item>
                <template v-for=" (item,index) in menuList.backMenu">
                    <el-sub-menu   class="first-item" :index="index+2+''">
                        <template #title>
                            <i class="iconfont" :class="item.fontClass" v-if="collapse?false:true"></i>
                            <span>{{ item.menu }}</span>
                        </template>
                        <el-menu-item class="second-item" v-for=" (child,sort) in item.child" :key="sort"
                            :index="(index+2)+'-'+sort"
                            @click="menuHandler(child.classname||child.tableName,child.menuJump)">{{ child.menu }}
                        </el-menu-item>
                    </el-sub-menu>
                </template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import menu from '@/utils/menu'
	import {
		ref,
		toRefs,
		getCurrentInstance,
		nextTick
	} from 'vue';
	import { useStore } from 'vuex'
	const store = useStore()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//props
	const props = defineProps({
		collapse: Boolean
	})
	const {
		collapse
	} = toRefs(props)
	//data
	const menuList = ref([])
	const role = ref('')
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	const init = () => {
		const menus = menu.list()
		if (menus) {
			menuList.value = menus
		}
		role.value = context?.$toolUtil.storageGet('role')

		for (let i = 0; i < menuList.value.length; i++) {
			if (menuList.value[i].roleName == role.value) {
				menuList.value = menuList.value[i];
				break;
			}
		}
	}
	const menuHandler = (name,menuJump) => {
        if(name == 'center'){
            context.$router.push(`/${role.value}Center`)
        }else if(name == 'storeup'){
            context.$router.push(`/storeup?type=${menuJump}`)
        }else if(name == 'exampaper' && menuJump == '12'){
            context.$router.push('/exampaperlist')
        }else if(name == 'examrecord' && menuJump == '22'){
            context.$router.push('/examfailrecord')
        }else{
            context.$router.push(`/${name}${menuJump?'?menuJump='+menuJump:''}`)
        }
	}
	init()
</script>

<style lang="scss" scoped>
	// 总盒子
	:deep(.menu_scrollbar) {

		// 菜单盒子-展开样式
		.menu_view {

			// 无二级菜单
			.el-menu-item {
				.iconfont {
				}
			}

			// 无二级悬浮
			.el-menu-item:hover {
			}

			// 无二级选中
			.el-menu-item.is-active {
			}

			// 有二级盒子
			.el-sub-menu {

				// 有二级item
				.el-sub-menu__title {
					.iconfont {
					}
					.el-sub-menu__icon-arrow{
					}
				}

				// 有二级item悬浮
				.el-sub-menu__title:hover {
				}
			}
			//二级选中
			.is-active {
				.el-sub-menu__title {
				}
			}
			// 二级盒子
			.el-menu--inline {
				// 二级菜单
				.second-item {
				}
				// 二级悬浮
				.second-item:hover {
				}
				// 二级选中
				.is-active.second-item {
				}
			}
		}
		// 菜单盒子-关闭样式
		.el-menu--collapse {
			padding: 0;
			background: none;
			height: 100%;

			// 无二级菜单
			.el-menu-item {
				border: none;
				padding: 0 10px;
				color: #ccc;
				background: none;
				line-height: 50px;
				height: 50px;
			}

			// 无二级悬浮
			.el-menu-item:hover {
				padding: 0 10px;
				color: #ccc;
				background: none;
				line-height: 50px;
				height: 50px;
			}

			// 无二级选中
			.el-menu-item.is-active {
				padding: 0 10px;
				color: #ccc;
				background: none;
				line-height: 50px;
				height: 50px;
			}

			// 有二级盒子
			.el-sub-menu {
				cursor: pointer;
				padding: 0 0;
				white-space: nowrap;
				background: none;
				position: relative;

				// 有二级item
				.el-sub-menu__title {
					border: none;
					padding: 0 10px;
					color: #ccc;
					background: none;
					line-height: 50px;
					height: 50px;
					.el-sub-menu__icon-arrow{
						margin: -3px 0 0 8px;
						color: inherit;
						vertical-align: middle;
						font-size: 12px;
						position: static;
					}
				}

				// 有二级item悬浮
				.el-sub-menu__title:hover {
					padding: 0 10px;
					color: #ccc;
					background: none;
					line-height: 50px;
					height: 50px;
				}
			}
			//二级选中
			.is-active {
				.el-sub-menu__title {
					padding: 0 10px;
					color: #ccc;
					background: none;
					line-height: 50px;
					height: 50px;
				}
			}
			// 二级盒子
			.el-menu--inline {
				border: none;
				padding: 0px;
				background: none;
				// 二级菜单
				.second-item {
					padding: 0 40px;
					color: #666;
					background: none;
					line-height: 50px;
					height: 50px;
				}
				// 二级悬浮
				.second-item:hover {
					padding: 0 40px;
					color: #f00;
					background: greenyellow;
					line-height: 50px;
					height: 50px;
				}
				// 二级选中
				.is-active.second-item {
					padding: 0 40px;
					color: #000;
					background: none;
					line-height: 50px;
					height: 50px;
				}
			}
		}
	}
</style>
<style lang="scss">
	.el-menu-item .el-menu-tooltip__trigger {
		padding: 0;
	}
	.el-popper{
		.el-menu--popup-container {
			.el-menu--popup{
				border: none;
				padding: 0px;
				background: none;
				// 二级菜单
				.second-item {
					padding: 0 40px;
					color: #666;
					background: none;
					line-height: 50px;
					height: 50px;
				}
				// 二级悬浮
				.second-item:hover {
					padding: 0 40px;
					color: #f00;
					background: greenyellow;
					line-height: 50px;
					height: 50px;
				}
				// 二级选中
				.is-active.second-item {
					padding: 0 40px;
					color: #000;
					background: none;
					line-height: 50px;
					height: 50px;
				}
			}
		}
	}
</style>
<style>
.main-container {
    margin-left: 190px;
    background: #FFF;
    margin-top: 85px;
    padding: 1px;
    min-height: calc(100vh - 85px);
    padding: 50px 30px!important;
}
.menu_wrapper {
    width: 190px;
    position: fixed;
    top: 85px;
    left: 0;
    height: calc(100vh - 85px);
    padding: 20px 0;
    background: #EBF2FC;
}

.menu_wrapper .first-item {
    width: 100%;
    line-height: 50px;
    border-radius: 0;
    border: none;
    min-height: 50px;
    margin-bottom: 30px;
    padding: 0 20px!important;
    position: relative;
    overflow: hidden;
    background: #EBF2FC;
}

.menu_wrapper .first-item.is-active {
    color: #000;
}

.menu_wrapper .first-item i {color: #272636!important;font-size: 20px;}

.menu_wrapper .menu_view.el-menu {
    border: none;
    background: #EBF2FC;
}

.menu_wrapper i.el-sub-menu__icon-arrow {
    position: absolute;
    right: -10px;
    top: 45%;
}

.menu_wrapper .el-sub-menu__title:hover {
    background: none;
}

.menu_wrapper ul.el-menu--inline {
    width: calc(100% + 40px);
    left: -20px;
    position: relative;
    background: #EBF2FC;
    padding: 1px;
}

.menu_wrapper .el-menu-item.second-item {
    box-sizing: border-box;
    padding: 0 14px!important;
    min-width: auto;
    border-radius: 10px;
    margin: 10px;
    line-height: 40px;
    height: 40px;
    color: #999999;
    margin-left: 20px;
}

.menu_wrapper .el-menu-item.second-item.is-active {
    background: none;
    color: #007CCF;
}
.menu_wrapper .el-scrollbar__bar.is-vertical {
    display: none;
}

.menu_wrapper .el-sub-menu__title {
    padding-left: 0!important;
}

.menu_wrapper li.el-menu-item.second-item.is-active:before {
    content: '';
    width: 4px;
    height: 4px;
    background: #007CCF;
    position: absolute;
    left: 0;
    top: 45%;
}

.menu_wrapper .is-active .el-sub-menu__title {
    color: #fff!important;
}
.menu_wrapper .is-active .el-sub-menu__title i {
    color: #fff!important;
}

.menu_wrapper .el-menu-item.first-item span {
    margin-left: 10px;
}

.menu_wrapper .first-item.is-active {
    background: #007CCF;
}

.menu_wrapper .first-item.is-active {
    color: #fff!important;
}

.menu_wrapper .first-item.is-active i {
    color: #fff!important;
}
</style>