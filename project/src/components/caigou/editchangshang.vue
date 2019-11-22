<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">
      修改厂商信息
    </div>
    <div class="card">
      <div class="item">
        <span>名称</span>&nbsp&nbsp
        <el-input
          style="width:82%;"
          size="small"
          disabled=""
          v-model="data.name"
        ></el-input>
      </div>
      <div
        class="item"
        style="border-bottom:1px solid #ccc;padding-bottom:0.1rem"
      >
        <span>编码</span>&nbsp&nbsp
        <el-input
          style="width:82%;"
          size="small"
          disabled
          v-model="data.coding"
        ></el-input>
      </div>
      <div class="item">
        <span>验证码</span>&nbsp&nbsp
        <el-input
          style="width:77%;"
          size="small"
          placeholder="请在此输入"
          v-model="data.code"
        ></el-input>
      </div>
      <div style="text-align:center">
        <div class="button" style="margin-top:1rem" @click="ok">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let a = JSON.parse(window.sessionStorage.getItem("changshang"));
    this.data.name = a.name;
    this.data.coding = a.coding;
    this.data.code = a.code;
    this.data.id = a.id;
  },
  data() {
    return {
      data: {
        name: "",
        coding: "",
        code: "",
        id: "",
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
      } else if (this.data.code == "") {
        this.$toast.fail("请填写验证码");
      } else {
        this.$http
          .post("/audit/delivery_code_edit", this.$qs.stringify(this.data))
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
.item {
  margin-bottom: 0.1rem;
  font-size: 0.16rem;
}
</style>
