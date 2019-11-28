<template>
  <div id="img">
    <div class="loading" v-show="tishi">
      <van-loading
        type="spinner"
        size="0.3rem"
        :vertical="true"
        style="margin:0.3rem 0"
        >正在上传...</van-loading
      >
    </div>
    <div style="font-size:0.24rem;text-align:center;padding:0.15rem 0">
      第三步: 上传质检报告
    </div>
    <div class="card">
      <van-uploader
        v-model="fileList"
        :after-read="upLoaderImg"
        accept="*"
        :preview-image="false"
      >
        <van-button icon="photo" type="primary">上传文件</van-button>
      </van-uploader>
      <a :href="item" v-for="(item, index) in files" :key="index">
        <div class="yulan">质检报告{{ index + 1 }}</div>
      </a>

      <!-- <van-uploader
        v-model="fileList"
        :max-count="20"
        preview-size="1rem"
        :before-read="beforeRead"
      ></van-uploader> -->
      <!-- <div style="font-size:0.12rem;color:red">
        (图片预览时右上角可删除,确认无误后点击下方按钮上传)
      </div> -->
      <!-- 底部按钮 -->
      <div class="btn">
        <el-button
          type="warning"
          style="border-radius: 0.15rem 0 0 0.15rem;"
          size="small"
          :disabled="showbtn"
          @click="back"
          >上一步</el-button
        >
        <!-- <el-button
          @click="upLoaderImg"
          type="warning"
          size="small"
          :disabled="showbtn"
          >上传图片</el-button
        > -->
        <el-button
          type="warning"
          style="border-radius: 0 0.15rem 0.15rem 0;"
          @click="wancheng"
          size="small"
          :disabled="btnshow"
          >完 成</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.ruleform = JSON.parse(window.sessionStorage.getItem("ruleform"));
    let file = JSON.parse(window.sessionStorage.getItem("files"));
    if (file != null) {
      this.files = file;
      this.btnshow = false;
    }
    let imgId = JSON.parse(window.sessionStorage.getItem("imgId"));
    if (imgId != null) {
      this.obj.img_ids = imgId.join(",");
    }
    let c = JSON.parse(window.sessionStorage.getItem("order"));
    if (c != null) {
      this.obj.order_id = c.id;
      this.obj.erp = c.erp;
    }
    let a = JSON.parse(window.sessionStorage.getItem("fileList"));
    if (a != null) {
      this.fileList = a;
    }
    let b = JSON.parse(window.sessionStorage.getItem("upform"));
    if (b != null) {
      b.img_list.forEach(item => {
        item.url = "http://booking.goldenbrother.cn" + item.url;
      });
      this.fileList = b.img_list;
      this.obj.order_id = b.order_id;
      this.obj.erp = b.erp;
    }
  },
  data() {
    return {
      tishi: false,
      showbtn: false,
      imgid: [], // 图片Id
      btnshow: true,
      // 接收表单信息
      ruleform: {},
      // 图片列表
      fileList: [],
      files: [],
      img: "",
      obj: {
        token: window.sessionStorage.getItem("token"),
        //token: "bquex3wtn1",
        img_ids: "",
        order_id: "",
        erp: ""
      }
    };
  },
  methods: {
    // 上一步
    back() {
      window.sessionStorage.setItem("fileList", JSON.stringify(this.fileList));
      this.$router.push("/outman/songhuomessage");
    },
    // 上传图片
    upLoaderImg() {
      this.$dialog
        .confirm({
          message: "点击上传后无法修改,确定上传吗"
        })
        .then(() => {
          this.tishi = true;
          let formData = new FormData();
          for (var i = 0; i < this.fileList.length; i++) {
            formData.append(`img[]`, this.fileList[i].file);
          }
          formData.append("token", this.obj.token);
          this.$http({
            method: "post", // 指定请求方式
            url: "/client/uploads_img", // 请求接口
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;"
            },
            data: formData
          })
            .then(res => {
              if (res.data.code == 1) {
                this.tishi = false;
                this.$toast.success(res.data.msg);
                this.btnshow = false;
                this.showbtn = true;
                res.data.data.forEach(item => {
                  this.imgid.push(item.id);
                  this.files.push("http://booking.goldenbrother.cn" + item.url);
                  window.sessionStorage.setItem(
                    "files",
                    JSON.stringify(this.files)
                  );
                  window.sessionStorage.setItem(
                    "imgId",
                    JSON.stringify(this.imgid)
                  );
                });
              } else {
                //否则 Toast 提示
                this.$toast.fail(res.data.msg);
                this.tishi = false;
              }
            })
            .catch(err => {
              this.tishi = false;
              this.$toast.fail("系统异常");
              reject(err);
            });
        })
        .catch(() => {});
    },
    // 上传之前校验;
    beforeRead(file) {
      // if (file.length != undefined) {
      //   file.forEach(file => {
      //     let fileName = file.name;
      //     let regex = /(.jpg|.jpeg|.gif|.png|.bmp|.tif|.psd|.dng|.cr2|.nef)$/;
      //     if (regex.test(fileName.toLowerCase())) {
      //       this.fileList.push(file);
      //       return true;
      //     } else {
      //       this.$toast.fail("请选择正确格式的图片");
      //       return false;
      //     }
      //   });
      // } else {
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp|.tif|.psd|.dng|.cr2|.nef)$/;
      if (regex.test(fileName.toLowerCase())) {
        return true;
      } else {
        this.$toast.fail("请选择正确格式的图片");
        return false;
      }
      // }
    },
    // 完成
    wancheng() {
      this.obj.img_ids = this.imgid.join(",");
      Object.assign(this.obj, this.ruleform);
      this.$http
        .post("/client/delivery", this.$qs.stringify(this.obj))
        .then(res => {
          if (res.data.code == 1) {
            this.$router.push("/outman/songhuook");
          } else {
            this.$router.push("/outman/error");
          }
        });
    }
  }
};
</script>
<style scoped>
.yulan {
  font-size: 0.14rem;
  padding: 0.1rem;
  border: 1px solid #e0b166;
  width: 0.85rem;
  margin-top: 0.1rem;
  border-radius: 0.1rem;
  text-align: center;
}
.btn >>> .el-button {
  padding: 0 !important;
  margin: 0 !important;
  width: 1rem;
  height: 0.3rem;
  line-height: 0.3rem;
}
.card >>> .van-icon {
  font-size: 0.2rem !important;
}
.card {
  position: fixed;
  background-color: #fff;
  width: 90%;
  margin-left: 2%;
  height: 85%;
  border-radius: 0.1rem;
  padding: 0.1rem;
  overflow: auto;
}
.btn {
  text-align: center;
  margin-top: 1rem;
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
