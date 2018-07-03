<template>
    <div class="voice" id="share">
        <div :class="['vbox',{vboxok:upload}]">
            <div class="vtitle tc">
                <h2 v-if="upload===false">未上传语音</h2>
                <h2 v-if="upload===true">已上传语音</h2>
                <p class="p1">小朋友可以将作品背后的故事说出来，快</p>
                <p class="p1">来和大家分享你的“童年画语”吧。</p>
            </div>
            <div class="voice-con" v-if="mp3!=''||record===true" @click="play">
                <img v-if="playstatus==='noplay'" class="voice-icon vm" src="../public/images/voice.png" alt="">
                <img v-if="playstatus==='play'" class="vm vicon2" src="../public/images/voice.gif" alt="">
                <span class="s1" v-if="record===true">{{sec2}}<i>s</i></span>
                <span class="s1" v-if="mp3!=''">{{voicesec}}<i>s</i></span>
            </div>
        </div>
        <div class="content">
            <div class="btn-box">
                <p ref="vtouch" :class="['vbtn',{vbtnoff:btning}]" @click="recordvoice">
                    <em v-if="!btning">点击按钮<i>开始录音</i></em>
                    <em class="voff" v-if="btning">点击按钮<i>开始录音</i></em>
                </p>
            </div>
            <p class="tips">重新点击按钮录音，即可替换原先的语音<br>最长可录制1分钟的语音</p>
        </div>
        <div class="bottombox">
            <div class="bottom">
                <p class="p1" @click="goback"><em v-if="upload===false">取消上传</em><em v-if="upload===true">取消修改</em></p>
                <p :class="['p2',{pon:submit}]" @click="voicego"><em v-if="upload===false">提交上传</em><em v-if="upload===true">提交修改</em></p>
            </div>
        </div>
        <div class="voice-start tc" v-if="recording">
            <div class="vstart">
                <img v-if="sec<60" class="record-icon" src="../public/images/record.gif" alt="">
                <img v-if="sec>59" class="record-icon" src="../public/images/record2.gif" alt="">
                <p class="p1" v-if="sec<60">录音中：{{sec}}s</p>
                <p class="p1" v-if="sec>59">录音已满1分钟，停止录音</p>
            </div>
            <p class="finish-record" @click="over">完成录音</p>
        </div>
        <audio controls="true" :src="mp3" id="audio"></audio>
        <p class="hide">{{serverId}}</p>
        <popus :mask="mask" @close="parentClose" :voiceupload="voiceupload"></popus>
        <div class="mk" v-if="mk"></div>
        <pop :message="message">
            <div slot="pop">{{msg}}</div>
        </pop>
        <img v-if="loading" class="loading" src="../public/images/loading.gif" alt="">
    </div>
</template>

