<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">导入厂商</div>
    <div class="card">
      <el-input
        type="textarea"
        placeholder="                  
      
      
    请将厂商信息粘贴到这里

    数据格式说明:
    -每个厂商信息包括: 名称和编码
    -厂商名称和编码之间用 ' , ' 隔开
              -每条厂商信息之间用 ' . ' 隔开                 
    
    例如:
    广州市蓝天科技有限公司, GZ1234.
    顺德市顺利锁具公司, SD3333"
        v-model="value"
        :autosize="{minRows: 22}"
        label="jdlksj"
      ></el-input>
      <div style="text-align:center">
        <div class="button" style="margin-top:0.2rem" @click="ok">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ""
    };
  },
  methods: {
    ok() {
      if (this.value == "") {
        this.$toast.fail("导入信息不能为空");
      } else {
        window.sessionStorage.setItem("list", this.value);
        this.$router.push("/caigou/daorumessage");
      }
    }
  }
};
</script>
<style>
.el-textarea__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
  text-align: center;
}
</style>