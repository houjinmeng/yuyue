<template>
  <div>
    <div style="text-align:center;margin-top:1.3rem">
      <img src="../../assets/img/shibai.png" alt style="width:1rem;height:1rem" />
    </div>
    <div style="font-size:0.16rem;text-align:center;margin-top:0.3rem">请不要重复注册!</div>
    <!-- <div style="font-size:0.16rem;text-align:center;margin-top:0.1rem">请耐心等待审核结果,谢谢!</div> -->
    <!-- 底部按钮 -->
    <div style="text-align:center;margin-top:2rem">
       <router-link to="/zhuce"><div class="button">返回</div></router-link>
   </div>
  </div>
</template>

<script>
export default {
  methods: {
    ok(){
      this.$router.push('/outman')
    }
  },
};
</script>
<style scoped>
.btn {
  text-align: center;
  margin-top: 2rem;
}
.same {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
</style>