<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;">预约报表格式选择</div>
    <div class="same" @click="order">
        <div style="color:#e0b166;margin-bottom:0.1rem">按订单</div>
        <div>以订单为依据查看对应预约情况</div>
    </div>
    <div class="same" @click="wait">
        <div style="color:#e0b166;margin-bottom:0.1rem">审核中</div>
        <div>正在等待审核的预约及其订单</div>
    </div>
    <div class="same" @click="checkok">
        <div style="color:#e0b166;margin-bottom:0.1rem">审核通过</div>
        <div>审核已通过的预约及其订单</div>
    </div>
    <div class="same" @click="check">
        <div style="color:#e0b166;margin-bottom:0.1rem">等待预约</div>
        <div>尚未预约的订单</div>
    </div>
    <div class="same" @click="wancheng">
        <div style="color:#e0b166;margin-bottom:0.1rem">已完成的预约</div>
        <div>已完成的预约及其订单</div>
    </div>
    <div class="same" @click="yanchi">
        <div style="color:#e0b166;margin-bottom:0.1rem">已延迟</div>
        <div>通过审核但进场时间已过的预约及其订单</div>
    </div>
    <div class="same" @click="yewu" v-show="ruleid==1">
        <div style="color:#e0b166;margin-bottom:0.1rem">会客信息</div>
        <div>等待来访的业务拜访预约清单</div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            ruleid:window.sessionStorage.getItem('rule_id')
        }
    },
    methods: {
        yewu(){
            this.$router.push('/huike')
        },
        order(){
            window.sessionStorage.setItem('orderstatus','所有')
            this.$router.push('/caigou/baobiaomessage')
        },
        check(){
            window.sessionStorage.setItem('orderstatus','未预约')
            this.$router.push('/caigou/baobiaomessage')
        },
        wait(){
            window.sessionStorage.setItem('orderstatus','审核中')
            this.$router.push('/caigou/baobiaomessage')
        },
        checkok(){
            window.sessionStorage.setItem('orderstatus','审核通过')
            this.$router.push('/caigou/baobiaomessage')
        },
        wancheng(){
            window.sessionStorage.setItem('orderstatus','已完成')
            this.$router.push('/caigou/baobiaomessage')
        },
        yanchi(){
            window.sessionStorage.setItem('orderstatus','已延迟')
            this.$router.push('/caigou/baobiaomessage')
        },
    },
};
</script>
<style scoped>
.same{
    width: 84%;
    margin: 0 auto;
    background-color: #fff;
    padding: 0.1rem 0.2rem;
    border-radius: 0.1rem;
    font-size: 0.16rem;
    margin-bottom: 0.1rem

}
</style>