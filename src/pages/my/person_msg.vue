<template>
  <div class="contain">
    <div class="box">
      <ul>
        <li style="border-bottom: 10px solid #eee;">
          <span>修改头像</span>
          <div class="modify_right" @click="upload">
              <img :src="headImage" alt style="border-radius: 50%;" v-if="headImage!=''" />
              <img src="/static/img/touxiang.png" alt v-else />
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="/static/img/jinru02.png"
              alt
            />
          </div>
        </li>
        <li>
          <span>昵称</span>
          <div class="modify_right">
            <input type="text" placeholder="请输入昵称" v-model="username" @blur="bao" />
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="/static/img/jinru02.png"
              alt
            />
          </div>
        </li>
        <li @click="goModify">
          <span>绑定手机号</span>
          <div class="modify_right">
            <span>{{mobile}}</span>
            <img
              style="width:0.3rem;height:0.4rem;margin-left:0.3rem;"
              src="/static/img/jinru02.png"
              alt
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/mainHeader";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      imgs: "",
      username: "", //昵称
      mobile: "", //手机号
      headImage: "", //头像
      url: ""
    };
  },
  components: {
    MainHeader
  },
  onLoad() {
    this.cid = JSON.parse(wx.getStorageSync("user")).cid;
    this.gouserInfo();
  },
  mounted() {},
  methods: {
    back() {
      this.$router.push("/person");
    },
    upload() {
      let self=this;
      wx.chooseMessageFile({
        count: 1,
        type: "image",
        size:'5000',
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log(res)
          self.headImage = res.tempFiles[0].path;
        }
      });
    },
    goModify() {
      this.$router.go(-1);
    },
    gouserInfo() {
      this.useryin = true;
      let goCarlist = {
        cmd: "myInfo",
        cid: this.cid
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.username = res.nickName; //昵称
            this.mobile =`${res.mobile.slice(0, 3)}****${res.mobile.slice(-4)}`; //手机号
            this.headImage = res.headImage; //头像
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    bao() {
      let goCarlist = {
        cmd: "updateMyInfo",
        cid: this.cid,
        headImage: this.url,
        nickName: this.username
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
             wx.showToast({
               title:'修改成功'
             })
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {
          wx.showToast({
            title:'获取失败'
          })
        });
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-top: 1px solid #eee;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #333;
        padding: 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        .modify_right {
          display: flex;
          justify-content: space-between;
          align-items: center;

          img {
            width: 1.8rem;
            height: 1.8rem;
          }

          input {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
