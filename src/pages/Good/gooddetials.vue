<template>
  <div class="contain">
    <!-- <van-image-preview
      v-model="show"
      :images="images"
      :show-index="false"
      :start-position="0"
      @close="guan"
    ></van-image-preview>-->
    <div class="middle" v-for="(v,k) in detailList" :key="k">
      <div class="g_swipe">
        <swiper @change="onChange" :autoplay="3000" circular="true" style="width:100%;">
          <swiper-item v-for="(img,inx) in v.images" :key="inx" style="width:100%;">
            <img :src="img" alt @click="clickBannerImg(k,inx)" class="imgs" />
          </swiper-item>
          <div class="custom-indicator" slot="indicator">{{current+1}}/{{v.images.length}}</div>
        </swiper>
        <div class="g_top">
          <img src="/static/img/xiangq_gouwu.png" alt @click="order" />
        </div>
      </div>
      <div class="g_product">
        <div class="g_left">
          <div class="g_title">
            <h3>{{v.name}}</h3>
            <span>销量 {{parseFloat(v.soldNumber)}}</span>
          </div>
          <div class="g_money" v-if="v.freight!=='-1'&&v.freight!==undefined">满￥{{v.freight}}包邮</div>
          <div class="g_money">
            <span class="g_new">￥{{v.price}}</span>&nbsp;&nbsp;
            <span class="g_old" v-if="v.originalPrice!=undefined">￥{{v.originalPrice}}</span>
          </div>
        </div>
        <div class="g_right">
          <img src="/static/img/xiangq_fenxiang.png" alt @click="openShare" />
        </div>
      </div>
      <div class="copin">
        <div @click="tiaozhuan(detailList[0].sid,detailList[0].sname)" v-if="hasCouponyin==true">
          <img src="/static/img/hongbao.png" alt class="hongbao" />
          <span>领取优惠券</span>
          <img src="/static/img/jinru02.png" alt class="quyou" />
        </div>
      </div>
      <div class="goods_img">
        <h2>商品详情：</h2>
        <p>{{v.describe}}</p>
        <img
          :src="img"
          v-for="(img,inx) in v.describeImages"
          :key="inx"
          @click="clickDescribeImg(inx)"
          mode="widthFix"
        />
      </div>

      <van-goods-action v-if="!showBase">
        <div class="woshi" @click="shopdian">
          <img src="/static/img/dianpu.png" alt />
          <span>店铺</span>
        </div>
        <div class="woshi" @click="kefu(sphone)">
          <img src="/static/img/kefu.png" alt />
          <span>客服</span>
        </div>
        <div class="woshi woshia" @click="collection(type)" v-if="type==false">
          <img src="/static/img/shoucang.png" alt />
          <span>收藏</span>
        </div>
        <div class="woshi woshia" @click="collection(type)" v-else>
          <img src="/static/img/shoucang2.png" alt />
          <span>取消收藏</span>
        </div>
        <van-goods-action-big-btn
          text="加入购物车"
          style="background:#FB9C1C;border-color:#FB9C1C;"
          @click.stop="addCart"
        />
        <van-goods-action-big-btn
          text="立即下单"
          style="background:#72D241;border-color:#72D241;"
          @click.stop="addBuy"
        />
      </van-goods-action>
      <!-- 商品的规格选择开始 -->

      <div v-if="showBase" class="showSku" @click.stop="showBase=false">
        <!-- <div>选择规格</div> -->
        <div class="allskuinfo">
          <div class="title">
            <img :src="logo" alt class="oneimgs" />
            <div class="skuname">
              <p>{{SKname}}</p>
              <p>
                <span>￥{{currentSkuList.price}}</span>
              </p>
            </div>
            <img src="/static/img/cross.png" alt class="close" @click.stop="showBase=false" />
          </div>
          <div class="skudetail">
            <span
              @click.stop="changSku(index,item)"
              v-for="(item,index) in skuList"
              :key="index"
              :class="{'skuActive':active==index}"
            >{{item.val}}</span>
          </div>
          <div class="addnum">
            <div>
              <p>数量</p>
              <p style="color:">{{currentSkuList.stock}}</p>
            </div>
            <van-stepper
              class="fix"
              input-width="20px"
              button-size="20px"
              v-model="val"
              @click.stop="no"
            />
          </div>
          <div class="addbtn">
            <span class="first" @click.stop="onAdd">加入购物车</span>
            <span class="two" @click.stop="addBuy">立即下单</span>
          </div>
        </div>
      </div>

      <!-- 商品的规格选择结束 -->
    </div>
    <!-- 下部 评论 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="beginLoading">
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <div ref="comment" class="comment">
        <div class="c_dis">
          <div class="c_item" v-for="(v,k) in list" :key="k">
            <img :src="v.icon" alt />
            <div class="item_right">
              <div class="right_top">
                <div class="r_tit">
                  <span>{{v.title}}</span>
                  <span>{{v.time}}</span>
                </div>
                <div class="user_star">
                  <van-rate v-model="v.star" disabled disabled-color="rgb(255,210,30)" :size="14" />
                  <span style="margin-left:0.2rem">{{v.star}}.0</span>
                </div>
              </div>
              <p>{{v.content}}</p>
              <div class="c_img">
                <!-- <template v-for="(i,index) in v.url" :key="index">
                    <img :src="i.imgs" alt>
                </template>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </van-pull-refresh> -->
    </van-list>
  </div>
