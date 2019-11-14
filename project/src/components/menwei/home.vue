<template>
  <div class="app">
    <div class="topp">欢迎使用预约系统</div>
    <div style="color:#666666;font-size:0.2rem;margin-bottom:0.2rem">您的系统权限是:</div>
    <div style="font-size:0.3rem;color:#dfb065">门卫</div>
    <div style="color:#666666;font-size:0.2rem;margin-top:0.2rem">请点击下方按钮扫描二维码</div>
    <a href="http://sao315.com/w/api/saoyisao?redirect_uri=http://booking.goldenbrother.cn ">
      <div class="button" style="margin-top:0.3rem;width:1.4rem">扫描预约二维码</div>
    </a>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.topp {
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
  text-align: center;
}
</style>