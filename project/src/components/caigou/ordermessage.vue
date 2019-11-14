<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">订单详情</div>
    <div class="card">
      <div class="item">
        订 &nbsp单 &nbsp号 :
        <span>{{item.order_coding}}</span>
      </div>
      <div class="item">
        供 &nbsp货 &nbsp商 :
        <span>{{item.delivery_name}}</span>
      </div>
      <div class="item">
        物料编号 :
        <span>{{item.material_coding}}</span>
      </div>
      <div class="item">
        物料名称 :
        <span>{{item.material_name}}</span>
      </div>
      <div class="item">
        物料规格 :
        <span>{{item.material_model}}</span>
      </div>
      <div class="item">
        最晚可送货日期 :
        <div style="display:inline-block;">{{item.fast_time*1000|formatDate}}</div>
      </div>
      <div style="text-align:center;margin-top:3rem">
        <div class="same" style="border-radius: 0.15rem 0 0 0.15rem;" @click="$router.back(-1)">返回</div>
        <div class="same" style="border-radius: 0 0.15rem 0.15rem 0;" @click="del">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem('token'),
        id: window.sessionStorage.getItem("ordermessage")
      },
      item: []
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      this.$http
        .post("/audit/delivery_order_detail", this.$qs.stringify(this.data))
        .then(res => {
          this.item = res.data;
        });
    },
    // 删除
    del() {
      this.$dialog
        .confirm({
          message: "您确定删除此订单吗"
        })
        .then(() => {
          this.$http
            .post("/audit/delivery_order_delete", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.$router.push("/caigou/order");
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.item {
  margin-bottom: 0.1rem;
  font-size: 0.16rem;
}
.item .comn {
  display: inline-block;
  width: 4em;
  text-align: right;
  margin-right: 0.2rem;
}
.w3 {
  letter-spacing: 0.33365em;
}
.same {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
</style>