<template>
  <div id="app">
    <router-view></router-view>
    <MusicPlay></MusicPlay>

    <mt-tabbar v-if="flag" v-model="selected" id="tabbar" ref="tabbar">
      <mt-tab-item id="Music">
        <router-link to="/" tag="span">
          <i class="iconfont icon-yinyue" />
          <div class="mt-list">音乐馆</div>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="Singer">
        <router-link to="/singer" tag="span">
          <i class="iconfont icon-geshou"></i>
          <div class="mt-list">歌手</div>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="Ranking">
        <router-link to="/ranking" tag="span">
          <i class="iconfont icon-paihangbang"></i>
          <div class="mt-list">排行</div>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="Person">
        <router-link to="/person" tag="span">
          <i class="iconfont icon-wode1" />
          <div class="mt-list">我的</div>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import MusicPlay from "./components/music/musicplay.vue";
export default {
  data: function() {
    return {
      selected: "Music",
      tabType: true,
      transitionName: "",
      isBack: false,
      flag: true
    };
  },
  methods: {},
  watch: {
    "$route.path": function(newVal) {
      var routerArr = ["/", "/singer", "/person", "/ranking"];
      if (routerArr.includes(newVal)) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  },

  components: {
    MusicPlay
  }
};
</script>

<style lang="less">
body {
  background-color: rgb(63, 61, 61);
}
* {
  padding: 0;
  margin: 0;
  // touch-action: none;
  // background-color: rgb(56, 55, 55);
}
// #app{
// padding-bottom:52px;
// }

.mint-tabbar {
  position: fixed;
  bottom: 0px;
  background-color: rgb(63, 61, 61);
  background-size: 0;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: #ffcd32;
  background-color: rgb(63, 61, 61);
}

.mint-tab-item {
  color: gray;
}
.mt-list {
  height: 22px;
  line-height: 22px;
}
</style>
