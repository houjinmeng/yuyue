<template>
  <div>
    <div style="text-align:center;margin:0.1rem 0">
      <img :src="url" alt style="width:1.4rem;height:1.4rem" />
    </div>
    <div class="list" style="margin-top:0.1rem">
      <div>预约类型 &nbsp&nbsp&nbsp 业务会面预约</div>
      <div style="display:flex;align-items:top">
        <span style="margin-right:0.24rem;display:inline-block;height:100%">访客公司</span>
        <div style="margin:0;display:inline-block;width:1.4rem;align-items:center">{{data.company}}</div>
      </div>
      <div>访客姓名 &nbsp&nbsp&nbsp {{data.client_name}}</div>
      <div>接待姓名 &nbsp&nbsp&nbsp {{data.audit_name}}</div>
      <div>来访日期 &nbsp&nbsp&nbsp {{data.time*1000|formatDate}}</div>
      <div v-for="(item,index) in cars" :key="index">
        <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">车牌号码</span>
        &nbsp&nbsp&nbsp {{item}}
      </div>
      <div v-for="(item,index) in phone" :key="index+10">
        <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">联系电话</span> &nbsp&nbsp&nbsp {{item}}
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="btn">
      <router-link to="/huike">
        <div class="same">返 回</div>
      </router-link>
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
    this.list.id = window.sessionStorage.getItem("yewuid");
    this.getlist();
  },
  data() {
    return {
      url: "",
      data: {},
      list: { token: window.sessionStorage.getItem("token"), id: "" },
      cars: [],
      phone: []
    };
  },
  methods: {
    // 取消
    quxiao() {
      this.$dialog
        .confirm({
          message: "确定取消该预约吗"
        })
        .then(() => {
          this.$http
            .post("/client/business_delete", this.$qs.stringify(this.list))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.$router.push("/outman/person");
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    getlist() {
      this.$http
        .post("/client/business_detail", this.$qs.stringify(this.list))
        .then(res => {
          this.url = "http://booking.goldenbrother.cn/" + res.data.qrcode;
          this.data = res.data;
          this.cars = this.data.cart.split(",");
          this.phone = this.data.phone.split(",");
        });
    }
  }
};
</script>
<style scoped>
.yincang {
  visibility: hidden;
}
.list div {
  margin-left: 26%;
  font-size: 0.16rem;
  margin-bottom: 0.1rem;
}
.btn {
  text-align: center;
  margin-top: 1rem;
}
.same {
  background-color: #e9b96a;
  width: 1.2rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
  border-radius: 0.5rem
}
</style>