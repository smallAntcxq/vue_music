<template>
  <div>
    <div class="backimg">
      <i class="iconfont icon-zuojiantou" @click="returnbtn()" />
      <div class="backimg-wenzi">最近播放</div>
    </div>
    <div class="listContent">
      <ul class="musicLists">
        <li
          v-for="(item,index) in this.audioRecord"
          :key="index"
          @click="setId(item.song.id,index);"
        >
          <div class="index">{{index+1}}</div>
          <div class="content">
            {{item.song.name}}
            <br />
            {{item.song.ar[0].name}}--{{item.song.al.name}}
          </div>
          <div class="count">
            <i class="iconfont icon-bofang" />
            {{item.playCount}}次
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["loginStatus", "audioRecord"])
  },
  methods: {
    //返回
    returnbtn() {
      this.$router.go(-1);
    },
    // 把id存入vuex
    setId(id, index) {
      this.$store.commit("setId", id);
      this.setCurrentIndex(index);
    },
    ...mapMutations({
      setCurrentIndex: "setCurrentIndex"
    })
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
  border:1px solid white;
  padding:30px 30px 60px 40px;
  overflow: hidden;
//   list-style: none;
}
.musicLists li {
  position: relative;
  height: 50px;
  color: rgb(255, 255, 255, 0.5);
  overflow: hidden;
  .index {
    float: left;
    line-height: 50px;
  }
  .content {
    margin-top:10px;
    height: 50px;
    width: 200px;
    float: left;
    margin-left: 20px;
    overflow: hidden;
  }
  .count {
    float: right;
    line-height: 50px;
  }
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