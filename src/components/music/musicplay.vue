<template>
  <!-- 整个播放器 -->
  <div class="player" ref="player">
    <!-- 全屏显示 -->
    <transition name="normal">
      <div class="normal-player" v-if="fullScreen">
        <div class="backimg">
          <i class="iconfont icon-zuojiantou" @click="returnbtn()" />
          <div class="backimg-wenzi">音乐播放</div>
        </div>
        <!-- 歌手名 歌曲名显示 -->
        <div class="basemsg">
          <div>{{songname}}</div>
          <div>{{playname}}</div>
        </div>
        <!-- cd旋转 -->
        <div class="contentWrapper">
          <div class="circleWrapper" @click="controlLyric" v-show="!LyricFlag">
            <div class="bigcircle">
              <div class="smallcircle" :class="revolve">
                <img :src="this.songimg" alt />
              </div>
            </div>
          </div>
          <div class="LyricContent" @click="controlLyric" v-show="LyricFlag">
            <ul class="songWordList" id="songWordList">
              <li
                v-for="(item,index) in this.lrcObjArr"
                class="lrc-item"
                :key="index"
              >{{item.content}}</li>
            </ul>
          </div>
        </div>

        <div class="bottomcontent">
          <!-- 进度条歌曲 -->
          <div class="progress-wrap">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-wrap-bar">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <!-- 播放按钮操作 -->
          <div class="buttonoperator">
            <div class="mode-Wenzi" v-show="modeflag" ref="modeWenzi"></div>
            <div class="button" @click="changeMode()">
              <i :class="iconmode" />
            </div>
            <div class="button" @click="pre()">
              <i class="iconfont icon-shangyishou-yuanshijituantubiao" />
            </div>
            <div class="button" @click="play()">
              <i :class="iconchange" />
            </div>
            <div class="button" @click="next()">
              <i class="iconfont icon-xiayishou-yuanshijituantubiao" />
            </div>
            <div class="button" @click="like()">
              <i class="iconfont icon-xihuan" ref="like" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- mini显示 -->
    <transition name="mini">
      <div class="mini-player" v-if="!fullScreen" @click="close" ref="wrapper">
        <div class="playlists" v-if="flag">
          <scroll class="wrapper" :data="this.playList" :pulldown="pulldown">
            <!-- 歌曲列表 -->
            <ul class="musicLists">
              <li
                v-for="(item,index) in playList"
                :key="item.index"
                @click.stop="setId(item.id,index)"
              >
                {{item.name}}
                <div class="content">{{item.ar[0].name}}--{{item.al.name}}</div>
              </li>
            </ul>
          </scroll>
        </div>
        <div class="miniinfo">
          <div class="songimg" :class="revolve">
            <img :src="songimg" alt />
          </div>
          <div class="songinfo">
            <div class="info">{{songname}}</div>
            <div class="info">{{playname}}</div>
          </div>
          <div class="icon">
            <i @click.stop="play()" :class="iconchange"></i>
            <i @click.stop="playlist()" class="iconfont icon-bofangliebiao1"></i>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="musicUrl" @timeupdate="passtime" @ended="end" autoplay></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations} from "vuex";
import "@/assets/iconfont/iconfont.css";
import Scroll from "../scroll/scroll.vue";
import myaxios, {
  musicPlay,
  songDetails,
  getMusicWords,
  customLike
} from "@/tools/myaxios.js";
import progressBar from "@/components/progressBar/progressBar.vue";

