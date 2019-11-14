<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">
      拜访预约号码
    </div>
    <div class="card">
      <div class="item">
        <el-form :model="list" :rules="rules" ref="list" class="demo-ruleForm">
          <el-form-item prop="code">
            <span style="font-size:0.16rem">新号码</span>&nbsp&nbsp
            <el-input
              style="width:52%;"
              size="small"
              placeholder="请在此输入手机号"
              type="number"
              oninput="if(value.length>11)value=value.slice(0,11)"
              v-model="list.code"
            ></el-input>
            <span class="xiangqing1" @click="add('list')">添加</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="item" v-for="(item, index) in table" :key="index">
        <div>{{ item.code }}</div>
        <span class="xiangqing" @click="delet(item.id)">删除</span>
      </div>
    </div>
    <div style="text-align:center">
      <router-link to="/caigou/home">
        <div class="button" style="margin-top:0.2rem">返回</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
  },
  data() {
    return {
      hintShow: true,
      list: { token: window.sessionStorage.getItem("token"), code: "" },
      table: [],
      rules: {
        code: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$http
        .post("/audit/business_code_list", this.$qs.stringify(this.list))
        .then(res => {
          this.table = res.data;
        });
    },
    // 添加
    add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/audit/business_code_add", this.$qs.stringify(this.list))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.list.code = "";
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    delet(id) {
      this.$dialog
        .confirm({
          message: "确定要删除该预约号码吗"
        })
        .then(() => {
          let data = { token: window.sessionStorage.getItem("token"), id: id };
          this.$http
            .post("/audit/business_code_delete", this.$qs.stringify(data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="">
.el-form-item__error {
  top: 90% !important;
  left: 0.68rem !important;
}
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.card >>> .el-form-item {
  margin-bottom: 0 !important;
}
.xiangqing1 {
  display: inline-block;
  width: 0.6rem;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: #fff;
  background-color: #e9b96a;
  border-radius: 0.1rem;
}
.item {
  border-bottom: 1px solid #cccccc;
  padding: 0.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
