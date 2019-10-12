<template>
  <div class="list">
    <!-- <main-header :text="text" @back="back"></main-header> -->
    <div class="box" v-if="ayin==false">
      <van-radio-group v-model="choiced" @change="radiol">
        <div class="a_list" v-for="(item,index) in dataList[0]" :key="index">
          <div class="user">
            <span>{{item.receiverName}}</span>
            <span style="margin-left: 0.3rem;">{{item.mobile|hideMiddle}}</span>
          </div>
          <p>{{item.province}}{{item.city}}{{item.town}}{{item.addr}}</p>
          <div class="choice">
            <van-radio :name="item.id" checked-color="#07c160">设为默认</van-radio>
            <div class="editor">
              <div class="del" @click.stop="deladdress(item.id,index)">删除</div>
              <div class="modify" @click.stop="updateAddress(item)">编辑</div>
            </div>
          </div>
        </div>
      </van-radio-group>
      <div class="add" @click.stop="goAdd">添加地址</div>
    </div>
    <div class="box" v-else>
      <div class="wuadd">暂无收货地址</div>
      <div class="add" @click.stop="goAdd">添加地址</div>
    </div>
  </div>
</template>

<script>
// import MainHeader from "@/components/component/mainHeader";
import Request from "@/common/js/request";
export default {
  data() {
    return {
      text: "收货地址",
      radio: 0,
      pageNow: 1,
      dataList: [],
      ayin: false,
      choiced: "",
      type: 0,
      cid: ""
    };
  },
  mounted() {
    this.cid = JSON.parse(wx.getStorageSync("user")).cid;
    if (this.cid != "") {
      this.address();
    }
  },
  methods: {
    radiol(id) {
      if (this.type == 0) {
        this.type = 1;
        return false;
      }
      this.choiced = id;
      let add = {
        cmd: "setDefaultAddress",
        id: id
      };
      Request.postRequest(add)
        .then(res => {
          console.log(res);
          if (res.result == "0") {
            wx.showToast({
              title: "设置成功"
            });
            wx.setStorageSync("add", JSON.stringify(id));
          }
        })
        .catch(res => {});
    },
    back() {
      // this.$router.push("/person");
    },
    goAdd() {
      this.$router.push("/pages/address/addaddress");
    },
    updateAddress(item) {
      console.log(item);
      wx.setStorageSync("adduser", JSON.stringify(item));
      setTimeout(() => {
        wx.navigateTo({
          url: "/pages/address/eaditeaddress"
        });
      }, 500);
    },
    address() {
      console.log("地址列表");
      let add = {
        cmd: "addressList",
        cid: this.cid,
        pageNow: this.pageNow
      };
      Request.postRequest(add)
        .then(res => {
          console.log(res);
          if (res.result == "0") {
            this.dataList.push(res.dataList);
            console.log(this.dataList[0]);
            for (let i in this.dataList[0]) {
              if (this.dataList[0][i].isDefault == "1") {
                this.choiced = this.dataList[0][i].id;
                wx.setStorageSync(
                  "add",
                  JSON.stringify(this.dataList[0][i].id)
                );
              }
            }
            if (this.dataList[0].length > 0) {
              this.ayin = false;
            } else {
              this.ayin = true;
            }
          }
        })
        .catch(res => {});
    },
    deladdress(id, ind) {
     
      let self=this;
      wx.showModal({
        title: "删除地址",
        content: "是否要删除该地址？",
        success(res) {
          if (res.confirm) {
            console.log(id);
            let deladdress = {
              cmd: "deleteAddress",
              id: id
            };
             console.log(id,ind,self.dataList)
            Request.postRequest(deladdress)
              .then(res => {
                console.log(res);
                if (res.result == "0") {
                  self.dataList.splice(ind, 1);
                }
              })
              .catch(res => {});
          }
        }
      });
    }
  }
};
</script>
<style>
page {
  min-height: 100%;
  background: #f5f5f5;
}
</style>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list {
  width: 100%;

  .box {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    box-sizing: border-box;

    .a_list {
      width: 100%;
      display: flex;
      flex-direction: column;
      background: #fff;
      border-radius: 6px;
      font-size: 14px;
      color: #333;
      margin-top: 0.4rem;
      padding: 0.3rem;
      box-sizing: border-box;

      .user {
        width: 100%;
        display: flex;
        align-items: center;
      }

      p {
        width: 100%;
        color: #999;
        margin-top: 0.4rem;
        line-height: 18px;
      }

      .choice {
        width: 100%;
        margin-top: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .editor {
          flex: 1;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;

          .del {
            height: 0.7rem;
            line-height: 0.7rem;
            padding: 0 0.2rem;
            background: #72D141;
            font-size: 14px;
            color: #fff;
            border-radius: 4px;
          }

          .modify {
            height: 0.7rem;
            line-height: 0.7rem;
            padding: 0 0.2rem;
            border: 1px solid #999;
            font-size: 14px;
            color: #999;
            border-radius: 4px;
            margin-right: 0.4rem;
          }
        }
      }
    }

    .wuadd {
      text-align: center;
      font-size: 18px;
      position:fixed;
      top:50%;
      left:50%;
      transform translate(-50%,-50%);
    }

    .add {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #72D141;
      position: fixed;
      left: 0;
      bottom: 0;
      font-size: 14px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
