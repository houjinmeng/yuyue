<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">审核预约</div>
    <div class="cards">
      <div class="top0">订单信息</div>
      <div class="bot">
        <div>订 &nbsp单 &nbsp号 &nbsp&nbsp&nbsp {{order.order_coding}}</div>
        <div>供 &nbsp货 &nbsp商 &nbsp&nbsp&nbsp {{order.name}}</div>
        <div>物料编号 &nbsp&nbsp&nbsp {{order.material_coding}}</div>
        <div>物料名称 &nbsp&nbsp&nbsp {{order.material_name}}</div>
        <div>物料规格 &nbsp&nbsp&nbsp {{order.material_model}}</div>
      </div>
    </div>
    <div class="cards">
      <div class="top0">送货信息</div>
      <div class="bot">
        <div>物料数量 &nbsp&nbsp&nbsp {{goods.material_number}}</div>
        <div>托盘数量 &nbsp&nbsp&nbsp {{goods.tray_number}}</div>
        <div>需要工具 &nbsp&nbsp&nbsp {{goods.need_tool}}</div>
        <div>人员总数 &nbsp&nbsp&nbsp {{goods.client_number}}</div>
        <div>送货地点 &nbsp&nbsp&nbsp {{goods.name}}</div>
        <div>送货时间 &nbsp&nbsp&nbsp {{goods.time*1000|formatDate}}</div>
        <div v-for="(item,index) in cars" :key="index">
          <span :class="index == 0?'xianshi':'yincang'">车牌号码</span>
          &nbsp&nbsp&nbsp {{item}}
        </div>
        <div v-for="(item,index) in phones" :key="index+20">
          <span :class="index == 0?'xianshi':'yincang'">联系电话</span>
          &nbsp&nbsp&nbsp {{item}}
        </div>
      </div>
    </div>
    <!-- 仓管 -->
    <div class="cards" v-if="rule_id==2">
      <div class="top0">审核信息</div>
      <div class="bot" style="margin:0">
        <span>送货地点</span>&nbsp&nbsp
        <el-select v-model="data.value" placeholder="请选择" size="small" style="width:74%">
          <el-option
            v-for="item in dateOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <!-- 质检 -->
    <div class="cards" v-if="rule_id==3">
      <div class="top0">质检报告</div>
      <div class="bot" style="padding-right:0">
        <van-uploader v-model="fileList" multiple :max-count="0" preview-size="0.95rem" />
      </div>
    </div>
    <!-- 物控 -->
    <div class="cards" v-if="rule_id==4">
      <div class="top0">审核信息</div>
      <div class="bot" style="position: relative;">
        <span style="font-size:0.16rem">预约日期</span>
        <el-input
          style="width:65%;color:#000"
          size="small"
          placeholder="请选择日期"
          v-model="date"
          @click.native="show=true"
          disabled
        ></el-input>
        <img
          src="../../assets/img/rili.png"
          alt
          style="width:0.25rem;height:0.25rem;position: absolute;top:0.12rem;right:0.16rem"
          @click="show=true"
        />
      </div>
    </div>
    <div class="cards">
      <div class="top0">拒绝预约的原因</div>
      <div class="bot">
        <el-input
          type="textarea"
          placeholder="请输入详细原因"
          v-model="data.brief"
          :autosize="{minRows: 3}"
        ></el-input>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="btn">
      <div class="same0" style="border-radius: 0.15rem 0 0 0.15rem;" @click="lahei">拉黑</div>
      <div class="same0" @click="no">拒绝预约</div>
      <div class="same0" style="border-radius: 0 0.15rem 0.15rem 0;" @click="ok">同意预约</div>
    </div>
    <!-- 日期选择 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <van-datetime-picker
        v-model="time1"
        type="datetime"
        @confirm="time"
        @cancel="show=false"
        :show-toolbar="true"
        :min-date="minDate"
      />
    </van-popup>
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
    this.formatDate1();
    this.getlist();
    this.getoption();
  },
  data() {
    return {
      minDate: "",
      rule_id: window.sessionStorage.getItem("rule_id"),
      data: {
        token: window.sessionStorage.getItem("token"),
        id: window.sessionStorage.getItem("otherid"),
        key: "",
        value: "",
        brief: ""
      },
      cars: [],
      phones: [],
      order: {},
      goods: {},
      time1: "",
      date: "",
      show: false,
      fileList: [],
      dateOption: []
    };
  },
  methods: {
    // 获取列表信息
    getlist() {
      this.$http
        .post("/audit/check_detail", this.$qs.stringify(this.data))
        .then(res => {
          this.order = res.data.delivery_order;
          this.goods = res.data.delivery;
          this.cars = res.data.delivery.cart.split(",");
          this.phones = res.data.delivery.phone.split(",");
          res.data.img.forEach(item => {
            let obj = { url: "" };
            obj.url = "http://booking.goldenbrother.cn" + item;
            this.fileList.push(obj);
          });
          if (this.rule_id == 2) {
            this.data.key = "stock_id";
            this.data.value = this.goods.stock_id;
          } else {
            this.data.key = "time";
            this.data.value = this.goods.time;
          }
        });
    },
    // 获取地点
    getoption() {
      this.$http
        .post("/audit/stock_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(item => {
            let obj = { value: item.id, label: item.name };
            this.dateOption.push(obj);
          });
        });
    },
    //时间戳转化为时间格式
    formatDate1() {
      let date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth();
      var d = date.getDate() + 1;
      var h = date.getHours();
      var m1 = date.getMinutes();
      var s = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      this.minDate = new Date(y, m, d);
      this.time1 = new Date(y, m, d);
    },
    formatDate(date) {
      date = new Date(date);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var m1 = date.getMinutes();
      var s = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      h = h < 10 ? "0" + h : h;
      m1 = m1 < 10 ? "0" + m1 : m1;
      return y + "年" + m + "月" + d + "日" + h + "点" + m1;
    },
    // 时间格式转时间戳
    timeChangetype(stringTime) {
      var timestamp2 = Date.parse(new Date(stringTime));
      return timestamp2;
    },
    // 确定选择日期
    time() {
      this.show = false;
      this.date = this.formatDate(this.time1);
      this.data.value = this.timeChangetype(this.time1) / 1000;
    },
    // 拉黑
    lahei() {
      this.$dialog
        .confirm({
          message: "您确定拉黑此预约人吗"
        })
        .then(() => {
          this.$http
            .post("/audit/blacklist", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.$router.push("/other/audit");
              }
            });
        })
        .catch(() => {});
    },
    // 拒绝
    no() {
      if (this.data.brief == "") {
        this.$toast.fail("请输入拒绝原因");
      } else {
        this.$http
          .post("/audit/check_error", this.$qs.stringify(this.data))
          .then(res => {
            if (res.data.code == 0) {
              this.$toast.fail(res.data.msg);
            } else {
              this.$toast.success(res.data.msg);
              this.$router.push("/other/audit");
            }
          });
      }
    },
    // 同意
    ok() {
      this.$http
        .post("/audit/check_success", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.fail(res.data.msg);
          } else {
            this.$toast.success(res.data.msg);
            this.$router.push("/other/audit");
          }
        });
    }
  }
};
</script>
<style lang="">
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
.el-textarea__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.cards >>> .van-icon {
  visibility: hidden;
}
.yincang {
  visibility: hidden;
}
.btn {
  text-align: center;
  margin: 0.2rem;
}
.same0 {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
.cards .top0 {
  border-bottom: 2px solid #f0f2f5;
  /* line-height: 0.1rem; */
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
}
</style>