<template>
  <div class="tenants-box" ref="box">
    <div class="tenants-zi">
      <div class="Qr-code">
        <div>
          <img src="/static/img/erweima.png" alt />
          <p>{{shopjie}}</p>
        </div>
      </div>
      <div class="steps" ref="list">
        <h3>入驻步骤:</h3>
        <rich-text :nodes="txt" ></rich-text>
      </div>
    </div>
  </div>
</template>

<script>
// import linUrl from "@/components/webview";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      shopjie: "",
      txt: "",
    };
  },
  components: {
    // MainHeader
    // linUrl
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: "商家入驻"
    });
  },
  mounted() {
    this.getshop();
    // this.dom = this.$refs.box.offsetHeight - 270
  },
  methods: {
    getshop() {
      let goCarlist = {
        cmd: "businessEntry"
      };
      Request.postRequest(goCarlist)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            this.shopjie = res.alt;
            this.ershop = res.qrCode;
            this.txt = this.escape2Html(res.content);
          }
        })
        .catch(res => {
          // Toast("获取失败");
        });
    },
    escape2Html(str) {
      var s = "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "'");
      s = s.replace(/&quot;/g, '"');
      s = s.replace(/<br\/>/g, "\n");
      return s;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.tenants-box {
  width: 100%;
  height: 100%;
}

.tenants-zi {
  width: 100%;
  height: 100%;
  padding: 10px 10px 0;
  box-sizing: border-box;
  overflow: hidden;

  .Qr-code {
    height: 200px;

    div {
      width: 200px;
      margin: 30px auto;
      text-align: center;

      img {
        width: 200rpx;
        height: 200rpx;
      }
    }
  }

  .steps {
    width: 100%;
    // height: 100%;
    padding: 0 0.1rem;
    box-sizing: border-box;

    h3 {
      padding-bottom: 5px;
    }
  }
}
</style>
