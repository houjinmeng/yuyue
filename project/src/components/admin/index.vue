<template>
  <div>
    <router-view />
    <div style="height:0.5rem"></div>
    <van-tabbar v-model="active" v-show="showBtn">
      <van-tabbar-item replace @click="check">注册审核</van-tabbar-item>
      <van-tabbar-item replace @click="person">人员管理</van-tabbar-item>
      <van-tabbar-item replace @click="hei">黑名单</van-tabbar-item>
      <van-tabbar-item replace @click="show = !show" style="position: relative"
        >送货信息
        <div class="sanjiao"></div>
        <transition name="el-zoom-in-bottom">
          <div class="menu" v-show="show">
            <div style="border-bottom:1px solid #ccc" @click="tongbu">同步厂商</div>
            <div @click="songhuo">送货地点</div>
          </div>
        </transition>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  methods: {
    check() {
      this.$router.push("/admin/zhucecheck");
      this.show = false;
    },
    person() {
      this.$router.push("/admin/person");
      this.show = false;
    },
    hei() {
      this.$router.push("/admin/heimingdan");
      this.show = false;
    },
    songhuo() {
      this.$router.push("/admin/goodsaddress");
    },
    tongbu(){
      this.$router.push('/tongbu')
    }
  },
  data() {
    return {
      show: false,
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
  width: 100%;
  left: 0;
}
.menu div {
  padding: 0.12rem;
  font-size: 0.14rem;
  text-align: center;
  color: #000
}
</style>
