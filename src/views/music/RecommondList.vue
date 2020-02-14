<template>
  <div>
    <!-- 返回 -->
    <div class="back" @click="returnbtn()">
      <i class="iconfont icon-zuojiantou" />
    </div>
    <!-- 背景图片 -->
    <div class="recommondimg">
      <img :src="this.$route.query.picurl" alt />
      <div class="message">
        {{this.$route.query.name}}
        <br />
        {{this.$route.query.copywriter}}
      </div>
    </div>
    <div class="imgtag">
      <router-link :to="{path:'/comment/recommondlist',query:{id:this.$route.query.id}}">
        <i class="iconfont icon-pinglun" />
      </router-link>
      <router-link to="/comment/recommondlist">
        <i class="iconfont icon-fenxiang" />
      </router-link>
      <router-link to="/comment/recommondlist">
        <i class="iconfont icon-xiazai1" />
      </router-link>
      <router-link to="/comment/recommondlist">
        <i class="iconfont icon-xuanze1" />
      </router-link>
    </div>
    <!-- 歌曲列表 -->
    <ol class="musicLists">
      <li
        v-for="(item,index) in recommondLists"
        :key="index"
        @click="setId(item.id,index);selected(item.name)"
        :class="{active : active == item.name}"
      >
        {{item.name}}
        <div class="content">{{item.ar[0].name}}--{{item.al.name}}</div>
      </li>
    </ol>
  </div>
</template>

<script>
import {mapMutations, mapActions } from "vuex";
import myaxios, { getRecommodLists } from "@/tools/myaxios.js";
// import songLists from '../../components/songLists/SongLists.vue'

export default {
  data: function() {
    return {
      recommondLists: [],
      active: ""
    };
  },
  async created() {
    let { data } = await myaxios(
      "GET",
      getRecommodLists + this.$route.query.id
    );
    // console.log(data.playlist.tracks);
    this.recommondLists = data.playlist.tracks;
  },
  methods: {
    returnbtn() {
      this.$router.go(-1);
    },
    // 把id存入vuex
    setId(id, index) {
      this.$store.commit("setId", id);
      this.setCurrentIndex(index);
      this.selectPlay({
        list: this.recommondLists,
        index
      });
    },
    // setPlayList() {
    //   this.$store.commit("setPlayList", this.recommondLists);
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
  }
};
</script>
<style lang="less" scoped>
// 返回
.icon-zuojiantou {
  font-size: 24px;
}
// 标题图片
.recommondimg {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  .message {
    color: #fff;
  }
  img {
    width: 100px;
    padding: 5px;
  }
}

// 图标
.imgtag {
  height: 50px;
  line-height: 50px;
  a {
    text-decoration: none;
    .iconfont {
      font-size: 36px;
      margin-left: 50px;
      color: grey;
    }
  }
}
// 歌曲列表
.musicLists {
  padding: 0px 40px 40px;
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
</style>