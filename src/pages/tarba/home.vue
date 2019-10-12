<template>
  <div class="contain">
    <div class="head">
      <div class="city" @click="inits">
        <img src="/static/img/shouye-dingwei.png" alt />
        <span>{{city}}</span>
      </div>
      <div class="search">
        <img src="/static/img/shouye-sousuo.png" alt />
        <input type="text" placeholder="输入店铺或商品名称" @focus="goSearch" placeholder-style="color:#fff" />
      </div>
      <img src="/static/img/shouye-xiaoxi.png" @click="goMessage" alt />
      <div class="dian" v-if="xiaoxi==true"></div>
    </div>
    <div ref="all" class="wrapper">
      <van-tabs
        :active="active"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        sticky
        :offset-top="10"
        @click="changeTab"
        swipeable
        animated
        :duration="0.5"
        @change="changeIng"
      >
        <van-tab :title="v.name" v-for="(v,k) in cate1" :key="k">
          <div class="swipe">
            <swipe :images="images"></swipe>
          </div>
          <div class="navs">
            <navs :datas="datas"></navs>
          </div>
          <div class="slide-box">
            <discount :recommendList="list" :title="title" v-if="cate1[active].name=='推荐'"></discount>

            <div class="list" v-else>
              <h3 v-if="title">{{title1}}</h3>

              <ul class="list-box">
                <li
                  v-for="(item,index) in dataList"
                  :key="index"
                  @click.stop="detail(item.id)"
                  v-if="k<3"
                >
                  <img :src="item.image" alt lazy-load />
                  <div class="list-content">
                    <div class="list-top">
                      <div class="list-title">{{item.name}}</div>
                      <div class="list-produce">{{item.text}}</div>
                    </div>
                    <div class="list-price">
                      <div class="list-left">
                        <span>￥{{item.price}}</span>
                        <s>￥{{item.originalPrice}}</s>
                      </div>
                      <img src="/static/img/gouwuche2.png" alt @click.stop="shopcart(item)" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <p class="zhe_p" @click.stop="chakan(cate1[active].name)">查看更多》</p>
          </div>
          <recommendx :recommend="recommendList" :tits="tits"></recommendx>
          <div class="loading" v-if="more">
            <span>没有更多了</span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import swipe from "@/components/swipe";
import Navs from "@/components/navs";
import Discount from "@/components/discount";
import Recommendx from "@/components/recommendx";
import Request from "@/common/js/request";
// import getCity from "@/common/js/location";

