<template>
  <div class="get-money">
    <ul>
      <li>
        <h4>发行卡:</h4>
        <input type="text" placeholder="列如:中国银行" v-model="cardbank" />
      </li>
      <li>
        <h4>持卡人:</h4>
        <input type="text" placeholder="请输入持卡人姓名" v-model="name" />
      </li>
      <li>
        <h4>提现账户：</h4>
        <input type="text" placeholder="请输入提现账户" v-model="cardnumber" />
      </li>
    </ul>
    <div class="money-info">
      <h4>提现金额：</h4>
      <div>
        <span>￥</span>
        <input type="number" placeholder="输入提现金额" v-model="money" />
      </div>
      <p>
        本次提现扣除手续费:
        <span>￥10元</span>
      </p>
      <h4>备注：</h4>
      <div>
        <input type="text" placeholder="请输入备注信息" v-model="remark" />
      </div>
    </div>
    <div class="end"></div>
    <div class="button" @click="sub">
      <span>申请提现</span>
    </div>
  </div>
</template>

<script>
//import 《组件名称》 from '《组件路径》';
import Request from "@/common/js/request";
import Reg from "@/common/js/reg";
export default {
  data() {
    return {
      cardbank: "",
      name: "",
      cardnumber: "",
      money: "",
      remark: "",
      leaderid:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  onLoad() {
      wx.setNavigationBarTitle({
      title: "申请提现"
    });
    this.leaderid=JSON.parse(wx.getStorageSync('leaderInfo')).leaderid;
    console.log(this.leaderid);
    if(wx.getStorageSync('carInfo')){
      let carInfo=JSON.parse(wx.getStorageSync('carInfo'));
      this.cardbank=carInfo.cardbank;
      this.cardnumber=carInfo.cardnumber;
      this.name=carInfo.name;
    }
  },
  methods: {
    sub() {
      console.log(1);
      if (this.cardbank == "") {
        wx.showToast({
          title: "请输入银行类别",
          icon:'none'
        });
        return false;
      } else if (this.name == "") {
        wx.showToast({
          title: "请输入持卡人姓名",
          icon:"none"
        });
      } else if (this.cardnumber == "") {
        wx.showToast({
          title: "请输入银行卡号"
        });
      } else if (this.money == "") {
        wx.showToast({
          title: "请输入提现金额",
          icon:'none'
        });
      } else if (!this.isHan(this.cardbank)) {
        wx.showToast({
          title: "请输入正确的银行类别",
          icon:"none"
        });
      }else if (!this.isHan(this.name)) {
        wx.showToast({
          title: "请输入正确的持卡人姓名"
        });
      }
      // else if (!this.bankCardValid(this.cardnumber)) {
      //   wx.showToast({
      //     title: "请输入正确的银行卡号",
      //     icon:"none"
      //   });
      // }
      else if(this.money<0){
         wx.showToast({
          title: "请输入正确的金额",
          icon:"none"
        });
      }else{
        let parmas={
          cmd:'subWithdraw',
          leaderid:this.leaderid,
          bankname:this.cardbank,
          name:this.name,
          account:this.cardnumber,
          amount:this.money,
          remark:this.remark
        }
        Request.postRequest(parmas).then(res=>{
            if(res.result==0){
              let carInfo={};
              carInfo.cardbank=this.cardbank;
              carInfo.cardnumber=this.cardnumber;
              carInfo.name=this.name;
              wx.setStorageSync("carInfo", JSON.stringify(carInfo));                
               console.log(res);
              this.$router.replace("/pages/my/tuanzhangcenter/tixianshenhe")
            }else{
              wx.showToast({
                title:res.resultNote
              })
            }
        }).catch(err=>{})
      }
    },
    isHan(value) {
      var re = new RegExp(/^[\u4e00-\u9fa5]+$/);
      if (re.test(value)) {
        return true;
      } else {
        return false;
      }
    },
      // 银行卡号
  bankCardValid(value) {
    var re = new RegExp(/^([1-9]{1})(\d{15}|\d{17}|\d{18})$/);
    if (re.test(value)) {
        return true;
    } else {
      return false;
    }
  }
  },
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  befopxount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  //生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>
<style scoped lang="stylus">
h4 {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.get-money {
  padding: 0 15px;

  ul {
    li {
      display: flex;
      align-items: center;
      height: 45px;
      box-sizing: border-box;

      input {
        flex: 1;
        height: 45px;
        border-bottom: 1px solid #F0F0F0;
        font-size: 13px;
        color: #999;
        padding-left: 20px;
      }

      h4 {
        width: 90px;
      }
    }
  }

  .money-info {
    div {
      border-bottom: 1px solid #E7E7E7;
      position: relative;

      span {
        font-size: 18px;
        font-weight: bolder;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }

      input {
        height: 45px;
        font-size: 14px;
        color: #999999;
        padding-left: 30px;
      }
    }

    p {
      color: #999999;
      font-size: 14px;
      line-height: 25px;
    }

    h4 {
      margin: 20px 0;
    }
  }
}

.end {
  height: 50px;
}
.button{
  width:100%;
  padding: 10px 5px;
  box-sizing: border-box;
 
}
.button span{
  display: block;
  height: 45px;
  background: #72D241;
  border-radius: 6px;
  color:#fff;
  line-height: 45px;
  text-align: center;
  font-size: 17px;
}
</style>