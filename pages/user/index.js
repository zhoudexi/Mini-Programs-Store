Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({ userinfo, collectNums: collect.length });
  },
  // 点击 收货地址
  async handleChooseAddress() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
      await openSetting();
      }
      // 4 调用获取收货地址的 api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName
      + address.detailInfo;
      // 5 存入到缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
})
  