<template>
    <div class="popus">
        <div class="pop1 pus" v-if="tips==='had'">
            <div class="pop-con">
                <p class="p1">该手机号已经报名，是否进入该手机号的报名中心</p>
                <ul class="btn-group">
                    <li class="cancle" @click="popclose">取消</li>
                    <li class="ok" @click="gotab">进入</li>
                </ul>
            </div>
        </div>
        <div class="pop2 popall"  v-if="tips==='ok'">
            <div class="pop-con">
                <h2 class="tc">报名成功</h2>
                <p class="p1">请在规定日期内，在我的报名中，上传作品和语音</p>
                <p class="p2">作品上传日期：2018-04~2018-06</p>
                <p class="p2">语音上传日期：2018-04~2018-06</p>
                <img class="pic" src="../../public/images/success.png" alt="">
            </div>
            <ul class="btn-group">
                <li class="cancle" @click="gomanager">下次再传</li>
                <li class="ok" @click="goself">上传作品</li>
            </ul>
        </div>
        <!--<div class="pop3 popall"  v-if="tips==='fail'">
            <div class="pop-con">
                <h2 class="tc">报名失败</h2>
                <p class="p1 tc">请稍候再试</p>
                <img class="pic" src="../../public/images/fail.png" alt="">
            </div>
            <ul class="btn-group">
                <li class="ok" @click="popclose">知道了</li>
            </ul>
        </div>-->
        <div class="pop4 popall" v-if="voiceupload===0">
            <div class="pop-con">
                <h2 class="tc">作品上传成功</h2>
                <h2 class="tc" v-if="fmsg==='fixed'">作品修改成功</h2>
                <p class="p1">您还没有上传语音，请在规定时间内，在我的报名中上传</p>
                <p class="p2">语音上传日期：2018-04~2018-06</p>
                <img class="pic" src="../../public/images/success.png" alt="">
            </div>
            <ul class="btn-group">
                <li class="ok" @click="popclose">好的</li>
            </ul>
        </div>
        <div class="pop5 popall" v-if="voiceupload===1">
            <div class="pop-con">
                <h2 class="tc">上传成功</h2>
                <h2 class="tc" v-if="fmsg==='fixed'">作品修改成功</h2>
                <p class="p1">您已完成语音和作品的上传，尽情期待2018年童年画语杯大赛开启</p>
                <img class="pic" src="../../public/images/success.png" alt="">
            </div>
            <ul class="btn-group">
                <li class="ok" @click="popclose">好的</li>
            </ul>
        </div>
        <div class="pop5 popall" v-if="voiceupload===2">
            <div class="pop-con">
                <h2 class="tc">语音上传成功</h2>
                <p class="p1">您还没有上传作品，请在规定时间内，在我的报名中上传</p>
                <img class="pic" src="../../public/images/success.png" alt="">
            </div>
            <ul class="btn-group">
                <li class="ok" @click="popclose">好的</li>
            </ul>
        </div>
        <div class="mask" v-if="mask"></div>
        
    </div>
</template>

<script>
    export default{
        data(){
            return{
                notice:''
            }
        },
        props:['tips','mask','voiceupload','fmsg'],
        methods:{
            popclose(){
                this.$emit('close');
            },
            goself(){
                // this.$router.push('upload');
                var mid = sessionStorage.getItem('tid'); 
                window.location.href=`http://erp.dfth.com/index.php/Drawing/upload2.html?id=${mid}`
            },
            gomanager(){
                var mid = sessionStorage.getItem('tid'); 
                this.$router.push(`manage?id=${mid}`);
            },
            gotab(){
                // this.$emit('gosign');
                var mid = sessionStorage.getItem('tid'); 
                this.$router.push(`manage?id=${mid}`);
            }
        },
        created(){
            // console.log(this.fmsg)
        }
    }
</script>

<style scoped>
    .popus .pop1 {position: fixed;z-index:1000;width: 62rem;background: #fff;border-radius:1.5rem;left: 50%;top: 50%;margin:-15rem 0 0 -31rem;
    overflow: hidden;}
    .popus .pop1 .p1 {color:#333;font-size: 3.2rem;padding:4rem 0;margin:0 4rem;}
    .btn-group {display: flex;justify-content: center;border-radius:0 0 1.5rem 1.5rem;overflow: hidden;}
    .btn-group li{width: 50%;line-height: 10rem;text-align: center;font-size: 3.2rem;}
    .btn-group .cancle {color:#333;background: #f5f5f5;}
    .btn-group .ok {background: #34abf6;color:#fff;}
    .mask {background:rgba(0,0,0,0.5);width: 100%;height: 100%;left: 0;top: 0;z-index:999;position: fixed;}
    .popall {position: fixed;z-index:1000;width: 62rem;background: #fff;border-radius:1.5rem;left: 50%;top: 50%;margin:-19rem 0 0 -31rem;}
    .popall .pop-con {padding:4rem 0;margin:0 4rem;position: relative;}
    .popall .pop-con .pic {position: absolute;width: 17.6rem;left: 50%;margin-left: -8.8rem;top: 0;margin-top: -8.8rem;}
    .popall h2{font-size: 3.2rem;color:#333;margin: 4.5rem 0 2rem 0;}
    .popall .p1 {font-size: 2.8rem;color:#666;margin-bottom: 0.5rem;}
    .popall .p2 {font-size: 2.4rem;color:#fd7555;}
    .pop3 .btn-group li{width: 100%;}
    .pop4 .btn-group li{width: 100%;}
    .pop5 .btn-group li{width: 100%;}
</style>