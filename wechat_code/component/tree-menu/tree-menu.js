const utils = require('../../utils/index.js')
Component({
    properties: {
        listData: {
            type: Array | Object,
            value: {}
        },
        step: {
            type: Number,
            value: 1
        },
    },
    data: {
        isShowChildren: false,
    },
    methods: {
        toggleShowChildren() {
            this.setData({
                isShowChildren: !this.data.isShowChildren
            })
        },
        menuTap(e) {
            const item = e.currentTarget.dataset.item;
            const tableName = item.tableName
            const tabar = getApp().globalData.tabarList;
            wx.setStorageSync('isAuth', true)
            if(tableName == 'storeup'){
            wx.setStorageSync('menuJump', item.menuJump)
              if (tabar.includes(tableName)) {
                wx.switchTab({
                    url: '/pages/storeup/list',
                })
            } else {
                wx.navigateTo({
                    url: '/pages/storeup/list',
                })
            }
            }
            if (tableName == 'forum') {
                // 固定模板
                if (item.menu.includes('论坛')) {
                    if(tabar.includes(tableName)){
                        wx.switchTab({
                            url: `/pages/${tableName}/${tableName}-list`,
                        })
                    }
                 else{
                
                        wx.navigateTo({
                            url: `/pages/${tableName}/${tableName}-list`,
                        })
                    }
                   
                }
                if (item.menu == '我的发布') {
                    wx.navigateTo({
                        url: `/pages/${tableName}/${tableName}-my`,
                    })
                }
                if (item.menu.includes('详情')) {
                    wx.navigateTo({
                        url: `/pages/${tableName}/${tableName}-detail`,
                    })
                }
                if (item.menu.includes('回复')) {
                    wx.navigateTo({
                        url: `/pages/${tableName}/${tableName}-reply`,
                    })
                }
            } else if (item.menu == "错题本") {
                wx.navigateTo({
                    url: '/pages/examrecord/detail',
                })
            } else if (tableName == 'orders') {
                if (tabar.includes(tableName)) {
                    wx.switchTab({
                        url: '/pages/shop-order/orders-list',
                    })
                } else {
                  let name=item.menu.substring(0,3)
                    wx.navigateTo({
                        url: `/pages/shop-order/orders-list?name=${name}`,
                    })
                }
            } else if (tableName == 'cart') {
                const tabar = getApp().globalData.tabarList;
                if (tabar.includes(tableName)) {
                    wx.switchTab({
                        url: '/pages/shop-cart/shop-cart',
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/shop-cart/shop-cart',
                    })
                }
            }else if(tableName=='popup_remind'){
              wx.navigateTo({
                url: '/pages/popupRemind/list',
                fail:()=>{
                  wx.switchTab({
                    url: '/pages/popupRemind/list',
                  })
                }
            })
            } else {
                let id = getApp().globalData.userInfo.id
               if(tableName){
                utils.menuTap(tableName, id)
               }
            }




        },
    }
})