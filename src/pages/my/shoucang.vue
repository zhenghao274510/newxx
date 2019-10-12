<template>
  <div class="list">
    <div class="store">
      <van-tabs
        v-model="active"
        color="rgb(114,209,65)"
        title-active-color="rgb(114,209,65)"
        @click="sort"
        @change="sort"
        :swipeable="true"
        :sticky="true"
        :offset-top="10"
      >
        <van-tab title="商品收藏">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="show"
            :immediate-check="false"
          >
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <recommends
              :recommend="recommends"
              v-if="recommends.length>0"
            ></recommends>
            <div v-else class="kong">暂无收藏</div>
            <!-- </van-pull-refresh> -->
          </van-list>
        </van-tab>
        <van-tab title="店铺收藏">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
            v-if="show"
            :immediate-check="false"
          >
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <shops
              :dataList="dataList"
              v-if="dataList.length>0"
            ></shops>
            <div v-else class="kong">暂无收藏</div>
            <!-- </van-pull-refresh> -->
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Recommends from "@/components/recommends";
import Shops from "@/components/shops";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      donghua: false,
      text: "我的收藏",
      active: 0,
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      sorts: 0,
      page: 1,
      show: false,
      recommends: [],
      dataList: [],
      cid:''
    };
  },
  onLoad() {
    this.cid = JSON.parse(wx.getStorageSync("user")).cid;
  },
  computed: {
    showList() {
      return this.list;
    }
  },
  components: {
    Recommends,
    Shops
  },
  mounted() {
    let storeNum = wx.getStorageSync("storeNUM");
    if (storeNum) {
      this.active = JSON.parse(storeNum);
      if (this.active == 0) {
        this.beginLoading();
      } else {
        this.onLoads();
      }
    } else {
      this.beginLoading();
    }
  },
  methods: {
    // back() {
    //   this.$router.push("/person");
    //   localStorage.removeItem("storeNUM");
    // },
    sort(k) {
      this.sorts = k;
      this.clear();
      if (k == 0) {
        this.beginLoading();
      } else {
        this.onLoads();
      }
    },
    clear() {
      this.page = 1;
      this.finished = false;
    },
    goDetailx(id) {
      wx.navigateTo({
        url:'/pages/Good/gooddetials?id='+id
      })
      let ID = {};
      ID.id = id;
      wx.setStorageSync("storeNUM", JSON.stringify("0"));
      wx.setStorageSync("shou-shopID", JSON.stringify(ID));
    },
    goShopx(id) {
      console.log(id);
      wx.wx.navigateTo({
        url: '/pages/shopdetails/index?id='+id,
      });
      // let ID = {};
      // ID.id = id;
      // localStorage.setItem("storeNUM", JSON.stringify("1"));
      // localStorage.setItem("shuos-dianID", JSON.stringify(ID));
    },
    goDetail(id) {
      console.log(id);
      let datas = {
        cmd: "collectGoods",
        cid: this.cid,
        id: id,
        type: 1
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            Toast("取消收藏商品成功");
            this.beginLoading();
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    goShop(id) {
      console.log(id);
      let datas = {
        cmd: "collectShop",
        cid: this.cid,
        sid: id,
        type: 1
      };
      console.log(datas);
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            Toast("取消收藏商店成功");
            this.onLoads();
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    onRefresh: function() {
      var self = this;
      this.page = 1;
      this.finished = true;
      this.beginLoading();
      setTimeout(function() {
        // Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    beginLoading() {
      let storegood=wx.getStorageSync('storegood')
      if (storegood) {
        this.recommends = JSON.parse(storegood);
      }
      let datas = {
        cmd: "goodsCollection",
        cid: this.cid,
        pageNow: this.page
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.recommends = res.dataList;
            console.log(this.recommends);
            wx.setStorageSync("storegood",JSON.stringify(this.recommends))
            // localStorage.setItem("storegood", JSON.stringify(this.recommends));
            this.show = true;
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    onLoads() {
      let storeshop=wx.getStorageSync('storeshop')
      if (storeshop) {
        this.dataList = JSON.parse(storeshop);
      }
      let datas = {
        cmd: "shopCollection",
        cid: this.cid,
        pageNow: this.page
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res.dataList);
          if (res.result == 0) {
            for (let s in res.dataList) {
              res.dataList[s].star = Number(res.dataList[s].stars);
            }
            this.dataList = res.dataList;
            console.log(this.dataList);
            wx.setStorageSync("storeshop",JSON.stringify(this.dataList))
            // localStorage.setItem("storeshop", JSON.stringify(this.dataList));
            this.donghua = false;
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    }
  },
  beforeDestroy() {
    wx.removeStorageSync('storeNUM')
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list {
  width: 100%;
  height: 100%;

  .store {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
  }

  .van-tab__pane {
    height: 12rem;
  }

  .van-tabs {
    height: 100%;

    .van-tabs__content {
      height: 80%;

      .van-list {
        height: 100%;

        .van-pull-refresh {
          height: 100%;
        }
      }
    }
  }
}

.kong {
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-top: 70px;
}
</style>
