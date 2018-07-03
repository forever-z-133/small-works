<template>
    <div class="activity">
        <div class="banner">
            <img class="logo vm" src="../public/images/logo.png" alt="">
            <img id="mbtn" @click="musiccontrols()" :class="['music vm',{'musicon':play}]" src="../public/images/music.png" alt="">
        </div>
        <div class="navigation">
            <ul class="nav-con">
                <li class="nav-list" @click="rulego()">
                    <img class="vm g10" src="../public/images/indexicon1.png" alt="">
                    <p class="p1">比赛规则</p>
                </li>
                <li class="nav-list" @click="prizego()">
                    <img class="vm g10" src="../public/images/indexicon3.png" alt="">
                    <p class="p1">奖项设置</p>
                </li>
                <li class="nav-list" @click="workgo()">
                    <img class="vm g10" src="../public/images/indexicon2.png" alt="">
                    <p class="p1">比赛作品</p>
                </li>
            </ul>
        </div>
        <div class="news" id="news">
            <div class="newstitle tc">
                <img class="vm" src="../public/images/decorate5.png" alt="">
                <span class="p1">童年画语报道</span>
                <img class="vm" src="../public/images/decorate6.png" alt="">
            </div>
            <!--<video class="vm video-box" poster="../public/images/video.jpg" controls="" src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=l0628mbcgnr&auto=0"></video>-->
            <div class="videobox">
                <iframe frameborder="0" width="100%" height="498" src="https://v.qq.com/iframe/player.html?vid=r0685pnc9wp&tiny=0&auto=0" allowfullscreen></iframe>
            </div>
            <swiper :options="swiperOption1" ref="mySwiper">
                <!-- slides -->
                <swiper-slide>
                    <dl>
                        <dd><a href="https://mp.weixin.qq.com/s/jFAOV6Hbbnl8zaFXZG0cZA" target="_blank">搜狐网：2018年“童年画语”杯儿童绘画比赛启动 让孩子画出“我的美丽中国”</a></dd>
                        <dd><a href="https://mp.weixin.qq.com/s/ItjxgYy2umRfKbzkkqJDbg" target="_blank">新浪网：2018年童年画语杯儿童绘画比赛启动</a></dd>
                        <dd><a href="https://mp.weixin.qq.com/s/qde-oAmW2Kvf2UFiDF8-lA" target="_blank">网易：2018"童年画语"杯儿童绘画比赛启动 画出"中国梦"</a></dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dd><a href="https://mp.weixin.qq.com/s/WC1w2C-7hcYEnqpNUJcoow" target="_blank">腾讯大申：2018年“童年画语”杯儿童绘画比赛启动 画出“我的美丽中国”</a></dd>
                        <dd><a href="https://mp.weixin.qq.com/s/E-6A_c23Sve-MDYKuq-d8g" target="_blank">新华网：“童年画语”杯儿童绘画比赛在上海启动</a></dd>
                        <dd><a href="https://mp.weixin.qq.com/s/C60nY-CVn0fKbvUCmrx7uw" target="_blank">中新社：2018年“童年画语”杯儿童绘画比赛启动 让孩子画出“我的美丽中国”</a></dd>
                    </dl>
                </swiper-slide>
                <swiper-slide>
                    <dl>
                        <dd><a href="https://mp.weixin.qq.com/s/bAdgw5EjDZthFGlEcF-ARQ" target="_blank">上海日报：Painting contest launched to discover talented child artist</a></dd>
                        <dd><a href="https://mp.weixin.qq.com/s/cRywsRF2oTiGoT-_Xt6kvQ" target="_blank">上海热线：2018"童年画语"杯儿童绘画比赛启动 让孩子画出“我的美丽中国”</a></dd>
                        <!--<dd><a href="" target="_blank">东方网：2018年“童年画语”杯儿童绘画比赛启动 让孩子画出“我的美丽中国”</a></dd>-->
                    </dl>
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination spagination1"  slot="pagination"></div>
                <div class="swiper-button-prev hide" slot="button-prev"></div>
                <div class="swiper-button-next hide" slot="button-next"></div>
                <div class="swiper-scrollbar hide"   slot="scrollbar"></div>
            </swiper>
        </div>
        <div class="bottom" id="bottom">
            <swiper :options="swiperOption2" ref="mySwiper">
                <!-- slides -->
                <swiper-slide>
                    <a class="block" href="http://m.dfth.com/index" target="_blank"><img class="vm g10" src="../public/images/banner1.jpg" alt=""></a>
                </swiper-slide>
                <swiper-slide>
                    <!-- <a class="block" href="http://tnhy.dfth.com/marketMobile" target="_blank"><img class="vm g10" src="../public/images/banner2.jpg" alt=""></a> -->
                    <a class="block" href="http://m.dfth.com/newsMore?id=231" target="_blank"><img class="vm g10" src="../public/images/banner3.jpg" alt=""></a>
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination spagination2"  slot="pagination"></div>
                <div class="swiper-button-prev hide" slot="button-prev"></div>
                <div class="swiper-button-next hide" slot="button-next"></div>
                <div class="swiper-scrollbar hide"   slot="scrollbar"></div>
            </swiper>

            <div class="support tc">
                <dl>
                    <dt>主办方</dt>
                    <dd>童年画语杯儿童绘画比赛组委会</dd>
                </dl>
                <dl>
                    <dt>协办方</dt>
                    <dd>朵云轩艺术中心</dd>
                </dl>
                <dl>
                    <dt>指导单位</dt>
                    <dd>中国儿童报</dd>
                </dl>
                <dl>
                    <dt>承办方</dt>
                    <dd>东方童画</dd>
                    <dd>上海特殊关爱基金会</dd>
                </dl>
            </div>
        </div>
        <menubox :location="position"></menubox>
        <tips :msg="tipsmsg" v-if="hasmsg"></tips>

        <div class="popbox">
            <div class="pop3 tc" v-if="pop3">
                <div class="popinner">
                    <img class="vm endpic" src="../public/images/end.png" alt="">
                    <p class="p2 tc">线上评选活动已结束</p>
                    <img class="lookbtn vm playover" src="../public/images/resultbtn.png" alt="">
                    <img @click="closepop3()" class="vm close" src="../public/images/popclose2.png" alt="">
                </div>
            </div>
        </div>

        <div class="mask" v-if="mk"></div>
    </div>