<script>
    import popus from '../components/popus/popus'
    import pop from '../components/pop'
    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com'
    export default{
        data(){
            return{
                record:false,
                recording:false,
                localId:'',
                appid:'',
                noncestr:'',
                signature:'',
                timestamp:'',
                submit:false,
                voiceupload:'',
                mask:false,
                sec:0,
                sec2:0,
                serverId:'',
                setinter:'',
                playstatus:'noplay',
                mp3:'',
                settime:'',
                nd:'',
                mk:false,
                voicesec:'',
                message:true,
                msg:'',
                audiostatus:'stop',
                upload:false,
                btning:false,
                upStatus:'',
                info:'',
                loading:false,
                recordstatus:false,
                kolento:false
            }
        },
        created(){
            // if(this.localId){
            //     this.submit=true
            // }else{
            //     this.submit=false
            // }
            if(!localStorage.rainAllowRecord || localStorage.rainAllowRecord !== 'true'){
                wx.startRecord({
                    success: function(){
                        localStorage.rainAllowRecord = 'true';
                        wx.stopRecord();
                    },
                    cancel: function () {
                        }
                });
            }
            let curl = window.location.href;
            let xurl = curl.replace('#','');
            var tid = sessionStorage.getItem('tid');
            console.log(xurl)
            if(curl.indexOf('fixed')>-1){
                this.upload=true
            }else{
                this.upload=false
            }
            this.$axios.get(`${panda}/actives/ParticipantInfo`,{
                params:{
                    id:tid
                }
            }).then((res)=>{
                this.mp3=res.data.content.works_voice;
                if(res.data.content.voice_second>58){
                    this.voicesec=60
                }else{
                    this.voicesec=res.data.content.voice_second
                }

                if(this.mp3!=''){
                    // this.submit=true
                }
                this.info=res.data.content
                if(res.data.content.works_img!=''){
                    this.upStatus=1
                }else{
                    this.upStatus=2
                }
            })

            if(tid==1498){
                this.kolento=true
            }else{
                this.kolento=false
            }

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
                    debug: this.kolento, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: this.appid, // 必填，公众号的唯一标识
                    timestamp: this.timestamp, // 必填，生成签名的时间戳
                    nonceStr: this.noncestr, // 必填，生成签名的随机串
                    signature: this.signature,// 必填，签名
                    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','startRecord','stopRecord','playVoice','pauseVoice','stopVoice','uploadVoice'] // 必填，需要使用的JS接口列表
                });
                wx.ready(function(){
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页
                    //面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                });
            })


        },
        methods:{
            add(){
                if(this.sec<60){
                    this.sec++
                }
            },
            recordvoice(){
                this.recordstatus=true
                this.mk=true
                this.nd=new Date();
                this.settime = setTimeout(()=> {
                    this.btning=true
                    this.recording=true
                    this.setinter = setInterval(this.add,1000);
                    wx.startRecord();
                }, 300);

            },
            over(){
                // this.mk=false
                // if(new Date()-this.nd<300){
                //     clearTimeout(this.settime)
                // }else{
                //     this.btning=false
                //     this.submit=true
                //     this.recording=false
                //     this.record=true
                //     clearInterval(this.setinter);
                //     this.sec2=this.sec;
                //     this.sec=0;
                //     this.mp3='';
                //     wx.stopRecord({
                //         success:(res)=> {
                //             this.localId = res.localId;
                //         }
                //     });
                // }
                if(this.recordstatus===true){
                    this.recordstatus=false
                    if(this.sec2<59){
                        wx.stopRecord({
                            success:(res)=> {
                                this.localId = res.localId;
                            }
                        });

                    }
                }
                this.mp3=''
                this.recording=false
                this.mk=false
                this.sec2=this.sec;
                clearInterval(this.setinter);
                this.sec=0;
                this.record=true
                this.submit=true
            },
            play(){
                let myAudio = document.getElementById('audio');
                if(this.mp3!=''){
                    if(this.audiostatus==='stop'){
                        myAudio.play();
                        this.audiostatus='play'
                        this.playstatus='play'
                        myAudio.addEventListener('ended', ()=> {
                            this.audiostatus='stop'
                            this.playstatus='noplay'
                        }, false);
                    }else{
                        myAudio.pause();
                        myAudio.currentTime = 0;
                        this.audiostatus='stop'
                        this.playstatus='noplay'
                    }
                }else{
                    if(this.playstatus==='noplay'){
                        wx.playVoice({
                            localId: this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
                        });
                        this.playstatus='play'
                    }else{
                        wx.stopVoice({
                            localId:this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
                        });
                        this.playstatus='noplay'
                    }
                }
            },
            goback(){
                var mid = sessionStorage.getItem('tid');
                this.$router.push(`manage?id=${mid}`);
            },
            voicego(){
                this.pauseaudo();
                this.loading=true
                var tk = sessionStorage.getItem('tk');
                var tid = sessionStorage.getItem('tid');
                if(this.submit===true){
                    wx.uploadVoice({
                        localId: this.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success:(res)=> {
                            console.log(res)
                            this.serverId = res.serverId; // 返回音频的服务器端ID
                            this.$axios.post(`${panda}/actives/pictureSayAddVoice`,{
                                media_id:this.serverId,
                                id:tid,
                                _token:tk
                            }).then((res)=>{
                                console.log(res.data)
                                if(res.data.status==1){
                                    console.log(12)
                                    this.loading=false
                                    this.mk=true
                                    this.voiceupload=this.upStatus
                                    console.log(34)
                                }else{
                                    console.log(56)
                                    this.msg=res.data.msg
                                    this.message=false
                                    setTimeout(()=> {
                                        this.message=true
                                    }, 2000);
                                }
                            })
                        }

                    });
                }
            },
            parentClose(){
                var mid = sessionStorage.getItem('tid');
                this.$router.push(`manage?id=${mid}`);
            },
            pauseaudo(){
                let myAudio = document.getElementById('audio');
                if(this.mp3!=''){
                    myAudio.pause();
                    myAudio.currentTime = 0;
                    this.audiostatus='stop'
                    this.playstatus='noplay'
                }else{
                    wx.stopVoice({
                        localId:this.localId // 需要停止的音频的本地ID，由stopRecord接口获得
                    });
                    this.playstatus='noplay'
                }
            }
        },
        components:{
            popus,pop
        },
        watch:{
            'sec'(){
                if(this.sec===58){
                    if(this.recordstatus===true){
                        this.recordstatus=false;
                        this.sec2=60
                        wx.stopRecord({
                            success:(res)=> {
                                this.localId = res.localId;
                                // alert(this.localId)
                            }
                        });

                    }
                }
            }
        }
    }
