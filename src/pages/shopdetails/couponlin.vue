<template>
  <div class="contain">
    <div class="box">
      <ul>
        <li v-for="(v,k) in coupons[0]" :key="k">
          <div class="c_price">
            ￥
            <span style="font-size:25px">{{parseFloat(v.amount)}}</span>
          </div>
          <div class="c_produce">
            <h3>满{{parseFloat(v.miniPurchase)}}元可用</h3>
            <div class="c_time">
              <span>有效期至{{v.closingDate}}</span>
              <span
                style="color: #72d140"
                @click="getCoupon(v.amount,v.id)"
                v-if="show[k]"
              >立即使用</span>
              <span style="color: #666" v-else>不可使用</span>
            </div>
            <p>
              仅限
              <span style="color: #72d140">{{user}}</span>使用
            </p>
          </div>
        </li>
      </ul>
      <div class="no" v-if="noCoupons">暂没有优惠券可以使用</div>
    </div>
  </div>
</template>

<script>
import Request from "@/common/js/request";
export default {
  data() {
    return {
      coupons: [],
      page: 1,
      user: "",
      noCoupons: false,
      id:"",
      cid:"",
      dataList:[],
      show:[]
    };
  },
  onLoad(options) {
    this.id=options.id;
    this.cid=JSON.parse(wx.getStorageSync("user")).cid;
    this.dataList=JSON.parse(wx.getStorageSync("good"));
    console.log(this.dataList);

    // this.user = this.$router.history.current.params.name;
    this.myCoupon(this.id);
  },
  computed: {
    jiage() {
      let countlu = 0;
      for (let i = 0; i < this.dataList.length; i++) {
        countlu +=
          Number(this.dataList[i].new) *
          Number(this.dataList[i].number);
      }
      return countlu;
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    myCoupon(id) {
      let datas = {
        cmd: "myCoupon",
        cid: this.cid,
        sid: id,
        pageNow: 1
      };
      Request.postRequest(datas)
        .then(res => {
          console.log(res);
          if (res.result == 0) {
            console.log(res.dataList);
            this.coupons.push(res.dataList);
            console.log(this.coupons);
            if (this.coupons[0].length == 0) {
              this.noCoupons = true;
            } else {
              this.noCoupons = false;
               for(let i=0;i<this.coupons.length;i++){
                 this.coupons[i].closingDate=new Date(this.coupons[i].closingDate).getFullYear()+'/'+(new Date(this.coupons[i].closingDate).getMonth()+1)+'/'+new Date(this.coupons[i].closingDate).getDate();
                 if(jiage>=parseFloat(this.coupons[i].miniPurchase)){
                     this.show[i]=true;
                 }else{
                   this.show[i]=false;
                 }
               }
            }
          } else if (res.result == "2") {
            this.$router.push("/fenghao");
          }
        })
        .catch(res => {});
    },
    getCoupon(state, id) {
      console.log(state, id);
      let you = {};
      you.num = state;
      you.id = id;
      you.sid = this.id;
      localStorage.setItem("you", JSON.stringify(you));
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.contain {
  width: 100%;
  height: 100%;
}

.no {
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

.box {
  width: 100%;
  display: flex;
  background: #f5f5f5;
  padding: 0 20px ;
  box-sizing: border-box;
  position: relative;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;

    li {
      width: 100%;
      height: 3rem;
      background: url('../../../static/img/youhuijuan.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      padding: 0.3rem;
      box-sizing: border-box;
      margin-top: 0.3rem;

      .c_price {
        width: 30%;
        height: 85%;
        text-align: center;
        font-size: 20px;
        padding-top: 15%;
        display: table-cell;
        color: red;
        border-right: 1px dashed #eee;
      }

      .c_produce {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.2rem 0 0.2rem 0.3rem;
        box-sizing: border-box;

        h3 {
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 16px;
          color: #333;
        }

        .c_time {
          width: 100%;
          height: 0.8rem;
          display: flex;
          justify-content: space-between;
          line-height: 0.6rem;

          span {
            font-size: 14px;
            color: #999;
          }
        }
      }

      p {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 14px;
        color: #999;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