export default {
  computed: {
    ...mapGetters([
      "playing",
      "playList",
      "id",
      "currentSong",
      "currentIndex",
      "mode",
      "sequenceList"
    ]),
    // 播放暂停图标切换
    iconchange() {
      return this.playing ? "iconfont icon-zanting" : "iconfont icon-bofang1";
    },
    // 播放模式图标切换
    iconmode() {
      return this.mode === 0
        ? "iconfont icon-shunxubofang"
        : this.mode === 1
        ? "iconfont icon-xunhuanbofang"
        : "iconfont icon-suijibofang01";
    },
    // 图片旋转
    revolve() {
      return this.playing ? "play" : "play pause";
    },
    // 进度条百分比
    percent() {
      return this.currentTime / this.duration;
    }
  },
  data: function() {
    return {
      fullScreen: false,
      musicUrl: "",
      playname: "",
      songname: "",
      songimg: "",
      duration: 0,
      flag: false,
      modeflag: false,
      LyricFlag: false,
      pulldown: true,
      lrcObjArr: [],
      currentTime: 0,
      lrcindex: 0,
      marginTop: 230,
      count: 1
    };
  },
  methods: {
    returnbtn() {
      this.fullScreen = !this.fullScreen;
      // console.log(this.$route.path)
      if (
        this.$route.path == "/" ||
        this.$route.path == "/singer" ||
        this.$route.path == "/ranking" ||
        this.$route.path == "/person"
      ) {
        this.$refs.player.style.bottom = "52px";
        // console.log('1111')
      } else if (
        this.$route.path == "/music/recommondlist" ||
        this.$route.path == "/Singer/playerDetail"
      ) {
        this.$refs.player.style.bottom = "0px";
        // console.log('2222')
      }
    },
    // 打开normal-player
    close() {
      this.fullScreen = true;
      // this.$emit("fun", "子组件改变了");
      this.$refs.player.style.bottom = "0px";
      // var s = document.getElementById("tabbar");
    },
    // 控制歌曲播放
    play() {
      this.setPlayingState(!this.playing);
    },
    // 是否显示播放列表
    playlist() {
      this.flag = !this.flag;
      if (this.flag) {
        this.noScroll();
      } else {
        this.canScroll();
      }
    },
    // 把id存入vuex
    setId(id, index) {
      this.$store.commit("setId", id);
      // 点击后修改vuex中的索引
      this.setCurrentIndex(index);
    },
    // 对播放时间进行数据处理
    format(interval) {
      // 向下取整
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = (interval % 60).toString().padStart(2, "0");
      return `${minute}:${second}`;
    },
    // 初始化歌词的位置和索引
    reset() {
      this.lrcindex = 0;
      this.marginTop = 230;
    },
    // 上一首
    pre() {
      this.reset();
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index);
      // console.log('xxxxxxxxxxx',index)
    },
    // 下一首
    next() {
      this.reset();
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      // console.log('xxxxxxxxxxx',index)
      // console.log(this.lrcObjArr)
    },
    // 收藏
    like() {
      // console.log('xxxx')
      this.count++;
      if (this.count % 2 == 0) {
        this.$refs.like.style.color = "red";
        console.log(this.id)
        myaxios("GET", customLike + this.id)

      } else {
        this.$refs.like.style.color = "#ffcd32";
        myaxios("GET", customLike + this.id+"&like=false")

      }
    },
    // 自动播放下一首
    end() {
      // 1:循环播放
      if (this.mode === 1) {
        this.loop();
      } else {
        this.next();
      }
    },
    // 单曲循环
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.reset();
    },
    // 播放模式的有关函数
    // 随机播放函数封装
    Random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    RandomArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        let j = this.Random(0, i);
        let t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
      }
      return arr;
    },
    // 利用es6把当前歌在顺序的索引改成在随机列表中的索引
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    // 改变播放模式
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      console.log(mode);
      let songlist = null;
      // 0顺序,1循环,2随机
      if (mode === 2) {
        this.modeflag = true;
        this.$refs.modeWenzi.innerText = "随机播放";
        setTimeout(() => {
          this.modeflag = false;
        }, 2000);
        songlist = this.RandomArr(this.sequenceList);
        // 直接使用
        this.setPlayList(songlist);
        console.log("随机播放");
        console.log(songlist);
      } else if (mode === 1) {
        this.modeflag = true;
        this.$refs.modeWenzi.innerText = "单曲循环";
        songlist = this.sequenceList;
        setTimeout(() => {
          this.modeflag = false;
        }, 2000);
        this.setPlayList(songlist);
        console.log("循环播放");
        console.log(songlist);
      } else {
        this.modeflag = true;
        this.$refs.modeWenzi.innerText = "列表循环";
        setTimeout(() => {
          this.modeflag = false;
        }, 2000);
        songlist = this.sequenceList;
        this.setPlayList(songlist);
        console.log("顺序播放");
        console.log(songlist);
      }
      this.resetCurrentIndex(songlist);
    },
    // 播放时间与总时间
    passtime(event) {
      this.currentTime = event.target.currentTime;
      this.duration = event.target.duration;
    },
    // 进度条组件派发出来的百分比改变事件
    onProgressBarChange(persent) {
      const currentTime = this.duration * persent;
      this.$refs.audio.currentTime = currentTime;
    },

    // 获取歌词
    // 提取时间和歌词(对歌词格式化)
    parseLrc(lrcString) {
      var lrcStringArr = lrcString.split("\n");
      // console.log(lrcStringArr);
      for (var i = 0; i < lrcStringArr.length; i++) {
        var line = lrcStringArr[i].split("]");
        var time = this.parseTime(line[0].slice(1, line[0].length));
        var content = line[1];
        // 错误处理，某一行不对，跳过这一行
        if (content == undefined || isNaN(time)) continue;
        this.lrcObjArr.push({
          time: time,
          content: content
        });
      }
      return this.lrcObjArr;
    },
    // 把字符串时间换算成毫秒
    parseTime(timeString) {
      var timeStringArr = timeString.split(":");
      var min = parseInt(timeStringArr[0]);
      var s = parseFloat(timeStringArr[1]);
      var totalTime = (min * 60 + s) * 1000;
      return parseInt(totalTime);
    },
    // 控制歌词是否显示
    controlLyric() {
      this.LyricFlag = !this.LyricFlag;
    },

    ...mapMutations({
      setPlayingState: "setPlayState",
      setCurrentIndex: "setCurrentIndex",
      setPlayMode: "setPlayMode",
      setPlayList: "setPlayList"
    })
  },
  async created() {
    // 获取mp3播放地址
    if (this.currentSong.id) {
      let { data } = await myaxios("GET", musicPlay + this.currentSong.id);
      // console.log(data.data[0]);
      this.musicUrl = data.data[0].url;
      // console.log(data.data[0].url);

      // 获取歌曲详情接口
      if (this.id) {
        let { data: data1 } = await myaxios("GET", songDetails + this.id);
        // console.log(data1);
        this.playname = data1.songs[0].name;
        this.songname = data1.songs[0].ar[0].name;
        this.songimg = data1.songs[0].al.picUrl;

        // 获取歌词接口
        let { data: data2 } = await myaxios("GET", getMusicWords + this.id);
        if (data2.lrc.lyric) {
          this.parseLrc(data2.lrc.lyric);
        }
        // console.log(this.parseLrc(data2.lrc.lyric));
      }
    }
  },
  // 点击弹框之外的部分，弹框消失
  mounted() {
    document.addEventListener("click", e => {
      if (e.target.className != "playlists") {
        this.flag = false;
        if (this.flag) {
          this.noScroll();
        } else {
          this.canScroll();
        }
      }
    });
  },
  watch: {
    "$route.path": function(newVal) {
      var routerArr = [
        "/music/recommondlist",
        "/Singer/playerDetail",
        "/music/search",
        "/music/searchlist",
        "/person/audioRecord",
        "/person/mylove",
        "/comment/recommondlist"
      ];
      if (routerArr.includes(newVal)) {
        this.$refs.player.style.bottom = "0px";
      } else if (newVal == "/beforeLogin") {
        this.$refs.player.style.bottom = "-50px";
      } else {
        this.$refs.player.style.bottom = "52px";
      }
    },
    // 控制可以点击切换歌曲
    "$store.getters.id": async function(newVal) {
      let { data } = await myaxios("GET", musicPlay + newVal);
      // console.log(data);
      // console.log(data.data[0]);

      this.musicUrl = data.data[0].url;
      let { data: data1 } = await myaxios("GET", songDetails + newVal);
      // console.log(data1);
      this.playname = data1.songs[0].name;
      this.songname = data1.songs[0].ar[0].name;
      this.songimg = data1.songs[0].al.picUrl;

      // 获取歌词接口
      let { data: data2 } = await myaxios("GET", getMusicWords + newVal);
      this.lrcObjArr = [];
      this.parseLrc(data2.lrc.lyric);
    },
    // 控制可以切换上一首，下一首
    "$store.getters.currentSong.id": async function(newVal) {
      let { data } = await myaxios("GET", musicPlay + newVal);
      // console.log(data);
      // console.log(data.data[0]);

      this.musicUrl = data.data[0].url;
      let { data: data1 } = await myaxios("GET", songDetails + newVal);
      // console.log(data1);
      this.playname = data1.songs[0].name;
      this.songname = data1.songs[0].ar[0].name;
      this.songimg = data1.songs[0].al.picUrl;

      // 获取歌词接口
      let { data: data2 } = await myaxios("GET", getMusicWords + newVal);
      this.lrcObjArr = [];
      this.parseLrc(data2.lrc.lyric);
    },
    // 监听播放状态
    playing(status) {
      const audio = this.$refs.audio;
      if (audio) {
        status ? audio.play() : audio.pause();
      }
    },
    // 监听进度及歌词滚动
    currentTime: async function(newVal) {
      // console.log(newVal,newVal * 1000)
      // 获取每一段的歌词集合
      var lrcItems = document.getElementsByClassName("lrc-item");
      var songWordList = document.getElementById("songWordList");
      if (this.lrcObjArr[this.lrcindex].time - newVal * 1000 < 300) {
        if (songWordList) {
          lrcItems[this.lrcindex].style.color = "red";
          this.marginTop -= 40;
          songWordList.style.marginTop = this.marginTop + "px";
          if (this.lrcindex - 1 > -1) {
            lrcItems[this.lrcindex - 1].style.color = "";
          }
          this.lrcindex = this.lrcindex + 1;
        }
      }
    }
  },
  components: {
    progressBar,
    Scroll
  }
};
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  bottom: 52px;
  width: 100%;
  z-index: 500;
  .normal-player {
    position: relative;
    height: 667px;
    background-color: rgb(63, 61, 61);
    .backimg {
      color: rgb(255, 255, 255, 0.5);
      width: 100%;
      z-index: 600;
      height: 40px;
      line-height: 40px;
      .backimg-wenzi {
        height: 40px;
        line-height: 40px;
      }
      .icon-zuojiantou {
        font-size: 24px;
        float: left;
      }
    }
    .basemsg {
      text-align: center;
      color: #fff;
    }

    .contentWrapper {
      position: relative;
      height: 500px;
      .circleWrapper {
        height: 460px;
        .bigcircle {
          position: relative;
          border: 1px solid white;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          margin: 30px auto;
          .smallcircle {
            position: absolute;
            margin: auto;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border: 1px solid white;
            width: 260px;
            height: 260px;
            border-radius: 50%;
            img {
              width: 260px;
              height: 260px;
              border-radius: 50%;
            }
          }
        }
      }
      .LyricContent {
        position: relative;
        overflow: hidden;
        padding-top: 20px;
        height: 440px;
        background-color: #3f3d3d;
        margin: 0 auto;
        // border: 1px solid;
        .songWordList {
          position: absolute;
          margin-top: 230px;
          left: 50%;
          transform: translate(-50%, 0%);
          li {
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            list-style: none;
            color: #fff;
            width: 300px;
            text-align: center;
          }
        }
      }
    }

    // 播放操作按钮
    .bottomcontent {
      position: absolute;
      bottom: 40px;
      height: 100px;
      width: 100%;
      // border: 1px solid white;
      .progress-wrap {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        height: 40px;
        .time {
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          color: #fff;
        }
        .time-l {
          text-align: left;
        }
        .time-r {
          text-align: right;
        }
        .progress-wrap-bar {
          height: 5px;
          text-align: center;
          width: 300px;
        }
      }
      .buttonoperator {
        position: relative;
        height: 60px;
        display: flex;
        align-items: center;
        text-align: center;
        .mode-Wenzi {
          position: absolute;
          left: 50%;
          margin-left: -40px;
          top: -20px;
          height: 30px;
          width: 80px;
          line-height: 30px;
          color: #ffcd32;
        }
        .button {
          flex: 1;
          // width: 20px;
          // height: 20px;
          // border:1px solid white;
          float: left;
          color: #ffcd32;
          .iconfont {
            font-size: 36px;
          }
          .icon-zanting {
            padding: 0 20px;
            text-align: center;
            font-size: 40px;
          }
        }
      }
    }
  }
  // mini播放器样式
  .mini-player {
    // z-index: 666;
    position: relative;
    height: 50px;
    background-color: #333;
    color: #fff;
    .playlists {
      z-index: 300;
      position: absolute;
      bottom: 50px;
      right: 0;
      width: 300px;
      height: 400px;
      background-color: #423b3b;
      border-radius: 10px;
      // 歌曲列表
      .wrapper {
        touch-action: none;
        height: 400px;
        overflow: hidden;
        position: relative;
        .musicLists {
          position: absolute;
          padding: 0px 40px;
          width: 100%;
        }
        .musicLists li {
          padding: 10px 0;
          width: 100%;
          color: white;
        }
      }
    }
    .miniinfo {
      height: 100%;
      // 图片
      .songimg {
        height: 100%;
        float: left;
        margin-left: 30px;
        img {
          margin-top: 5px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .icon {
        z-index: 100;
      }
      // 歌手 歌名
      .songinfo {
        margin-top: 5px;
        height: 40px;
        float: left;
        margin-left: 20px;
        .info {
          height: 20px;
          height: 20px;
          line-height: 20px;
        }
      }
      .icon {
        float: right;
        height: 50px;
        // right: 0px;
        .icon-bofang1 {
          position: absolute;
          font-size: 34px;
          right: 70px;
          top: 5px;
        }
        .icon-zanting {
          position: absolute;
          font-size: 34px;
          right: 70px;
          top: 5px;
        }
        .icon-bofangliebiao1 {
          position: absolute;
          font-size: 30px;
          right: 20px;
          top: 8px;
        }
      }
    }
  }
}
// 图片旋转
.play {
  animation: rotate 10s linear infinite;
}
.pause {
  animation-play-state: paused; // 动画暂停
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>