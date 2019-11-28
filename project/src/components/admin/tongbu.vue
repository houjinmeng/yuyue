<template>
  <div>
    <div class="loading" v-show="tishi">
      <van-loading
        type="spinner"
        size="0.3rem"
        :vertical="true"
        style="margin:0.3rem 0"
        >数据加载中...</van-loading
      >
    </div>
    <div style="overflow: hidden;">
      <div class="btn" @click="tongbu">同步厂商</div>
    </div>
    <div class="card" style="font-size:0.14rem">
      <div class="box" v-for="(item, index) in list" :key="index">
        <div>{{ item.name }}</div>
        <div>{{ item.coding }}</div>
        <div>
          <span>验证码</span>
          <span
            style="color:#e9b96a;display:inline-block;width:1.05rem;margin-left:0.05rem"
            >{{ item.code }}</span
          >
        </div>
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
      tishi: true,
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
        .post("/audit/delivery_code_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
          this.tishi = false;
        });
    },
    tongbu() {
      this.$http.post("/audit/renewal").then(res => {
        if (res.data.code == 1) {
          this.$toast.success("同步成功");
          this.getlist();
        } else {
          this.$toast.fail("同步失败");
        }
      });
    }
  }
};
</script>
<style scoped>
.btn {
  font-size: 0.16rem;
  background-color: #a5d63f;
  color: #ffffff;
  padding: 0.1rem;
  text-align: center;
  width: 50%;
  margin: 0.1rem auto;
}
.box {
  padding: 0.1rem 0.1rem 0;
  border-bottom: 1px solid #cccccc;
  overflow: auto;
}
.box div {
  margin-bottom: 0.08rem;
}
</style>
