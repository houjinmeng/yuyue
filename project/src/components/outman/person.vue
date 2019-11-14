<template>
  <div>
    <!-- <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">我的预约</div> -->
    <van-tabs v-model="active">
      <van-tab title="拜访预约">
        <div class="cards6" v-for="(item,index) in data1" :key="index">
          <div class="top1">业务会面预约</div>
          <div class="bot">
            <div>
              <span>时&nbsp &nbsp间</span>
              &nbsp&nbsp&nbsp
              {{item.time*1000|formatDate}}
            </div>
            <div>
              <span>接待人</span>
              &nbsp&nbsp&nbsp
              {{item.audit_name}}
            </div>
            <div>
              <span>状&nbsp &nbsp态</span>
              &nbsp&nbsp&nbsp
              {{item.status}}
            </div>
            <div style="margin-top:0.2rem;text-align:center;">
              <el-button
                size="small"
                style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff;border-radius:none"
                round
                @click="yewu2(item.id,item.status)"
              >查看详情</el-button>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="送货预约">
        <div class="cards6" v-for="(item,index) in data2" :key="index+30">
          <div class="top1">送货预约</div>
          <div class="bot">
            <div>
              <span>时&nbsp &nbsp间</span>
              &nbsp&nbsp&nbsp
              {{item.time*1000|formatDate}}
            </div>
            <div>
              <span>订单号</span>
              &nbsp&nbsp&nbsp
              {{item.order_coding}}
            </div>
            <div>
              <span>送货点</span>
              &nbsp&nbsp&nbsp
              {{item.name}}
            </div>
            <div>
              <span>状&nbsp &nbsp态</span>
              &nbsp&nbsp&nbsp
              {{item.status}}
            </div>
            <div style="margin-top:0.2rem;text-align:center;">
              <el-button
                size="small"
                style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff;border-radius:none"
                round
                @click="goods(item.id,item.status)"
              >查看详情</el-button>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  //  时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  mounted() {
    this.yewu();
    this.songhuo();
  },
  data() {
    return {
      active: 0,
      data: { token: window.sessionStorage.getItem("token") },
      data1: [],
      data2: []
    };
  },
  methods: {
    // 拜访预约列表
    yewu() {
      this.$http
        .post("/client/business_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(item => {
            if (item.status == 0) {
              item.status = "等待来访";
            } else {
              item.status = "已经完成";
            }
          });
          this.data1 = res.data;
        });
    },
    // 送货预约列表
    songhuo() {
      this.$http
        .post("/client/delivery_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(item => {
            if (item.status == 0) {
              item.status = "待审核";
            } else if (item.status == 1) {
              item.status = "审核通过";
            } else if (item.status == 2) {
              item.status = "已拒绝,需重新预约";
            } else if (item.status == 3) {
              item.status = "已完成";
            } else {
              item.status = "已延迟";
            }
          });
          this.data2 = res.data;
        });
    },
    yewu2(id,st) {
      window.sessionStorage.setItem("yewuid", id);
      window.sessionStorage.setItem("yewust",st)
      this.$router.push("/outman/yewumessage");
    },
    goods(id, status) {
      window.sessionStorage.setItem("goodsid", id);
      window.sessionStorage.setItem("songhuostatus", status);
      if (status == "待审核") {
        this.$router.push("/outman/songhuocheck");
      } else if (status == "已拒绝,需重新预约") {
        this.$router.push("/outman/songhuoloser");
      } else if (status == "已完成") {
        this.$router.push("/outman/songhuosuccess");
      } else {
        this.$router.push("/outman/songhuocheckok");
      }
    }
  }
};
</script>
<style lang="">
.van-tabs__line {
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 1;
  height: 3px;
  background-color: #e0b166 !important;
  border-radius: 3px;
}
</style>
<style scoped>
.cards6 {
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
  border-radius: 0.1rem;
  margin-top: 0.1rem;
  font-size: 0.14rem;
}
.cards6 .top1 {
  border-bottom: 2px solid #f0f2f5;
  /* line-height: 0.1rem; */
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
}
.cards6 .bot {
  padding: 0.1rem 0.2rem;
}
.cards6 .bot div {
  margin-bottom: 0.1rem;
}
</style>