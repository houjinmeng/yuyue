<template>
  <div>
    <div class="app">
      <div class="top_title">欢迎使用预约系统</div>
      <div style="text-align:center;font-size:0.3rem;color:#656565">Welcome</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let qr = this.getqr("qrresult");
    var path = window.sessionStorage.getItem("path");

    if (qr == null) {
      let code = this.getQueryString("code");
      if (code == null) {
        this.login();
      } else {
        if (window.sessionStorage.getItem("token") === null) {
          let data = {
            code: "",
            type: "wx_oauth"
          };
          data.code = this.getQueryString("code");
          if (data.code === null) {
            return false;
          } else {
            this.$http
              .post("/login/wx_login", JSON.stringify(data))
              .then(res => {
                // 通过浏览器的sessionStorage记录服务器返回的token信息
                window.sessionStorage.setItem("token", res.data.token);
                window.sessionStorage.setItem("rule_id", res.data.rule_id);

                if (path == "/zhuce") {
                  this.$router.push("/zhuce");
                } else {
                  if (res.data.rule_id == 10 || res.data.rule_id == 0) {
                    this.$router.push("/outman");
                  } else if (res.data.rule_id == 5) {
                    this.$router.push("/menwei");
                  } else if (res.data.rule_id == 1) {
                    this.$router.push("/caigou");
                  } else if (res.data.rule_id == 6) {
                    this.$router.push("/admin");
                  } else {
                    this.$router.push("/other");
                  }
                }
              });
          }
        }
      }
    } else {
      this.data.type = qr.substring(9, 17);
      let begin = qr.indexOf('"id":');
      let last = qr.length;
      let a = qr.substring(begin, last - 4);
      this.data.id = a.substring(6, a.length);
      window.sessionStorage.setItem("qr", JSON.stringify(this.data));
      if (this.data.type == "business") {
        this.$router.push("/yewu");
      } else {
        this.$router.push("/huowu");
      }
    }
  },
  methods: {
    // 截取扫码返回结果
    getqr(name) {
      var reg = new RegExp("\\b" + name + "=([^&]*)");
      var r = location.href.match(reg);
      if (r != null) return unescape(r[1]);
    },
    //  登录
    login() {
      this.$http.post("/login/wx_qrcode").then(res => {
        location.href = res.data;
      });
    },
    // 截取code
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r !== null) return r[2];
      return null;
    }
  },
  data() {
    return {
      data: {
        type: "",
        id: ""
      }
    };
  }
};
</script>
<style scoped>
.top_title {
  text-align: center;
  margin-top: 1.6rem;
  margin-bottom: 0.6rem;
  font-size: 0.3rem;
}
.app {
  width: 100%;
  position: fixed;
  height: 100%;
  background: url("../../assets/img/shouye-yun.jpg") top left no-repeat;
  background-size: 100%;
  overflow: hidden;
}
</style>