</script>

<style scoped>
    .voice {background: #fff;}
    .vbox {background: url('../public/images/bj.png') no-repeat;min-height: 68.8rem;background-size: 100%;}
    .vboxok {background: url('../public/images/bj3.jpg') no-repeat;min-height: 68.8rem;background-size: 100%;}
    .vtitle {color:#fff;padding-top: 25%;}
    .vtitle h2{font-size: 5.8rem;margin-bottom: 1rem;}
    .vtitle .p1 {font-size: 2.8rem;}
    .voice-con {width: 20rem;height: 6.4rem;line-height: 6.4rem;background: #fff;border-radius:0.8rem;margin:3rem auto 0;
    box-shadow:0 0 9.5rem rgba(23,101,150,0.18);display:flex;justify-content: space-between;align-items: center;padding:0 1rem;}
    .voice-con .voice-icon {width: 2.5rem;height: 3.3rem;}
    .voice-con .vicon2 {width: 4.6rem;height: 4.6rem;}
    .voice-con .s1 {font-size: 2.7rem;color:#999;}
    .content {padding:9.5rem 0;}
    .vbtn {height: 9rem;line-height: 9rem;background: #fff;color:#333;font-size: 3.2rem;text-align: center;width: 75%;margin:0 auto;
    box-shadow:0 0 6.2rem rgba(0,3,5,0.12);border-radius:0.8rem;transition:all ease 0.1s;}
    .vbtn i{margin-left: 2rem;display: inline-block;}
    /*.vbtnoff {background:rgb(198,199,202);width: 60%;}*/
    .voff {color:#333;}
    .content .tips {width: 75%;margin:4rem auto 0;text-align: center;font-size: 2.6rem;color:#fd7555;line-height: 4.6rem;}
    .bottombox {position: fixed;width: 100%;bottom: 0;left: 0;}
    .bottom {background: #f5f5f5;padding:2rem 4rem;display: flex;justify-content: space-between;}
    .bottom p{width: 31rem;height: 8rem;line-height: 8rem;text-align: center;font-size: 3rem;border-radius:0.8rem;}
    .bottom em{display: inline-block;}
    .bottom .p1 {background: #fff;color:#333;}
    .bottom .p2 {color:#fff;background: #d8e3ec;}
    .bottom .pon {background: #31aaf6;}
    .voice-start {width: 30rem;position: absolute;top: 50%;left: 50%;margin:-25rem 0 0 -15rem;z-index:1000;}
    .voice-start .voice-show {width: 30rem;border-radius:1rem;background: rgba(0,0,0,0.6);font-size: 2.4rem;color:#fff;padding: 6rem 0 3rem 0;
    margin-top: 1.5rem;}
    .voice-start img{width: 7.7rem;margin:0 auto;width: 20.2rem;height: 20.2rem;padding-top: 2rem;}
    .voice-start .p1 {font-size: 2.4rem;}
    .finish-record {height: 8rem;line-height: 8rem;border-radius:1.2rem;background: #fff;text-align: center;font-size: 2.8rem;color:#31aaf6;
    margin-top: 6rem;}
    .btn-box {height: 10rem;}
    audio{opacity: 0;}
    .mk {background:rgba(0,0,0,0.5);width: 100%;height: 100%;left: 0;top: 0;z-index:999;position: fixed;}
    .vstart {width: 30rem;height: 30rem;background: #fff;border-radius:1.2rem;}
    * {-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;
        -ms-user-select:none; user-select:none;}
    .ontap{font-size: 4rem;}
    .loading {position: fixed;top: 50%;left: 50%;width: 18rem;height: 18rem;margin:-9rem 0 0 -9rem;z-index:999;}
</style>
