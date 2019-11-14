<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">第二步: 请输入送货信息</div>
    <div class="card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="material_number">
          <div>
            <span style="font-size:0.16rem">物料数量</span>
            <el-input
              style="width:78%;"
              size="small"
              placeholder="请在此输入"
              v-model="ruleForm.material_number"
              type="number"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="tray_number">
          <div>
            <span style="font-size:0.16rem">托盘数量</span>
            <el-input
              style="width:78%;"
              size="small"
              placeholder="请在此输入"
              v-model="ruleForm.tray_number"
              type="number"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="need_tool">
          <div>
            <span style="font-size:0.16rem">所需工具</span>
            <el-input
              style="width:78%;"
              size="small"
              placeholder="请在此输入"
              v-model="ruleForm.need_tool"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="client_number">
          <div>
            <span style="font-size:0.16rem">人员总数</span>
            <el-input
              style="width:78%;"
              size="small"
              placeholder="请在此输入"
              v-model="ruleForm.client_number"
              type="number"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="stock_id">
          <div style="position: relative;">
            <span style="font-size:0.16rem">送货地点</span>
            <el-select v-model="ruleForm.stock_id" placeholder="请选择" size="small" style="width:78%">
              <el-option
                v-for="item in dateOption"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="time1">
          <div style="position: relative;">
            <span style="font-size:0.16rem">预约日期</span>
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
          </div>
          <div
            v-show="hintShow"
            style="color:red;padding-left:0.7rem;font-size:0.14rem;line-height:0.1rem"
          >最晚送货日期为{{this.fast_time*1000|formatDate}}</div>
        </el-form-item>
        <!-- 车牌号码 -->
        <el-form-item>
          <div v-for="(item,index) in cars" :key="index">
            <span style="font-size:0.16rem;" :class="index == 0?'xianshi':'yincang'">车牌号码</span>
            <div style="position: relative;display:inline-block;width:65%">
              <el-input
                style="width:100%;"
                size="small"
                placeholder="请在此输入(例: 粤A123456)"
                v-model="item.value"
                @blur="cartest(item.value)"
              ></el-input>
              <img
                v-if="item.index==carnum"
                src="../../assets/img/zengjia.png"
                alt
                style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:-0.37rem"
                @click="addcar"
              />
              <img
                v-if="item.index!=carnum"
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
            >请以正确格式填写</div>
          </transition>
        </el-form-item>
        <!-- 手机号码 -->
        <el-form-item>
          <div v-for="(item,index) in phones" :key="index+20">
            <span style="font-size:0.16rem;" :class="index == 0?'xianshi':'yincang'">联系电话</span>
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
                v-if="item.index==phonenum"
                src="../../assets/img/zengjia.png"
                alt
                style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:-0.37rem"
                @click="addphone"
              />
              <img
                v-if="item.index!=phonenum"
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
            >请填写正确格式的手机号</div>
          </transition>
        </el-form-item>
        <!-- 底部按钮 -->
        <div class="btn">
          <div class="back" @click="back">上一步</div>
          <div class="next" @click="next('ruleForm')">下一步</div>
        </div>
      </el-form>
      <input type="text" v-model="fastdae" v-if="1==2" />
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
    this.data = JSON.parse(window.sessionStorage.getItem("order"));
    if (this.data != null) {
      this.dateOption = this.data.stock;
      this.fast_time = this.data.fast_time;
    }

    let a = JSON.parse(window.sessionStorage.getItem("upform"));
    let b = JSON.parse(window.sessionStorage.getItem("ruleform"));
    if (b != null) {
      this.ruleForm = b;
      let arry1 = this.ruleForm.cart.split(",");
      arry1.forEach((item, index) => {
        if (index == 0) {
          this.cars[0].value = item;
          this.cars[0].index = index + 1;
        } else {
          this.carnum++;
          let obj = { value: item, index: index + 1 };
          this.cars.push(obj);
        }
      });
      let arry2 = this.ruleForm.phone.split(",");
      arry2.forEach((item, index) => {
        if (index == 0) {
          this.phones[0].value = item;
          this.phones[0].index = index + 1;
        } else {
          this.phonenum++;
          let obj = { value: item, index: index + 1 };
          this.phones.push(obj);
        }
      });
    }

    if (a != null) {
      this.ruleForm.material_number = a.material_number;
      this.ruleForm.tray_number = a.tray_number;
      this.ruleForm.need_tool = a.need_tool;
      this.ruleForm.client_number = a.client_number;
      this.ruleForm.time = a.time;
      this.ruleForm.time1 = a.time * 1000;
      this.ruleForm.cart = a.cart;
      this.ruleForm.phone = a.phone;
      this.ruleForm.stock_id = a.stock_id;
      this.dateOption = a.stock_list;

      let arry1 = this.ruleForm.cart.split(",");
      arry1.forEach((item, index) => {
        if (index == 0) {
          this.cars[0].value = item;
          this.cars[0].index = index + 1;
        } else {
          this.carnum++;
          let obj = { value: item, index: index + 1 };
          this.cars.push(obj);
        }
      });
      let arry2 = this.ruleForm.phone.split(",");
      arry2.forEach((item, index) => {
        if (index == 0) {
          this.phones[0].value = item;
          this.phones[0].index = index + 1;
        } else {
          this.phonenum++;
          let obj = { value: item, index: index + 1 };
          this.phones.push(obj);
        }
      });
    }
    let c = JSON.parse(window.sessionStorage.getItem("uporder"));
    if (c != null) {
      this.fast_time = c.fast_time;
    }
  },
  data() {
    return {
      fast_time: "",
      phoneShow: false,
      carShow: false,
      hintShow: false,
      // 限制投放日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      // 表单
      ruleForm: {
        material_number: "",
        tray_number: "",
        need_tool: "",
        client_number: "",
        stock_id: "",
        time: "",
        time1: "",
        cart: "",
        phone: ""
      },
      rules: {
        material_number: [
          { required: true, message: "请输入物料数量", trigger: "blur" }
        ],
        tray_number: [
          { required: true, message: "请输入托盘数量", trigger: "blur" }
        ],
        need_tool: [
          { required: true, message: "请输入所需工具", trigger: "blur" }
        ],
        client_number: [
          { required: true, message: "请输入人员总数", trigger: "blur" }
        ],
        stock_id: [
          { required: true, message: "请选择送货地点", trigger: "change" }
        ],
        time1: [
          { required: true, message: "请选择预约日期", trigger: "change" }
        ]
      },
      // 地址
      data: {},
      dateOption: [],

      cars: [{ value: "", index: 1 }],
      phones: [{ value: "", index: 1 }],
      carnum: 1, //车牌数量
      phonenum: 1 //电话数量
    };
  },
  methods: {
    // 添加车牌号
    addcar() {
      this.carnum++;
      this.cars.push({ value: "", index: this.carnum });
    },
    // 添加手机号
    addphone() {
      this.phonenum++;
      this.phones.push({ value: "", index: this.phonenum });
    },
    // 上一步
    back() {
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
      window.sessionStorage.setItem("ruleform", JSON.stringify(this.ruleForm));
      this.$router.push("/outman/checkorder");
    },
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
      if (this.ruleForm.time > this.fast_time) {
        this.hintShow = true;
      } else {
        this.hintShow = false;
      }
    },
    // 删除车牌号
    deletcar(index) {
      this.cars.splice(index, 1);
    },
    // 删除手机号
    deletphone(index) {
      this.phones.splice(index, 1);
    },
    // 下一步
    next(formName) {
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
          window.sessionStorage.setItem(
            "ruleform",
            JSON.stringify(this.ruleForm)
          );
          this.$router.push("/outman/uploadimg");
        } else if (this.cars[0].value == "") {
          this.carShow = true;
          return false;
        } else if (this.phones[0].value == "") {
          this.phoneShow = true;
          return false;
        }
      });
    }
  }
};
</script>
<style>
.el-form-item {
  margin-bottom: 0.1rem !important;
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
.card {
  position: fixed;
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 85%;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
}

.item {
  margin-bottom: 0.15rem;
}
.yincang {
  visibility: hidden;
}
.btn {
  text-align: center;
  margin-top: 1rem;
}
.back {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  border-radius: 0.15rem 0 0 0.15rem;
  display: inline-block;
}
.next {
  display: inline-block;
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  border-radius: 0 0.15rem 0.15rem 0;
}
</style>