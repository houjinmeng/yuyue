<template>
  <div>
    <van-search
      v-model="data.key"
      placeholder="请输入厂商名称"
      show-action
      shape="round"
    >
      <div slot="action" @click="getlist" class="search">搜索</div>
    </van-search>
    <div class="card1">
      <div class="box" v-for="(item,index) in table" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.coding}}</div>
        <div>
          <span>验证码</span>
          <span
            style="color:#e9b96a;display:inline-block;width:1.05rem;margin-left:0.05rem"
          >{{item.code}}</span>
          <span class="xiangqing" style="margin:0" @click="del(item.id)">删除</span>
          <span class="xiangqing" @click="edit(item)">修改</span>
        </div>
      </div>
    </div>
    <div class="bottom" v-show="showBtn">
      <router-link to="/caigou">
        <div class="same" style="border-radius: 0.15rem 0 0 0.15rem;">返回</div>
      </router-link>
      <router-link to="/caigou/addchangshang">
        <div class="same" style="margin-top:0.15rem">添加</div>
      </router-link>
      <router-link to="/caigou/daoruchangshang">
        <div class="same" style="border-radius: 0 0.15rem 0.15rem 0;">导入</div>
      </router-link>
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
      data: { token: window.sessionStorage.getItem("token"), key: "" },
      table: [],
      clientHeight: document.documentElement.clientHeight,
      showBtn: true // 控制按钮盒子显示隐藏
    };
  },
  methods: {
    edit(item) {
      window.sessionStorage.setItem("changshang", JSON.stringify(item));
      this.$router.push("/caigou/editchangshang");
    },
    getlist() {
      this.$http
        .post("/audit/delivery_code_list", this.$qs.stringify(this.data))
        .then(res => {
          this.table = res.data;
        });
    },
    del(id) {
      this.$dialog
        .confirm({
          message: "您确定删除该厂商吗"
        })
        .then(() => {
          let data = { token: window.sessionStorage.getItem("token"), id: id };
          this.$http
            .post("/audit/delivery_code_delete", this.$qs.stringify(data))
            .then(res => {
              if (res.data.code == 0) {
                this.$toast.fail(res.data.msg);
              } else {
                this.$toast.success(res.data.msg);
                this.getlist();
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style>
.van-search__content {
  background-color: #fff !important;
}
.van-search {
  background-color: #f0f2f5 !important;
}
</style>
<style scoped>
.same {
  background-color: #e9b96a;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #fff;
  display: inline-block;
}
.bottom {
  bottom: 0;
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
.card1 {
  /* position: fixed; */
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 5.5rem;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
}
.box {
  padding: 0.1rem 0.1rem 0;
  border-bottom: 1px solid #cccccc;
  font-size: 0.16rem;
  overflow: auto;
}
.box div {
  margin-bottom: 0.08rem;
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
  margin-left: 0.1rem;
}
</style>