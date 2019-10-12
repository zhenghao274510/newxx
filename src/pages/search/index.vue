<template>
  <div class="list">
    <div class="search">
      <div class="type" @click.stop="showChose=true">
        <div>
          {{options[value].text}}
          <img src="/static/img/down.png" v-if="!showChose" />
          <img src="/static/img/up.png" v-else />
        </div>
        <!-- 下拉 菜单 -->
        <ul v-if="showChose" class="chose_muen">
          <li
            v-for="(v,k) in options"
            :key="k"
            @click.stop="choseStyle(k)"
            :class="{'active':value==index}"
          >{{v.text}}</li>
        </ul>
      </div>
      <div class="search_input">
        <van-search placeholder="请输入搜索关键词" v-model="keyworde"  />
      </div>
      <span @click="goSearch">搜索</span>
    </div>
    <div class="history">
      <div class="h_box">
        <span>历史搜索</span>
        <img src="/static/img/delete.png" alt @click="remove" />
      </div>
      <ul class="h_list">
        <li
          v-for="(item,index) in searchList"
          :key="index"
          @click="goSearchs(item.val)"
        >{{item.val}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Request from "@/common/js/request";

export default {
  data() {
    return {
      showChose: false,
      value: 0,
      keyworde: "",
      options: [
        {
          value: 1,
          text: "商品"
        },
        {
          value: 2,
          text: "商家"
        }
      ],
      searchList: []
    };
  },
  created() {},
  mounted() {
    this.shou();
  },
  methods: {
    choseStyle(ind) {
      this.value = ind;
      this.showChose = false;
    },
    remove() {
      wx.removeStorage({
        key: "search",
        success: function(res) {
          // success
        }
      });
      this.shou();
    },
    shou() {
      if (wx.getStorageSync("search")) {
        this.searchList = JSON.parse(wx.getStorageSync("search"));
      }
    },
    goSearch() {
      console.log(this.keyworde)
      if (this.keyworde == "") {
        wx.showToast({
          title: "搜索内容不能为空"
        });
        return;
      } else {
        if (this.value == 0) {
          this.$router.push("/pages/search/search_product");
          let shopseach = {};
          shopseach.name = this.keyworde;
          wx.setStorage({
            key: "shopseach",
            data: JSON.stringify(shopseach)
          });
        } else {
          let url = "/pages/search/search_shop?name=" + this.value1;
          this.$router.push(url);
          let shopssearch = {};
          shopssearch.name = this.keyworde;
          wx.setStorage({
            key: "shopssearch",
            data: JSON.stringify(shopssearch)
          });
        }
      }
      console.log(this.keyworde);
      let list = {
        val: this.keyworde
      };
      let searchArr = [];
      searchArr = JSOP;
      wx.getStorage({
        key: "search",
        success: function(res) {
          // success
          searchArr = JSON.stringify(res.data);
        }
      });

      searchArr.unshift(list);
      wx.setStorage({
        key: "search",
        data: JSON.stringify(searchArr)
      });
    },
    back() {
      this.$router.go(-1);
    },
    goSearchs(val) {
      console.log(val);
      if (this.value == 0) {
        this.$router.push("/pages/search/search_product");
        let shopseach = {};
        shopseach.name = val;
        wx.setStorage({
          key: "shopseach",
          data: JSON.stringify(shopseach)
        });
      } else if (this.value == 1) {
        this.$router.push("/pages/search/search_shop");
        let shopssearch = {};
        shopssearch.name = val;
        wx.setStorage({
          key: "shopssearch",
          data: JSON.stringify(shopssearch)
        });
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// @import '../common/stylus/variable';
.list {
  width: 100%;

  .search {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 0.3rem;
      height: 0.5rem;
    }

    .type {
      width: 24%;
      height: 34px;
      margin-left: 0.4rem;
      background: #F5F5F5;
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;

      img {
        width: 10px;
        height: 10px;
      }

      .active {
        color: fb9c1c;
      }

      .chose_muen {
        position: absolute;
        bottom: -70px;
        left: 0;
        background: #fff;
        width: 100%;
        box-shadow: 0 4px 4px #ccc;

        li {
          line-height: 30px;
          text-align: center;
          font-size: 14px;
        }
      }
    }

    .search_input {
      width: 60%;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }

  .history {
    width: 100%;
    padding:0.1rem 0.4rem;
    box-sizing: border-box;
    border-top: 1px solid #eee;

    .h_box {
      width: 100%;
      padding: 0 0.1rem 0 0.2rem;
      box-sizing: border-box;
      border-left: 4px solid #6ed240;
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 14px;
        color: #999;
      }

      img {
        width: 0.3rem;
        height: 0.4rem;
      }
    }

    .h_list {
      width: 100%;
      display: flex;
      margin-top: 0.1rem;
      flex-wrap: wrap;

      li {
        padding: 0 18px;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #F7F8FA;
        border-radius: 20px;
        font-size: 14px;
        color: #333;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
