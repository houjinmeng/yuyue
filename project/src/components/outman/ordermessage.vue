<template>
  <div>
    <div class="head" style="background:#fff">
      <router-link to="/outman/songhuo">
        <van-icon name="arrow-left" class="back" /> </router-link
      >订单详情
    </div>
    <div style="padding: 0.1rem 0.2rem">
      {{ name }} &nbsp &nbsp 订单号: {{ data.order_coding }}
    </div>
    <div style="padding:0 0.1rem" class="big">
      <div class="box" v-for="(item, index) in list" :key="index">
        <div style="padding-bottom:0.1rem;display:flex;align-items:top">货物名称 : 
          <el-input
            type="textarea"
            autosize
            disabled=""
            v-model="item.FInvName"
            style="width:70%"
            resize='none'
          >
          </el-input>
        </div>
        <div style="padding-bottom:0.1rem;display:flex;align-items:top">
          货物规格 :
          <el-input
            type="textarea"
            autosize
            disabled=""
            v-model="item.FInvStd"
            style="width:70%"
            resize='none'
          >
          </el-input>
        </div>
        <div>要求日期 : {{ item.FNDate }}</div>
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
      return formatDate(date, "yyyy/MM/dd"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm"); // 时间点 例 21点12分12秒的格式
    }
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        order_coding: window.sessionStorage.getItem("coding")
      },
      name: window.sessionStorage.getItem("name"),
      list: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/client/order_detail", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>
<style scoped>
.big >>> .el-textarea.is-disabled .el-textarea__inner {
  background-color: #ffffff !important;
  border: none !important;
  color: #000 !important;
  cursor: not-allowed !important;
  text-align: left !important;
  font-size: 0.14rem !important
}
.big >>> .el-textarea__inner{
  padding: 0 !important;
  padding-left: 0.05rem !important
}
.box {
  background-color: #fff;
  border-radius: 0.1rem;
  padding: 0.1rem;
  margin-bottom: 0.1rem;
}
.head {
  padding: 0.1rem;
  font-size: 0.24rem;
  text-align: center;
  position: relative;
  border-bottom: 2px solid #f2f2f2;
}
.back {
  left: 0.1rem;
  position: absolute;
  top: 0.15rem;
}
</style>
