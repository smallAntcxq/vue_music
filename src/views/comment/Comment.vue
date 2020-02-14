<template>
  <div class="contain">
    <div class="backimg">
      <i class="iconfont icon-zuojiantou" @click="returnbtn()" />
      <div class="backimg-wenzi">评论</div>
    </div>
    <!-- 精彩评论 -->
    <div class="hotcomments">
      <h4>精彩评论</h4>
      <div class="hotcom" v-for="(item,index) in hotCommentsLists" :key="index">
        <div class="hotcomimg">
          <img :src="item.user.avatarUrl" alt />
          <div class="nickname">
            {{item.user.nickname}}
            <br />
            {{item.time | dateFormat('mm:ss')}}
          </div>
          <div class="lickedcount">
            {{item.likedCount}}
            <i class="iconfont icon-dianzan" />
          </div>
        </div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <!-- 最新评论 -->
    <div
      class="hotcomments"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <h4>最新评论------{{total}}</h4>
      <div class="hotcom" v-for="(item,index) in commentsLists" :key="index">
        <div class="hotcomimg">
          <img v-lazy="item.user.avatarUrl" alt />
          <div class="nickname">
            {{item.user.nickname}}
            <br />
            {{item.time | dateFormat('mm:ss')}}
          </div>
          <div class="lickedcount">
            {{item.likedCount}}
            <i class="iconfont icon-dianzan" />
          </div>
        </div>
        <div class="content">{{item.content}}</div>
      </div>
    </div>
    <div v-if="isLoading" class="isloading">
      <!-- <mt-spinner type="snake" class="loading-more"></mt-spinner> -->
      <span>加载中...</span>
    </div>
    <div class="no-more" v-if="!isLoading">没有更多了~</div>
  </div>
  <!--发表评论 -->
</template>

<script>
import myaxios, { getCommentList } from "@/tools/myaxios.js";

export default {
  data: function() {
    return {
      hotCommentsLists: [],
      commentsLists: [],
      total: "",
      offset: 0,
      isLoading: false,
      isMoreLoading: true, // 加载更多中
      noMore: false
    };
  },
  async created() {
    let { data } = await this.loadComments(this.offset);
    console.log(data);
    this.total = data.total;
    this.hotCommentsLists = data.hotComments;
    this.commentsLists = data.comments;
    this.isLoading = false;
    this.isMoreLoading = false;
  },
  methods: {
    async loadMore() {
      this.isMoreLoading = true; // 设置加载更多中
      this.isLoading = true; // 加载中
      this.loading = true;
      this.offset = this.offset + 20;
      let { data } = await this.loadComments(this.offset);
      this.commentsLists = [...this.commentsLists, ...data.comments];
      // setTimeout(() => {

      //   this.loading = false;
      // }, 2500);
    },
    returnbtn() {
      this.$router.go(-1);
    },
    loadComments(num) {
      return myaxios("GET", getCommentList + this.$route.query.id, {
        offset: num
      });
    }
  }
};
</script>

<style lang="less" scoped>
.contain{
  padding-bottom:100px;
//  返回
.backimg {
  height: 40px;
  line-height: 40px;
  color: #fff;
  .backimg-wenzi {
    color: #fff;
    height: 40px;
    line-height: 40px;
  }
  .icon-zuojiantou {
    font-size: 24px;
    float: left;
  }
}
// 评论内容
.hotcomments{
h4{
  color: #fff;
}
.hotcom {
  margin: 20px;
  color: #fff;
  .content {
    width: 260px;
    margin: 0 auto;
    //   height: 30px;
  }
  .hotcomimg {
    height: 40px;
    // border: 1px solid;
    img {
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .nickname {
      float: left;
      margin-left: 10px;
    }
    .lickedcount {
      float: right;
    }
  }
}
}
}

// 下拉加载图标
.isloading {
  text-align: center;
}
// 图片懒加载
img[lazy=loading] {
  background: url("../../assets/images/smallant.jpg");
  background-size: 40px
}
</style>
