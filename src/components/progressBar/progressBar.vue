<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <!-- 黄色进度条 -->
      <div class="progress" ref="progress"></div>
      <!-- 移动小球 -->
      <div
        class="progress-bar-wrapper"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn" ref="progressBtn"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      touch: {} // 进度条拖动的当前状态
    };
  },
  watch: {
    //监听歌曲播放百分比
    percent(newPercent) {
      if (newPercent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth - 16;
        const offsetWidth = newPercent * barWidth;
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
      }
    }
  },
  methods: {
    // 开始拖动
    progressTouchStart(event) {
      this.touch.inited = true;
      // 拖动开始的x轴
      this.touch.startX = event.touches[0].pageX;
      // 进度条的长度
      this.touch.left = this.$refs.progress.clientWidth;
    },
    // 拖动中
    progressTouchMove(event) {
      if (!this.touch.inited) {
        return;
      }
      // 拖动的距离
      const differX = event.touches[0].pageX - this.touch.startX;
      // 总的偏移量
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth,
        Math.max(0, differX + this.touch.left)
      );
      this._doOffset(offsetWidth);
    },
    // 拖动完成
    progressTouchEnd() {
      this.touch.inited = false;
      // 这个时候，歌曲的实际进度还没有改变，那么派发一个改变当前进度百分比的事件给外面调用
      this._triggerPercent();
    },
    // 点击进度条到对应位置
      progressClick(event) {
        // 获取一个el的矩形属性，rect 是一个具有四个属性left、top、right、bottom的DOMRect对象
        const rect = this.$refs.progressBar.getBoundingClientRect()
        // 偏移量是点击的点到左窗口的距离减去，进度条这个矩形离左窗口的距离
        const offsetWidth = event.pageX - rect.left
        this._doOffset(offsetWidth)
        this._triggerPercent()
      },
    _triggerPercent() {
      this.$emit("percentChange", this._getPercent());
    },
    _getPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - 16;
      return this.$refs.progress.clientWidth / barWidth;
    },
    _doOffset(offsetWidth) {
      // 进度条的偏移
      this.$refs.progress.style.width = `${offsetWidth}px`;
      // 按钮的偏移
      this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
    }
  }
};
</script>

<style lang="less" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: #ffcd32;
    }
    .progress-bar-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: #ffcd32;
      }
    }
  }
}
</style>
