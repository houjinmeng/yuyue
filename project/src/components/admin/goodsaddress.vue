<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">送货地点</div>
    <div class="card" style="height:5rem">
      <div class="list1" style="margin-bottom:0.15rem">
        <span>新地点</span>
        <el-input style="width:62%;" size="small" placeholder="请在此输入 (例: A仓库)" v-model="data.name"></el-input>
        <span class="samebtn" @click="add">添加</span>
      </div>
      <div class="list1" v-for="(item,index) in list" :key="index">
        <div>{{item.name}}</div>
        <div class="samebtn" @click="del(item.id)">删除</div>
      </div>
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
      list: [],
      data: { token: window.sessionStorage.getItem("token"), id: "", name: "" }
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/audit/stock_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    del(id) {
      this.data.id = id;
      this.$http
        .post("/audit/stock_delete", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.fail(res.data.msg);
          } else {
            this.$toast.success(res.data.msg);
            this.getlist();
          }
        });
    },
    add() {
      if (this.data.name == "") {
        this.$toast.fail("请输入送货地址");
      } else {
        this.$http
          .post("/audit/stock_add", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 0) {
              this.$toast.fail(res.data.msg);
            } else {
              this.$toast.success(res.data.msg);
              this.getlist();
              this.data.name = "";
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
.list1 {
  font-size: 0.16rem;
  border-bottom: 1px solid #ccc;
  padding: 0.1rem 0.05rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.samebtn {
  display: inline-block;
  width: 0.6rem;
  height: 0.3rem;
  line-height: 0.3rem;
  text-align: center;
  color: #fff;
  background-color: #e9b96a;
  border-radius: 0.05rem;
}
</style>