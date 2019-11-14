<template>
  <div>
    <router-view />
    <div style="height:0.5rem"></div>
    <van-tabbar v-model="active" v-show="showBtn">
      <van-tabbar-item replace @click="check">注册审核</van-tabbar-item>
      <van-tabbar-item replace @click="person">人员管理</van-tabbar-item>
      <van-tabbar-item replace @click="hei">黑名单</van-tabbar-item>
      <van-tabbar-item replace @click="songhuo">送货地点</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods: {
    check() {
      this.$router.push("/admin/zhucecheck");
    },
    person() {
      this.$router.push("/admin/person");
    },
    hei() {
      this.$router.push("/admin/heimingdan");
    },
    songhuo() {
      this.$router.push("/admin/goodsaddress");
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