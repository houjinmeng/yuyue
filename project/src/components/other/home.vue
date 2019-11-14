<template>
  <div class="app">
    <div class="topp">欢迎使用预约系统</div>
    <div style='text-align:center;color:#666666;font-size:0.2rem;margin-bottom:0.2rem'>您的系统权限是:</div>
    <div style="text-align:center;font-size:0.3rem;color:#dfb065">{{rule_name}}</div>
  </div>
</template>

<script>
export default {
  mounted() {
    if(this.rule_id==2){
      this.rule_name='仓管'
    }else if(this.rule_id==3){
      this.rule_name='品质'
    }else{
      this.rule_name='物控'
    }
  },
  data() {
    return {
      rule_name:'',
      rule_id:window.sessionStorage.getItem('rule_id')
    }
  },
};
</script>
<style scoped>
.topp {
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