</template>

<script>
    var test = 'http://student.dfth.com'
    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com'
    import menubox from '../components/menubox/menubox'
    import tips from '../components/tips/tips'
    export default{
        data(){
            return{
                play:false,
                position:'index',
                swiperOption1: {
                    pagination: {
                        el: '.spagination1'
                    }
                },
                swiperOption2: {
                    pagination: {
                        el: '.spagination2'
                    }
                },
                myAudio:'',
                hasmsg:false,
                tipsmsg:'',
                pop3:false,
                mk:false,
                oid:''
            }
        },
        created(){

            var curl = window.location.href;
            if(curl.indexOf('?from')>-1){
                let newurl1 = curl.split('?from')[0];
                let newurl2 = curl.split('#')[1];
                window.location.href=newurl1+'#'+newurl2
            }

            let localoid =localStorage.getItem('ooid');
            if(localoid){
                this.oid=localoid
            }else{
                if(curl.indexOf('openid')>-1){
                    this.oid = curl.split('=')[1];

                    this.$axios.get(`${test}/actives/joinerIn`,{
                        params:{
                            openid:this.oid
                        }
                    }).then((res)=>{
                        if(res.data.status===1){
                            localStorage.setItem('ooid',this.oid);
                        }else{
                            alert('登录失败')
                        }
                    })
                }else{
                    var urlvalue = escape(curl)
                    // console.log('http://erp.dfth.com/index.php/Weixin/getWebOpenidtest?backurl='+urlvalue)
                    window.location.href='http://erp.dfth.com/index.php/Weixin/getWebOpenidtest?backurl='+urlvalue;
                }
            }

            this.$axios.get(`${test}/actives/limitTime`, {
                params:{
                }
            }).then((res)=> {
                if(res.data.msg.game.status===3){
                    let ending = sessionStorage.getItem('end');
                    if(ending){

                    }else{
                        this.pop3=true;
                        this.mk=true;
                        sessionStorage.setItem('end','end');
                    }
                }

            })

            this.$axios.get(`${test}/actives/dayAdd`,{
                params:{
                    openid:this.oid
                }
            }).then((res)=>{
                if(res.data.status===1){
                    this.hasmsg=true
                    this.tipsmsg='首次登陆成功'
                }else{
                    this.hasmsg=false
                }
            })


            wx.ready(()=>{
                this.play=true;
                this.myAudio = new Audio();
                this.myAudio.src='./static/audio/music.mp3';
                this.myAudio.loop='loop';
                this.myAudio.play();
                this.play=true;

                wx.onMenuShareTimeline({
                    title: '2018童年画语-线上个人艺术馆', // 分享标题
                    link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    success:  ()=> {
                        this.$axios.get(`${test}/actives/timelineAdd`,{
                            params:{
                                openid:this.oid
                            }
                        }).then((res)=>{
                            if(res.data.status===1){
                                this.hasmsg=true
                                this.tipsmsg='分享成功'
                            }
                        })
                }
                });

                wx.onMenuShareAppMessage({
                title: '2018童年画语-线上个人艺术馆', // 分享标题
                desc: '2018童年画语儿童绘画比赛', // 分享描述
                link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://student.dfth.com/market/static/img/shareimg.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: ()=> {
                    this.$axios.get(`${test}/actives/shareAppAdd`,{
                        params:{
                            openid:this.oid
                        }
                    }).then((res)=>{
                        if(res.data.status===1){
                            this.hasmsg=true
                            this.tipsmsg='分享成功'
                        }
                    })
                // 用户点击了分享后执行的回调函数
                }
                });
            });

        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            console.log('this is current swiper instance object', this.swiper)
            this.swiper.slideTo(3, 1000, false)
            document.getElementById('mbtn').click();

        },
        beforeDestroy(){
            // alert(1)
            this.myAudio.pause()
            this.play=false;
        },
        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        components:{
            menubox,tips
        },
        methods:{
            closepop3(){
                this.pop3=false;
                this.mk=false;
            },
            musiccontrols(){
                if(this.myAudio.paused){
                    this.myAudio.play();
                    this.play=true
                }else{
                    this.myAudio.pause();
                    this.play=false
                }
            },
            workgo(){
                this.$router.push('work');
            },
            rulego(){
                window.location.href="https://mp.weixin.qq.com/s/8rMpl3LkOCWYktzLHTHx4A"
            },
            prizego(){
                window.location.href="https://mp.weixin.qq.com/s/GUZqNlOMfa527jQuMcP0Bw"
            }
        }
    }
