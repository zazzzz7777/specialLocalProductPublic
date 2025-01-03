const dateUtils = require('../../utils/defautils')
const menuData=require('../../utils/menu.js')
const {
SendverificationCode,
option,
follow,wxbind,wxunbind
} = require('../../api/login.js')
const {
levelOption,
sheng,
update,
session
} = require('../../api/index.js')
const utils = require("../../utils/index.js")
Page({
data: {
code:'',
openid:'',
tableName:"",
    userInfo:'',
ro:{
},
username:'',
password:'',
role:'',
zhanghao:'',
mima:'',
xingming:'',
xingbieList:"男,女".split(','),
xingbieIndex:0,

touxiang:'../../static/upload.png',
tempPathtouxiang:'../../static/upload.png',
nianling:'',
shouji:'',
money:'',

registerContainerClass: "",
role:""

},

async onLoad() {

wx.login({
provider: 'weixin',
success: function (res) {
let code = res.code;
if (code) {
this.setData({
code
});
}
}.bind(this)
});
let tableName = wx.getStorageSync("nowTable");
const menu = menuData.default.list()
const name = wx.getStorageSync("role")
let role
menu.map(obj => {
if (name == obj.roleName) {
role = obj.tableName
}
})

const  userInfo  = getApp().globalData.userInfo
    this.setData({
        role,
        tableName,
        userInfo
    })
const   baseURL= wx.getStorageSync('baseURL')+"/"
    let userInfoObj={}
    userInfoObj["username"]= userInfo.username==null?"":userInfo.username
    userInfoObj["password"]= userInfo.password==null?"":userInfo.password
    userInfoObj["role"]= userInfo.role==null?"":userInfo.role
    userInfoObj["zhanghao"]= userInfo.zhanghao==null?"":userInfo.zhanghao
    userInfoObj["mima"]= userInfo.mima==null?"":userInfo.mima
    userInfoObj["xingming"]= userInfo.xingming==null?"":userInfo.xingming
    userInfoObj["xingbie"]= userInfo.xingbie==null?"":userInfo.xingbie
userInfo['touxiang']=userInfo?.touxiang?.replace('upload','file')
this.setData({
touxiang:baseURL+userInfo.touxiang,
tempPathtouxiang:baseURL+userInfo.touxiang,
})
    userInfoObj["nianling"]= userInfo.nianling==null?"":userInfo.nianling
this.setData({
shouji: userInfo.shouji,
})
    userInfoObj["money"]= userInfo.money==null?"":userInfo.money
    this.setData(
        userInfoObj
    )
//ss读取

},
async onShow() {
},
xingbieChange(e) {
const selectedIndex = e.detail.value;
this.setData({
xingbieIndex: selectedIndex,
});
},
touxiangTap() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
tempPathtouxiang: tempFilePaths[0]
})
// 上传网络图片
const  baseURL=  wx.getStorageSync("baseURL")
wx.uploadFile({
url: `${baseURL}/file/upload`,
filePath: res.tempFilePaths[0],
name: 'file',
header: {
'Token': wx.getStorageSync('token')
},
success: (uploadFileRes) => {
let result = JSON.parse(uploadFileRes.data);
// result.file是上传成功为网络图片的名称
if (result.code == 0) {
this.setData({
        touxiang: 'file/' + result.file
})
} else {
wx.showToast({
    title: result.msg,
    icon: 'none',
    duration: 2000
});
}
}
})



}
})
},
async sendCodeHandler() {
if (!this.data.canSendCode) {
return;
}
if (this.data.shouji == "") {
wx.showToast({
title: '请输入手机',
icon: 'none'
})
return;
} else {
if (validatePhoneNumber(this.data.shouji) == false) {
wx.showToast({
title: '请输入有效手机',
icon: 'none'
})
return;
} else {
const res = await SendverificationCode("${tableName}", 'sendsms','shouji',  this.data.shouji)
this.setData({
smscode: res.data
})
}
}
this.setData({
canSendCode: false,
});
let time = this.data.countdown;
let timer = setInterval(() => {
time--;
this.setData({
countdown: time, // 更新倒计时的时间
});
if (time <= 0) {
clearInterval(timer); // 倒计时结束，清除定时器
this.setData({
buttonText: '发送验证码',
canSendCode: true,
countdown: 60
});
}
}, 1000);

},
quitTap(){
let saveBaseURL = wx.getStorageSync('baseURL')

wx.clearStorageSync();
wx.setStorageSync('baseURL', saveBaseURL)
wx.reLaunch({
url: "/pages/login/login"
});
},
async  saveTap(){


const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const resultObj={
username:this.data.username,
password:this.data.password,
password2:this.data.password2,
role:this.data.role,
zhanghao:this.data.zhanghao,
mima:this.data.mima,
mima2:this.data.mima2,
xingming:this.data.xingming,
xingbie:this.data.xingbieIndex ? this.data.xingbieList[this.data.xingbieIndex] : "",
touxiang:this.data.touxiang.replace(regex, ""),
nianling:this.data.nianling,
shouji:this.data.shouji,
money:this.data.money,
id:getApp().globalData.userInfo.id

}
const role=wx.getStorageSync('nowTable')
const res = await update(role, resultObj)
if (res.code == 0) {
const userInfoRes = await session(role)
if (userInfoRes.code == 0) {
getApp().globalData.userInfo = userInfoRes.data
wx.reLaunch({
url: '/pages/center/center',
})
}
} else {
wx.showToast({
title: res.msg,
icon: "none"
})
}

},
async   getSession(){
let res = await session(this.data.role)
getApp().globalData.userInfo=res.data
this.setData({
openid:res.data.openid
})
}
});