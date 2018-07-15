<template>
  <div class="footer">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="3"></el-col>
      <el-col :span="18">
        <el-row type="flex" class="row-bg" justify="center" style="width:100%;display:flex;border-bottom:1px solid #494646;padding:0 0 35px 0">
          <el-col :span="6">
            <div class="aboutus">
              关于头豹
            </div>
            <div class="aboutuslist">
              <div class="aboutusitem">
                <p>关于我们</p>
              </div>
              <div class="aboutusitem">
                <p>联系我们</p>
              </div>
              <div class="aboutusitem">
                <p>APP下载</p>
              </div>
            </div>

          </el-col>
          <el-col :span="12">
            <div class="aboutus">
              友情链接
            </div>
            <div class="aboutuslist">
            <!-- <div style="width:360px;"> -->
              <!-- <el-col :span="8" v-for="(item,index) in aboutlist" :key="index" style="display:flex;align-items:center;justify-content:flex-start">
                <div  class="aboutusitem">
                <img :src="item.src">
              </div>
              </el-col> -->
              <img src="../assets/friend.png">

            </div>
          </el-col>
          <el-col :span="6">
            <div class="aboutus">
              头豹APP下载
            </div>
            <div class="code">
              <img src="../assets/code.png">
              <p>iPhone & Android</p>

            </div>
          </el-col>
        </el-row>
        <el-row class="row-bg" style="width:100%;display:flex;">
          <div class="footer_message">
            <div class="footer_message_img">
              <img src="../assets/GroupCopy.png">
            </div>
            <div class="footer_copy">
              <p>
                <span>本站由</span>阿里云 提供计算与安全服务</p>
              <p>©2018~2020 上海沙利文网络科技有限公司|沪IPC号213123124455|沪IPC备号213123124455|沪公网安备号222333311113</p>
            </div>

          </div>

        </el-row>

      </el-col>

      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aboutlist: [
        {
          src: require("../assets/alibaba.png")
        },
        {
          src: require("../assets/baidu.png")
        },
        {
          src: require("../assets/Bitmap.png")
        },
        {
          src: require("../assets/cctv.png")
        },
        {
          src: require("../assets/Group.png")
        },
        {
          src: require("../assets/huawei.png")
        },
        {
          src: require("../assets/wanda.png")
        },
        {
          src: require("../assets/xiaomi.png")
        }
      ]
    };
  }
};
</script>

<style lang="less">
.el-footer {
  padding: 32px 0;
  background: #312e2d;
}

.aboutus {
  font-size: 16px;
  color: #ffffff;
}
.aboutuslist {
  font-size: 14px;
  color: #dddddd;
  margin: 5px 0 0 0;
  img{
    width: 300px;
    padding: 26px 0;
  }
  .aboutusitem {
    padding: 26px 0 0 0;
  }
}
.code {
  padding: 31px 0 0 0;
  display: flex;
  float: left;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 12px;
    color: #dddddd;
    margin: 10px 0 0 0;
  }
}
.footer_message {
  margin: 20px 0 0 0;
  display: flex;
  .footer_copy {
    margin: 0 0 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p:nth-child(1) {
      font-size: 12px;
      color: #ffffff;
      span {
        color: #636464;
        margin: 0 20px 0 0;
      }
    }
    p:nth-child(2) {
      font-size: 10px;
      color: #636464;
      margin: 9px 0 0 0;
    }
  }
}
</style>
