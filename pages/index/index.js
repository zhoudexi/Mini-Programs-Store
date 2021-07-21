// index.js
// 获取应用实例
const app = getApp()
Page({
    data: {
      // 轮播图数组
      swiperList:[],
      catesList:[],
      floorList:[]
    },
    //页面开始时加载， 就会触发
    onLoad: function (options) {
      // 1.获取轮播图数据
      this.getSwiperList();
      // 2.获取分类导航数据
      this.getCateList();
      //3. 获取楼层
      this.getFloorList();
    },
    //获取轮播图数据
    getSwiperList(){
       // 1. 发送异步请求获取轮播图数据
       wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        success: (result) => {
          // console.log(result.data.message[0]);
          this.setData({
            swiperList:result.data.message
      });
      },
      }) ;
    },
    //获取分类导航数据
    getCateList(){
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
        success: (result) => {
        this.setData({
          catesList:result.data.message
        });
        },
        }) ;        
    },
    getFloorList() {
      wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      success: (result) => {
      this.setData({
      floorList: result.data.message
      });
      },
      });
      },      
  })
