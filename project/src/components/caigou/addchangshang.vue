<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">添加厂商</div>
    <div class="card">
      <div class="item">
        <span>名称</span>&nbsp&nbsp
        <el-input style="width:82%;" size="small" placeholder="请在此输入 (例: A公司)" v-model="data.name"></el-input>
      </div>
      <div class="item">
        <span>编码</span>&nbsp&nbsp
        <el-input
          style="width:82%;"
          size="small"
          placeholder="请在此输入 (例: HBC567890)"
          v-model="data.coding"
        ></el-input>
      </div>
      <!-- <div style="text-align:center">
        <div class="button" style="margin-top:4rem" @click="ok">确定</div>
      </div>-->
      <!-- 底部按钮 -->
      <div class="btn">
        <router-link to="/caigou/changshang">
          <div class="same" style="border-radius:0.15rem 0 0 0.15rem ">返回</div>
        </router-link>
        <div class="same" style="border-radius:0 0.15rem 0.15rem 0 ;" @click="ok">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: "",
        coding: "",
        token: window.sessionStorage.getItem("token")
      }
    };
  },
  methods: {
    ok() {
      if (this.data.name == "") {
        this.$toast.fail("请填写厂商名称");
      } else if (this.data.coding == "") {
        this.$toast.fail("请填写厂商编号");
      } else {
        this.$http
          .post("/audit/delivery_code_add", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 0) {
              this.$toast.fail(res.data.msg);
            } else {
              this.$toast.success(res.data.msg);
              this.$router.push("/caigou/changshang");
            }
          });
      }
    }
  }
};
</script>
<style>
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.btn {
  text-align: center;
  margin-top: 4rem;
}
.same {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
.item {
  margin-bottom: 0.1rem;
  font-size: 0.16rem;
}
</style>