<template>
  <div class="header">
    <van-row class="m-header">
      <van-col span="24">
        <van-icon name="arrow-left" class="m-header-icon" @click="onBack" />
        <span class="title">{{ title }}</span>
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Header",
  data() {
    return {};
  },
  props: {
    title: {
      type: String
    }
  },
  methods: {
    onBack() {
      history.back();
    }
  }
});
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  .m-header {
    height: 50px;
    line-height: 50px;
    background: #fff;
    color: #666;
    width: 100%;
    position: fixed;
    z-index: 10000;
    border-bottom: 1px solid #e5e5e5;
  }
  .van-col {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    .m-header-icon {
      position: absolute;
      width: 50px;
      top: 16px;
      left: 6px;
      font-size: 18px;
    }
  }
}
</style>
