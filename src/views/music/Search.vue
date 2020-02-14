<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <i class="iconfont icon-zuojiantou" @click="returnbtn()" />
      <div class="mint-searchbar-inner">
        <i class="mintui mintui-search"></i>
        <input
          id="myInput"
          type="search"
          v-model="keywords"
          ref="searchval"
          placeholder="搜索音乐·歌单·歌手"
          class="mint-searchbar-core"
          v-focus
          @input="toggle"
        />
      </div>
      <!-- 搜索提示 -->
      <div class="searchList" v-if="flag1">
        <div
          class="list"
          v-for="(item,index) in searchSuggestList"
          :key="index"
          @click="goMusicLists(item.keyword)"
        >
          <i class="mintui mintui-search"></i>
          {{item.keyword}}
        </div>
      </div>
    </div>
    <!-- 历史记录 -->
    <div class="historyrecord" v-if="flag">
      <div class="recordimg">
        <h4>历史记录</h4>
        <i class="iconfont icon-shanchu" @click="download"></i>
      </div>
      <span
        class="keywordtag"
        v-for="(item,index) in keywordList"
        :key="index"
        @click="goMusicLists(item)"
      >{{item}}</span>
    </div>
    <!-- 热搜榜  -->
    <div class="hotsearch">
      <h4>热搜榜</h4>
      <ol class="musicLists">
        <li
          tag="li"
          v-for="(item,index) in hotsearchLists"
          :key="index"
          @click="goMusicLists(item.searchWord)"
        >
          {{item.searchWord}}
          <span class="score">{{item.score}}</span>
          <div class="content">{{item.content}}</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import myaxios, { searchsuggest, hotSearch } from "@/tools/myaxios.js";
export default {
  data: function() {
    return {
      searchSuggestList: [],
      hotsearchLists: [],
      keywords: "",
      keywordList: [],
      flag: false,
      flag1: false
    };
  },
  async created() {
    let { data } = await myaxios("GET", hotSearch);
    this.hotsearchLists = data.data;
    // 把访问的历史记录赋值给keywkeordList
    this.keywordList = this.$store.state.keywordsList;
    // console.log(this.keywordList)
    if (this.keywordList.length > 0) {
      this.flag = true;
    }
    // console.log(data.data);
  },
  methods: {
    // 返回
    returnbtn() {
      this.$router.go(-1);
    },
    // 提示按钮
    download() {
      MessageBox({
        title: "确定清除全部历史记录？",
        message: "清除",
        showCancelButton: true
      })
        .then(action => {
          if (action === "confirm") {
            //删除页面数据
            this.keywordList = [];
            // 删除vuex中的数据
            this.$store.commit("deleteToKeywords");
            this.flag = false;
          }
          if (action === "cancel") {
            console.log(2);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取输入内容
    toggle() {
      var vm = this.$refs.searchval.value;
      this.search = vm;
    },
    goMusicLists(keyword) {
      // 修改store中的数据
      this.$store.commit("addTokeywords", { keyword });
      // 跳转路由
      this.$router.push({
        path: "/music/searchlist",
        query: { keyword: keyword }
      });
    }
  },
  // 自定义局部指令(自动获取焦点)
  directives: {
    focus: {
      inserted: function(el) {
        //console.log("inserted",el,binding,vnode)
        el.focus();
      }
    }
  },

 watch: {
    keywords: async function() {
      if (this.keywords) {
        this.flag1 = true;
        let { data } = await myaxios(
          "GET",
          searchsuggest + this.keywords + "&type=mobile"
        );
        this.searchSuggestList = data.result.allMatch;
      }else{
        this.flag1 = false
      }
    }
  }
};
</script>
<style lang="less" scoped>
.icon-zuojiantou,h4{
  color:rgb(255, 255, 255, 0.5);
}
// 返回
.icon-zuojiantou {
  font-size: 24px;
  margin-top: 4px;
  float: left;
}
// 删除
.recordimg {
  height: 20px;
}
.icon-shanchu {
  float: right;
}
.recordimg h4 {
  float: left;
}
//历史记录
.historyrecord {
  width: 100%;
  margin: 10px 0px;
  height: 50px;
  white-space: nowrap;
  overflow: hidden;
}
.search {
  padding: 4px 0;
  height: 40px;
}
.recordimg {
  height: 30px;
}
.mint-searchbar-inner {
  background-color: rgb(255, 255, 255);
  width: 300px;
  border-radius: 10px;
  float: left;
  text-align: center;
  margin-left: 16px;
}
.searchList {
  position: relative;
  width: 80%;
  margin-top: 40px;
  background-color: #fff;
  .list {
    padding: 10px;
  }
}
// 歌曲列表
.musicLists {
  padding: 0 40px;
}
.musicLists li {
  padding: 10px 0;
  color: rgb(255, 255, 255, 0.5);
}
.score {
  float: right;
  font-size: 10px;
  font-weight: 200;
}
.content {
  font-size: 14px;
  font-weight: 200;
}
// 历史记录
.keywordtag {
  background-color: #fff;
  width: 30px;
  border-radius: 12px;
  margin: 0 4px;
  padding: 4px;
}
</style>
