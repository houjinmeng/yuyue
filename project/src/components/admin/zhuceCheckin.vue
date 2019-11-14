<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">注册审核</div>
    <div class="card">
      <div class="message">
        <div>申请信息 :</div>
        <div>
          昵 &nbsp &nbsp &nbsp 称 &nbsp
          <span>{{list.nick}}</span>
        </div>
        <div>
          注册申请 &nbsp
          <span style="color:#e9b96a">{{list.rule_name}}, {{list.name}}</span>
        </div>
      </div>
      <div class="message">
        <div>注册信息</div>
        <div>
          <span style="margin-right:0.2rem">姓名</span>
          <el-input style="width:78%;" size="small" placeholder="请在此输入" v-model="data.real_name"></el-input>
        </div>
        <div>
          <span style="margin-right:0.2rem">分组</span>
          <el-select v-model="data.rule_id" :placeholder="rule_name" size="small" style="width:74%">
            <el-option
              v-for="item in dateOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="bottom1">
        <span class="samebtn" @click="lahei">拉黑</span>
        <span class="samebtn" @click="del">删除</span>
        <span class="samebtn" @click="ok">通过</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.list = JSON.parse(window.sessionStorage.getItem("item"));
    this.data.real_name = this.list.name;
    // this.data.rule_id = this.list.rule_name;
    let a = this.list.rule_name;
    if (a == "采购人员") {
      this.data.rule_id = "1";
    } else if (a == "仓库管理人员") {
      this.data.rule_id = "2";
    } else if (a == "品质人员") {
      this.data.rule_id = "3";
    } else if (a == "物控") {
      this.data.rule_id = "4";
    } else {
      this.data.rule_id = "5";
    }
  },
  data() {
    return {
      rule_name: "",
      list: {},
      dateOption: [
        { value: "1", label: "采购人员" },
        { value: "2", label: "仓库管理人员" },
        { value: "3", label: "品质人员" },
        { value: "4", label: "物控" },
        { value: "5", label: "门卫" }
      ],
      data: {
        real_name: "",
        token: window.sessionStorage.getItem("token"),
        rule_id: "",
        id: ""
      }
    };
  },
  methods: {
    // 通过
    ok() {
      this.data.id = this.list.id;
      this.$http
        .post("/audit/register_success", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.fail('审核失败');
          } else {
            this.$toast.success('审核通过');
            this.$router.push("/admin/zhucecheck");
          }
        });
    },
    // 拉黑
    lahei(id) {
      this.$dialog
        .confirm({
          message: "您确定拉黑此注册申请人吗"
        })
        .then(() => {
          this.data.id = this.list.id;
          this.$http
            .post("/audit/register_black", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.$router.push("/admin/zhucecheck");
              }
            });
        })
        .catch(() => {});
    },
    // 删除
    del(id) {
      this.$dialog
        .confirm({
          message: "您确定删除此申请吗"
        })
        .then(() => {
          this.data.id = this.list.id;
          this.$http
            .post("/audit/register_delete", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.$router.push("/admin/zhucecheck");
              }
            });
        })
        .catch(() => {});
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
.bottom1 {
  display: flex;
  justify-content: space-around;
  margin-top: 2.5rem;
}
.samebtn {
  display: inline-block;
  width: 0.6rem;
  height: 0.25rem;
  line-height: 0.25rem;
  text-align: center;
  color: #fff;
  background-color: #e9b96a;
  border-radius: 0.05rem;
}
.message {
  font-size: 0.16rem;
  border-bottom: 1px solid #cccccc;
  margin-bottom: 0.1rem;
}
.message div {
  margin-bottom: 0.1rem;
}
</style>