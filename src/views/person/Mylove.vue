<template>
  <div>
    <div class="backimg">
      <i class="iconfont icon-zuojiantou" @click="returnbtn()" />
      <div class="backimg-wenzi">我的喜爱</div>
    </div>
    <!-- 歌曲列表 -->
    <ol class="musicLists">
      <li v-for="(item,index) in this.Mylove" :key="index" @click="setId(item.id,index);">
        {{item.name}}
        <div class="content">{{item.ar[0].name}}--{{item.al.name}}</div>
      </li>
    </ol>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["Mylove"])
  },
  methods: {
    //返回
    returnbtn() {
      this.$router.go(-1);
      console.log(this.Mylove);
    },
    // 把id存入vuex
    setId(id) {
      this.$store.commit("setId", id);
    }
  }
};
</script>
<style lang="less" scoped>
//  返回
.backimg {
  color: rgb(255, 255, 255, 0.5);
  position: fixed;
  width: 100%;
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
// 歌曲列表
.musicLists {
  padding: 40px;
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
</style>