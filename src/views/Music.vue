<template>
  <div>
    <!-- 搜索 -->
    <div class="search" @click="change">
      <div class="mint-title">
        <img src="./../assets/images/smallant.jpg" alt="">
      </div>
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input type="search" placeholder="搜索" class="mint-searchbar-core" />
      </div>
    </div>
    <!--轮播 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in musicBanners" :key="index">
        <img :src="item.pic" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 导航 -->
    <ul class="iconf-nav">
      <li>
        <i class="iconfont icon-dongtai" />
        <br />动态
      </li>
      <li>
        <i class="iconfont icon-tuijian1"></i>
        <br />推荐
      </li>
      <li>
        <i class="iconfont icon-fenlei"></i>
        <br />分类
      </li>
      <li>
        <i class="iconfont icon-icon-test"></i>
        <br />电台
      </li>
      <li>
        <i class="iconfont icon-yinle1"></i>
        <br />一起听
      </li>
    </ul>
    <!--推荐歌单 -->
    <div class="container">
      <h4>推荐歌单</h4>
      <div class="recommondpic">
        <img
          v-for="(item,index) in recommondLists"
          :key="index"
          v-lazy="item.picUrl"
          @click="goRecommendList(item.id,item.picUrl,item.name,item.copywriter)"
        />
      </div>
      <div class="loadingContain" v-show="!recommondLists.length">
        <!-- <loading></loading> -->
      </div>
    </div>
  </div>
</template>

<script>
import myaxios, { musicSwipe, recommodList } from "@/tools/myaxios.js";
// import Loading from "../components/loading/Loading.vue";
export default {
  data: function() {
    return {
      musicBanners: [],
      recommondLists: []
    };
  },
  async created() {
    let { data } = await myaxios("GET", musicSwipe);
    let result = await myaxios("GET", recommodList);

    this.musicBanners = data.banners;
    // console.log(result.data.result);
    setTimeout(() => {
      this.recommondLists = result.data.result;
    }, 1000);
  },
  methods: {
    change() {
      this.$router.push({
        path: "/music/search"
      });
    },
    goRecommendList(id, picUrl, name, copywriter) {
      this.$router.push({
        path: "/music/recommondlist",
        query: { id: id, picurl: picUrl, name: name, copywriter: copywriter }
      });
    }
  },
  // components: {
  //   Loading
  // }
};
</script>

<style lang="less" scoped>
h4{
  color: rgb(255,255,255,0.5);
}
//搜索
.search {
  padding: 8px 0;
  height: 40px;
  line-height: 40px;
  position: static;
  .mint-title {
    float: left;
    margin-left: 10px;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      // background-color: rgb(255,255,255,0.5);
    }
  }
  .mint-searchbar-inner {
    width: 200px;
    // border: 1px solid rgb(179, 175, 175);
    border-radius: 10px;
    float: left;
    text-align: center;
    margin-left: 30px;
    .mintui-search {
      margin-left: 80px;
    }
  }
}
//轮播图
.mint-swipe {
  margin: 0 auto;
  height: 120px;
  border-radius: 10px;
  width: 94%;
}
.mint-swipe-item img {
  height: 120px;
  width: 100%;
}
// 导航
.iconf-nav {
  height: 50px;
  width: 100%;
  text-align: center;
  padding: 8px 0;
}
.iconf-nav li {
  color:rgba(255, 255, 255, 0.5);
  list-style: none;
  float: left;
  width: 20%;
}
.iconfont {
  width: 20px;
  height: 20px;
  font-size: 20px;
}
// 推荐歌单
.container {
  position: relative;
}
.recommondpic {
  height: 400px;
  padding: 4px 20px;
}
.recommondpic img {
  height: 100px;
  float: left;
  padding: 5px;
  // display: inline-block;

}
// 图片懒加载
img[lazy="loading"] {
  width: 100px !important;
  height: 100px !important;
  background: url("../assets/images/smallant.jpg");
  background-size: 100px;
}
.loadingContain {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>