export default {
  data() {
    return {
      active: 0,
      num: 0,
      title: "折扣专区",
      title1: "优质商品推荐",
      tits: "销量推荐",
      city: "",
      images: [],
      datas: [],
      cate1: [],
      dataList: [],
      page: 1,
      totalPage: 1,
      loading: false,
      recommendList: [],
      list: [],
      id: "",
      more: false,
      xiaoxi: false,
      gou: 0,
      cid: ""
    };
  },
  onLoad() {
    this.cid = "b94cb0c7d5544b268727b6e3a2ac9a06";
  },
  components: {
    swipe,
    Navs,
    Discount,
    Recommendx
  },
  mounted() {
    let user = {};
    user.cid = "b94cb0c7d5544b268727b6e3a2ac9a06";
    wx.setStorageSync("user", JSON.stringify(user));
    //   获取城市定位
    // getCity.getCurrentCityName();

    // if (this.cid) {
    this.diao();
    // }

    // success
    this.id = "";
    this.active = 0;
    let obj = {};
    obj.num = this.active;
    obj.id = this.id;

    wx.setStorageSync("first", JSON.stringify(obj));

    this.gounum();
  },
  methods: {
    firstTO() {
      this.id = "";
      this.active = 0;
      this.initLoad(this.id);
    },
    gounum() {
      //   消息数量
      let datas = {
        cmd: "cartCount",
        cid: this.cid
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.gou = res.totalCount;
          }
        })
        .catch(res => {});
    },
    //  下拉 刷新事件
    onPullDownRefresh() {
      setTimeout(() => {
        this.addRecommend();
        this.initLoad(this.id);
      }, 500);
    },
    //  上拉触底 加载
    onReachBottom() {
      // 异步更新数据
      setTimeout(() => {
        if (this.page < this.totalPage) {
          this.page++;
          this.addRecommend();
        }
      }, 2000);
    },
    diao() {
      // self.donghua = true;
      //调用一级分类导
      if (wx.getStorageSync("cateTAB")) {
        this.cate1 = JSON.parse(wx.getStorageSync("cateTAB"));
         this.active = 0
          this.id = this.cate1[0].id
          this.initLoad(this.id);
      }

      let datas = {
        cmd: "goodsCategoryInit",
        uid: this.cid
      };
      Request.postRequest(datas)
        .then(res => {
          // console.log(res);
          if (res.result == 0) {
            this.cate1 = [{ id: "", name: "推荐" }];
            for (let i = 0; i < res.dataList.length; i++) {
              this.cate1.push(res.dataList[i]);
            }
            console.log(this.cate1);

            // console.log(self.cate1);
            wx.setStorageSync("cateTAB", JSON.stringify(this.cate1));
            this.initLoad(this.id);
          }
        })
        .catch(res => {});
    },
    inits() {},
    init() {},
    initLoad(id) {
        //处理初始化页面数据缓存开始
        let self = this;
        let datas = {
          cmd: "recommendGoods",
          id: id,
          pageNow: this.page
        };
        // sessionStorage.getItem("cateTAB")
        let cateTAB = JSON.parse(wx.getStorageSync("cateTAB"))
        for (let i = 0; i < cateTAB.length; i++) {
          if (id == cateTAB[i].id) {
            if (cateTAB[i].list) {
              self.datas = cateTAB[i].list.child
              self.images = cateTAB[i].list.rotationChart
              self.totalPage = cateTAB[i].list.totalPage
              self.recommendList = cateTAB[i].list.order
              self.dataList = cateTAB[i].list.discount
            } else {
              cateTAB[i].list = {}
              Request.postRequest(datas).then(res => {
                console.log(res)
                if (res.result == 0) {
                  self.datas = res.child
                  self.images = res.rotationChart
                  self.totalPage = res.totalPage
                  self.dataList = res.discount
                  self.recommendList = res.order
                  cateTAB[i].list.child = res.child
                  cateTAB[i].list.rotationChart = res.rotationChart
                  cateTAB[i].list.totalPage = res.totalPage
                  cateTAB[i].list.discount = res.discount
                  cateTAB[i].list.order = res.order
                  wx.setStorageSync("cateTAB", JSON.stringify(cateTAB))
                  // sessionStorage.setItem("cateTAB", JSON.stringify(cateTAB))
                  // self.donghua = false
                }
              }).catch(res => {})
            }
          }
        }
        //处理初始化页面数据缓存结束

        //打折商品调用
        let discount = {
          cmd: "discountGoods",
          pageNow: 1
        };
        Request.postRequest(discount).then(res => {
          console.log(res);
          if (res.result == 0) {
            self.list = res.discount;
            wx.setStorageSync("discount", JSON.stringify(self.list));
            // localStorage.setItem("discount", JSON.stringify(self.list));
            this.more = true;
          }
        }).catch(res => {})
      },

    addRecommend() {
      let self = this;
      if (self.id == undefined) {
        self.id = "";
      }
      let datas = {
        cmd: "recommendGoods",
        id: self.id,
        pageNow: self.page
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log("加油" + res);
          if (res.result == 0) {
            if (self.page <= res.totalPage) {
              self.loading = true;
              for (let i = 0; i < res.order.length; i++) {
                self.recommendList.push(res.order[i]);
              }
              self.page++;
              // 加载状态结束
              self.loading = false;
            } else {
              self.loading = false;
              self.more = true;
            }
          }
        })
        .catch(res => {});
    },
    clear() {
      this.page = 1;
      this.loading = false;
      this.more = false;
      this.list = [];
      this.datas = [];
      this.images = [];
      this.dataList = [];
      this.recommendList = [];
    },
    changeTab(k) {
      this.clear();
      this.id = this.cate1[this.active].id;
      console.log(this.id);
      this.initLoad(this.id);
      let obj = {};
      obj.num = this.active;
      obj.id = this.id;
      wx.setStorageSync("first", JSON.stringify(obj));
    },
    changeIng(k) {
      let ind = k.target.index;
      this.clear();
      this.id = this.cate1[ind].id;

      this.initLoad(this.id);
      this.active = ind;
      // let obj = {};
      // obj.num = this.active;
      // obj.id = this.id;
      // wx.setStorageSync("first", JSON.stringify(obj));
    },
    goSearch() {
      this.$router.push("/pages/search/index");
    },
    goMessage() {
      // wx.setStorageSync("Messageurl", JSON.stringify("first"));
      this.$router.push("/pages/my/message");
    },
    infoList(id) {
      let datas = {
        cmd: "infoList",
        cid: id,
        pageNow: 1
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.result == 0) {
            console.log(res.dataList);
            for (var i in res.dataList) {
              if (res.dataList[i].read == 0) {
                this.xiaoxi = true;
              } else {
                this.xiaoxi = false;
              }
            }
          }
        })
        .catch(res => {});
    },
    chakan(v) {
      console.log(v);
      console.log(this.id);
      if (v == "推荐" || v == "拼团" || v == "拿货团") {
        wx.navigateTo({
          url: "/pages/discount/discountList?params=" + this.id
        });
      } else {
        wx.navigateTo({
          url: "/pages/discount/goodFood?params=" + this.id
        });
      }

      // wx.setStorageSync("params", JSON.stringify(params));
      // this.$router.push("/pages/discount/discountList");
    },
    //
    detail(k) {
      console.log(k);
      wx.navigateTo({
        url: "../Good/gooddetials?id=" + k
      });
    },
    //购物车图标
    shopcart(v) {
      console.log(v);
      // this.cid = "b94cb0c7d5544b268727b6e3a2ac9a06";
      let datas = {
        cmd: "addToCar",
        gid: v.id,
        cid: this.cid,
        specifications: v.skuId,
        number: 1
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            wx.showToast({
              title: "添加购物车成功"
            });
            // this.gounum();
            // this.donghua = false;
          }
        })
        .catch(res => {});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
