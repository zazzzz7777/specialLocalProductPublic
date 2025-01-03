
const dateUtils = require('../../utils/defautils')
const utils = require("../../utils/index.js")
const {
SendverificationCode,
register,
option,
    smscode,
follow
} = require('../../api/login.js')
const {
    levelOption,
    sheng,
} = require('../../api/index.js')
Page({
data: {
     zhanghao:'',
     mima:'',
     xingming:'',
xingbieList:"男,女".split(','),
xingbieIndex:0,
    touxiang:'',
    tempPathtouxiang:'../../static/upload.png',
     nianling:'',
     shouji:'',
     money:'',

    registerContainerClass: "",

},

async onLoad() {











},
onUnload() {
},
async onShow() {




    this.setData({
            xingbieList:  "男,女".split(',')
    })







},







zhanghaoInput(e) {
this.setData({
    zhanghao: e.detail.value
})
},

mimaInput(e) {
this.setData({
    mima: e.detail.value
})
},

xingmingInput(e) {
this.setData({
    xingming: e.detail.value
})
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
let tempPathtouxiang= tempFilePaths[0]
// 本地临时图片的路径
this.setData({
    tempPathtouxiang,
})
// 上传网络图片
const  baseURL= wx.getStorageSync('baseURL')
    if(baseURL){
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



}
})
},

nianlingInput(e) {
this.setData({
    nianling: e.detail.value
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
if (!utils.validata("shouji",this.data.shouji)) {
    wx.showToast({
        title: '请输入有效手机',
        icon: 'none'
    })
    return;
} else {
    const res = await SendverificationCode("yonghu", 'sendsms','shouji',  this.data.shouji)
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

moneyInput(e) {
this.setData({
    money: e.detail.value
})
},

async  register(){
if (this.data.zhanghao == "") {
wx.showToast({
title: '请输入账号',
icon: "none"
})
return;
}
if (this.data.mima == "") {
wx.showToast({
title: '请输入密码',
icon: "none"
})
return;
}
if (this.data.mima2=="") {
wx.showToast({
title: '请输入确认密码',
icon: "none"
})
return;
}
if (this.data.mima !== this.data.mima2) {
wx.showToast({
title: '密码与确认密码不一致!!',
icon: "none"
})
return;
}
if (this.data.shouji == "") {
wx.showToast({
title: '请输入手机',
icon: "none"
})
return;
}
        if (!utils.validata("shouji",this.data.shouji)) {
        wx.showToast({
            title: '请输入有效手机',
            icon: 'none'
        })
        return;
    }











    const regex = new RegExp(wx.getStorageSync("baseURL"), "g");
  const resultObj={
        zhanghao:this.data.zhanghao,
        mima:this.data.mima,
        mima2:this.data.mima2,
        xingming:this.data.xingming,
        xingbie: this.data.xingbieList?.length ? this.data.xingbieList[this.data.xingbieIndex] : "",
        touxiang:this.data.touxiang.replace(regex, ""),
        nianling:this.data.nianling,
        shouji:this.data.shouji,
        money:this.data.money,
  }
    const name="zhanghao"
    const password="mima"
    const res = await register("yonghu", name, this.data[name],password , this.data[password], resultObj)
if (res.code == 0) {
wx.navigateTo({
url: '../login/login',
})
} else {
wx.showToast({
title: res.msg,
icon: "none"
})
}

}



});