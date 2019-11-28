<template>
  <div class="app">
    <div class="topp">欢迎使用预约系统</div>
    <div
      style="text-align:center;color:#666666;font-size:0.2rem;margin-bottom:0.2rem"
    >
      您的系统权限是:
    </div>
    <div style="text-align:center;font-size:0.3rem;color:#dfb065">其他业务部门</div>
    <router-link to="/caigou/yuyuenumber">
      <div
        style="width:1rem;text-align:center;background:#dfb065;color:#fff;padding:0.05rem 0.1rem;border-radius:0.2rem;margin:0.2rem auto"
      >
        可预约号码
      </div></router-link
    >
  </div>
</template>

<script>
export default {};
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
  background-size: cover;
  overflow: hidden;
}
</style>
