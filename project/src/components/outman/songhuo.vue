<template>
  <div style="overflow:hidden">
    <!-- 首次预约 -->
    <div v-if="one">
      <div class="title">欢迎使用送货预约</div>
      <van-cell-group style="width:70%;margin:0 auto;background-color: transparent;">
        <van-field
          v-model="data.code"
          placeholder="请输入识别码"
          type="number"
          style="background:#f0f0f0;border-radius:0.5rem;border:1px solid #fff;border-bottom:1px solid #efbf6e"
        />
      </van-cell-group>
      <div style="margin:0.3rem 0;text-align:center;">
        <el-button
          style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff"
          round
          @click="checkcode"
        >确定</el-button>
      </div>
    </div>
    <!-- 再次预约 -->
    <div v-if="two">
      <div class="title">欢迎使用送货预约</div>
      <div style="text-align:center;margin:0.3rem 0;font-size:0.16rem">请输入订单号，并准备好清晰的质检报告照片。</div>
      <van-cell-group
        style="width:80%;margin:0 auto;background-color: transparent;text-align:center"
      >
        <van-field
          input-align="center"
          v-model="data.order_coding"
          placeholder="请在此输入"
          style="background:#f0f0f0;border-radius:0.5rem;border:1px solid #fff;border-bottom:1px solid #efbf6e"
        />
      </van-cell-group>
      <div style="margin:0.3rem 0;text-align:center;">
        <el-button
          style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff"
          round
          @click="checkorder"
        >确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.check();
  },
  data() {
    return {
      one: false,
      two: false,
      data: {
        token: window.sessionStorage.getItem("token"),
        code: "",
        order_coding: ""
      }
    };
  },
  methods: {
    // 验证是否是首次预约
    check() {
      this.$http
        .post("/client/check_delivery", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 0) {
            this.one = true;
            this.two = false;
          } else {
            this.two = true;
            this.one = false;
          }
        });
    },
    // 验证识别码
    checkcode() {
      this.$http
        .post("/client/code_delivery", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            this.one = false;
            this.two = true;
          } else {
            this.one = true;
            this.two = false;
          }
        });
    },
    // 验证订单号
    checkorder() {
      if (this.data.order_coding == "") {
        this.$toast.fail("请输入订单号");
      } else {
        this.$http
          .post("/client/delivery_order_check", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 1) {
              this.$toast.success(res.data.msg);
              window.sessionStorage.setItem(
                "order",
                JSON.stringify(res.data.data)
              );
              this.$router.push("/outman/checkorder");
            } else {
              this.$toast.fail(res.data.msg);
            }
          });
      }
    }
  }
};
</script>
<style lang="">
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.title {
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 0.3rem;
}
</style>