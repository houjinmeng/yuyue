<template>
  <div>
    <van-tabs v-model="active">
      <!-- 可预约号码 -->
      <van-tab title="可预约号码">
        <div class="card" style="margin-top:0.1rem">
          <!-- 添加 -->
          <div style="text-align:center">
            <div class="xiangqing1" @click="addnum">添加新号码</div>
          </div>
          <!-- 列表 -->
          <div class="item" v-for="(item, index) in table" :key="index">
            <div>拜 &nbsp访 &nbsp人 : {{ item.client }}</div>
            <div>接 &nbsp待 &nbsp人 : {{ item.audit }}</div>
            <div>预约号码 : {{ item.code }}</div>
            <div
              style="justify-content: space-between;display:flex;align-items:center"
            >
              <span
                >添加时间 : {{ (item.create_time * 1000) | formatDate }}
                {{ (item.create_time * 1000) | formatDateTwo }}</span
              >
              <span class="xiangqing" @click="delet(item.id)">删除</span>
            </div>
          </div>
          <!-- 添加弹窗 -->
          <van-dialog
            v-model="showadd"
            title="添加预约号码"
            show-cancel-button
            :lazy-render="false"
            :before-close="close"
          >
            <div
              style="text-align:center;margin-top:0.2rem;font-size:0.14rem;margin-bottom:0.1rem"
            >
              <span style="display:inline-block;text-align:left"
                >拜 &nbsp访 &nbsp人 :</span
              >
              <el-input
                style="width:45%"
                size="small"
                v-model="list.client"
                placeholder="请在此输入"
              ></el-input>
            </div>
            <div style="text-align:center;font-size:0.14rem">
              <span style="display:inline-block;text-align:left"
                >接 &nbsp待 &nbsp人 :</span
              >
              <el-input
                style="width:45%"
                size="small"
                v-model="list.audit"
                placeholder="请在此输入"
              ></el-input>
            </div>
            <div
              style="text-align:center;margin-top:0.1rem;font-size:0.14rem;margin-bottom:0.3rem;"
            >
              <span style="display:inline-block;text-align:left"
                >预约号码 :</span
              >
              <el-input
                style="width:45%"
                size="small"
                placeholder="请在此输入"
                type="number"
                v-model="list.code"
                oninput="if(value.length>11)value=value.slice(0,11)"
                @blur="phonetest(list.code)"
              ></el-input>
              <transition name="el-zoom-in-top">
                <div
                  v-show="phoneShow"
                  style="color:red;padding-left:0.7rem;font-size:14px;line-height:0;padding-top:0.1rem"
                >
                  请填写正确格式的手机号
                </div>
              </transition>
            </div>
          </van-dialog>
        </div>
      </van-tab>
      <!-- 添加记录 -->
      <van-tab title="添加记录">
        <div class="card" style="margin-top:0.1rem">
          <!-- 搜索 -->
          <van-search
            v-model="list.key"
            placeholder="请输入预约号码"
            show-action
            shape="round"
          >
            <div slot="action" @click="getlist" class="search">
              搜索
            </div></van-search
          >
          <!-- 列表 -->
          <div class="item" v-for="(item, index) in record" :key="index">
            <div>拜 &nbsp访 &nbsp人 : {{ item.client }}</div>
            <div>接 &nbsp待 &nbsp人 : {{ item.audit }}</div>
            <div>预约号码 : {{ item.code }}</div>
            <div
              style="justify-content: space-between;display:flex;align-items:center"
            >
              <span
                >添加时间 : {{ (item.create_time * 1000) | formatDate }}
                {{ (item.create_time * 1000) | formatDateTwo }}</span
              >
              <span class="xiangqing" @click="delet(item.id)">删除</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div style="text-align:center">
      <div class="button" style="margin:0.1rem" @click="$router.back(1)">
        返回
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
    this.getlist1();
  },
  data() {
    return {
      phoneShow: false, // 手机号验证
      showadd: false, // 添加弹窗
      active: 0,
      hintShow: true,
      list: {
        token: window.sessionStorage.getItem("token"),
        //token: "gmni4d1kqx",
        code: "",
        client: "",
        audit: "",
        key: ""
      },
      table: [],
      record: [] //添加记录
    };
  },
  methods: {
    // 添加按钮
    addnum() {
      this.showadd = true;
      this.list.code = "";
      this.list.client = "";
      this.list.audit = "";
      this.phoneShow = false;
    },
    // 添加弹窗关闭
    close(action, done) {
      if (action == "confirm") {
        if (this.list.code == "") {
          this.$toast.fail("请正确的手机号");
          done(false);
          return false;
        } else if (this.list.client == "") {
          this.$toast.fail("请输入拜访人");
          done(false);
          return false;
        } else if (this.list.audit == "") {
          this.$toast.fail("请输入接待人");
          done(false);
          return false;
        } else {
          this.$http
            .post("/audit/business_code_add", this.$qs.stringify(this.list))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success("添加成功");
                this.getlist();
                this.addall = false;
                done();
              } else {
                this.$toast.fail(res.data.msg);
                done(false);
              }
            });
        }
      } else {
        done();
      }
    },
    // 获取列表
    getlist() {
      this.$http
        .post("/audit/business_code_list", this.$qs.stringify(this.list))
        .then(res => {
          this.table = res.data;
        });
    },
    // 添加记录列表
    getlist1() {
      this.$http
        .post("/audit/business_add_list", this.$qs.stringify(this.list))
        .then(res => {
          this.record = res.data;
        });
    },
    // 删除
    delet(id) {
      this.$dialog
        .confirm({
          message: "确定要删除该预约号码吗"
        })
        .then(() => {
          let data = { token: window.sessionStorage.getItem("token"), id: id };
          this.$http
            .post("/audit/business_code_delete", this.$qs.stringify(data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.getlist1();
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 手机号验证格式
    phonetest(value) {
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value == "") {
        this.phoneShow = false;
      } else if (!reg.test(value)) {
        this.phoneShow = true;
        return false;
      } else {
        this.phoneShow = false;
      }
      return true;
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
.el-form-item__error {
  top: 90% !important;
  left: 0.68rem !important;
}
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.card >>> .el-form-item {
  margin-bottom: 0 !important;
}
.xiangqing1 {
  display: inline-block;
  width: 50%;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: #fff;
  background-color: #e9b96a;
  border-radius: 0.1rem;
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
.item {
  border-bottom: 1px solid #cccccc;
  padding: 0.1rem 0;
  align-items: center;
}
.item div {
  margin-top: 0.05rem;
}
</style>
