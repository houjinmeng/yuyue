<template>
  <div>
    <div style="text-align:center;margin-top:1.3rem">
      <img src="../../assets/img/wancheng.png" alt style="width:1rem;height:1rem" />
    </div>
    <div style="font-size:0.16rem;text-align:center;margin-top:0.3rem">提交成功, 正在等待审核</div>
    <div style="font-size:0.16rem;text-align:center;margin-top:0.1rem">您可通过 "我的预约" 查看审核详情</div>
    <div style="margin-top:1.2rem;text-align:center;">
      <el-button
        style="width:60%;font-size:0.16rem;background:#efbf6e;color:#fff"
        round
        @click="ok"
      >确定</el-button>
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