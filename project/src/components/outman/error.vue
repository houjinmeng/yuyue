<template>
  <div>
    <div style="text-align:center;margin-top:1.3rem">
      <img src="../../assets/img/shibai.png" alt style="width:1rem;height:1rem" />
    </div>
    <div style="font-size:0.16rem;text-align:center;margin-top:0.3rem">该订单不可使用</div>
    <!-- 底部按钮 -->
    <div class="btn">
      <router-link to="/outman/songhuo">
        <div class="button">确定</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    next(){
      this.$dialog.confirm({
        message:'马上就成功了,您确定要放弃本次\n预约吗'
      }).then(()=>{
        this.$router.push('/outman')
      }).catch(()=>{
        
      })
    }
  },
};
</script>
<style scoped>
.btn {
  text-align: center;
  margin-top: 1.2rem;
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