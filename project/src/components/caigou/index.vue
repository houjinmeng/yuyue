<template>
  <div>
    <router-view />
    <div style="height:0.5rem"></div>
    <van-tabbar v-model="active" v-show="showBtn">
      <van-tabbar-item replace @click="order">订单</van-tabbar-item>
      <van-tabbar-item replace @click="show=!show" style="position: relative">
        预约人
        <div class="sanjiao"></div>
        <transition name="el-zoom-in-bottom">
          <div class="menu" v-show="show">
            <router-link to="/caigou/changshang">
              <div style="border-bottom:1px solid #ccc">厂商</div>
            </router-link>
            <router-link to="/caigou/yuyuenumber">
              <div>可预约号码</div>
            </router-link>
          </div>
        </transition>
      </van-tabbar-item>
      <van-tabbar-item replace @click="search">查询</van-tabbar-item>
      <van-tabbar-item replace @click="baobiao">报表</van-tabbar-item>
      <van-tabbar-item replace @click="hei">黑名单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods: {
    order() {
      this.show = false;
      this.$router.push("/caigou/order");
    },
    search() {
      this.show = false;
      this.$router.push("/caigou/check");
    },
    baobiao() {
      this.show = false;
      this.$router.push("/caigou/baobiao");
    },
    hei() {
      this.show = false;
      this.$router.push("/caigou/heimingdan");
    }
  },
  data() {
    return {
      active: 6,
      show: false,
      clientHeight: document.documentElement.clientHeight,
      showBtn: true // 控制按钮盒子显示隐藏
    };
  },
  // mounted() {
  //   window.onresize = () => {
  //     if (this.clientHeight > document.documentElement.clientHeight) {
  //       this.showBtn = false;
  //     } else {
  //       this.showBtn = true;
  //     }
  //   };
  // }
};
</script>
<style scoped>
.sanjiao {
  position: absolute;
  height: 0;
  width: 0;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
  border-color: transparent #3366ff transparent transparent;
  border-style: solid solid dashed dashed;
  border-width: 0.1rem 0.1rem 0 0;
  bottom: 0.05rem;
  right: 0.1rem;
}
.menu {
  background-color: #fff;
  position: absolute;
  top: -0.8rem;
  width: 1.2rem;
}
.menu div {
  padding: 0.12rem;
  font-size: 0.15rem;
  text-align: center
}
</style>