// pages/goods_list/index.js
import {
  request
} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    }, {
      id: 1,
      value: "销量",
      isActive: false
    }, {
      id: 2,
      value: "价格",
      isActive: false
    }],
    //用来保存从服务端获取的商品列表数据
    goodsList: []

  },
  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数  
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  //取得商品列表的函数 需要传递该商品的类别id cid
  getGoodsList: function () {
    request({
        url: "/goods/search",
        data: this.QueryParams
      })
      .then(res => {
        //不管当前有没有刷新等待点，都可以执行
        wx.stopPullDownRefresh()
        console.log(res, "某类商品列表数据")
        // 获取 总条数 
        const total = res.data.message.total;
        // 计算总页数 
        this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
        this.setData({
          // 拼接了数组 
          goodsList: [...this.data.goodsList, ...res.data.message.goods]
        })
      })

  },


  handleTabsItemChange(e) {
    console.log("在该事件中修改 tabs 数据的值")
    console.log(e)
    const {
      index
    } = e.detail; // // 2 修改源数组 
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 3 赋值到data中 
    this.setData({
      tabs
    })
  },
  // 当上拉触底时，触发该事件 
  onReachBottom() {
    // 1 判断还有没有下一页数据 
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据 
      wx.showToast({
        title: '没有下一页数据'
      });
    } else {
      // 还有下一页数据 
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新的事件
  onPullDownRefresh(){
    //1.重置数据
    this.setData({
      goodsList:[]
    })
    //2.重置页码 1
    this.QueryParams.pagenum=1
    //3.发送网络请求，获取最新的前10条数据
    this.getGoodsList()
  }
})