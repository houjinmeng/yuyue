<template>
  <div class="app">
    <div class="top">预约查询</div>
    <div style="text-align:center;color:#666666;font-size:0.2rem;margin-bottom:0.2rem">
      <el-input style="width:74%;" size="small" placeholder="请在此输入订单号(可以不完整)" v-model="data.key"></el-input>
    </div>
    <div style="text-align:center">
      <div class="button" style="margin-top:0.3rem" @click="check">查询</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:{
        token:window.sessionStorage.getItem('token'),
        key:''
      }
    }
  },
    methods: {
        check(){
          this.$http.post('/audit/search_order',this.$qs.stringify(this.data)).then(res=>{
            window.sessionStorage.setItem('check',JSON.stringify(res.data))
            window.sessionStorage.setItem('checkkey',this.data.key)
            this.$router.push('/caigou/checkresult')
          })
        }
    },
};
</script>
<style>
.el-input__inner {
  border: 1px solid #000 !important;
  color: #000 !important;
}
</style>
<style scoped>
.top {
  text-align: center;
  margin-top: 1.6rem;
  margin-bottom: 0.2rem;
  font-size: 0.3rem;
}
.app {
  width: 100%;
  position: fixed;
  height: 100%;
  background: url("../../assets/img/shouye-yun.jpg") top left no-repeat;
  background-size: 100%;
  overflow: hidden;
}
</style>