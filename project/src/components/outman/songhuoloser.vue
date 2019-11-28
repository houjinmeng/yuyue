<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">
      预约详情
    </div>
    <div class="cards">
      <div class="top">状态信息</div>
      <div class="bot">
        <div>未通过审核</div>
        <div>需要修改后重新预约</div>
      </div>
    </div>
    <div class="cards">
      <div class="top">预约失败的原因</div>
      <div class="bot">
        <div>提 &nbsp出 &nbsp人 &nbsp&nbsp&nbsp {{ cause.audit }}</div>
        <div>
          拒绝原因
          <div
            style="display: inline-block;width: 2.22rem;vertical-align:top;margin:0 0 0 0.17rem;"
          >
            {{ cause.brief }}
          </div>
        </div>
      </div>
    </div>
    <div class="cards">
      <div class="top">订单信息</div>
      <div class="bot">
        <div>订 &nbsp单 &nbsp号 &nbsp&nbsp&nbsp {{ order.order_coding }}</div>
        <div style="display:flex;align-items:top">
          供 &nbsp货 &nbsp商 &nbsp&nbsp&nbsp
          <el-input
            type="textarea"
            autosize
            disabled=""
            v-model="order.name"
            style="width:70%"
            resize="none"
          >
          </el-input>
        </div>
        <div>物料编号 &nbsp&nbsp&nbsp {{ order.material_coding }}</div>
        <div style="display:flex;align-items:top">
          物料名称 &nbsp&nbsp&nbsp
          <el-input
            type="textarea"
            autosize
            disabled=""
            v-model="order.material_name"
            style="width:70%"
            resize="none"
          >
          </el-input>
        </div>
        <div style="display:flex;align-items:top">
          物料规格 &nbsp&nbsp&nbsp
          <el-input
            type="textarea"
            autosize
            disabled=""
            v-model="order.material_model"
            style="width:70%"
            resize="none"
          >
          </el-input>
        </div>
      </div>
    </div>
    <div class="cards">
      <div class="top">送货信息</div>
      <div class="bot">
        <div>物料数量 &nbsp&nbsp&nbsp {{ list.material_number }}</div>
        <div>托盘数量 &nbsp&nbsp&nbsp {{ list.tray_number }}</div>
        <div>需要工具 &nbsp&nbsp&nbsp {{ list.need_tool }}</div>
        <div>人员总数 &nbsp&nbsp&nbsp {{ list.client_number }}</div>
        <div>送货地点 &nbsp&nbsp&nbsp {{ list.name }}</div>
        <div>
          送货时间 &nbsp&nbsp&nbsp {{ (list.time * 1000) | formatDate }}
        </div>
        <div v-for="(item, index) in cars" :key="index">
          <span :class="[index == 1 ? 'yincang' : 'xianshi']">车牌号码</span>
          &nbsp&nbsp&nbsp {{ item }}
        </div>
        <div v-for="(item, index) in phones" :key="index + 10">
          <span :class="[index == 1 ? 'yincang' : 'xianshi']">联系电话</span>
          &nbsp&nbsp&nbsp {{ item }}
        </div>
      </div>
    </div>
    <div class="cards">
      <div class="top0">质检报告</div>
      <!-- <div class="bot" style="padding-right:0">
        <van-uploader v-model="fileList" multiple :max-count="0" preview-size="0.95rem" />
      </div> -->
      <a :href="item" v-for="(item, index) in fileList" :key="index">
        <div class="yulan">质检报告{{ index + 1 }}</div>
      </a>
    </div>
    <!-- 底部按钮 -->
    <div class="btn" v-show="ruleid == 10">
      <div
        class="same"
        style="border-radius: 0.15rem 0 0 0.15rem;"
        @click="quxiao"
      >
        放弃预约
      </div>
      <div
        class="same"
        style="border-radius: 0 0.15rem 0.15rem 0;"
        @click="again"
      >
        修改并再次预约
      </div>
    </div>
    <div style="text-align:center;margin:0.2rem 0" v-show="ruleid != 10">
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
  mounted() {
    this.getlist();
  },
  data() {
    return {
      ruleid: window.sessionStorage.getItem("rule_id"),
      ruleform: {},
      fileList: [],
      data: {
        token: window.sessionStorage.getItem("token"),
        id: window.sessionStorage.getItem("goodsid")
      },
      cause: {},
      order: {},
      list: {},
      cars: [],
      phones: []
    };
  },
  methods: {
    // 修改再次预约
    again() {
      window.sessionStorage.setItem("upform", JSON.stringify(this.ruleform));
      window.sessionStorage.setItem("uporder", JSON.stringify(this.order));
      this.$router.push("/outman/checkorder");
    },
    // 获取列表
    getlist() {
      this.$http
        .post("/client/delivery_detail", this.$qs.stringify(this.data))
        .then(res => {
          this.order = res.data.delivery_order;
          this.list = res.data.delivery;
          this.cars = res.data.delivery.cart.split(",");
          this.phones = res.data.delivery.phone.split(",");
          this.cause = res.data.cause;
          res.data.img_list.forEach(item => {
            item.url = "http://booking.goldenbrother.cn" + item.url;
            this.fileList.push(item.url);
          });
          // this.fileList = res.data.img_list;
          this.ruleform = res.data.update;
        });
    },
    // 放弃预约
    quxiao() {
      this.$dialog
        .confirm({
          message: "确定放弃预约吗"
        })
        .then(() => {
          this.$http
            .post("/client/delivery_delete", this.$qs.stringify(this.data))
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
    }
  }
};
</script>
<style scoped>
.cards >>> .el-textarea.is-disabled .el-textarea__inner {
  background-color: #ffffff !important;
  border: none !important;
  color: #000 !important;
  cursor: not-allowed !important;
  text-align: left !important;
  font-size: 0.14rem !important;
}
.cards >>> .el-textarea {
  margin: 0 !important;
}
.cards >>> .el-textarea__inner {
  padding: 0 !important;
  padding-left: 0.05rem !important;
}
.cards >>> .van-icon {
  visibility: hidden;
}
.btn {
  text-align: center;
  margin: 0.2rem 0;
}
.same {
  background-color: #e9b96a;
  width: 1.2rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
.yincang {
  visibility: hidden;
}
.cards .top0 {
  border-bottom: 2px solid #f0f2f5;
  /* line-height: 0.1rem; */
  padding: 0.1rem 0.2rem;
  box-sizing: border-box;
}
</style>
