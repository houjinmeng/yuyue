<template>
  <div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem;position: relative;">
      业务会面预约
      <router-link to="/caigou/baobiao">
        <van-icon name="arrow-left" style=" position: absolute;left:0.2rem;top:0.2rem" />
      </router-link>
    </div>
    <div class="yewu" v-for="(item,index) in list" :key="index">
      <div class="shang">
        <div>
          <span>来 访 公 司</span>
          <span>{{item.company}}</span>
        </div>
        <div>
          <span>内部联系人</span>
          <span>{{item.audit_name}}</span>
        </div>
        <div>
          <span>来 访 时 间</span>
          <span>{{item.time*1000|formatDate}}</span>
        </div>
      </div>
      <div class="xia">
        <div class="button" @click="del(item.id)">删除预约</div>
        <div class="button" @click="message(item.id)">查看详情</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/assets/js/date.js";
export default {
  //  时间戳过滤器
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  mounted() {
    this.getlist();
  },
  data() {
    return {
      data: { token: window.sessionStorage.getItem("token") },
      list: []
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$http
        .post("/audit/business_list", this.$qs.stringify(this.data))
        .then(res => {
          res.data.forEach(item => {
            if (item.status == 0) {
              this.list.push(item);
            }
          });
        });
    },
    // 删除
    del(id) {
      this.$dialog
        .confirm({
          message: "确定要删除该预约吗"
        })
        .then(() => {
          this.data.id = id;
          this.$http
            .post("/client/business_delete", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.list = [];
                this.$toast.success("删除成功");
                this.getlist();
              } else {
                this.$toast.fail("删除失败");
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 详情
    message(id) {
      window.sessionStorage.setItem("yewuid", id);
      this.$router.push("/huikemessage");
    }
  }
};
</script>
<style scoped lang='less'>
.yewu {
  width: 95%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.1rem;
  font-size: 0.14rem;
  margin-bottom: 0.1rem;
  .shang {
    padding: 0.1rem;
    border-bottom: 1px solid #000;
    div {
      margin-bottom: 0.1rem;
    }
    div:last-child {
      margin-bottom: 0;
    }
    div span:first-child {
      display: inline-block;
      width: 0.8rem;
    }
  }
  .xia {
    padding: 0.1rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>