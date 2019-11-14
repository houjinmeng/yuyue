<template>
  <div>
    <div style="text-align:center;margin-top:1.3rem">
      <img src="../../assets/img/wancheng.png" alt style="width:1rem;height:1rem" />
    </div>
    <div style="font-size:0.16rem;text-align:center;margin-top:0.3rem">您已成功提交注册</div>
    <div style="font-size:0.16rem;text-align:center;margin-top:0.1rem">请耐心等待审核结果</div>
   <div style="text-align:center;margin-top:2rem">
       <router-link to="/zhuce"><div class="button">返回</div></router-link>
   </div>
  </div>
</template>

<script>
export default {
  methods: {
    ok(){
      this.$router.push('/outman/person')
    }
  },
};
</script>
<style>
</style>