<template>
  <div class="list" @click.stop>
    <h3 v-if="title">{{title}}</h3>
    <ul class="list-box">
      <li v-for="(v,k) in recommendList" :key="k" @click.stop="detail(v.id)" v-if="k<3">
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
    },
    direct:{
      type:Number,
       default:0

    }
  },
  data() {
    return {
      cid: ""
    };
  },
  created() {},
  onLoad() {
    this.cid = JSON.parse(wx.getStorageSync("user")).cid;
  },
  methods: {
    detail(id) {
       console.log(id);
       let obj={}
       obj.id=id;
      if(this.direct==100){
        obj.type=1;
          wx.navigateTo({
        url: "/pages/pintuan/gooddetailspin?id=" + JSON.stringify(obj)
      });
      }else if(this.direct==200){
        obj.type=2;
        wx.navigateTo({
        url: "/pages/Good/gooddetials?id=" + JSON.stringify(obj)
      });
      }else{
         obj.type=0;
            wx.navigateTo({
        url: "/pages/Good/gooddetials?id=" + JSON.stringify(obj)
      });
      }
    },
    //购物车图标
    shopcart(v) {
      if (this.cid ==undefined) {
        wx.showModal({
          title: "温馨提醒！",
          content: "你还没有绑定手机号,请先绑定手机号,确认信息",
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: "/pages/bind/bindtell"
              });
            }
          }
        });
      } else {
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
                title: "添加购物车成功",
                icon:'none'
              });
              this.$api.getnum(this.cid)
              // this.gounum();
              // this.donghua = false;
            }
          })
          .catch(res => {});
      }
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
