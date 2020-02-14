<template>
  <!-- 登录后页面 -->
  <div class="contain">
    <div class="top">
      <!-- <router-link to="/per/personre"> -->
      <div class="top-login">
        <div class="image">
          <img :src="this.userMess.avatarUrl" alt />
        </div>
        <div class="data">
          <div class="data-login" @click="goLogin" v-if="!this.loginStatus" ref="login">立即登录</div>
          <div class="data-login" v-if="this.loginStatus">{{this.userMess.nickname}}</div>
          <div class="data-sync">
            账户信息，购买记录云同步
            <i class="iconfont icon-dengji" />
            Lv.{{this.userLevel}}
          </div>
          <div class="data-sync" @click="deleteUser()" v-if="this.loginStatus">退出登录</div>
        </div>
      </div>
      <!-- </router-link> -->
      <div class="top-img">
        <img src="@/assets/images/vip.png" class="vip-image" />
      </div>
    </div>
    <div class="text-container">
      <div class="account">
        <div class="personSignature">个人签名:</div>
        <div class="signature">{{this.userMess.signature}}</div>
      </div>
      <div class="balance">
        <div class="balance-top">
          <div class="rechargechang">个人信息:</div>
        </div>
        <div class="balance-bottom">
          <div>
            <div>性别</div>
            <div>{{this.userMess.gender==1?'男':'女'}}</div>
          </div>
          <div>
            <div>生日</div>
            <div>{{this.userMess.birthday|dateFormat("YYYY-MM-DD")}}</div>
          </div>
          <div>
            <div>注册时间</div>
            <div>{{this.userMess.createTime|dateFormat("YYYY-MM")}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-container">
      <div class="bottomc-msg" @click="goAudioRecord">
        <div class="bottomc-msgline">
          <div>
            <img src="@/assets/images/record.png" />
          </div>
          <div class="bottomc-msgtext">最近播放</div>
        </div>
        <div>
          <img src="@/assets/images/Greate.png" />
        </div>
      </div>
      <div class="bottomc-msg" @click="goMylove">
        <div class="bottomc-msgline">
          <div>
            <img src="@/assets/images/bookList.png" />
          </div>
          <div class="bottomc-msgtext">我的喜爱</div>
        </div>
        <div>
          <img src="@/assets/images/Greate.png" />
        </div>
      </div>
      <div class="bottomc-msg">
        <div class="bottomc-msgline">
          <div>
            <img src="@/assets/images/comment.png" />
          </div>
          <div class="bottomc-msgtext">我的评论</div>
        </div>
        <div>
          <img src="@/assets/images/Greate.png" />
        </div>
      </div>
      <div class="bottomc-msg">
        <div class="bottomc-msgline">
          <div>
            <img src="@/assets/images/Collection.png" />
          </div>
          <div class="bottomc-msgtext">我的收藏</div>
        </div>
        <div>
          <img src="@/assets/images/Greate.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["userMess", "loginStatus", "userLevel"])
  },
  data: function() {
    return {};
  },
  methods: {
    // 密码正确后跳转路由
    goLogin() {
      this.$router.push("beforeLogin");
      // console.log(this.loginStatus)
    },
    // 退出登录
    deleteUser() {
      // console.log(this.loginStatus,'xxxxxxxxxx')
      this.setLoginStatus(false);
      this.deleteUserMess();
      this.deleteUserLevel();
    },
    // 跳转到播放记录页面
    goAudioRecord() {
      this.$router.push("/person/audioRecord");
    },
    // 跳转到我的喜爱
    goMylove() {
      this.$router.push("/person/mylove");
    },

    ...mapMutations({
      deleteUserMess: "deleteUserMess",
      setLoginStatus: "setLoginStatus",
      deleteUserLevel: "deleteUserLevel"
    })
  },
  watch: {
    "this.loginStatus": async function(newVal) {
      // console.log(newVal,'xxxxxx')
      if (newVal) {
        this.$refs.login.style.htmlText = "登录成功";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.contain {
  font-size: 14px;
  color: #fff;
  padding-bottom: 100px;
  // top
  .top {
    background-image: url("../assets/images/bg.jpg");
    height: 220px;
    background-size: 100% 100%;
    position: relative;
  }
  .top-login {
    position: absolute;
    left: 16px;
    top: 50px;
    display: flex;
    flex-direction: row;

    img {
      height: 26px;
      padding-top: 5px;
    }
    .data-sync {
      font-weight: lighter;
      font-size: 12px;
      margin-top: 6px;
      .icon-dengji {
        font-size: 20px;
        margin-left: 40px;
      }
    }
  }
  .vip-image {
    height: 80px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .image {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid rgb(63, 62, 62);
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
  }
  .data {
    font-size: 20px;
    color: white;
    margin-left: 14px;
    padding-top: 8px;
  }
  // 会员中心部分
  .text-container {
    .account {
      align-items: center;
      padding: 10px 20px;
      flex-direction: row;
      justify-content: space-between;
      border: 1px solid rgba(144, 144, 144, 0.1);
      .personSignature{
        font-size: 16px;
        margin-left: -20px;
      }
      .signature {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }
    }

    .balance {
      border: 1px solid rgba(144, 144, 144, 0.1);
      margin: auto;
      display: flex;
      padding: 10px 20px 0;
      flex-direction: column;
      box-shadow: 0px 10px 10px -15px #333;

      .balance-top {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        .rechargechang {
          font-size: 16px;
          margin-left: -20px;
        }
      }
      .balance-bottom {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        margin-top: 10px;
        text-align: center;
        padding-bottom: 10px;
      }
    }
  }
  .bottom-container {
    margin-top: 8px;
    display: flex;
    flex-direction: column;

    img {
      width: 20px;
    }

    .bottomc-msg {
      margin-top: 10px;
      padding: 10px 30px;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .bottomc-msgline {
      display: flex;
      flex-direction: row;
    }
    .bottomc-msgtext {
      margin-left: 16px;
      padding-top: 2px;
    }
  }
}
</style>