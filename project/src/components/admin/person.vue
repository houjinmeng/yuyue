<template>
  <div>
    <van-search v-model="data.key" placeholder="请输入部门或人名" show-action shape="round">
      <div slot="action" @click="getlist" class="search">搜索</div>
    </van-search>
    <div class="card" style="font-size:0.16rem">
      <div style="text-align:center;color:#ccc">采购/物控/品质/仓管/门卫 清单</div>
      <div class="list" v-for="(item,index) in list" :key="index">
        <div style="flex:2">{{item.real_name}}</div>
        <div style="flex:3">{{item.rule_name}}</div>
        <div
          style="flex:3;text-overflow:ellipsis;overflow:hidden;height:0.25rem;white-space:nowrap;"
        >{{item.brief}}</div>
        <div style="flex:1.3" class="samebtn" @click="message(item)">详情</div>
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
      value: "",
      data: {
        token: window.sessionStorage.getItem("token"),
        key: ""
      },
      list: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/audit/user_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
          console.log(this.list);
        });
    },
    onSearch() {},
    message(item) {
      window.sessionStorage.setItem("person", JSON.stringify(item));
      this.$router.push("/admin/personmessage");
    }
  }
};
</script>
<style scoped>
.search {
  width: 0.6rem;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: #ffffff;
  background-color: #e9b96a;
  border-radius: 0.1rem;
}
.list {
  padding: 0.1rem 0.05rem;
  border-bottom: 1px solid #cccccc;
  display: flex;
}
.van-search__content {
  background-color: #fff !important;
}
.van-search {
  background-color: #f0f2f5 !important;
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
</style>