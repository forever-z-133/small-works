<template>
  <div id="app">
    <router-view>
      
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      appid:'',
      noncestr:'',
      signature:'',
      timestamp:''
    }
  },
  mounted(){

    let curl = window.location.href;
    let share = document.getElementById('share');
    var panda = 'http://student.dfth.com'
    
      this.$axios.get(`${panda}/actives/picWeixinConfig`,{
        params:{
        }
      }).then((res)=>{
          if(res.data.status==1){
              let rdata = res.data.msg;
              this.appid=rdata.appid;
              this.noncestr=rdata.noncestr;
              this.signature=rdata.signature;
              this.timestamp=rdata.timestamp;
          }
      }).then(()=>{
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: this.appid, // 必填，公众号的唯一标识
              timestamp: this.timestamp, // 必填，生成签名的时间戳
              nonceStr: this.noncestr, // 必填，生成签名的随机串
              signature: this.signature,// 必填，签名
              jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','startRecord','stopRecord','playVoice','pauseVoice','stopVoice','uploadVoice']
          });
          if(share){
            wx.ready(function(){
              wx.onMenuShareTimeline({
                  title: '绘画比赛-东方童画', // 分享标题
                  link: 'http://student.dfth.com/market/index.html#/?new', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: '', // 分享图标
                  success: function () {
                  // 用户点击了分享后执行的回调函数
                }
              });

              wx.onMenuShareAppMessage({
                title: '绘画比赛-东方童画', // 分享标题
                desc: '东方童画绘画比赛', // 分享描述
                link: 'http://student.dfth.com/market/index.html#/?new', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                // 用户点击了分享后执行的回调函数
                }
              });
          });
          }
      })
    

  }
}
</script>

<style>
  @import '../src/public/styles/core.css';
</style>
