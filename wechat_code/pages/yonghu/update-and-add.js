// pages/edit/edit.js

const {
detail,
option,
update,
add,
list,
follow,
faceMatch,
session,
rubbish,
levelOption,
baiduIdentify
} = require("../../api/index.js")

const des = require('../../utils/des.js')
const utils = require("../../utils/index.js")

Page({

/**
* 页面的初始数据
*/
data: {
imgIcon: "../../static/upload.png",
editStatus: false,
baseURL:'',
sessionReadArr:[],

detailList: null,
id: "",
cross:"",
ruleForm:{},
userid:getApp().globalData.userInfo.id,
userInfo:getApp().globalData.userInfo,
ro:{
},

zhanghao:"",
xingming:"",
xingbieList:"男,女".split(','),
xingbieIndex:0,
touxiang:"",
nianling:0,
shouji:"",
money:0,
},


/**
* 生命周期函数--监听页面加载
*/
async onLoad(options) {
let userid
if (options?.id) {
this.setData({
editStatus: true
})

}
let nowTable = wx.getStorageSync("nowTable");
const res = await session(nowTable)
if(res.data.code==0){
getApp().globalData.userInfo=res?.data
userid = res?.data.id
this.setData({
userid
})

}
let baseURL =wx.getStorageSync('baseURL') + '/'
const id = getApp().globalData.detailId
this.setData({
refid:id,
baseURL
})
//人脸识别
this.setData({
xingbieList:  "男,女".split(',')

})
let  ro=this.data.ro
if(options?.cross){
var obj = wx.getStorageSync('crossObj');
let refobjempty={}
for (var o in obj){
if(o=='zhanghao'){
    refobjempty["zhanghao"]=obj[o]
ro.zhanghao = true;
continue;
}else{
}

if(o=='mima'){
    refobjempty["mima"]=obj[o]
ro.mima = true;
continue;
}else{
}

if(o=='xingming'){
    refobjempty["xingming"]=obj[o]
ro.xingming = true;
continue;
}else{
}

if(o=='xingbie'){
    refobjempty["xingbie"]=obj[o]
ro.xingbie = true;
continue;
}else{
}

if(o=='touxiang'){
 refobjempty['touxiang']=obj[o];
 refobjempty['touxiangPath']=baseURL+ obj[o].split(",")[0];
ro.touxiang = true;
continue;
}else{
}

if(o=='nianling'){
    refobjempty["nianling"]=obj[o]
ro.nianling = true;
continue;
}else{
}

if(o=='shouji'){
    refobjempty["shouji"]=obj[o]
ro.shouji = true;
continue;
}else{
}

if(o=='money'){
    refobjempty["money"]=obj[o]
ro.money = true;
continue;
}else{
}

}

let  statusColumnName=wx.getStorageSync('statusColumnName');
statusColumnName=statusColumnName.replace('[',"").replace(']',"");
this.setData({
ro,
cross:options?.cross,
statusColumnName
})
this.setData(refobjempty)
}
if(id && !options?.cross){
// 如果上一级页面传递了id，获取改id数据信息
const   data=getApp().globalData.detailList
const  def_4= 0  ;
this.data.xingbieList.map((v, index) => {
if (v == data.xingbie|| (v == def_4 && def_4 !=null)) {
 this.setData({
   xingbieIndex: index,
   xingbie: v,
 })
}else if (this.data.xingbieList.length == 1) {
 this.setData({
   xingbieIndex: 0,
   xingbie: v,
 })
}
})
}else {
this.setData({
})
}
// ss读取
let sessionReadArr=[]
this.setData({
cross:options?.cross,
ro,
id,
})

if (wx.getStorageSync('raffleType') ) {
 wx.removeStorageSync('raffleType')
 setTimeout(() => {
  this.submit()
 }, 300)
}








},
getUUID () {
return new Date().getTime();
},
onUnload: function () {
},
onShow() {
},
 commentScore(e){
 if(this.data?.commentScore){
  this.setData({
   commentScore:e.detail
  })
 }
 },






//xingbie, 0
// 下拉变化
xingbieChange(e) {
this.setData({
 xingbieIndex:   e.detail.value,
 xingbie :this.data.xingbieList[e.detail.value]
})
},





























uploadtouxiang() {
wx.chooseImage({
count: 1,
sizeType: ['compressed'],
sourceType: ['album', 'camera'],
success: async (res) => {
const tempFilePaths = res.tempFilePaths;
// 本地临时图片的路径
this.setData({
 touxiangPath: tempFilePaths[0]
})
let _this = this;
// 上传网络图片
const baseURL = wx.getStorageSync('baseURL')
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

this.setData({
face: tempFilePaths[0]
});

}
})
},


















async submit() {
let that = this
var query = wx.createSelectorQuery();











const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
zhanghao: this.data. zhanghao,
xingming: this.data. xingming,
xingbie:this.data.xingbie?this.data.xingbie:this.data.xingbieList[this.data.xingbieIndex],
touxiang:this.data.touxiang?.replace(regex, ""),
nianling: this.data. nianling,
shouji: this.data. shouji,
money: this.data. money,
}
const detailId= getApp().globalData.detailId
const tableName= `yonghu`

//跨表计算判断
var obj2;
var  ruleForm=obj
obj2 = ruleForm
this.data.refid==""? ruleForm['refid']= getApp().globalData.detailId:""
ruleForm['userid']=getApp().globalData.userInfo.id
var userInfo=getApp().globalData.userInfo

const sessionReadArr=this.data.sessionReadArr
const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const mobilePattern = /^(?:\+?86)?1[3-9]\d{9}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const idPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dxX]$/;
const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

















if(this.data.xingbieList[this.data.xingbieIndex]==undefined && !this.data.xingbie ){
wx.showToast({
icon: "none",
title: `性别不能为空`,
})
return
}




const valuenianling = this.data.nianling;
const isIntegernianling = /^[-+]?\d+$/.test(valuenianling);
if(!isIntegernianling && this.data.nianling){
wx.showToast({
icon: "none",
title: `年龄应输入整数`,
})
return
}

 if(this.data.nianling==0){
  wx.showToast({
   icon: "none",
   title: `年龄不能为零`,
  })
  return
 }






const valueshouji = this.data.shouji;

if (!mobilePattern.test(valueshouji)) {
wx.showToast({
icon: "none",
title: `手机应输入手机格式`,
})
return
}



const valuemoney = this.data.money;
if(isNaN(valuemoney)  && this.data.money){
wx.showToast({
icon: "none",
title: `余额应输入数字`,
})
return
}
 if(this.data.money==0){
  wx.showToast({
   icon: "none",
   title: `余额不能为零`,
  })
  return
 }







//更新跨表属性
var crossuserid;
var crossrefid;
var crossoptnum;

if(this.data.cross) {
wx.setStorageSync('crossCleanType', true);
var statusColumnName = wx.getStorageSync('statusColumnName');
var statusColumnValue = wx.getStorageSync('statusColumnValue');
if (statusColumnName != '') {
obj2 = wx.getStorageSync('crossObj');
if (!statusColumnName.startsWith("[")) {
for (var o in obj2) {
if (statusColumnName==o){
obj2[o] = statusColumnValue;
}

}
var table = wx.getStorageSync('crossTable');

await update(table, obj2)
} else {

crossuserid =getApp().globalData.userInfo.id
crossrefid =  this.data.id
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
}
}
}
this.data.cross ? (crossrefid = obj2.id, crossuserid =getApp().globalData.userInfo.id) : ""
ruleForm?.crossrefid==undefined? ( ruleForm["crossrefid"] = obj2.id, ruleForm["crossuserid"] =getApp().globalData.userInfo.id ): "";
ruleForm?.shhf?ruleForm.shhf=this.data.shhf:''
if(crossrefid && crossuserid) {
ruleForm['crossuserid'] =getApp().globalData.userInfo.id;
ruleForm['crossrefid'] =obj2.id;
this.setData({
ruleForm
})
let params = {
page: 1,
limit: 10,
crossuserid: crossuserid,
crossrefid: crossrefid,
}
const tips = wx.getStorageSync('tips')
let corssRes = await list(`yonghu`, params)
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.match(/\d+/g);
if (corssRes?.data?.total >= parseInt(crossoptnum)) {
wx.showToast({
icon: "none",
title: tips,
})
wx.removeStorageSync('crossCleanType');
return ;
}
else {


//跨表计算

















if (ruleForm.id ) {
await update(`yonghu`, ruleForm)
}
else {
 this.data?.commentScore?ruleForm['score']= this.data.commentScore:'';
 await add(`yonghu`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`yonghu`, ruleForm)
}
else {
 this.data?.commentScore?ruleForm['score']= this.data.commentScore:'';
await add(`yonghu`, ruleForm)
}
}
getApp().globalData.editorContent=''
wx.showToast({
title: '提交成功',
icon: "none"
})
const preId = getApp().globalData.detailId

if(table){
let res = await detail(table, preId)
if(res.code==0){
getApp().globalData.detailList = res.data
}

}



wx.navigateBack({
delta: 1,
complete: () => {
// 触发事件通知，传递需要更新的数据
const pages = getCurrentPages();
if (pages.length >= 1) {
const prePage = pages[pages.length - 2];
prePage.onLoad(); //
}
}
})













},
onHide() {

},


/**
* 生命周期函数--监听页面卸载
*/
onUnload() {

},


/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh() {

},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom() {

},

/**
* 用户点击右上角分享
*/
onShareAppMessage() {

}
})