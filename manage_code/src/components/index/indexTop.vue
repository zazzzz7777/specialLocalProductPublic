<template>
  <div class="top_view">
    <div class="top_left_view">
      <div
        class="fold_view"
        @click="toggleClick"
        :class="{ is_collapse: collapse }"
      >
        <el-icon class="icons">
          <Fold v-if="!collapse" />
          <Expand v-else />
        </el-icon>
      </div>
    </div>

    <div class="projectTitle">基于springboot和推荐算法的云南特产推广平台</div>
    <div class="top_right_view">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <div class="nickname">
            欢迎 {{ $toolUtil.storageGet('adminName') }}
          </div>
          <img class="user-avatar" :src="store.getters['user/avatar']" />
          <el-icon class="el-icon-arrow-down">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropDown" slot="dropdown">
            <el-dropdown-item @click="centerClick"> 个人中心 </el-dropdown-item>
            <el-dropdown-item @click="updatepasswordClick">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item>
              <span style="display: block" @click="onLogout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-button class="notice-btn" @click="noticeDialogVisible = true">
      <span class="iconfont icon-xiaoxi2"></span>
      系统公告
    </el-button>
    <el-dialog v-model="noticeDialogVisible" title="系统公告">
      <div>
        <div v-html="store.state.system.notice.content"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from 'axios'
import moment from 'moment'
import { ElMessageBox } from 'element-plus'
import {
  toRefs,
  defineEmits,
  getCurrentInstance,
  ref,
  onBeforeUnmount,
  computed,
} from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const context = getCurrentInstance()?.appContext.config.globalProperties
const emit = defineEmits(['collapseChange'])
const role = context?.$toolUtil.storageGet('sessionTable')
const roleName = context?.$toolUtil.storageGet('role')

const props = defineProps({
  collapse: Boolean,
})
const { collapse } = toRefs(props)

//获取用户信息
import { useStore } from 'vuex'
const store = useStore()
const user = computed(() => store.getters['user/session'])
const avatar = ref(store.state.user.avatar)
if (!store.state.user.session.id) {
  store.dispatch('user/getSession')
}
//获取通知公告
const noticeDialogVisible = ref(false)
store.dispatch('system/getSystemNotice')
const toggleClick = () => {
  emit('collapseChange')
}
// 退出登录
const onLogout = () => {
  let toolUtil = context?.$toolUtil
  store.dispatch('delAllCachedViews')
  store.dispatch('delAllVisitedViews')
  toolUtil.storageClear()
  router.replace({
    name: 'login',
  })
}
// 个人中心
const centerClick = () => {
  router.push(`/${role}Center`)
}
// 修改密码
const updatepasswordClick = () => {
  router.push(`/updatepassword`)
}
</script>

<style lang="scss" scoped>
// 总盒子
.top_view {
  // 左边盒子
  .top_left_view {
    display: none;
    // 折叠按钮盒子
    .fold_view {
      // 图标
      .icons {
      }
    }
  }
  // 标题
  .projectTitle {
  }
  // 右部盒子
  .top_right_view {
    // 头像盒子
    .avatar-container {
      cursor: pointer;
      margin: 0 30px 0 0;
      color: #fff;
      display: flex;
      align-items: center;
      height: 50px;
      .avatar-wrapper {
        margin: 5px 0 0;
        display: flex;
        position: relative;
        align-items: center;
        // 昵称
        .nickname {
          cursor: pointer;
          margin: 0 5px;
          color: #fff;
          line-height: 44px;
        }
        // 头像
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
        }
        // 图标
        .el-icon-arrow-down {
          color: #fff;
        }
      }
    }
  }
}
// 下拉盒子
.el-dropdown-menu {
  background: #fff;
  // 下拉盒子itme
  :deep(.el-dropdown-menu__item) {
    color: #fff;
    background: #123;
  }
  // item悬浮
  :deep(.el-dropdown-menu__item:hover) {
    color: #333;
    background: #ff0;
  }
}
</style>
<style>
.top_view img.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.top_view {
  display: flex;
  align-items: center;
  background: var(--theme);
  padding: 0;
  height: 85px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  flex-wrap: wrap;
  background-image: url(http://localhost:8080/specialLocalProduct/file/31c8e9bff9b240019e9409a4ee379f85.webp);
  background-size: 100% 100%;
}

.top_view .top_left_view {
  display: none;
}

.top_view .projectTitle {
  font-size: 28px;
  color: #ffffff;
  order: 1;
  margin-right: auto;
  padding-left: 20px;
  line-height: 55px;
}

.top_view .actionBar {
  display: flex;
}

.top_view .notice-btn {
  order: 2;
  border: none;
  background: none;
  color: #fff;
}

.top_view .top_right_view {
  order: 3;
  margin-left: 30px;
  padding-right: 20px;
}

.top_view .avatar-wrapper {
  display: flex;
  align-items: center;
}

.top_view .avatar-wrapper .nickname {
  order: 2;
  color: #fff;
}

.top_view .avatar-wrapper i {
  order: 3;
  color: #fff;
}
.top_view .el-dropdown-menu__item:focus,
.top_view .el-dropdown-menu__item:not(.is-disabled):hover {
  color: var(--theme);
}

.top_view .breadcrumb-view {
  width: 100%;
  order: 9;
  height: 30px;
  background: #fff;
  position: relative;
  padding: 0 24px;
  border-bottom: 1px solid;
}

.top_view .el-breadcrumb__item {
  line-height: 30px;
  font-size: 14px;
  color: #000;
}

.top_view .el-breadcrumb__separator {
  line-height: 30px;
  color: #000;
}

.weather {
  order: 1;
  display: flex;
  line-height: 30px;
  color: #fff;
  column-gap: 4px;
}

.nowDate {
  order: 1;
  color: #fff;
  margin-left: 20px;
}
</style>
