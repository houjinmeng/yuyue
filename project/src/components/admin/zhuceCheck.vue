<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">注册申请</div>
    <div class="card5">
      <div class="box5" v-for="(item,index) in list" :key="index">
        <div>{{item.nick}}</div>
        <div>{{item.rule_name}}, {{item.name}}</div>
        <div>
          <span class="samebtn" style="margin-left:1.2rem" @click="lahei(item.id)">拉黑</span>
          <span class="samebtn" @click="del(item.id)">删除</span>
          <span class="samebtn" @click="check(item)">审核</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="button" style="margin-top:0.15rem" @click="delall">删除所有</div>
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
      data: { token: window.sessionStorage.getItem('token'), id: "" },
      ids: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/audit/register_check", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    },
    // 删除所有
    delall() {
      this.$dialog
        .confirm({
          message: "您确定删除所有申请吗"
        })
        .then(() => {
          this.list.forEach(item => {
            this.ids.push(item.id);
          });
          this.data.id = this.ids.join(",");
          this.$http
            .post("/audit/register_delete", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.getlist();
              }
            });
        })
        .catch(() => {});
    },
    // 拉黑
    lahei(id) {
      this.$dialog
        .confirm({
          message: "您确定拉黑此申请吗"
        })
        .then(() => {
          this.data.id = id;
          this.$http
            .post("/audit/register_black", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.getlist();
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
          this.data.id = id;
          this.$http
            .post("/audit/register_delete", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.getlist();
              }
            });
        })
        .catch(() => {});
    },
    // 审核
    check(item) {
      window.sessionStorage.setItem("item", JSON.stringify(item));
      this.$router.push("/admin/zhucecheckin");
    }
  }
};
</script>
<style scoped>
.box5 {
  padding: 0.1rem 0.05rem;
  font-size: 0.16rem;
  border-bottom: 1px solid #cccccc;
}
.box5 div {
  margin-bottom: 0.1rem;
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
.card5 {
  position: fixed;
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 70%;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
}
.bottom {
  position: fixed;
  bottom: 0.5rem;
  background-color: #fff;
  height: 10%;
  width: 100%;
  box-shadow: 2px 4px 0.1rem #000;
  text-align: center;
}
</style>