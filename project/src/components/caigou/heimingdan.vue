<template>
  <div>
    <van-search
      v-model="data.key"
      placeholder="请输入微信昵称"
      show-action
      shape="round"
    >
      <div slot="action" @click="getlist" class="search">搜索</div>
    </van-search>
    <div class="card3">
      <div class="top1">黑名单</div>
      <div class="samebox" v-for="(item,index) in list" :key="index">
        <div>{{item.nick}}</div>
        <span class="xiangqing" @click="del(item.id)">删除</span>
      </div>
    </div>
    <div class="bottom" v-show="showBtn">
      <div class="button" style="margin-top:0.18rem" @click="delall">删除所有</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getlist();
    window.onresize = () => {
      if (this.clientHeight > document.documentElement.clientHeight) {
        this.showBtn = false;
      } else {
        this.showBtn = true;
      }
    };
  },
  data() {
    return {
      value: "",
      data: { token: window.sessionStorage.getItem("token"), id: "", key: "" },
      list: {},
      ids: [],
      clientHeight: document.documentElement.clientHeight,
      showBtn: true // 控制按钮盒子显示隐藏
    };
  },
  methods: {
    getlist() {
      this.$http
        .post("/audit/black_index", this.$qs.stringify(this.data))
        .then(res => {
          this.list = res.data;
          res.data.forEach(item => {
            this.ids.push(item.id);
          });
        });
    },
    // 删除
    del(id) {
      this.$dialog
        .confirm({
          message: "确定删除吗"
        })
        .then(() => {
          this.$http
            .post("/audit/black_release", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
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
    // 删除所有
    delall() {
      this.$dialog
        .confirm({
          message: "确定全部删除吗"
        })
        .then(() => {
          this.data.id = this.ids.join(",");
          this.$http
            .post("/audit/black_release", this.$qs.stringify(this.data))
            .then(res => {
              if (res.data.code == 1) {
                this.$toast.success(res.data.msg);
                this.getlist();
              } else {
                this.$toast.fail(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="">
.van-search__content {
  background-color: #fff !important;
}
.van-search {
  background-color: #f0f2f5 !important;
}
</style>
<style scoped>
.top1 {
  padding: 0.1rem;
  border-bottom: 1px solid #cccccc;
  text-align: center;
  margin-bottom: 0.2rem;
}
.samebox {
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0.05rem;
  border-bottom: 1px solid #cccccc;
}
.bottom {
  /* position: fixed; */
  bottom: 0.5rem;
  background-color: #fff;
  height: 0.6rem;
  width: 100%;
  /* box-shadow: 2px 4px 0.1rem #000; */
  border-top: 1px solid #e9b96a;
  text-align: center;
}
.search {
  width: 0.6rem;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: #ffffff;
  background-color: #e9b96a;
  border-radius: 0.1rem;
}
.card3 {
  /* position: fixed; */
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 5rem;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
  font-size: 0.16rem;
}
.xiangqing {
  display: inline-block;
  width: 0.6rem;
  height: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  color: #fff;
  background-color: #e9b96a;
  border-radius: 0.1rem;
  margin-left: 1rem;
}
</style>