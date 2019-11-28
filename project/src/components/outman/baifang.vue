<template>
  <div>
    <!-- 首次预约 -->
    <div v-if="one">
      <div class="title">欢迎使用拜访预约</div>
      <van-cell-group
        style="width:70%;margin:0 auto;background-color: transparent;"
      >
        <van-field
          v-model="data.code"
          placeholder="请输入识别码"
          type="number"
          style="background:#f0f0f0;border-radius:0.5rem;border:1px solid #fff;border-bottom:1px solid #efbf6e"
        />
      </van-cell-group>
      <div style="margin:0.3rem 0;text-align:center;">
        <el-button
          @click="checkcode"
          style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff"
          round
          >确定</el-button
        >
      </div>
    </div>
    <!-- 再次预约 -->
    <div v-if="two">
      <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">
        请输入拜访信息
      </div>
      <div class="card">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="company">
            <div>
              <span style="font-size:0.16rem">访客公司</span>
              <el-input
                style="width:78%;"
                size="small"
                placeholder="请在此输入"
                v-model="ruleForm.company"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="client_name">
            <div>
              <span style="font-size:0.16rem">访客姓名</span>
              <el-input
                style="width:78%;"
                size="small"
                placeholder="请在此输入"
                v-model="ruleForm.client_name"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="audit_name">
            <div>
              <span style="font-size:0.16rem">接待姓名</span>
              <el-input
                style="width:78%;"
                size="small"
                placeholder="请在此输入"
                v-model="ruleForm.audit_name"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="time1">
            <div style="position: relative;">
              <span style="font-size:0.16rem">来访日期</span>
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                v-model="ruleForm.time1"
                :picker-options="pickerOptions"
                :editable="false"
                size="small"
                style="width:78%"
                @change="a"
              ></el-date-picker>
              <!-- <el-input
                style="width:65%;color:#000"
                size="small"
                placeholder="请选择预约日期,最早为明天"
                v-model="ruleForm.time1"
                @focus="show=true"
              ></el-input>-->
              <!-- <img
                src="../../assets/img/rili.png"
                alt
                style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:0.08rem"
              /> -->
            </div>
          </el-form-item>
          <!-- 车牌号码 -->
          <el-form-item>
            <div v-for="(item, index) in cars" :key="index">
              <span
                style="font-size:0.16rem;"
                :class="index == 0 ? 'xianshi' : 'yincang'"
                >车牌号码</span
              >
              <div style="position: relative;display:inline-block;width:65%">
                <el-input
                  style="width:100%;"
                  size="small"
                  placeholder="请在此输入(例: 粤A12345)"
                  v-model="item.value"
                  @blur="cartest(item.value)"
                ></el-input>
                <img
                  v-if="item.index == carnum"
                  src="../../assets/img/zengjia.png"
                  alt
                  style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:-0.37rem"
                  @click="carnum++"
                />
                <img
                  v-if="item.index != carnum"
                  src="../../assets/img/shanchu.png"
                  alt
                  style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:-0.37rem"
                  @click="deletcar(index)"
                />
              </div>
            </div>
            <transition name="el-zoom-in-top">
              <div
                v-show="carShow"
                style="color:red;padding-left:0.7rem;font-size:14px;line-height:0;padding-top:0.05rem"
              >
                请以正确格式填写
              </div>
            </transition>
          </el-form-item>
          <!-- 手机号码 -->
          <el-form-item>
            <div v-for="(item, index) in phones" :key="index + 20">
              <span
                style="font-size:0.16rem;"
                :class="index == 0 ? 'xianshi' : 'yincang'"
                >联系电话</span
              >
              <div style="position: relative;display:inline-block;width:65%">
                <el-input
                  style="width:100%;"
                  size="small"
                  placeholder="请在此输入"
                  v-model="item.value"
                  type="number"
                  oninput="if(value.length>11)value=value.slice(0,11)"
                  @blur="phonetest(item.value)"
                ></el-input>
                <img
                  v-if="item.index == phonenum"
                  src="../../assets/img/zengjia.png"
                  alt
                  style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:-0.37rem"
                  @click="phonenum++"
                />
                <img
                  v-if="item.index != phonenum"
                  src="../../assets/img/shanchu.png"
                  alt
                  style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:-0.37rem"
                  @click="deletphone(index)"
                />
              </div>
            </div>
            <transition name="el-zoom-in-top">
              <div
                v-show="phoneShow"
                style="color:red;padding-left:0.7rem;font-size:14px;line-height:0;padding-top:0.05rem"
              >
                请填写正确格式的手机号
              </div>
            </transition>
          </el-form-item>
          <!-- 底部按钮 -->
          <el-form-item>
            <div style="text-align:center;margin-top:0.5rem">
              <div class="button" @click="tijiao('ruleForm')">确定</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 日期选择 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
        <van-datetime-picker
          v-model="time1"
          type="date"
          @confirm="time"
          @cancel="show = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneShow: false,
      carShow: false,
      // 限制投放日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      ruleForm: {
        token: window.sessionStorage.getItem("token"),
        company: "",
        client_name: "",
        audit_name: "",
        time: "",
        cart: "",
        phone: "",
        time1: "",
        code_id: ""
      },
      cars: [{ value: "", index: 1 }],
      phones: [{ value: "", index: 1 }],
      rules: {
        company: [
          { required: true, message: "请输入正确的贵公司全称", trigger: "blur" }
        ],
        client_name: [
          { required: true, message: "请输入来访人姓名", trigger: "blur" }
        ],
        audit_name: [
          { required: true, message: "请输入接待人姓名", trigger: "blur" }
        ],
        time1: [
          { required: true, message: "请选择来访日期", trigger: "change" }
        ]
      },
      carnum: 1, //车牌数量
      phonenum: 1, //电话数量
      show: false,
      data: { token: window.sessionStorage.getItem("token"), code: "" },
      one: true,
      two: false,
      // 表单验证错误提示
      time1: "",
      date: "",
      mingtian: ""
    };
  },
  watch: {
    carnum: function(value, oldValue) {
      if (oldValue < value) {
        this.cars.push({ value: "", index: value });
      } else {
        this.deletcar();
      }
    },
    phonenum: function(value, oldValue) {
      if (oldValue < value) {
        this.phones.push({ value: "", index: value });
      } else {
        this.deletphone();
      }
    }
  },
  methods: {
    // 车牌号验证格式
    cartest(value) {
      let reg = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
      if (value == "") {
        this.carShow = false;
      } else if (!reg.test(value)) {
        this.carShow = true;
        return false;
      } else {
        this.carShow = false;
      }
      return true;
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
    },
    // 时间戳
    a() {
      this.ruleForm.time = this.ruleForm.time1 / 1000;
    },
    // 提交信息
    tijiao(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.cars[0].value != "" && this.phones[0].value != "") {
          let arry1 = [];
          this.cars.forEach(item => {
            arry1.push(item.value);
          });
          let arry2 = [];
          this.phones.forEach(item => {
            arry2.push(item.value);
          });
          this.ruleForm.cart = arry1.join(",");
          this.ruleForm.phone = arry2.join(",");
          this.$http
            .post("/client/business", this.$qs.stringify(this.ruleForm))
            .then(res => {
              if (res.data.code == 1) {
                this.$router.push("/outman/yewuok");
              }
            });
        } else if (this.cars[0].value == "") {
          this.carShow = true;
          return false;
        } else if (this.phones[0].value == "") {
          this.phoneShow = true;
          return false;
        }
      });
    },
    // 减号
    deletcar(index) {
      this.cars.splice(index, 1);
    },
    deletphone(index) {
      this.phones.splice(index, 1);
    },
    //时间戳转化为时间格式
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
      return y + "-" + m + "-" + d;
    },
    // 时间格式转时间戳
    timeChangetype(stringTime) {
      var timestamp2 = Date.parse(new Date(stringTime));
      return timestamp2;
    },
    time() {
      this.date = this.timeChangetype(this.time1);
      this.ruleForm.time = this.date / 1000;
      console.log(this.ruleForm.time);
      this.ruleForm.time1 = this.formatDate(this.date);
      this.show = false;
    },
    // 验证识别码
    checkcode() {
      this.$http
        .post("/client/code_business", this.$qs.stringify(this.data))
        .then(res => {
          if (res.data.code == 1) {
            this.$toast.success(res.data.msg);
            this.ruleForm.code_id = res.data.data.code_id;
            this.one = false;
            this.two = true;
          } else {
            this.$toast.fail(res.data.msg);
            this.one = true;
            this.two = false;
          }
        });
    }
  }
};
</script>
<style lang="">
.el-picker-panel {
  position: fixed;
  top: 2.5rem !important;
  left: 0.18rem !important;
  z-index: 2011 !important;
  width: 3.2rem !important;
}
.el-form-item {
  margin-bottom: 0.1rem;
}
.el-form-item__error {
  top: 90%;
  left: 0.68rem;
}
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.title {
  margin-top: 1.2rem;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 0.3rem;
}
.card {
  position: fixed;
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 78%;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
}

.item {
  margin-bottom: 0.2rem;
}
.yincang {
  visibility: hidden;
}
</style>
