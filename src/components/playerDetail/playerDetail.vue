<template>
  <div>
    <!-- 返回上一级 -->
    <div class="backimg">
      <i class="iconfont icon-zuojiantou" @click="returnbtn()" />
      <div class="backimg-wenzi">歌手详情</div>
    </div>
    <div class="playerImage">
      <img v-lazy="this.artistList.picUrl" alt />
    </div>
    <div class="hotsongs">
      <scroll class="wrapper" :data="this.hotSongList" :pulldown="pulldown">
        <!-- 歌曲列表 -->
        <ol class="musicLists">
          <li
            v-for="(item,index) in hotSongList"
            :key="item.index"
            @click="setId(item.id,index);selected(item.name)"
            :class="{active : active == item.name}"
          >
            {{item.name}}
            <div class="content">{{item.ar[0].name}}--{{item.al.name}}</div>
          </li>
        </ol>
      </scroll>
    </div>
  </div>
</template>
<script>
import myaxios, { getPlayerDetail } from "@/tools/myaxios.js";
import { mapMutations ,mapActions} from "vuex";
// import BScroll from "better-scroll";
import Scroll from "../scroll/scroll.vue";

export default {
  data() {
    return {
      artistList: [],
      hotSongList: [],
      pulldown: true,
      active:''
    };
  },
  methods: {
    //返回
    returnbtn() {
      this.$router.go(-1);
    },
    // 把id存入vuex
    setId(id, index) {
      this.$store.commit("setId", id);
      // 点击后修改vuex中的索引
      this.setCurrentIndex(index);
       this.selectPlay({
          list: this.hotSongList,
          index
        })
    },
    // setPlayList() {
    //   this.$store.commit("setPlayList", this.hotSongList);
    // },
    // 点击高亮设置
    selected(name) {
      this.active = name;
    },
    // 引入
    ...mapMutations({
      setCurrentIndex: "setCurrentIndex"
    }),
     ...mapActions(["selectPlay"])
  },
  async created() {
    let { data } = await myaxios("GET", getPlayerDetail + this.$route.query.id);
    this.artistList = data.artist;
    this.hotSongList = data.hotSongs;
    // console.log(data.artist);
    // console.log(data.hotSongs);
    // this.$nextTick(() => {
    //   this.scroll = new Bscroll(this.$refs.wrapper, {});
    // });
  },
  watch: {
    "$route.query.id": async function(newVal) {
      if (newVal) {
        let { data } = await myaxios("GET", getPlayerDetail + newVal);
        this.artistList = data.artist;
        this.hotSongList = data.hotSongs;
      }
    }
  },
  components: {
    Scroll
  }
};
</script>
<style lang="less" scoped>
//  返回
.backimg {
  color: rgb(255, 255, 255, 0.5);
  position: fixed;
  width: 200px;
  z-index: 100;
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
// 歌手照片
.playerImage {
  // z-index: 10;
  // height: 200px;
  position: fixed;
  top: 0;
  img {
    height: 260px;
    width: 100%;
  }
}
// 歌曲列表
.musicLists {
  padding: 260px 40px 40px;
}
.musicLists li {
  padding: 10px 0;
  color: rgb(255, 255, 255, 0.5);
}

.liststransfor {
  width: 100px;
  border: 1px solid;
  overflow: hidden;
}
.content {
  font-size: 14px;
  font-weight: 200;
}
// 点击时显示
.active {
  background: rgb(124, 120, 120);
  // border: 1px solid #fd7522;
  color: #fff;
}
// 图片懒加载
// img[lazy="loading"] {
//   background: url("../../assets/images/smallant.jpg");
// }
</style>