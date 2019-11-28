<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">人员信息</div>
    <div class="card">
      <div class="one">
        <span style="margin-right:0.2rem">姓名</span>
        <el-input style="width:78%;" size="small" placeholder="请在此输入" v-model="data.real_name"></el-input>
      </div>
      <div class="one">
        <span style="margin-right:0.2rem">昵称</span>
        <el-input style="width:78%;" size="small" placeholder="请在此输入" v-model="list.nick" disabled></el-input>
      </div>
      <div class="one">
        <span style="margin-right:0.2rem">权限</span>
        <el-select placeholder="请选择" size="small" style="width:74%" v-model="data.rule_id">
          <el-option
            v-for="item in dateOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="one">备注信息</div>
      <el-input type="textarea" placeholder="请输入详细原因" v-model="data.brief" :autosize="{minRows:5}"></el-input>
      <div class="bottom1">
        <span
          class="samebtn"
          style="background-color:#a27836;border-radius:0.15rem 0 0 0.15rem"
          v-if="jinyong"
          @click="lock"
        >已禁用</span>
        <span
          class="samebtn"
          v-if="qiyong"
          @click="lock"
          style="border-radius:0.15rem 0 0 0.15rem "
        >已启用</span>
        <router-link to="/admin/person">
          <span class="samebtn">返回</span>
        </router-link>
        <span class="samebtn" @click="ok" style="border-radius:0 0.15rem 0.15rem 0 ;">保存</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.list = JSON.parse(window.sessionStorage.getItem("person"));
    let a = this.list.rule_name;
    if (a == "仓库管理人员") {
      a = "2";
    } else if (a == "采购人员") {
      a = "1";
    } else if (a == "品质人员") {
      a = "3";
    } else if (a == "物控") {
      a = "4";
    } else {
      a = "5";
    }
    this.data.rule_id = a;
    this.data.real_name = this.list.real_name;
    this.data.id = this.list.id;
    this.data.brief = this.list.brief;
    if (this.list.lock == 0) {
      this.qiyong = true;
    } else {
      this.jinyong = true;
    }
  },
  data() {
    return {
      jinyong: false,
      qiyong: false,
      list: {},
      dateOption: [
        { value: "1", label: "采购" },
        { value: "2", label: "仓管" },
        { value: "3", label: "品质" },
        { value: "4", label: "物控" },
        { value: "5", label: "门卫" },
        { value: "7", label: "其它业务部门" },
      ],
      data: {
        token: window.sessionStorage.getItem("token"),
        id: "",
        real_name: "",
        rule_id: "",
        brief: ""
      }
    };
  },
  methods: {
    // 保存
    ok() {
      this.$http
        .post("/audit/user_edit", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.fail(res.data.msg);
          } else {
            this.$toast.success("保存成功");
            this.$router.push("/admin/person");
          }
        });
    },
    // 禁用启用
    lock() {
      this.$http
        .post("/audit/user_lock", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            if (this.jinyong == false) {
              this.$toast.success("禁用成功");
              this.qiyong = false;
              this.jinyong = true;
            } else {
              this.$toast.success("启用成功");
              this.qiyong = true;
              this.jinyong = false;
            }
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
.el-textarea__inner {
  border: 1px solid #000;
  color: #000;
}
</style>
<style scoped>
.one {
  margin-bottom: 0.1rem;
  font-size: 0.16rem;
}

.bottom1 {
  text-align: center;
  margin-top: 0.8rem;
  font-size: 0.16rem;
}
.samebtn {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
</style>