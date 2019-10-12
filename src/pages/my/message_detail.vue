<template>
  <div class="list">
    <div class="message">
      <h3>{{msg.adtime}}</h3>
      <iframe :src="msg.url" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import Request from "@/common/js/request";

export default {
  data() {
    return {
      text: "",
      msg: [],
      id:'',
      page:'',
      cid:''
    };
  },
  components: {
  },
  mounted() {
    
  },
  onLoad(options){
    this.cid=JSON.parse(wx.getStorageSync("user")).cid;
    this.id= JSON.parse(options.id).id;
    this.page=JSOn.parse(options.id).page;
    this.init();
  },
  methods: {
    init() {
      let datas = {
        cmd: "infoList",
        cid: cid.cid,
        pageNow: page - 1
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            for (let i = 0; i < res.dataList.length; i++) {
              if (id == res.dataList[i].id) {
                this.msg = res.dataList[i];
                this.text = res.dataList[i].title;
              }
            }
            console.log(this.msg);
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
  height: 100%;
  .message {
    width: 100%;
    height: 100%;

    h3 {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
    }

    iframe {
      width: 100%;
      height: 80%;
    }
  }
}
</style>
