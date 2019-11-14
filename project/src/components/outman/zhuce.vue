<template>
  <div style="text-align:center">
    <div style="font-size:0.25rem;margin-top:1rem">欢迎使用注册预约系统</div>
    <div style="font-size:0.18rem;margin-top:0.5rem">请输入您的注册信息</div>
    <input class="name" type="text" v-model="name" placeholder="请在此输入姓名" @blur="test" />
    <!-- <div v-show="hintShow" style="color:red;;font-size:0.14rem;text-align:center">请填以正确格式填写</div> -->
    <div class="name" style="margin-left:12%">
      <el-select v-model="data.rule_id" placeholder="请选择部门" size="small" style="width:41%">
        <el-option
          v-for="item in dateOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- 底部按钮 -->
    <div class="btn">
      <div class="button" @click="ok">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (!this.data.token) {
      window.sessionStorage.setItem("path", this.$route.path);
      this.$router.push("/");
    }
  },
  data() {
    return {
      hintShow: false,
      name: "",
      data: {
        name: "",
        token: window.sessionStorage.getItem("token"),
        rule_id: ""
      },
      dateOption: [
        { value: "1", label: "采购" },
        { value: "2", label: "仓管" },
        { value: "3", label: "品质" },
        { value: "4", label: "物控" },
        { value: "5", label: "门卫" }
      ],
      address: ""
    };
  },
  methods: {
    // 验证格式
    test() {
      let reg = /^(aaa)+[\u4e00-\u9fa5]{0,}$/;
      if (this.name == "") {
        this.hintShow = false;
      } else if (!reg.test(this.name)) {
        this.hintShow = true;
        return false;
      } else {
        this.data.name = this.name.substring(3);
        this.hintShow = false;
      }
      return true;
    },
    ok() {
      if (this.hintShow == true) {
        return false;
      } else {
        if (this.data.name == "" && this.data.rule_id != "") {
          this.$toast.fail("请输入姓名");
        } else if (this.data.rule_id == "" && this.data.name != "") {
          this.$toast.fail("请选择部门");
        } else if (this.data.name == "" && this.data.rule_id == "") {
          this.$toast.fail("请输入信息");
        } else {
          this.$http
            .post("/client/register", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$router.push("/zhuceok");
              } else {
                this.$router.push("/zhucefail");
              }
            });
        }
      }
    }
  }
};
</script>
<style>
</style>
<style scoped>
.name >>> .el-select input {
  border: none !important;
  color: #000 !important;
  background-color: transparent !important;
}
.name {
  background: #f0f0f0;
  border-radius: 0.5rem;
  border: 1px solid #fff;
  border-bottom: 1px solid #efbf6e;
  text-align: center;
  box-sizing: border-box;
  height: 0.3rem;
  line-height: 0.3rem;
  width: 75%;
  margin-top: 0.1rem;
}

.btn {
  text-align: center;
  margin-top: 2rem;
}
.same {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
</style>