<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">预约查询结果</div>
    <div class="card">
      <div class="title">
        关 &nbsp键 &nbsp字 :
        <span style="color:#e0b166">{{key}}</span>
      </div>
      <div class="card2" v-for="(item,index) in table" :key="index">
        <div>订 &nbsp单 &nbsp号 : {{item.order_coding}}</div>
        <div>
          <span v-show="item.status!='未预约'">时 &nbsp &nbsp &nbsp 间 :</span>
          <span v-show="item.status=='未预约'">最晚日期 :</span>
          <span>{{item.time*1000|formatDate}}</span>
        </div>
        <div>
          <span v-show="item.status!='未预约'">送货地点 :</span>
          <span>{{item.name}}</span>
        </div>
        <div style="display:flex;justify-content: space-between">
          <div style="margin:0;padding-top:0.04rem">
            <span>状 &nbsp &nbsp &nbsp 态 :</span>
            <span>{{item.status}}</span>
          </div>
          <span class="xiangqing" @click="ordermessage(item.delivery_id,item.status,item.id)">详情</span>
        </div>
      </div>
    </div>
    <div style="text-align:center">
        <div class="button" style="margin-top:0.1rem" @click="$router.back(-1)">返回</div>
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
      return formatDate(date, "hh点"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    this.table = JSON.parse(window.sessionStorage.getItem("check"));
    this.table.forEach(item => {
      if (item.status == 0) {
        item.status = "待审核";
      } else if (item.status == 1) {
        item.status = "已审核";
      } else if (item.status == 2) {
        item.status = "已拒绝,需重新预约";
      } else if (item.status == 3) {
        item.status = "已完成";
      } else if (item.status == -1) {
        item.status = "未预约";
      } else {
        item.status = "已延迟";
      }
    });
  },
  data() {
    return {
      table: [],
      key: window.sessionStorage.getItem("checkkey")
    };
  },
  methods: {
    ordermessage(goodsid, status, id) {
      window.sessionStorage.setItem("ordermessage", id);
      window.sessionStorage.setItem("goodsid", goodsid);
      window.sessionStorage.setItem("songhuostatus", status);
      if (status == "未预约") {
        this.$router.push("/caigou/ordermessage");
      } else if (status == "已拒绝,需重新预约") {
        this.$router.push("/outman/songhuoloser");
      } else if (status == "已完成") {
        this.$router.push("/outman/songhuosuccess");
      } else if (status == "待审核") {
        this.$router.push("/outman/songhuocheck");
      } else {
        this.$router.push("/outman/songhuocheckok");
      }
    }
  }
};
</script>
<style scoped>
.title {
  padding: 0.1rem 0.05rem;
  border-bottom: 1px solid #cccccc;
  font-size: 0.16rem;
}
.card2 {
  padding: 0.1rem 0.05rem;
  border-bottom: 1px solid #cccccc;
  font-size: 0.16rem;
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
.w3 {
  display: inline-block;
  width: 5em;
  letter-spacing: 0.33365em;
}
.card2 div {
  margin-bottom: 0.1rem;
}
</style>