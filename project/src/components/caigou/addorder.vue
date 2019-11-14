<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">添加可送货订单</div>
    <div class="card">
      <el-form :model="list" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="order_coding">
          <div>
            <span class="w3">订单号</span>&nbsp&nbsp
            <el-input
              style="width:74%;"
              size="small"
              placeholder="请在此输入"
              v-model="list.order_coding"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="delivery_id">
          <div>
            <span class="w3">供货商</span>&nbsp&nbsp
            <el-select v-model="list.delivery_id" placeholder="请选择" size="small" style="width:74%">
              <el-option
                v-for="item in dateOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="material_coding">
          <div>
            <span>物料编号</span>&nbsp&nbsp
            <el-input
              style="width:74%;"
              size="small"
              placeholder="请在此输入"
              v-model="list.material_coding"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="material_name">
          <div>
            <span>物料名称</span>&nbsp&nbsp
            <el-input
              style="width:74%;"
              size="small"
              placeholder="请在此输入"
              v-model="list.material_name"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="material_model">
          <div>
            <span>物料规格</span>&nbsp&nbsp
            <el-input
              style="width:74%;"
              size="small"
              placeholder="请在此输入"
              v-model="list.material_model"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="time1">
          <div style="position: relative;">
            最晚可送货日期 &nbsp&nbsp
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="timestamp"
              v-model="list.time1"
              :picker-options="pickerOptions"
              :editable="false"
              size="small"
              style="width:59%"
              @change="a"
            ></el-date-picker>
            <!-- <img
              src="../../assets/img/rili.png"
              alt
              style="width:0.25rem;height:0.25rem;position: absolute;top:0.08rem;right:0.08rem"
            />-->
          </div>
        </el-form-item>
        <div style="text-align:center">
          <div class="button" style="margin-top:1.5rem" @click="submit('ruleForm')">确定</div>
        </div>
      </el-form>
    </div>
    <!-- 日期选择 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
      <van-datetime-picker
        v-model="time1"
        type="date"
        @confirm="time"
        @cancel="show=false"
        :show-toolbar="true"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  created() {
    this.getlist();
  },
  mounted() {},
  data() {
    return {
      // 限制投放日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      list: {
        token: window.sessionStorage.getItem("token"),
        order_coding: "",
        delivery_id: "",
        material_coding: "",
        material_name: "",
        material_model: "",
        fast_time: "",
        time1: "",
        key: ""
      },
      rules: {
        order_coding: [
          { required: true, message: "请输入订单号", trigger: "blur" }
        ],
        delivery_id: [
          { required: true, message: "请选择供货商", trigger: "blur" }
        ],
        material_coding: [
          { required: true, message: "请输入物料编号", trigger: "blur" }
        ],
        material_name: [
          { required: true, message: "请输入物料名称", trigger: "blur" }
        ],
        material_model: [
          { required: true, message: "请输入物料规格", trigger: "blur" }
        ],
        time1: [
          { required: true, message: "请选择最晚送货时间", trigger: "change" }
        ]
      },
      show: false,
      dateOption: []
    };
  },
  methods: {
    // 获取厂商列表
    getlist() {
      this.$http
        .post("/audit/delivery_code_list", this.$qs.stringify(this.list))
        .then(res => {
          res.data.forEach(item => {
            var obj = { label: item.name, value: item.id };
            this.dateOption.push(obj);
          });
        });
    },
    // 时间戳
    a() {
      this.list.fast_time = this.list.time1 / 1000;
    },
    // 确定
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/audit/delivery_order_add", this.$qs.stringify(this.list))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.$router.push("/caigou/order");
              }
            });
        } else {
          return false;
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
.el-form-item {
  margin-bottom: 0.1rem;
}
.el-form-item__error {
  top: 90%;
  left: 0.68rem;
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
  margin-bottom: 0.1rem;
  font-size: 0.16rem;
}
.item span {
  display: inline-block;
  width: 4em;
  text-align: right;
}
.w3 {
  letter-spacing: 0.33365em;
}
</style>