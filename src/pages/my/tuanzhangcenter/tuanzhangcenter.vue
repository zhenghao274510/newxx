<template>
  <div class="containter">
    <div class="topinfo">
      <div class="useinfo">
        <img src="/static/img/touxiang2.png" alt />
        <div class="usemain">
          <p>团长昵称：12312</p>
          <p class="shequ">绑定社区：</p>
        </div>
        <div class="change">
          <a href="/pages/my/tuanzhangcenter/changeinfo">
            <van-icon name="edit" size="14px" color="#fff" />
            <span style="color:#fff;">编辑</span>
          </a>
        </div>
      </div>
      <div class="mincont">
        <div class="usemoney">
          <div>
            <p class="one">余额</p>
            <p class="nummoney">4343</p>
          </div>
          <div>
            <a href="/pages/my/tuanzhangcenter/getmoney">
              <span>提现</span>
            </a>
            <a href="/pages/my/moneydetails">
              <span>明细</span>
            </a>
          </div>
        </div>
        <div class="useorder">
          <div class="top-nav">
            <div class="top-head">
              <span>社区订单</span>
              <div class="top-right">
                <span>
                  <a @click="gotoall(0)">全部订单</a>
                </span>
                <img
                  style="width:0.2rem;height:0.3rem;margin-left:0.3rem;"
                  src="/static/img/jinru02.png"
                  alt
                />
              </div>
            </div>
            <div class="top-bar">
              <van-tabbar :fixed="false" active-color="#666">
                <van-tabbar-item
                  to
                  :info="pendPayNumber"
                  v-if="pendPayNumber>0"
                  @click="gotoall(1)"
                >
                  <span>
                    已下单
                    <!-- <a :href="'/pages/order/all/'+1">待付款</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daifukuan.png" />
                </van-tabbar-item>
                <van-tabbar-item to v-else @click="gotoall(1)">
                  <span>
                    已下单
                    <!-- <a :href="'/pages/order/all'+1">待付款</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daifukuan.png" />
                </van-tabbar-item>
                <van-tabbar-item
                  to
                  :info="pendSendNumber"
                  v-if="pendSendNumber>0"
                  @click="gotoall(2)"
                >
                  <span>
                    待收货
                    <!-- <a :href="'/pages/order/all'+2">待发货</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daifahuo.png" />
                </van-tabbar-item>
                <van-tabbar-item to v-else @click="gotoall(2)">
                  <span>
                    待收货
                    <!-- <a :href="'/pages/order/all/'+2">待发货</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daifahuo.png" />
                </van-tabbar-item>
                <van-tabbar-item
                  to
                  :info="pendReceiveNumber"
                  v-if="pendReceiveNumber>0"
                  @click="gotoall(3)"
                >
                  <span>
                    待取货
                    <!-- <a :href="'/pages/order/all/'+3">待收货</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daishouhuo.png" />
                </van-tabbar-item>
                <van-tabbar-item to v-else @click="gotoall(3)">
                  <span>
                    待取货
                    <!-- <a :href="'/pages/order/all/'+3">待收货</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daishouhuo.png" />
                </van-tabbar-item>
                <van-tabbar-item
                  to
                  :info="pendEvaluateNumber"
                  v-if="pendEvaluateNumber>0"
                  @click="gotoall(4)"
                >
                  <span>
                    已完成
                    <!-- <a :href="'/pages/order/all/'+4"></a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daipingjia.png" />
                </van-tabbar-item>
                <van-tabbar-item to v-else @click="gotoall(4)">
                  <span>
                    已完成
                    <!-- <a :href="'/pages/order/all/'+4">待评价</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/daipingjia.png" />
                </van-tabbar-item>
                <van-tabbar-item
                  to
                  :info="afterSaleNumber"
                  v-if="afterSaleNumber>0"
                  @click="gotoall(5)"
                >
                  <span>
                    退款/售后
                    <!-- <a :href="'/pages/order/TuiShop/'+5">退款/售后</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/tuikuanshouhou.png" />
                </van-tabbar-item>
                <van-tabbar-item to v-else @click="gotoall(5)">
                  <span>
                    退款/售后
                    <!-- <a :href="'/pages/order/TuiShop/'+5">退款/售后</a> -->
                  </span>
                  <img slot="icon" slot-scope="props" src="/static/img/tuikuanshouhou.png" />
                </van-tabbar-item>
              </van-tabbar>
            </div>
          </div>
        </div>

        <div class="usemoneydetials">
          <p class="title">数据看板</p>
          <ul class="active_order">
            <li>
              <p class="money"></p>
              <p class="newday">今日</p>
              <p>有效订单(单)</p>
            </li>
            <li>
              <p class="money"></p>
              <p class="newday">今日</p>
              <p>有效成交额(元)</p>
            </li>
            <li>
              <p class="money"></p>
              <p class="newday">今日</p>
              <p>待结算佣金(元)</p>
            </li>
          </ul>
          <div class="history">
            <p>本月总收益:</p>
            <p>历史总收益:</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';

