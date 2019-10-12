<template>
  <div class="contain">
    <!-- <main-header :text="text" @back="back"></main-header> -->
    <div class="box">
      <van-tabs
        v-model="active"
        @click="shopper"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        :swipeable="true"
        :sticky="true"
        @change="shopper"
      >
        <van-tab title="客户已下单" id="0">
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
          >-->
          <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
          <ul>
            <li v-for="(v,k) in list" :key="k" @click="order(v)">
              <h3>
                <span>订单编号：{{v.id}}</span>
                <span style="color: red;" v-if="v.status == 0">待付款</span>
                <span v-if="v.status == 1">准备出仓</span>
                <span v-if="v.status == 2">待发货</span>
                <span v-if="v.status == 3">待收货</span>
                <span v-if="v.status == 4">待评价</span>
                <span v-if="v.status == 5">已评价</span>
                <span v-if="v.status == 6">已取消</span>
                <span v-if="v.status == 7">待退款</span>
                <span v-if="v.status == 8">已退款</span>
                <span v-if="v.status == 9">拒绝退款</span>
              </h3>
              <!--0待付款 1待处理 2待发货 3待收货 4待评价 5已评价 6已取消 7待退款 8已退款 9拒绝退款-->
              <div class="wrapper">
                <img :src="v.simage" alt lazy-load />
                <div class="s_right">
                  <div class="s_top">
                    <span>{{v.sname}}</span>
                  </div>
                  <p>{{v.createTime}}</p>
                  <div class="s_price">
                    <span style="color:#999;">共计{{v.number}}件商品</span>
                    <span>￥{{v.finalPay}}元</span>
                  </div>
                </div>
              </div>
              <div class="pay" v-if="v.status == 0">
                <span>24小时后自动取消订单</span>
                <div @click="zhi(v)">去支付</div>
              </div>
              <div class="pay" v-if="v.status == 3">
                <span>15天后自动确认收货</span>
                <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
              </div>
              <div class="comment" v-if="v.status == 4">
                <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
              </div>
            </li>
          </ul>
          <!-- </van-pull-refresh> -->
          <!-- </van-list> -->
        </van-tab>
        <van-tab title="商家已发货" id="1">
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
          >-->
          <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
          <ul>
            <li v-for="(v,k) in list" :key="k" @click="order(v)">
              <h3>
                <span>订单编号：{{v.id}}</span>
                <span style="color: red;" v-if="v.status == 0">待付款</span>
                <span v-if="v.status == 1">准备出仓</span>
                <span v-if="v.status == 2">待发货</span>
                <span v-if="v.status == 3">待收货</span>
                <span v-if="v.status == 4">待评价</span>
                <span v-if="v.status == 5">已评价</span>
                <span v-if="v.status == 6">已取消</span>
                <span v-if="v.status == 7">待退款</span>
                <span v-if="v.status == 8">已退款</span>
                <span v-if="v.status == 9">拒绝退款</span>
              </h3>
              <!--0待付款 1待处理 2待发货 3待收货 4待评价 5已评价 6已取消 7待退款 8已退款 9拒绝退款-->
              <div class="wrapper">
                <img :src="v.simage" alt lazy-load />
                <div class="s_right">
                  <div class="s_top">
                    <span>{{v.sname}}</span>
                  </div>
                  <p>{{v.createTime}}</p>
                  <div class="s_price">
                    <span style="color:#999;">共计{{v.number}}件商品</span>
                    <span>￥{{v.finalPay}}元</span>
                  </div>
                </div>
              </div>
              <div class="pay" v-if="v.status == 0">
                <span>24小时后自动取消订单</span>
                <div @click="zhi(v)">去支付</div>
              </div>
              <div class="pay" v-if="v.status == 3">
                <span>15天后自动确认收货</span>
                <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
              </div>
              <div class="comment" v-if="v.status == 4">
                <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
              </div>
            </li>
          </ul>
          <!-- </van-pull-refresh> -->
          <!-- </van-list> -->
        </van-tab>
        <!-- <van-tab title="待付款" v-else> -->
        <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
        >-->
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
        <!-- <ul>
            <li v-for="(v,k) in list" :key="k" @click="order(v)">
              <h3>
                <span>订单编号：{{v.id}}</span>
                <span style="color: red;" v-if="v.status == 0">待付款</span>
                <span v-if="v.status == 1">准备出仓</span>
                <span v-if="v.status == 2">待发货</span>
                <span v-if="v.status == 3">待收货</span>
                <span v-if="v.status == 4">待评价</span>
                <span v-if="v.status == 5">已评价</span>
                <span v-if="v.status == 6">已取消</span>
                <span v-if="v.status == 7">待退款</span>
                <span v-if="v.status == 8">已退款</span>
                <span v-if="v.status == 9">拒绝退款</span>
              </h3>

       <div class="wrapper">
                <img :src="v.simage" lazy-load alt />
                <div class="s_right">
                  <div class="s_top">
                    <span>{{v.sname}}</span>
                  </div>
                  <p>{{v.createTime}}</p>
                  <div class="s_price">
                    <span style="color:#999;">共计{{v.number}}件商品</span>
                    <span>￥{{v.finalPay}}元</span>
                  </div>
                </div>
              </div>
              <div class="pay" v-if="v.status == 0">
                <span>24小时后自动取消订单</span>
                <div @click="zhi(v)">去支付</div>
              </div>
              <div class="pay" v-if="v.status == 3">
                <span>15天后自动确认收货</span>
                <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
              </div>
              <div class="comment" v-if="v.status == 4">
                <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
              </div>
        </li>-->
        <!-- </ul>  -->
        <!-- </van-pull-refresh> -->
        <!-- </van-list> -->
        <!-- </van-tab> -->
        <van-tab title="客户待取货" id="2">
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
          >-->
          <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
          <ul>
            <li v-for="(v,k) in list" :key="k" @click="order(v)">
              <h3>
                <span>订单编号：{{v.id}}</span>
                <span style="color: red;" v-if="v.status == 0">待付款</span>
                <span v-if="v.status == 1">准备出仓</span>
                <span v-if="v.status == 2">待发货</span>
                <span v-if="v.status == 3">待收货</span>
                <span v-if="v.status == 4">待评价</span>
                <span v-if="v.status == 5">已评价</span>
                <span v-if="v.status == 6">已取消</span>
                <span v-if="v.status == 7">待退款</span>
                <span v-if="v.status == 8">已退款</span>
                <span v-if="v.status == 9">拒绝退款</span>
              </h3>
              <!--0待付款 1待处理 2待发货 3待收货 4待评价 5已评价 6已取消 7待退款 8已退款 9拒绝退款-->
              <div class="wrapper">
                <img :src="v.simage" lazy-load alt />
                <div class="s_right">
                  <div class="s_top">
                    <span>{{v.sname}}</span>
                  </div>
                  <p>{{v.createTime}}</p>
                  <div class="s_price">
                    <span style="color:#999;">共计{{v.number}}件商品</span>
                    <span>￥{{v.finalPay}}元</span>
                  </div>
                </div>
              </div>
              <div class="pay" v-if="v.status == 0">
                <span>24小时后自动取消订单</span>
                <div @click="zhi(v)">去支付</div>
              </div>
              <div class="pay" v-if="v.status == 3">
                <span>15天后自动确认收货</span>
                <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
              </div>
              <div class="comment" v-if="v.status == 4">
                <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
              </div>
            </li>
          </ul>
          <!-- </van-pull-refresh> -->
          <!-- </van-list> -->
        </van-tab>
        <van-tab title="订单已完成" id="3">
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
          >-->
          <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
          <ul>
            <li v-for="(v,k) in list" :key="k" @click="order(v)">
              <h3>
                <span>订单编号：{{v.id}}</span>
                <span style="color: red;" v-if="v.status == 0">待付款</span>
                <span v-if="v.status == 1">准备出仓</span>
                <span v-if="v.status == 2">待发货</span>
                <span v-if="v.status == 3">待收货</span>
                <span v-if="v.status == 4">待评价</span>
                <span v-if="v.status == 5">已评价</span>
                <span v-if="v.status == 6">已取消</span>
                <span v-if="v.status == 7">待退款</span>
                <span v-if="v.status == 8">已退款</span>
                <span v-if="v.status == 9">拒绝退款</span>
              </h3>
              <!--0待付款 1待处理 2待发货 3待收货 4待评价 5已评价 6已取消 7待退款 8已退款 9拒绝退款-->
              <div class="wrapper">
                <img :src="v.simage" lazy-load alt />
                <div class="s_right">
                  <div class="s_top">
                    <span>{{v.sname}}</span>
                  </div>
                  <p>{{v.createTime}}</p>
                  <div class="s_price">
                    <span style="color:#999;">共计{{v.number}}件商品</span>
                    <span>￥{{v.finalPay}}元</span>
                  </div>
                </div>
              </div>
              <div class="pay" v-if="v.status == 0">
                <span>24小时后自动取消订单</span>
                <div @click="order(v)">去支付</div>
              </div>
              <div class="pay" v-if="v.status == 3">
                <span>15天后自动确认收货</span>
                <div style="padding: 0 0.1rem;" @click="queshou(v)">确认收货</div>
              </div>
              <div class="comment" v-if="v.status == 4">
                <div style="padding: 0 0.2rem;" @click="ping(v)">评价</div>
              </div>
            </li>
          </ul>
          <!-- </van-pull-refresh> -->
          <!-- </van-list> -->
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Request from "@/common/js/request";
export default {
  data() {
    return {
      active: "",
      page: 1,
      totalPage: 2,
      list: [],
      // pendEvaluateNumber: "", //待评价
      // pendPayNumber: "", //待付款
      // pendReceiveNumber: "", //待收货
      // pendSendNumber: "", //待发货
      cid: ""
    };
  },
  components: {
  },
  onLoad(options) {
    this.active =options.id;
    console.log(this.active);
    this.cid = JSON.parse(wx.getStorageSync("user")).cid;
    this.myOrder(this.active, this.page);
  },
  mounted() {},
  methods: {
    // gouserInfo() {
    //   let goCarlist = {
    //     cmd: "myInfo",
    //     cid: this.cid
    //   };
    //   Request.postRequest(goCarlist)
    //     .then(res => {
    //       console.log(res);
    //       if (res.result == 0) {
    //         this.pendEvaluateNumber = res.pendEvaluateNumber; //待评价
    //         this.pendPayNumber = res.pendPayNumber; //待付款
    //         this.pendReceiveNumber = res.pendReceiveNumber; //待收货
    //         this.pendSendNumber = res.pendSendNumber; //待发货
    //         console.log(this.pendPayNumber);
    //       }
    //     })
    //     .catch(res => {});
    // },
    //下拉刷新
    // onRefresh() {
    //   setTimeout(() => {
    //     this.$toast("刷新成功");
    //     this.myOrder(this.active, 1);
    //     this.gouserInfo();
    //     this.isLoading = false;
    //   }, 500);
    // },
    beginLoading() {
      // 异步更新数据
      // setTimeout(() => {
      //   if (this.page < this.totalPage) {
      //     this.page++;
      //     this.myOrders(this.active, this.page);
      //     this.loading = false;
      //   } else {
      //     this.loading = false;
      //   }
      // }, 5000);
    },
    back() {
      this.$router.push("/person");
    },
    myOrder(status, page) {
      let myOrder = {
        cmd: "myOrder",
        cid: this.cid,
        pageNow: page,
        status: this.active
      };
      console.log(myOrder);
      Request.postRequest(myOrder)
        .then(res => {
          console.log(res);
          this.list = [];
          if (res.result == 0) {
            this.list = res.dataList;
            this.totalPage = res.totalPage;
            this.finished = true;

            this.gouserInfo();
            if (page < this.totalPage) {
              page++;
              this.myOrders(this.active, page);
              this.loading = false;
            } else {
              this.loading = false;
            }
          } 
        })
        .catch(res => {});
    },
    myOrders(status, page) {
      console.log(status);
      let myOrder = {
        cmd: "myOrder",
        cid: this.cid,
        pageNow: page,
        status: status
      };
      console.log(myOrder);
      Request.postRequest(myOrder)
        .then(res => {
          // console.log(res);
          if (res.result == 0) {
            for (var i in res.dataList) {
              if (this.active == 0) {
                this.list.push(res.dataList[i]);
              } else {
                if (res.dataList[i].status == this.active && this.active != 0) {
                  this.list.push(res.dataList[i]);
                }
              }
            }
            console.log(this.list);
            this.totalPage = res.totalPage;
            this.finished = true;
            if (page < this.totalPage) {
              page++;
              this.myOrders(this.active, page);
              this.loading = false;
            } else {
              this.loading = false;
            }
          } 
        })
        .catch(res => {});
    },
    shopper(event) {
      if (event.target.index == undefined) {
        return false;
      } else {
        this.active = event.target.index;
        this.page = 1;
        this.list = [];
        this.myOrder(this.active, this.page);
      }
    },
    //详情
    order(v) {
    console.log(v)
    wx.navigateTo({
      url:'/pages/order/orderdetials?id='+v.id
    })
      // this.$router.push({
      //   path: "/pages/order/order",
      //   query: {
      //     id: v.id,
      //     num: this.active
      //   }
      // });
    },
    //收货
    queshou(v) {
      wx.showModal({
        title: "确认收货",
        content: "是否确认收货？",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: result => {
          if (result.confirm) {
            let orderDetail = {
              cmd: "confirmReceive",
              id: v.id
            };
            Request.postRequest(orderDetail)
              .then(res => {
                console.log(res);
                if (res.result == 0) {
                  this.myOrder(this.active, this.page);
                  // this.gouserInfo();
                }
              })
              .catch(res => {});
          }
        }
      });
    },
    //评价
    ping(v) {
      this.$router.push({
        name: "comment",
        params: {
          ids: v.id
        }
      });
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.van-tabs__wrap{
  position: fixed !important;
  top:0 !important;
}
.contain {
  width: 100%;
  height: 100%;
}

.van-tab__pane {
  min-height: 667px;
}

.box {
  width: 100%;
  display: flex;
  flex-direction: column;

  .order_list {
    width: 100%;
    position: relative;

    .order_wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      h3 {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        padding: 0 0.4rem;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;
      }
    }
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;

    li {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0.4rem;
      box-sizing: border-box;
      border-bottom: 10px solid #eee;

      a {
        display: block;
        width: 100%;
        height: 100%;
      }

      h3 {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #333;
      }

      .wrapper {
        width: 100%;
        display: flex;
        align-items: center;

        img {
          width: 2.2rem;
          height: 2.2rem;
        }

        .s_right {
          flex: 1;
          height: 1.8rem;
          padding-left: 0.2rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .s_top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #333;
          }

          p {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 12px;
            color: #999;
          }

          .s_price {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #333;
          }
        }
      }

      .pay {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333;

        div {
          width: 1.7rem;
          height: 0.6rem;
          line-height: 0.6rem;
          border-radius: 6px;
          background: #73d242;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }
      }

      .comment {
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #333;

        div {
          width: 1.5rem;
          height: 0.6rem;
          line-height: 0.6rem;
          border-radius: 6px;
          background: #73d242;
          text-align: center;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
}
</style>
