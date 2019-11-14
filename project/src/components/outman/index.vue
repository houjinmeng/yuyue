<template>
  <div>
    <router-view style="margin-bottom:0.6rem" />
    <van-tabbar v-model="active" v-show="showBtn">
      <!-- <van-tabbar-item replace v-if="rule_id==0" @click="zhuce">内部注册</van-tabbar-item> -->
      <van-tabbar-item replace @click="yewu">业务拜访预约</van-tabbar-item>
      <van-tabbar-item replace @click="songhuo">送货预约</van-tabbar-item>
      <van-tabbar-item replace @click="person">我的预约</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false;
      } else {
        this.showBtn = true;
      }
    };
  },
  data() {
    return {
      active: 4,
      rule_id: window.sessionStorage.getItem("rule_id"),
      clientHeight: document.documentElement.clientHeight,
      showBtn: true // 控制按钮盒子显示隐藏
    };
  },
  methods: {
    zhuce() {
      this.$router.push("/zhuce");
    },
    yewu() {
      this.$router.push("/outman/baifang");
    },
    songhuo() {
      this.$router.push("/outman/songhuo");
    },
    person() {
      this.$router.push("/outman/person");
    }
  }
};
</script>
<style>
</style>