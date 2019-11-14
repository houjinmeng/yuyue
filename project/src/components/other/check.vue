<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">待审核预约</div>
    <div class="common" v-for="(item,index) in list" :key="index">
      <div class="top6">送货预约</div>
      <div class="bot1">
        <div>
          <span>订 &nbsp单 &nbsp号</span>
          <span>{{item.order_coding}}</span>
        </div>
        <div>
          <span>送货时间</span>
          <span>{{item.time*1000|formatDate}}</span>
        </div>
        <div>
          <span>送货地点</span>
          <span>{{item.name}}</span>
        </div>
        <div style="display:flex;justify-content:space-between">
          <div style="margin:0">
            <span style="display:inline-block;margin-top:0.04rem">物料名称</span>
            <span style="display:inline-block">{{item.material_name}}</span>
          </div>
          <span class="xiangqing" @click="check(item.id)">审核</span>
        </div>
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
      return formatDate(date, "hh:mm:ss"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: { token: window.sessionStorage.getItem("token") },
      list: []
    };
  },
  methods: {
    check(id) {
      window.sessionStorage.setItem("otherid", id);
      this.$router.push("/other/gocheck");
    },
    getlist() {
      this.$http
        .post("/audit/check_list", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
        });
    }
  }
};
</script>
<style scoped>
.common {
  background-color: #fff;
  border-radius: 0.1rem;
  width: 95%;
  margin: 0 auto;
  font-size: 0.16rem;
  margin-bottom: 0.1rem;
}
.common:last-child {
  margin-bottom: 0.6rem;
}
.common .top6 {
  padding: 0.1rem;
  border-bottom: 1px solid #f0f2f5;
}
.common .bot1 {
  padding: 0.1rem;
}
.bot1 div {
  margin-bottom: 0.1rem;
}
.bot1 div span:first-child {
  display: inline-block;
  margin-right: 0.1rem;
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