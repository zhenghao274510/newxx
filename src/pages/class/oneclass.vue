<template>
  <div class="list">
    <div class="shop">
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
        <van-tab title="综合排序">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
            v-if="!show"
          >
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <recommendfen :recommend="list"></recommendfen>
            <!-- </van-pull-refresh> -->
          </van-list>
        </van-tab>
        <van-tab title="好评优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
            v-if="!show"
          >
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <recommendfen :recommend="list"></recommendfen>
            <!-- </van-pull-refresh> -->
          </van-list>
        </van-tab>
        <van-tab title="价格优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
            v-if="!show"
          >
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <recommendfen :recommend="list"></recommendfen>
            <!-- </van-pull-refresh> -->
          </van-list>
        </van-tab>
        <van-tab title="销量优先">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="beginLoading"
            :offset="10"
            v-if="!show"
          >
            <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
            <recommendfen :recommend="list"></recommendfen>
            <!-- </van-pull-refresh> -->
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div class="no" v-if="show">暂没有搜索的商品</div>
  </div>
</template>

<script>
import Recommendfen from "@/components/recommendfen";
import Request from "@/common/js/request";

export default {
  data() {
    return {
      text: "分类名称",
      active: 0,
      list: [],
      isLoading: false,
      loading: false,
      finished: false,
      sorts: 0,
      page: 1,
      totalPage: "",
      show: false,
      recommend: [],
      id: "",
      ink: ""
    };
  },
  components: {
    Recommendfen
  },
  onLoad(options) {

    this.id =JSON.parse(options.id).id;
     wx.setNavigationBarTitle({
      title: JSON.parse(options.id).name
    });
    console.log(this.id);
  },
  mounted() {
    this.initDta();
  },
  computed: {
    showList() {
      return this.list;
    }
  },
  methods: {
    onRefresh: function() {
      var self = this;
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.beginLoading();
      setTimeout(function() {
        Toast("刷新成功");
        self.isLoading = false;
      }, 500);
    },
    initDta() {
      this.list=[];
      let Category = {
        cmd: "selectGoodsByCategory",
        orderType: this.sorts,
        id: this.id,
        pageNow: this.page
      };
      console.log(Category);
      Request.postRequest(Category)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.totalPage = res.totalPage;
            if (this.page <= res.totalPage) {
              for (var i = 0; i < res.dataList.length; i++) {
                this.list.push(res.dataList[i]);
              }
            }
          } else if (res.dataList.length==0) {
            this.show = true;
          }
        })
        .catch(res => {});
    },

    beginLoading() {
      if (this.page < this.totalPage) {
        this.page += 1;
        this.initDta();
      } else {
        wx.showToast({
          title: "没有更多了"
        });
      }
    },
    sort(k) {
      if (k.target.index==undefined) {
        return false;
      } else {
        this.sorts = k.target.index;
        this.clear();
        this.initDta();
      }
      console.log(k.target.index);
      // let self = this;
    },
    clear() {
      this.list = [];
      this.page = 1;
      this.finished = false;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.no {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #333;
  top: 124px;
  left: 0;
  bottom: 0;
  z-index: 999;
}

.van-tabs__wrap {
  position: fixed !important;
  top: 40px;
}

.list {
  width: 100%;

  .shop {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
