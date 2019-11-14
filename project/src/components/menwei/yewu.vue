<template>
  <div>
    <div style="text-align:center;margin:0.1rem 0;color:red" v-if="data.status==1">
      <img src="../../assets/img/shibai.png" alt style="width:1rem;height:1rem" />
      <div>预约信息不存在</div>
      <div>来访时间已过/还未到</div>
      <div>预约已达成</div>
    </div>
    <div class="list" style="margin-top:0.5rem">
      <div>预约类型 &nbsp&nbsp&nbsp 业务会面预约</div>
      <div>访客公司 &nbsp&nbsp&nbsp {{data.company}}</div>
      <div>访客姓名 &nbsp&nbsp&nbsp {{data.client_name}}</div>
      <div>接待姓名 &nbsp&nbsp&nbsp {{data.audit_name}}</div>
      <div>来访日期 &nbsp&nbsp&nbsp {{data.time*1000|formatDate}}</div>
      <div v-for="(item,index) in cars" :key="index">
        <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">车牌号码</span> &nbsp&nbsp&nbsp {{item}}
      </div>
      <div v-for="(item,index) in phone" :key="index+10">
        <span :class="[ index == 1 ? 'yincang' : 'xianshi' ]">联系电话</span> &nbsp&nbsp&nbsp {{item}}
      </div>
    </div>
    <!-- 底部按钮 -->
    <div style='text-align:center;margin-top:0.8rem'>
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
      return formatDate(date, "hh:mm:ss"); // 时间点 例 21点12分12秒的格式
    }
  },
  mounted() {
    let qr=JSON.parse(window.sessionStorage.getItem('qr'))
    this.list.id=qr.id
    this.list.type=qr.type
    this.getlist();
  },
  data() {
    return {
      url: "",
      data:{},
      list: { token: window.sessionStorage.getItem('token'), id: '',type:''},
      cars:[],
      phone:[],
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
            .post("/audit/release", this.$qs.stringify(this.list))
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
    getlist() {
      this.$http
        .post("/audit/qr_code", this.$qs.stringify(this.list))
        .then(res => {
          this.data=res.data.data
          this.cars=res.data.data.cart.split(',')
          this.phone=res.data.data.phone.split(',')
        });
    }
  }
};
</script>
<style scoped>
.yincang{
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
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
</style>