._van-tabs__wrap {
  position: fixed !important;
  top: 30px;
}

.van-tab--active {
  color: rgb(114, 209, 65);
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin-top: 0.5rem;

  h3 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    color: #333;
    background: rgb(250, 250, 250);
  }

  .list-box {
    width: 100%;

    li {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      border-bottom: 1px solid #eee;

      img {
        width: 2.5rem;
        height: 2.5rem;
      }

      .list-content {
        width: 70%;
        height: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.4rem 0.3rem;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;

        .list-top {
          width: 100%;

          .list-title {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .list-produce {
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 0.2rem;
          }
        }

        .list-price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .list-left {
            display: flex;

            span {
              font-size: 16px !important;
              color: red;
            }

            s {
              font-size: 14px;
              text-decoration: line-through;
              color: #dedede;
              margin-left: 10px;
            }
          }

          img {
            width: 0.5rem;
            height: 0.5rem;
          }
        }
      }
    }
  }

  .list-more {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}

.zhe_p {
  width: 100%;
  line-height: 1rem;
  font-size: 12px;
  color: #999999;
  text-align: center;
}

.loading {
  width: 100%;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
}

.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.4rem 0;
  box-sizing: border-box;
  background: rgb(114, 209, 65);
  z-index: 9999;

  .dian {
    position: fixed;
    top: 24px;
    right: 17px;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background: red;
  }

  .city {
    width: auto;
    height: 50px;
    display: flex;
    align-items: center;

    img {
      width: 0.4rem;
      height: 0.5rem;
    }

    span {
      font-size: 14px;
      color: #fff;
      margin-left: 0.3rem;
    }
  }

  .search {
    width: 65%;
    height: 36px;
    border-radius: 50px;
    background: rgb(169, 228, 138);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 0.3rem;
      height: 0.3rem;
    }

    input {
      width: 60%;
      font-size: 14px;
      color: #fff;
      background: none;
      border: none;
      margin-left: 0.3rem;
    }
  }

  img {
    width: 0.4rem;
    height: 0.5rem;
  }
}

.contain {
  width: 100%;
  height: 100%;
  padding-top: 60px;
}

.wrapper {
  width: 100%;
  height: auto;

  .swipe {
    width: 100%;
    height: 180px;
  }

  .navs {
    width: 100%;
    display: flex;
  }

  .slide-box {
    width: 100%;
    background: rgb(250, 250, 250);

    h3 {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      color: #333;
    }

    .slide-list {
      width: 100%;
      display: flex;
      min-height: 5.5rem;
    }
  }
}
</style>
