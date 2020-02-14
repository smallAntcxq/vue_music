<template>
  <div class="person">
    <div class="cancel" @click="returnbtn">取消</div>
    <div class="logo">smallAnt</div>
    <div class="personcontent">
      <div class="iphone-password">
        <div class="iphone">
          <i class="iconfont icon-shouji1" />
          <input
            type="text"
            v-model="phone"
            placeholder="请输入手机号"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入手机号'"
            ref="text"
          />
          <div class="remind" v-show="isPhoneFlag">请输入正确的手机号</div>
        </div>
        <div class="password">
          <i class="iconfont icon-mima1" />
          <input
            type="password"
            v-model="password"
            placeholder="请输入密码"
            onfocus="this.placeholder=''"
            onblur="this.placeholder='请输入密码'"
          />
          <div class="remind" v-show="isPasswordFlag">用户名或密码错误</div>
        </div>
        <div class="login">
          <div class="login-btn" @click="phoneLogin();gopersonFlag&&gobackPerson()">登录</div>
          <div class="pass-regist">
            <span class="pass">忘记密码？</span>
            <span class="regist">快速注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myaxios, {
  isRegister,
  isPassword,
  customMess,
  customMessages,
  customeRecord,
  customeFocus,
  customMusicList,
  customMusicListDetail,
  getComment
} from "@/tools/myaxios.js";
import {  mapMutations} from "vuex";
// console.log('beforeLogin')
export default {
  //  computed: {
  //     ...mapGetters([
  //       'loginStatus'
  //     ]),
  //  },
  data: function() {
    return {
      isPhoneFlag: false,
      phone: "",
      password: "",
      isPasswordFlag: false,
      gopersonFlag: false,
      obj: {},
      userId: ""
    };
  },
  async created() {
    // 8.获取用户喜欢歌单数组
    let { data } = await myaxios("GET", customMusicList + this.userId);
    //  console.log(data)
    if (data.code == 200) {
      // console.log(res.data.ids, "我的喜欢歌单数组");
      let arr = [];
      arr = data.ids;
      this.obj = arr.toString();
      // console.log(this.obj)
    }
  },
  methods: {
    // 返回
    returnbtn() {
      this.$router.go(-1);
    },
    // 手机号密码对，返回个人页面
    gobackPerson() {
      this.$router.push("/person");
    },
    // 手机号登录
    //判断手机号的输入是否合法
    isLegalPhone(text) {
      // 正则表达式判断手机号
      let exp = /^1[345789]\d{9}$/;
      return exp.test(text);
    },
    // 3.判断密码是否正确
    isPassword(phone, password) {
      myaxios("GET", isPassword + `phone=${phone}&password=${password}`)
        .then(res => {
          if (res.status == 200) {
            // 密码正确 登录成功
            console.log("密码正确");
            this.gobackPerson();

            // 把vuex中的登录状态改为true
            this.setLoginStatus(true);
            this.getcustomMess();
          }
        })
        .catch(err => {
          if (err) {
            this.isPasswordFlag = true;
            setTimeout(() => {
              this.isPasswordFlag = false;
            }, 3000);
            this.flag = true;
            console.log("密码错误", err);
          }
        });
    },
    //2. 判断手机号是否注册及密码是否正确
    isRegister(phone) {
      myaxios("GET", isRegister + phone).then(res => {
        if (res.status == 200) {
          // 手机号已经注册
          if (res.data.exist !== -1) {
            console.log("手机号已注册");
            // 判断密码是否正确
            this.isPassword(phone, this.password);
          } else if (res.data.exist === -1) {
            console.log("手机号未注册");
          }
        }
      });
    },
    // 1.判断手机格式是否正确
    phoneLogin() {
      if (this.isLegalPhone(this.phone)) {
        console.log("手机格式正确");
        this.isRegister(this.phone);
      } else {
        this.isPhoneFlag = true;
        this.phone = "";
        this.password = "";
        setTimeout(() => {
          this.isPhoneFlag = false;
        }, 3000);
      }
    },
    // 5.获取用户详情
    getcustomMessages(id) {
      myaxios("GET", customMessages + id)
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              // 用户等级
              this.setUserLevel(res.data.level);
              // console.log(res.data.level)
              // 用户详情
              this.setUserMess(res.data.profile);
              console.log(res.data.profile,'用户详情')
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 6.获取用户播放记录
    getcustomeRecord(id) {
      myaxios("GET", customeRecord + id + "&type=0")
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              // console.log(res.data.allData, "播放记录");
              this.addAudioRecord(res.data.allData);
              // console.log(res.data.allData)
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 7.获取用户关注列表
    getcustomeFocus(id) {
      myaxios("GET", customeFocus + id)
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              console.log(res.data.follow, "我的关注");
              this.addMyfocus = res.data.follow
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 9.获取喜欢歌单详情
    getcustomMusicListDetail() {
      myaxios("GET", customMusicListDetail + this.obj)
        .then(res => {
          if (res.status == 200) {
            if (res.data.code == 200) {
              console.log(res.data.songs, "我的喜欢歌单列表");
              this.addMylove(res.data.songs)
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取歌单评论信息
    getMusicListComment(id) {
      myaxios("GET", getComment+id)
        .then(res => {
           console.log(res.data, "歌单评论");    
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 4.获取用户基本信息(new Date().getTime()获取一个毫秒数)
    getcustomMess() {
      myaxios("GET", customMess + new Date().getTime())
        .then(res => {
          if (res.status == 200) {
            // 存取用户Id
            let userId = res.data.profile.userId;
            // console.log(userId)
            if (res.data.code == 200) {
              // 存取用户信息
              let userMess = res.data.profile;
              console.log(userMess);

              // 存入用户头像 昵称
              // localStorage.setItem("avatarUrl", userMess.avatarUrl);
              // localStorage.setItem("nickname", userMess.nickname);

              // 存取用户的id信息
              this.setUserId(userId);
              this.userId = userId;
              // localStorage.setItem("accountId", userId);

              // 获取用户详情
              this.getcustomMessages(userId);
              //获取用户播放记录
              this.getcustomeRecord(userId);
              // 获取用户关注列表
              this.getcustomeFocus(userId);
              //获取我的喜爱歌单详情
              this.getcustomMusicListDetail();
              // 获取歌单评论
              this.getMusicListComment(userId)
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapMutations({
      setLoginStatus: "setLoginStatus",
      setUserId: "setUserId",
      setUserMess: "setUserMess",
      setUserLevel: "setUserLevel",
      addAudioRecord: "addAudioRecord",
      addMylove:'addMylove',
      addMyfocus:'addMyfocus'
    })
  }
};
</script>
<style lang="less" scoped>
// 登录前页面
.person {
  position: relative;
  height: 620px;
  // background-color: grey;
  .cancel {
    color: #fff;
    font-size: 18px;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .logo {
    position: absolute;
    top: 100px;
    left: 50%;
    margin-left: -62px;
    font-size: 30px;
    text-align: center;
    color: white;
  }
  .personcontent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .iphone-password {
      .iphone {
        position: relative;
        .remind {
          color: red;
        }
      }
      .password {
        position: relative;
        .remind {
          color: red;
        }
      }
      .iconfont {
        font-size: 20px;
        position: absolute;
        top: 10px;
        color: #fff;
      }
    }
    input {
      color: #fff;
      text-align: center;
      height: 40px;
      line-height: 40px;
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      background-color: transparent;
      width: 200px;
    }
    input::-webkit-input-placeholder {
      color: #fff;
    }
    input:focus {
      outline: none;
    }
    .login {
      .login-btn {
        width: 200px;
        height: 32px;
        border: 1px solid white;
        color: white;
        text-align: center;
        line-height: 32px;
        margin-top: 20px;
      }
      .pass-regist {
        margin-top: 10px;
        color: white;
        .pass {
          float: left;
        }
        .regist {
          float: right;
        }
      }
    }
  }
}
</style>