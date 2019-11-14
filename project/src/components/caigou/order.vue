<template>
  <div>
    <van-search v-model="data.key" placeholder="请输入订单号" show-action shape="round" type="number">
      <div slot="action" @click="list" class="search">搜索</div>
    </van-search>
    <div style="font-size:0.24rem;text-align:center;padding:0.06rem 0 0.15rem 0;">可送货订单</div>
    <div class="card1">
      <div class="box" v-for="(item,index) in table" :key="index">
        <div style="color:#e9b96a">{{item.order_coding}}</div>
        <div>{{item.name}}</div>
        <div style="display:flex;justify-content: space-between">
          {{item.material_name}}
          <span class="xiangqing" @click="message(item.id)">详情</span>
        </div>
      </div>
    </div>
    <div class="bottom" v-show="bot">
      <router-link to="/caigou/addorder">
        <div class="button" style="margin-top:0.15rem">添加可送货订单</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.list();
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.bot = false;
      } else {
        this.bot = true;
      }
    };
  },
  methods: {
    // 获取列表
    list() {
      this.$http
        .post("/audit/delivery_order_list", this.$qs.stringify(this.data))
        .then(res => {
          this.table = res.data;
        });
    },
    // 详情
    message(id) {
      window.sessionStorage.setItem("ordermessage", id);
      this.$router.push("/caigou/ordermessage");
    }
  },
  data() {
    return {
      table: [],
      value: "",
      data: { token: window.sessionStorage.getItem("token"), key: "" },
      clientHeight: document.documentElement.clientHeight,
      bot: true // 控制按钮盒子显示隐藏
    };
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
.van-search__content {
  background-color: #fff !important;
}
.van-search {
  background-color: #f0f2f5 !important;
}
.card1 {
  /* position: fixed; */
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 4.5rem;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
}
.bottom {
  
  bottom: 0.5rem;
  background-color: #fff;
  height: 0.6rem;
  width: 100%;
  border-top: 1px solid #f2f2f2;
  text-align: center;
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
}
</style>