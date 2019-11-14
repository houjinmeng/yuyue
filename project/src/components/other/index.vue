<template>
  <div>
    <router-view />
    <div style="height:0.5rem"></div>
    <van-tabbar v-model="active" v-show="showBtn">
      <van-tabbar-item replace to="/other/audit" @click="check">审核</van-tabbar-item>
      <van-tabbar-item replace to="/other/check" @click="search">查询</van-tabbar-item>
      <van-tabbar-item replace to="/other/baobiao" @click="baobiao">报表</van-tabbar-item>
      <van-tabbar-item replace to="/other/heimingdan" @click="hei">黑名单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods: {
    check() {
      this.$router.push("/other/audit");
    },
    search() {
      this.$router.push("/other/check");
    },
    baobiao() {
      this.$router.push("/other/baobiao");
    },
    hei() {
      this.$router.push("/other/heimingdan");
    }
  },
  data() {
    return {
      active: 6,
      clientHeight: document.documentElement.clientHeight,
      showBtn: true // 控制按钮盒子显示隐藏
    };
  },
  mounted() {
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false;
      } else {
        this.showBtn = true;
      }
    };
  }
};
</script>
<style>
</style>