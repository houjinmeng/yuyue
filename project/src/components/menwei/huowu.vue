<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">送货预约</div>
    <div style="text-align:center;margin:0.1rem 0;color:red" v-if="status==3">
      <img src="../../assets/img/shibai.png" alt style="width:1rem;height:1rem" />
      <div>预约信息不存在</div>
      <div>来访时间已过/还未到</div>
      <div>预约已达成</div>
    </div>
    <div class="cards">
      <div class="top">公司和订单号</div>
      <div class="bot">
        <div>订 &nbsp单 &nbsp号 &nbsp&nbsp&nbsp {{order.order_coding}}</div>
        <div>供 &nbsp货 &nbsp商 &nbsp&nbsp&nbsp {{order.name}}</div>
      </div>
    </div>
    <div class="cards">
      <div class="top">时间和地点</div>
      <div class="bot">
        <div>日期时间 &nbsp&nbsp&nbsp {{list.time*1000|formatDate}} {{list.time*1000|formatDateTwo}}</div>
        <div>送货地点 &nbsp&nbsp&nbsp {{list.name}}</div>
      </div>
    </div>
    <div class="cards">
      <div class="top">物料</div>
      <div class="bot">
        <div>物料编号 &nbsp&nbsp&nbsp {{order.material_coding}}</div>
        <div>物料名称 &nbsp&nbsp&nbsp {{order.material_name}}</div>
        <div>物料规格 &nbsp&nbsp&nbsp {{order.material_model}}</div>
        <div>物料数量 &nbsp&nbsp&nbsp {{list.material_number}}</div>
      </div>
    </div>
    <div class="cards">
      <div class="top">人员</div>
      <div class="bot">
        <div>人员总数 &nbsp&nbsp&nbsp {{list.client_number}}</div>
        <div v-for="(item,index) in phones" :key="index+10">
          <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">联系电话</span> &nbsp&nbsp&nbsp {{item}}
        </div>
      </div>
    </div>
    <div class="cards">
      <div class="top">车辆</div>
      <div class="bot">
        <div>车辆总数 &nbsp&nbsp&nbsp {{carnum}}</div>
        <div v-for="(item,index) in cars" :key="index">
          <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">车牌号码</span>
          &nbsp&nbsp&nbsp {{item}}
        </div>
      </div>
    </div>
    <div style="text-align:center;margin:0.2rem 0">
      <div class="button" @click="ok">确认放行</div>
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
    let qr = JSON.parse(window.sessionStorage.getItem("qr"));
    this.data.id = qr.id;
    this.data.type = qr.type;
    this.getlist();
  },
  data() {
    return {
      data: {
        token: window.sessionStorage.getItem("token"),
        id: "",
        type: ""
      },
      order: {},
      list: {},
      cars: [],
      phones: [],
      status: "",
      carnum: ""
    };
  },
  methods: {
    // 放行
    ok() {
      this.$dialog
        .confirm({
          message: "确定放行吗"
        })
        .then(() => {
          this.$http
            .post("/audit/release", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.$router.push("/menwei");
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 获取送货订单信息
    getlist() {
      this.$http
        .post("/audit/qr_code", this.$qs.stringify(this.data))
        .then(res => {
          this.order = res.data.data.delivery_order;
          this.list = res.data.data.delivery;
          this.cars = res.data.data.delivery.cart.split(",");
          this.phones = res.data.data.delivery.phone.split(",");
          this.status = res.data.data.status;
          this.carnum = this.cars.length;
        });
    }
  }
};
</script>
<style>
.yincang {
  visibility: hidden;
}
</style>