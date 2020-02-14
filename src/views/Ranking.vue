<template>
  <div class="musicList">
    <!-- 推荐榜单 横向滚动 -->
    <div class="recommondtop">
      <h4>推荐</h4>
      <div class="tab" ref="tab">
        <ul class="tab_content" ref="tabWrapper">
          <li
            class="tab_item"
            v-for="(item,index) in recommondList"
            ref="tabitem"
            :key="index"
            @click="goRecommendList(item.id,item.coverImgUrl,item.name,item.copywriter)"
          >
            <span>{{item.updateFrequency}}</span>
            <img v-lazy="item.coverImgUrl" alt />
          </li>
        </ul>
      </div>
    </div>
    <!-- 官方榜单 -->
    <h4>官方榜</h4>
    <div
      class="governComList"
      v-for="(item,index) in governRecomList"
      :key="index"
      @click="goRecommendList(item.id,item.coverImgUrl,item.name,item.copywriter)"
    >
      <div class="govern-wenzi">
        <div class="top-name">{{item.name}}</div>
        <ol class="govern-name">
          <li v-for="(item1,index1) in item.tracks" :key="index1">{{item1.first}}--{{item1.second}}</li>
        </ol>
      </div>
      <span>{{item.updateFrequency}}</span>
      <img v-lazy="item.coverImgUrl" alt />
    </div>
    <!-- 更多榜单 -->
    <h4>更多榜单</h4>
    <div class="moreList">
      <div
        class="more-wenzi"
        v-for="(item,index) in moreList"
        :key="index"
        @click="goRecommendList(item.id,item.coverImgUrl,item.name,item.copywriter)"
      >
        <img v-lazy="item.coverImgUrl" alt />
        <span>{{item.updateFrequency}}</span>
        <div class="moreintroduce">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

 <script>
import BScroll from "better-scroll";
import myaxios, {
  getToplistDetail
} from "@/tools/myaxios.js";
export default {
  data() {
    return {
      recommondList: [1, 2, 3, 4, 5, 6, 7, 8],
      governRecomList: [],
      moreList: []
    };
  },
  async created() {
    //   横屏滚动
    this.$nextTick(() => {
      this.InitTabScroll();
    });

    let { data } = await myaxios("GET", getToplistDetail);
    this.recommondList = data.list.slice(4, 12);
    // console.log(this.recommondList);

    this.governRecomList = data.list.slice(0, 4);
    // console.log(this.governRecomList);

    this.moreList = data.list.slice(12, 21);
  },

  methods: {
    // 到排行详情页
    goRecommendList(id, coverImgUrl, name, copywriter) {
      this.$router.push({
        path: "/music/recommondlist",
        query: {
          id: id,
          picurl: coverImgUrl,
          name: name,
          copywriter: copywriter
        }
      });
    },
    // 滑动代码实现
    InitTabScroll() {
      let width = 0;
      for (let i = 0; i < this.recommondList.length; i++) {
        width += this.$refs.tabitem[0].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
      }
      this.$refs.tabWrapper.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tab, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    }
  }
};
</script>

 <style lang="less" scoped>
 h4{
   color:rgb(255,255,255,0.5)
 }
.musicList {
  height: 100%;
}
//  返回
.backimg {
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

//  推荐排行
.recommondtop {
  margin-top: 10px;
  .tab {
    overflow: hidden;
    margin-left: 20px;
    .tab_content {
      display: flex;
      .tab_item {
        position: relative;
        list-style: none;
        width: 114px;
        height: 114px;
        span {
          position: absolute;
          font-size: 12px;
          color: #fff;
          bottom: 6px;
          left: 40px;
        }
        img {
          width: 110px;
          height: 110px;
          padding: 2px;
          border-radius: 15px;
        }
      }
    }
  }
}

// 官方榜单
.governComList {
  position: relative;
  background-color: rgb(63, 61, 61);
  margin: 10px 20px;
  height: 110px;
  border-radius: 15px;
  span {
    position: absolute;
    color: rgb(255,255,255,0.5);
    font-size: 12px;
    bottom: 6px;
    left: 40px;
  }
  .govern-wenzi {
    float: right;
    .top-name {
      padding-top: 10px;
      margin-left: 16px;
      color: #fff;
    }
    .govern-name {
      margin-left: 26px;
      li {
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        padding: 4px;
        color: rgb(255,255,255,0.5);
      }
    }
  }
  img {
    height: 110px;
    width: 110px;
    float: left;
    border-radius: 15px;
  }
}
// 更多榜单
.moreList {
  margin: 0 20px;
  height: 500px;
}
.moreList .more-wenzi {
  position: relative;
  padding: 5px;
  width: 100px;
  height: 140px;
  float: left;
  span {
    // position: absolute;
  }
  img {
    width: 100px;
    height: 100px;
  }
}
// 图片懒加载
img[lazy="loading"] {
  background: url("../assets/images/smallant.jpg")no-repeat;
  background-size: 110px;
}
</style>