</template>

<script>
import Request from "@/common/js/request";
export default {
  data() {
    return {
      cid: "",
      //  规格id
      id: "",
      shares: {},
      type: false,
      current: 0,
      detailList: [],
      hasCouponyin: false,
      list: [],
      dataList: [],
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      totalPage: 3,
      showBase: false,
      showBases: false,
      dian: "",
      sphone: "",
      sname: "",
      shopID: "",
      SKname: "",
      val: 1,
      skuList: [],
      currentSkuList: {},
      show: false,
      images: [],
      logo: "",
      active: 0,
    };
  },
  onLoad(options) {
    this.id = options.id;
    console.log(options.id);
  },
  mounted() {
    this.cid = JSON.parse(wx.getStorageSync("user")).cid;
    this.init();
    this.uinit();
  },
  components: {},
  methods: {
    no(){
      //   不能删   阻止事件
    },
    //   选规格
    changSku(ind,e) {
      this.val = 1;
      this.active = ind;
      this.id=e.id;
      this.currentSkuList = this.skuList[ind];
    },
    addBuy() {},
    guan() {
      this.images.pop();
    },
    //  微信图片预览
    clickBannerImg(inx) {
      console.log(inx);
      wx.previewImage({
        current: this.detailList[0].images[inx],
        urls: this.detailList[0].images
      });
    },
    //  微信图片预览
    clickDescribeImg(inx) {
      wx.previewImage({
        // 当前展示
        current: this.detailList[0].describeImages[inx],
        //  要展示的数组
        urls: this.detailList[0].describeImages
      });
    },
    addCart() {
      this.showBase = true;
      console.log(1);
    },

    onChange(index) {
      this.current = parseInt(index);
    },
    openShare() {},
    //分享链接点击事件
    sharelist() {},

    onRefresh() {
      this.list = [];
      this.page = 1;
      this.totalPage = 3;
      this.beginLoading();
      setTimeout(function() {
        Toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    init() {
      this.detailList = [];
      let datas = {
        cmd: "goodsDetail",
        id: this.id,
        cid: this.cid
      };
      Request.postRequest(datas)
        .then(res => {
          if (res.result == 0) {
            console.log(res);
            this.skuList = res.specifyValue;
            this.currentSkuList = this.skuList[0];
            this.logo = res.logo;
            this.SKname = res.name;
            console.log(this.skuList);
            this.sphone = res.sphone;
            this.sname = res.sname;
            this.dian = res.sid;
            this.shopID = res.id;
            console.log(this.dian);
            if (res.isCollect == true) {
              this.type = true;
            } else {
              this.type = false;
            }
            if (res.hasCoupon == 1) {
              this.hasCouponyin = true;
            } else {
              this.hasCouponyin = false;
            }
            this.detailList.push(res);
            this.goods.title = res.name;
            this.goods.picture = res.images[0];

            this.donghua = false;
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    stepperchange(e) {
      this.val = e;
    },
    shopdian() {
      console.log(this.dian);
      wx.navigateTo({
        url: "/pages/shopdetails/index?id=" + this.dian
      });
    },
    uinit() {
      let pin = {
        cmd: "goodsComment",
        id: this.id,
        pageNow: this.page
      };
      Request.postRequest(pin)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            console.log(res.dataList);
            for (var i in res.dataList) {
              this.dataList.push(res.dataList[i]);

              console.log(this.dataList);
            }
          }
        })
        .catch(res => {});
    },
    beginLoading: function() {
      if (this.page <= this.totalPage) {
        for (var i = 0; i < this.dataList.length; i++) {
          console.log("id6+" + this.dataList[i].id);

          this.list.push(this.dataList[i]);
          console.log(this.list);
        }
        this.page++;
        // // 加载状态结束
        this.loading = false;
      } else {
        this.loading = false;
        this.finished = true;
      }
    },
    collection(it) {
      if (this.cid == null) {
        // this.$router.push("/login");
      } else {
        let types = 0;
        if (it == true) {
          types = 1;
        } else {
          types = 0;
        }
        console.log("收藏+" + it + ":" + types);
        let collection = {
          cmd: "collectGoods",
          id: this.id,
          cid: this.cid,
          type: types
        };
        Request.postRequest(collection)
          .then(res => {
            console.log(res);
            if (res.result == 0) {
              this.type = !this.type;
              if (this.type) {
                wx.showToast({
                  title: "收藏成功"
                });
              } else {
                wx.showToast({
                  title: "取消收藏成功"
                });
              }
            } else if (res.result == "2") {
              this.$router.push("/fenghao");
            }
          })
          .catch(res => {});
      }
    },
    showSku() {
      this.showBase = true;
    },
    selected(item) {
      console.log(item);
      this.initialSku.s1 = item.selectedSkuComb.s1;
      this.SKname = item.skuValue.name;
    },
    back() {
      this.$router.push("/search_product");
    },
    //  顶部 购物车图标
    order() {
      wx.switchTab({
        url: "/pages/tarba/cart"
      });
    },
    onAdd() {
      // if (this.cid == null) {
      //   this.$router.push("/login");
      // } else {
        if (this.currentSkuList.stock<= 0) {
          wx.showToast({
            title: "该规格商品已售空"
          });
        } else {
          let shoplist = {
            cmd: "addToCar",
            gid: this.id,
            cid: this.cid,
            specifications: this.currentSkuList.skuId,
            number: this.val
          };
          console.log(shoplist);
          Request.postRequest(shoplist)
            .then(res => {
              console.log(res);
              if (res.result == 0) {
                wx.showToast({
                  title: "已加入购物车"
                });
                this.showBase = false;
                // for (let i in this.sku.list) {
                //   if (this.sku.list[i].s1 == data.selectedSkuComb.s1) {
                //     this.sku.list[i].stock_num =
                //       this.sku.list[i].stock_num - this.val;
                //     this.sku.stock_num += this.sku.list[i].stock_num;
                //   }
                // }
              } else if (res.result == "2") {
                this.$router.push("/fenghao");
              }
            })
            .catch(res => {});
        // }
      }
    },
    onBuyClicked(data) {
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        if (data.selectedSkuComb.stock_num <= 0) {
          Toast("该规格商品已售空");
        } else {
          let car = [];
          let shop = {};
          let goodlist = {};
          shop.sid = this.dian;
          shop.sname = this.sname;
          goodlist.id = this.shopID;
          goodlist.name = this.goods.title;
          goodlist.images = this.goods.picture;
          goodlist.number = this.val;
          goodlist.price = data.selectedSkuComb.price / 100;
          goodlist.skuname = this.SKname;
          goodlist.skuID = data.selectedSkuComb.id;
          car[0] = shop;
          car[1] = goodlist;
          console.log(car);
          this.$router.push("/orders");
          localStorage.setItem("gocart", JSON.stringify(car));
          localStorage.setItem("Torders", JSON.stringify("goods_detail"));
        }
      }
    },
    tiaozhuan(id, name) {
      console.log(id, name);
      if (this.cid == null) {
        this.$router.push("/login");
      } else {
        //优惠券我来了
        this.$router.push({
          name: "coupon",
          params: {
            id: id,
            name: name
          }
        });
      }
    }
  }
};
</script>
<style>
page {
  width: 100%;
  height: 100%;
}
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
._swiper {
  height: 100%;
}

.contain {
  width: 100%;
  height: auto;
  margin-bottom: 60px;
}

._van-goods-action-big-btn {
  border-color: #fb9c1c;
  background-color: #fb9c1c;
}

._van-swipe-item img {
  width: 100%;
  height: 100%;
}

._van-goods-action {
  z-index: 2000;
  position: fixed;
  display: flex;
  bottom: 0;
}

.van-popup {
  z-index: 100000;
}

.van-sku-row__title {
  display: none !important;
}

.middle {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.g_top {
  width: 0.6rem;
  height: 0.6rem;
  box-sizing: border-box;
  position: absolute;
  top: 0.2rem;
  right: 0.4rem;

  img {
    width: 0.6rem;
    height: 0.6rem;
  }
}

.g_swipe {
  width: 100%;
  height: 300px;
  color: #333;
  position: relative;

  .imgs {
    height: 100%;
    width: 100%;
  }

  .custom-indicator {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    padding: 0.1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    font-size: 14px;
    color: #fff;
  }
}

.g_product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  box-sizing: border-box;

  .g_left {
    display: flex;
    width: 70%;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 0.4rem;
    box-sizing: border-box;

    .g_title {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      color: #333;

      h3 {
        width: 100%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 2;
      }

      span {
        color: #999;
        font-size: 12px;
        margin-top: 0.2rem;
      }
    }

    .g_money {
      font-size: 14px;
      padding-top: 0.4rem;

      .g_new {
        color: red;
      }

      .g_old {
        color: #999;
        text-decoration: line-through;
      }
    }
  }

  .g_right {
    width: 1.6rem;
    display: flex;
    border-radius: 30px;
    margin-right: 5px;

    img {
      width: 100%;
      height: 0.7rem;
    }
  }
}

.woshi {
  width: 30px;
  height: 34px;
  background: #fff;
  border-right: 1px solid #dedede;
  color: #7d7e80;
  padding: 8px 10px;
  text-align: center;

  span {
    font-size: 12px;
  }

  img {
    width: 20px;
    height: 20px;
    display: block;
    margin-left: 5px;
    opacity: 0.5;
  }
}

.woshia {
  width: 50px;
  border-right: none;

  img {
    margin-left: 15px;
  }
}

.goods_img {
  width: 100%;
  padding: 0.4rem 0;
  background: rgb(244, 244, 244);

  h2 {
    padding: 0 0.4rem;
  }

  p {
    width: 100%;
    padding: 0.5rem 0.4rem;
    box-sizing: border-box;
    font-size: 14px;
    color: #333;
  }

  img {
    width: 100%;
    display: block;
  }
}

.comment {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .c_dis {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.4rem;
    box-sizing: border-box;

    .c_item {
      width: 100%;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;

      img {
        width: 1.2rem;
        height: 1.2rem;
      }

      .item_right {
        width: 80%;
        padding-left: 0.3rem;
        display: flex;
        flex-direction: column;

        .right_top {
          width: 100%;
          height: 1.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 14px;
          color: #333;

          .r_tit {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .user_star {
            width: 100%;
            display: flex;
            align-items: center;
          }
        }

        p {
          font-size: 12px;
          color: #333;
          padding-top: 0.6rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .c_img {
          width: 100%;
          margin-top: 0.3rem;
          display: flex;

          img {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.3rem;
          }
        }
      }
    }
  }
}

.copin {
  background: #f4f4f4;
  padding-top: 5px;

  div {
    background: #fff;
    position: relative;
    height: 46px;

    img {
      height: 20px;
      width: 15px;
    }

    .hongbao {
      position: absolute;
      top: 12px;
      left: 20px;
    }

    span {
      position: absolute;
      top: 15px;
      left: 50px;
      font-size: 14px;
      color: #F7725C;
    }

    .quyou {
      position: absolute;
      top: 15px;
      right: 20px;
    }
  }
}

.showSku {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.45);

  .allskuinfo {
    background: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;

    .title {
      padding: 0.2rem;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .oneimgs {
        position: absolute;
        top: -20px;
        left: 20px;
        width: 100px;
        height: 100px;
        border-radius: 5px;
      }

      .skuname {
        p {
          font-size: 14px;
          display: flex;

          span {
            color: #FE552E;
          }
        }
      }

      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 22px;
        height: 22px;
      }
    }
  }

  .skudetail {
    display: flex;
    padding: 20px;
    margin-top: 40px;

    span {
      padding: 7px 15px;
      border: 1px solid #c1c1c1;
      font-size: 12px;
      margin-right: 10px;
      border-radius: 15px;
    }

    .skuActive {
      background: #72D241;
      color: #fff;
    }
  }

  .addnum {
    display: flex;
    padding: 10px 20px;
    align-items: center;
    justify-content: space-between;
  }

  .addbtn {
    height: 50px;
    width: 100%;
    display: flex;

    .first {
      width: 50%;
      background: #FB9C1C;
      color: #fff;
      text-align: center;
      line-height: 50px;
    }

    .two {
      width: 50%;
      background: #72D241;
      color: #fff;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