</script>

<style>
    .activity {padding-bottom: 14rem;}
    .activity .banner {background: url('../public/images/bj8.jpg') no-repeat center center;background-size: 100% 100%;height: 75rem;}
    .activity .banner .logo {width: 15.4rem;position: absolute;top: 0;left: 1rem;}
    .activity .banner .music {width: 8rem;height: 8rem;border-radius:50%;position: absolute;top: 3rem;right: 2.5rem;}
    @keyframes music {
        0%{transform:rotate(0deg);}
        50%{transform:rotate(180deg);}
        100%{transform:rotate(360deg);}
    }
    .activity .banner .musicon {animation: music linear 2s infinite;}
    .activity .navigation {background: url('../public/images/bj10.png') repeat center center;height: 30.4rem;-webkit-background-size: 100%;
        background-size: 100%;display: flex;align-items: center;justify-content: center;}
    .activity .navigation .nav-con {display: flex;justify-content: center;margin-top: -3rem;}
    .activity .navigation .nav-list {width: 16.6rem;font-size: 2.4rem;color:#fff;text-align: center;margin:0 3rem;}
    .activity .news {background: #41c4f9;padding-bottom: 8rem;}
    .activity .newstitle {padding:1rem 0 3rem 0;}
    .activity .newstitle .p1 {font-size: 4.2rem;color:#333;color:#fff;text-shadow:0 0.1rem 1rem rgba(0,91,176,0.45);}
    .activity .newstitle img{width: 6.8rem;margin-top: -2rem;}
    .activity .video-box {width: 88%;border-radius:2rem;height: 38rem;overflow: hidden;margin:0 auto;box-shadow:0 1.4rem 6rem rgba(0,79,152,0.6);
        display: block;object-fit:fill}
    .activity #news .swiper-container {height: 40rem;width: 88%;margin:0 auto;background: #fff;border-radius:2rem;
        box-shadow:0 1.4rem 6rem rgba(0,76,152,0.6);margin-top: 4.5rem;}
    .activity #news .swiper-slide {font-size: 2.8rem;line-height: 10.8rem;color:#333;height: 10.8rem;}
    .activity #news .swiper-slide a{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom: 0.1rem solid #e6e6e6;
        display: block;margin:0 5%;}
    .activity #news .spagination1 {bottom: 3rem;}
    .activity #news .spagination1 .swiper-pagination-bullet {width: 1.2rem;height: 1.2rem;border-radius:50%;background: #c1d0d6;margin:0 1rem;opacity: 1;}
    .activity #news .spagination1 .swiper-pagination-bullet-active {background: #05adf3;opacity: 1;}


    .activity #bottom .swiper-container {height:28rem;width: 88%;margin:0 auto;border-radius:2rem;
        margin-top: 4.5rem;
        /*box-shadow:0 1.9rem 6rem rgba(0,0,0,0.12);*/
        }
    .activity #bottom .swiper-slide {height: 28rem;overflow: hidden;border-radius:2rem;}
    .activity #bottom .swiper-slide img{width: 100%;height: 100%;}
    .activity #bottom .spagination2 {background: rgba(0,0,0,0.7);border-radius:10rem;z-index:500;height: 2.8rem;padding:0 0.8rem;
    left: 38%;bottom: 2rem;width: 24%;}
    .activity #bottom .spagination2 .swiper-pagination-bullet {width: 1.2rem;height: 1.2rem;border-radius:50%;background: #757575;margin:0 1rem;
    margin-top: 0.7rem;opacity: 1;}
    .activity #bottom .spagination2 .swiper-pagination-bullet-active {background: #fff;opacity: 1;}

    .activity .support {width: 88%;background: #fff;border-radius:1rem;box-shadow: 0 1.9rem 6rem rgba(0,0,0,0.12);padding-bottom: 4rem;
    margin:0 auto;margin-top: 4rem;}
    .activity .support dl {padding-top: 4rem;}
    .activity .support dl dt{padding-bottom: 2.8rem;color:#05adf3;font-size: 3.6rem;}
    .activity .support dl dd{font-size: 2.8rem;color:#5c5e63;}


    .pop {background: #fff;border-radius:2rem;box-shadow:0 0.6rem 5rem rgba(0,0,0,0.12);position: fixed;top: 50%;left: 50%
    ;z-index:1000;}
    .pop3 {width: 70%;height: 50rem;margin:-25rem 0 0 -35%;position: fixed;top: 50%;left: 50%
    ;z-index:1000;}
    .pop3 .popinner {position: relative;}
    .pop3 .endpic {width: 29.7rem;height: 29.7rem;}
    .pop3 .p2 {color:#fff;font-size: 4rem;margin-top: 2rem;}
    .pop3 .lookbtn {width: 25rem;margin:2rem auto 0;}
    .pop3 .close {position: absolute;width: 3rem;top: 2rem;right: 3rem;}

    .mask {background: rgba(0,0,0,0.5);width: 100%;height: 100%;z-index:900;position: fixed;top: 0;left: 0;}
    .seemk {background: rgba(0,0,0,0.8);}
    .nav {z-index:500;}
    .nopresent {font-size: 2.4rem;margin-top: 1rem;color:#999;text-align: center;}
    .videobox {margin:0 auto;width: 88%;border-radius:0.8rem;overflow: hidden;}
</style>
