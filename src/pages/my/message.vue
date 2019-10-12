<template>
  <div class="list" >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="beginLoading"
      v-if="showMsg"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="msg-box">
          <ul class="msg">
            <li v-for="(v,k) in msg" :key="k" @click="goDetail(v,v.id)">
              <div class="xiaoxian">
                <img src="/static/img/xiaoxi01.png" alt />
                <b class="xiaob" v-if="v.read==0"></b>
              </div>
              <div class="msg-right">
                <div class="msg-top">
                  <h3>{{v.title}}</h3>
                  <span>{{v.adtime}}</span>
                </div>
                <div class="msg-bottom">
                  <p>{{v.content}}</p>
                  <img src="/static/img/delete.png" alt @click.stop="del(k,v.id)" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-pull-refresh>
    </van-list>
    <div class="systom" v-if="show">暂没有系统消息</div>
  </div>
</template>

<script>
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "消息",
      loading: false,
      finished: false,
      isLoading: false,
      totalPage: 2,
      page: 1,
      list: [],
      msg: [],
      show: false,
      cid:''
    };
  },
  components: {
  },
  mounted() {
    this.cid=JSON.parse(wx.getStorageSync('user')).cid;
     this.beginLoading(); 
  },
  computed: {
    showMsg() {
      return this.msg.length;
    }
  },
  methods: {
    onRefresh: function() {
     
    },
    beginLoading: function() {
      let datas = {
        cmd: "infoList",
        cid: this.cid,
        pageNow: this.page
      };
         Request.postRequest(datas)
        .then(res => {
          if (res.result == 0) {
            console.log(res.dataList);
            if (this.page <= res.totalPage) {
              if (res.dataList.length == 0) {
                this.show = true;
              } else {
                this.show = false;
                for (let i = 0; i < res.dataList.length; i++) {
                  this.msg.push(res.dataList[i]);
                }
                this.page++;
                // 加载状态结束
                this.loading = false;
              }
            } else {
              this.loading = false;
              this.finished = true;
            }
          }
        })
        .catch(res => {});
   
    },
    back() {
      // this.$router.push("/");
      // localStorage.removeItem("Messageurl");
      // this.$router.push("/" + this.Message);
    },
    del(index, id) {
     
     
    },
    goDetail(v, id) {
    
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.systom {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #333;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 25;
}

.list {
  width: 100%;
  height: 100%;

  .msg-box {
    width: 100%;

    .msg {
      width: 100%;
      padding: 0 0.4rem;
      box-sizing: border-box;
      border-top: 1px solid #eee;
      margin-top: 72px;

      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .xiaoxian {
          position: relative;
          width: 15%;
          height: 15%;

          img {
            width: 100%;
            height: 100%;
          }

          .xiaob {
            position: absolute;
            right: -10px;
            top: 0px;
            background: red;
            width: 7px;
            height: 7px;
            border-radius: 50%;
          }
        }

        .msg-right {
          width: 85%;
          height: 1.3rem;
          padding: 0 0 0 0.3rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .msg-top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;

            h3 {
              font-size: 15px;
            }
          }

          .msg-bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #333;

            p {
              width: 80%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            img {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
