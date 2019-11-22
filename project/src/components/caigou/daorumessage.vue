<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">信息导入结果</div>
    <div class="card1">
      <div class="box" v-for="(item,index) in table" :key="index">
        <div style="margin-bottom:0.1rem">{{item.name}}</div>
        <div style="display:flex;justify-content: space-between;align-items: center">
          <div style="margin:0">{{item.code}}</div>
          <div style="margin:0">
            <span class="xiangqing" @click="delet(index)">删除</span>
            <span class="xiangqing" @click="add(index)">添加</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="button" style="margin-top:0.15rem" @click="deletall()">全部删除</div>
      <div class="button" @click="addall">全部添加</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.list = window.sessionStorage.getItem("list").split(".");
    this.list.forEach(item => {
      var arry = item.split(",");
      var obj = { name: arry[0], code: arry[1] };
      this.table.push(obj);
    });
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        list: []
      },
      list: [],
      table: []
    };
  },
  methods: {
    // 添加
    add(id) {
      this.data.list.push(this.list[id]);
      this.$http
        .post("/audit/delivery_code_insertall", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.fail(res.data.msg);
          } else {
            this.$toast.success(res.data.msg);
            this.data.list = [];
            this.table.splice(id, 1);
            this.list.splice(id, 1);
          }
        });
    },
    addall() {
      this.data.list = this.list;
      this.$http
        .post("/audit/delivery_code_insertall", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.fail(res.data.msg);
          } else {
            this.$toast.success(res.data.msg);
            this.data.list = [];
            this.$router.push("/caigou/changshang");
          }
        });
    },
    // 删除
    delet(index) {
      this.$dialog
        .confirm({
          message: "您确定删除本条信息吗"
        })
        .then(() => {
          this.table.splice(index, 1);
          this.list.splice(index, 1);
        })
        .catch(() => {
          console.log(index);
        });
    },
    deletall() {
      this.$dialog
        .confirm({
          message: "您确定删除全部信息吗"
        })
        .then(() => {
          this.table = [];
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 10%;
  width: 100%;
  /* box-shadow: 2px 4px 0.1rem #000; */
  border-top: 1px solid #e9b96a;
  text-align: center;
}
.card1 {
  position: fixed;
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 78%;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
}
.box {
  padding: 0.1rem 0.1rem 0;
  border-bottom: 1px solid #cccccc;
  font-size: 0.16rem;
  overflow: auto;
}
.box div {
  margin-bottom: 0.08rem;
}
.xiangqing {
  display: inline-block;
  width: 0.6rem;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: #fff;
  background-color: #e9b96a;
  border-radius: 0.1rem;
  margin-left: 0.1rem;
}
</style>