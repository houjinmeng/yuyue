<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">第一步: 核对订单信息</div>
    <div class="card">
      <div>订&nbsp 单&nbsp 号&nbsp&nbsp&nbsp {{data.order_coding}}</div>
      <div>供&nbsp 货&nbsp 商&nbsp&nbsp&nbsp {{data.delivery_name}}</div>
      <div>物料编号&nbsp&nbsp&nbsp {{data.material_coding}}</div>
      <div>物料名称&nbsp&nbsp&nbsp {{data.material_name}}</div>
      <div>物料规格&nbsp&nbsp&nbsp {{data.material_model}}</div>
      <div>最晚日期&nbsp&nbsp&nbsp {{data.fast_time*1000|formatDate}}</div>
      <div style="margin-top:0.8rem">请核对以上信息,如无误请点击 "下一步" 。</div>
      <div style="margin-top:2.6rem;text-align:center;">
        <el-button
          style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff"
          round
          @click="go"
        >下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  // 时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh点mm"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    let a = JSON.parse(window.sessionStorage.getItem("order"));
    if (a != null) {
      this.data = a;
    }
    let b = JSON.parse(window.sessionStorage.getItem("uporder"));
    if (b != null) {
      this.data.order_coding = b.order_coding;
      this.data.delivery_name = b.name;
      this.data.material_coding = b.material_coding;
      this.data.material_model = b.material_model;
      this.data.material_name = b.material_name;
      this.data.fast_time = b.fast_time;
    }
  },
  data() {
    return {
      data: {
        material_coding: "",
        material_model: "",
        material_name: "",
        delivery_name: "",
        order_coding: "",
        fast_time: ""
      }
    };
  },
  methods: {
    go() {
      this.$router.push("/outman/songhuomessage");
    }
  }
};
</script>
<style lang='less' scoped>
.card {
  position: fixed;
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 85%;
  border-radius: 0.1rem;
  padding: 0.1rem;
  div {
    margin-bottom: 0.06rem;
    font-size: 0.16rem;
  }
}
</style>