export default {
  data() {
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    // 返回
    back() {},
    //  修改
    change() {},
    // 提现
    getMoney() {},
    //   明细
    lookDetails() {},
    gotoall(m) {
      console.log(m)
      switch(m){
        case 0:
        wx.navigateTo({url:'/pages/order/shequorder?id='+0});
        break;
         case 1:
        wx.navigateTo({url:'/pages/order/shequorder?id='+1});
        break;
         case 2:
        wx.navigateTo({url:'/pages/order/shequorder?id='+2});
        break;
         case 3:
        wx.navigateTo({url:'/pages/order/shequorder?id='+3});
        break;
         case 4:
        wx.navigateTo({url:'/pages/order/shequorder?id='+4});
        break;
         case 5:
        wx.navigateTo({url:'/pages/order/TuiShop'});
        break;

      }
    }
  },
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  befopxount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style>
page{
  background: #f5f5f5;
}

</style>
<style scoped lang="stylus">
.containter {
}

.topinfo {
  height: 240px;
  background: #72D241;
  padding: 15px 0;
  box-sizing: border-box;
  position: relative;
}

.useinfo {
  display: flex;
  padding: 15px;
  justify-content: space-around;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    margin-right: 15px;
  }

  .usemain {
    flex: 1;
    color: #fff;

    .shequ {
      font-size: 13px;
    }
  }

  .change {
    display: flex;
    justify-content: centetr;
    align-items: center;

    a {
      font-size: 13px;
      padding: 10px;
      color: #fff;
    }
  }

  span {
    margin-left: 5px;
  }
}

.mincont {
  padding: 0 15px;

  .usemoney {
    height: 93px;
    border-radius: 15px 15px 0 0;
    background: #FDB719;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    div {
      font-size: 0;

      .one {
        font-size: 13px;
        color: #fff;
      }

      .nummoney {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
    }

    a {
      display: inline-block;
      margin-right: 15px;
      width: 56px;
      height: 23px;
      border-radius: 12px;
      font-size: 13px;
      color: #FFD415;
      background: #fff;
      line-height: 23px;
      text-align: center;
    }
  }

  .usemoneydetials {
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    margin-top:15px;
    background:#fff;
    color:#1A1A1A;
    .title {
      font-size: 16px;
      line-height:50px;
      border-bottom:1px solid #E8E8E8;
    }

    ul {
      padding: 20px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;

      li {
        flex:1;

        p {
          line-height: 25px;
          font-size: 12px;
        }
        .newday{
         color:#666666;
         font-size:11px;
        }
        .money{
          font-size:14px;
          line-height:35px;
        }
      }
    }
  }

  .history {
    padding: 20px 10px;
    color:#1A1A1A;

    p {
      font-size: 12px;
      line-height: 30px;
    }
  }
}

.top-nav {
  background: #fff;
  border-radius: 8px;
  margin-top: -20px;
  // padding: 0.2rem 0;
  box-sizing: border-box;

  .top-head {
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #333;
    padding: 0 0.2rem;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;

    .top-right {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}

</style>