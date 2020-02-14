<template>
  <div class="page-navbar">
    <!-- 地区导航栏 -->
    <div class="area">
      <li
        v-for="(item,index) in musicTypes"
        :id="item.id"
        :key="index"
        @click="change(item.code);addClass(index)"
        ref="liStyle"
        :class="{ bgColors:index==current}"
      >{{item.name}}</li>
    </div>
    <!-- 歌手列表 -->
    <div class="playerList">
       <scroll
        class="wrapper"
        :data="this.singList"
        :pulldown="pulldown"
      >
      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="item in musicTypes" :id="item.id" :key="item.code">
          <div
            class="musicPlayer"
            v-for="item in singList"
            :key="item.code"
            @click="goPlayerDetail(item.id)"
          >
            <img class="img" v-lazy="item.picUrl" alt />
            {{item.name}}
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      </scroll>
    </div>
  </div>
</template>
<script>
import myaxios, { getSingerList } from "@/tools/myaxios.js";
import Scroll from "../components/scroll/scroll.vue";

export default {
  name: "page-navbar",

  data() {
    return {
      singList: [],
      selected: 1,
      code: 1001,
      pulldown: true,
        current:0,
      musicTypes: [
        {
          name: "华语",
          code: 1001,
          id: 1
        },
        {
          name: "欧美",
          code: 2002,
          id: 2
        },
        {
          name: "韩国",
          code: 7001,
          id: 3
        },
        {
          name: "日本",
          code: 6002,
          id: 4
        }
      ]
    };
  },
  methods: {
    change(code) {
      this.code = code;
      // console.log(this.$refs.liStyle[0].style)
      // this.$refs.liStyle[0].style.color = null
    },
    addClass:function(index){
     this.current=index;
    },
    // 跳转路由
    goPlayerDetail(id) {
      this.$router.push({ path: "/Singer/playerDetail", query: { id: id } });
    }
  },
  async created() {
    let { data } = await myaxios("GET", getSingerList + this.code);
    // console.log(data);
    this.singList = data.artists;
    // console.log(this.singList)
  },
  watch: {
    code: async function(newVal) {
      let { data } = await myaxios("GET", getSingerList + newVal);
      this.singList = data.artists;
      // console.log(this.singList);
    }
  },
  components: {
    Scroll
  }
};
</script>
<style lang="less" scoped>
// 地区分类
.area {
  z-index: 2000;
  // position: fixed;
  // top:0;
  // position: relative;

  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  li {
    list-style: none;
    float: left;
    margin-left: 20px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.5);
  }
}
// .area :nth-child(1){
//   color:red;
// }
// .area li:hover {
//   color: red;
// }
 .bgColors{
 color: #ff5700!important
}
// 歌手列表
.mint-tab-container-item {
  // z-index: 0;
  // overflow: hidden;
  // padding-top: 40px;
  .musicPlayer {
    // padding-top:40px;
    display: flex;
    align-items: center; //子元素垂直居中
    // justify-content: center; //子元素水平居中
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin: 20px;
    color: #fff;

    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}

// 图片懒加载
img[lazy="loading"] {
  background: url("../assets/images/smallant.jpg");
  background-size: 40px;
}
.area a {
  font-size: 16px;
}
</style>


