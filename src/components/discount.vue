<template>
  <div class="list">
    <h3 v-if="title">{{title}}</h3>
    <ul class="list-box">
      <li v-for="(v,k) in recommendList" :key="k" @click.stop="detail(v)" v-if="k<3">
        <img :src="v.image" alt lazy-load />
        <div class="list-content">
          <div class="list-top">
            <div class="list-title">{{v.name}}</div>
            <div class="list-produce">{{v.text}}</div>
          </div>
          <div class="list-price">
            <div class="list-left">
              <span>￥{{v.price}}</span>
              <s>￥{{v.originalPrice}}</s>
            </div>
            <img src="/static/img/gouwuche2.png" alt @click.stop="shopcart(v)" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Request from "@/common/js/request";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    recommendList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      cid: ""
    };
  },
  created() {},
  mounted() {
    this.cid=JSON.parse(wx.getStorageSync("user")).cid;
  },
  methods: {
    detail(k) {
      console.log(k.id);
      wx.navigateTo({
        url: "../Good/gooddetials?id="+k.id
      });
      // let ID = {};
      // ID.id = id;
      // wx.setStorageSync("first-shopID", JSON.stringify(ID));
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
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  // margin-top: 0.5rem;

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
</style>
