<template>
  <div style="overflow:hidden">
    <!-- 首次预约 -->
    <div v-if="one">
      <div class="title" style="margin-top:1rem">欢迎使用送货预约</div>
      <van-cell-group
        style="width:70%;margin:0.5rem auto;background-color: transparent;"
      >
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
          >确定</el-button
        >
      </div>
    </div>
    <!-- 再次预约 -->
    <div v-if="two" class="bb">
      <div class="title">欢迎使用送货预约</div>
      <div style="text-align:center;margin:0.2rem 0;font-size:0.16rem">
        请输入订单号，并准备好清晰的质检报告照片。
      </div>
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
      <div style="margin:0.2rem 0;text-align:center;">
        <el-button
          style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff"
          round
          @click="checkorder"
          >确定</el-button
        >
      </div>
      <!-- 已有订单列表 -->
      <div style="padding:0 0.1rem;">
        <div style="padding:0.2rem;text-align:center;font-size:0.16rem">
          选择下列订单
        </div>
        <div class="order" v-for="(item, index) in list" :key="index">
          <div class="item" style="margin-bottom:0.1rem">
            <div>订单号: {{ item.FCTCode }}</div>
            <div class="btn" @click="ordermessage(item)">订单详情</div>
          </div>
          <div class="item">
            <div>供货商: {{ item.FVendorName }}</div>
            <div class="btn" @click="begin(item.FCTCode)">开始预约</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.check();
    this.getlist();
  },
  data() {
    return {
      one: false,
      two: false,
      data: {
        token: window.sessionStorage.getItem("token"),
        code: "",
        order_coding: ""
      },
      list: []
    };
  },
  methods: {
    // 可选择订单列表
    getlist() {
      this.$http
        .post("/client/order_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data.msg;
        });
    },
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
            this.$toast.success(res.data.msg);
            this.getlist();
            this.one = false;
            this.two = true;
          } else {
            this.$toast.fail(res.data.msg);
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
    },
    // 订单详情
    ordermessage(i) {
      window.sessionStorage.setItem("coding", i.FCTCode);
      window.sessionStorage.setItem("name", i.FVendorName);
      this.$router.push("/outman/ordermessage");
    },
    // 开始预约
    begin(code) {
      this.data.order_coding = code;
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
};
</script>
<style lang="">
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.bb >>> .van-cell {
  padding: 0.05rem !important;
}
.bb >>> .el-button {
  padding: 0.1rem !important;
  border: none !important;
}
.title {
  margin-top: 0.1rem;
  text-align: center;
  font-size: 0.3rem;
}
.order {
  background-color: #fff;
  border-radius: 0.1rem;
  padding: 0.1rem;
  margin-bottom: 0.1rem
}
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  background-color: #e9b96a;
  color: #fff;
  padding: 0.05rem 0.1rem;
  border-radius: 0.05rem;
}
</style>
