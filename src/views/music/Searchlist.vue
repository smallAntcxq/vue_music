<template>
  <div class="searchlist">
    <i class="iconfont icon-zuojiantou" @click="returnbtn()" />
    <ol class="musicLists">
      <li v-for="(item,index) in keywordLists" :key="index" @click="setId(item.id)">
        {{item.name}}
        <div class="musicinfo">
          <span v-for="(item1,index1) in item.artists" :key="index1">{{item1.name}}</span>
          <span>--{{item.album.name}}</span>
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
import myaxios, { searchKeywords } from "@/tools/myaxios.js";
import "@/assets/iconfont/iconfont.css";

export default {
  data: function() {
    return {
      keywordLists: []
    };
  },
  async created() {
    // console.log(this.$route.query.keyword);
    let { data } = await myaxios(
      "GET",
      searchKeywords + this.$route.query.keyword
    );
    // console.log(data.result.songs);
    this.keywordLists = data.result.songs;
  },
  methods: {
    returnbtn() {
      this.$router.go(-1);
    },
    // 把id存入vuex
    setId(id) {
      this.$store.commit("setId", id);
    }
  }
  // watch: {
  //   "$route.query.keyword": async function(newVal) {
  //     let { data } = await myaxios(
  //       "GET",
  //       searchKeywords + this.$route.query.keyword
  //     );
  //     // console.log(data.result.songs);
  //     this.keywordLists = data.result.songs;
  //   }
  // }
};
</script>
<style lang="less" scoped>
.icon-zuojiantou {
  color: rgb(255, 255, 255, 0.5);
}
.searchlist {
  height: 100%;
  overflow: hidden;
}
.musicLists {
  padding: 0 40px;
}
.musicLists li {
  padding: 10px 0;
  color: rgb(255, 255, 255, 0.5);
}
.musicinfo {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
</style>
