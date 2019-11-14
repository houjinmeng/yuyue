<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">预约详情</div>
    <div class="cards">
      <div class="top">状态信息</div>
      <div class="bot">
        <div>正在审核</div>
        <div>仓管({{cangguan}}),物控({{wukong}}),品质({{pinzhi}})</div>
      </div>
    </div>
    <div class="cards">
      <div class="top">订单信息</div>
      <div class="bot">
        <div>订 &nbsp单 &nbsp号 &nbsp&nbsp&nbsp {{order.order_coding}}</div>
        <div>供 &nbsp货 &nbsp商 &nbsp&nbsp&nbsp {{order.name}}</div>
        <div>物料编号 &nbsp&nbsp&nbsp {{order.material_coding}}</div>
        <div>物料名称 &nbsp&nbsp&nbsp {{order.material_name}}</div>
        <div>物料规格 &nbsp&nbsp&nbsp {{order.material_model}}</div>
      </div>
    </div>
    <div class="cards">
      <div class="top">送货信息</div>
      <div class="bot">
        <div>物料数量 &nbsp&nbsp&nbsp {{list.material_number}}</div>
        <div>托盘数量 &nbsp&nbsp&nbsp {{list.tray_number}}</div>
        <div>需要工具 &nbsp&nbsp&nbsp {{list.need_tool}}</div>
        <div>人员总数 &nbsp&nbsp&nbsp {{list.client_number}}</div>
        <div>送货地点 &nbsp&nbsp&nbsp {{list.name}}</div>
        <div>送货时间 &nbsp&nbsp&nbsp {{list.time*1000|formatDate}}</div>
        <div v-for="(item,index) in cars" :key="index">
          <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">车牌号码</span>
          &nbsp&nbsp&nbsp {{item}}
        </div>
        <div v-for="(item,index) in phones" :key="index+10">
          <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">联系电话</span> &nbsp&nbsp&nbsp {{item}}
        </div>
      </div>
    </div>
    <div class="cards">
      <div class="top0">质检报告</div>
      <div class="bot" style="padding-right:0">
        <van-uploader v-model="fileList" multiple :max-count="0" preview-size="0.95rem" />
      </div>
    </div>
    <div style="text-align:center;margin:0.2rem 0">
      <div class="button" @click="$router.back(-1)">返回</div>
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
  created() {
    this.getlist();
  },
  data() {
    return {
      ruleid: window.sessionStorage.getItem("rule_id"),
      cangguan: "",
      wukong: "",
      pinzhi: "",
      fileList: [],
      data: {
        token: window.sessionStorage.getItem("token"),
        id: window.sessionStorage.getItem("goodsid")
      },
      order: {},
      list: {},
      cars: [],
      phones: []
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/client/delivery_detail", this.$qs.stringify(this.data))
        .then(res => {
          this.order = res.data.delivery_order;
          this.list = res.data.delivery;
          this.cars = res.data.delivery.cart.split(",");
          this.phones = res.data.delivery.phone.split(",");
          res.data.img_list.forEach(item => {
            item.url = "http://booking.goldenbrother.cn" + item.url;
          });
          this.fileList = res.data.img_list;
          if (this.list.warehouse == 1) {
            this.cangguan = "已通过";
          } else {
            this.cangguan = "等待审核";
          }
          if (this.list.material == 1) {
            this.wukong = "已通过";
          } else {
            this.wukong = "等待审核";
          }
          if (this.list.quality == 1) {
            this.pinzhi = "已通过";
          } else {
            this.pinzhi = "等待审核";
          }
        });
    }
  }
};
</script>
<style scoped>
.cards >>> .van-icon {
  visibility: hidden;
}
.cards .top0 {
  border-bottom: 2px solid #f0f2f5;
  /* line-height: 0.1rem; */
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
}
</style>