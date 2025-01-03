<template>
  <div>
    <div class="login_view">
      <el-form :model="loginForm" class="login_form">
        <div class="title_view">
          基于springboot和推荐算法的云南特产推广平台登录
        </div>
        <div class="list_item" v-if="loginType == 1">
          <div class="list_label">账号：</div>
          <input
            class="list_inp"
            v-model="loginForm.username"
            placeholder="请输入账号"
            name="username"
          />
        </div>
        <div class="list_item" v-if="loginType == 1">
          <div class="list_label">密码：</div>
          <input
            class="list_inp"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            @keydown.enter.native="handleLogin"
          />
        </div>
        <div class="list_type" v-if="userList.length > 1">
          <el-radio
            v-for="(item, index) in userList"
            :key="index"
            v-model="loginForm.role"
            :label="item.roleName"
            >{{ item.roleName }}</el-radio
          >
        </div>
        <div class="btn_view">
          <el-button
            class="login"
            v-if="loginType == 1"
            type="success"
            @click="handleLogin"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance, nextTick, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const userList = ref([])
const menus = ref([])
const loginForm = ref({
  role: '',
  username: '',
  password: '',
})
const tableName = ref('')
const loginType = ref(1)
const context = getCurrentInstance()?.appContext.config.globalProperties
const handleLogin = () => {
  if (!loginForm.value.username) {
    context?.$toolUtil.message('请输入用户名', 'error')

    return
  }
  if (!loginForm.value.password) {
    context?.$toolUtil.message('请输入密码', 'error')
    return
  }
  if (userList.value.length > 1) {
    if (!loginForm.value.role) {
      context?.$toolUtil.message('请选择角色', 'error')
      verifySlider.value.reset()
      return
    }
    for (let i = 0; i < menus.value.length; i++) {
      if (menus.value[i].roleName == loginForm.value.role) {
        tableName.value = menus.value[i].tableName
      }
    }
  } else {
    tableName.value = userList.value[0].tableName
    loginForm.value.role = userList.value[0].roleName
  }
  login()
}
const login = () => {
  context
    ?.$http({
      url: `${tableName.value}/login?username=${loginForm.value.username}&password=${loginForm.value.password}`,
      method: 'post',
    })
    .then(
      (res) => {
        context?.$toolUtil.storageSet('Token', res.data.token)
        context?.$toolUtil.storageSet('role', loginForm.value.role)
        context?.$toolUtil.storageSet('sessionTable', tableName.value)
        context?.$toolUtil.storageSet('adminName', loginForm.value.username)
        store.dispatch('user/getSession') //vuex中获取用户信息并保存
        context?.$router.push('/')
      },
      (err) => {}
    )
}
//获取菜单
const getMenu = () => {
  let params = {
    page: 1,
    limit: 1,
    sort: 'id',
  }

  context
    ?.$http({
      url: 'menu/list',
      method: 'get',
      params: params,
    })
    .then((res) => {
      menus.value = JSON.parse(res.data.data.list[0].menujson)
      for (let i = 0; i < menus.value.length; i++) {
        if (menus.value[i].hasBackLogin == '是') {
          userList.value.push(menus.value[i])
        }
      }
      loginForm.value.role = userList.value[0].roleName
      context?.$toolUtil.storageSet('menus', JSON.stringify(menus.value))
    })
}
//初始化
const init = () => {
  getMenu()
}
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.login_view {
  background-image: url('');
  // 表单盒子
  .login_form {
  }
  .title_view {
  }
  // item盒子
  .list_item {
    // label
    .list_label {
    }
    // 输入框
    .list_inp {
    }
  }
  // 用户类型样式
  .list_type {
    // 未选中样式
    :deep(.el-radio) {
      // 单选框
      .el-radio__inner {
      }
      // 提示文字
      .el-radio__label {
      }
    }
    // 选中样式
    :deep(.is-checked) {
      // 单选框
      .el-radio__inner {
      }
      // 提示文字
      .el-radio__label {
      }
    }
  }
  // 按钮盒子
  .btn_view {
    // 登录
    .login {
    }
  }
}
</style>
<style>
.login_view .tips {
  font-size: 18px;
  color: #ffffff;
  line-height: 50px;
  background: #007ccf;
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.login_view {
  height: 100vh;
  background: #519fe9;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.login_view input {
  border: none;
}

.login_view .login_form {
  background: #007ccf;
  width: 538px;
  padding: 70px 30px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: calc(80% - 538px);
}

.login_view .title_view {
  position: absolute;
  top: -60px;
  left: 0;
  text-align: right;
  width: 100%;
  color: #fff;
  font-size: 22px;
}

.login_view .list_item {
  color: #fff;
  line-height: 40px;
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  order: 1;
}

.login_view .list_inp {
  flex: 1;
  padding: 0 10px;
}

.login_view .el-radio.is-checked .el-radio__inner {
  border: 1px solid #fff;
  background: #007ccf;
}

.login_view .el-radio.is-checked .el-radio__inner::after {
  background: #fff;
}

.login_view .el-radio.is-checked .el-radio__label {
  color: #fff;
}

.login_view span.el-radio__label {
  color: #969696;
}

.login_view span.el-radio__inner {
  background: #007ccf;
}

.login_view .list_type {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  order: 3;
}

.login_view .listCode_view {
  display: flex;
  line-height: 40px;
  width: 100%;
  margin-bottom: 20px;
  order: 2;
}

.login_view input.listCode_inp {
  flex: 1;
  padding: 0 10px;
}

.login_view .listCode_label {
  width: 60px;
  color: #fff;
}

.login_view .listCode_btn {
  width: 100px;
  background: var(--theme);
  text-align: center;
  margin-left: 10px;
}

.login_view .list_label {
  width: 60px;
}

.login_view .btn_view {
  order: 4;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 10px;
  justify-content: center;
}

.login_view .remember_view {
}

.login_view .face {
  order: 3;
  color: #fff;
  margin-bottom: 20px;
}

.login_view button.el-button.login {
  color: #fff;
  background: var(--theme);
  border: none;
  width: 100%;
}

.login_view .btn_view .el-button {
  margin: 0;
  background: var(--theme);
  border: none;
  color: #fff;
  height: 44px;
}

.login_view button.el-button.forget {
  background: none;
  width: 100%;
}

.login_view form.el-form.login_form:before {
  content: '';
  width: calc(60vw - 538px);
  height: 100%;
  background-image: url(http://localhost:8080/specialLocalProduct/file/9ed79ddbbc774acfae2277e98e65fd6a.webp);
  background-size: cover;
  position: absolute;
  right: 538px;
  top: 0;
}
</style>
