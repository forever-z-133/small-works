<template>
    <div class="integral">
        <div class="bj">
            <div class="jfbox tc">
                <p class="currentjf b">{{myjf}}</p>
                <p class="txt">当前积分</p>
            </div>
        </div>
        <div class="jfrules">
            <div class="jftitle tc">
                <img class="vm" src="../public/images/decorate3.png" alt="">
                <span class="p1 b">积分规则</span>
                <img class="vm" src="../public/images/decorate4.png" alt="">
            </div>
            <dl class="rulescon">
                <dd>1. 每日首次登陆奖励25积分。</dd>
                <dd>2. 分享活动页面至朋友圈，每次可获得5积分。（每日限3次）</dd>
                <dd>3. 分享活动页面至好友或微信群，每次可获得5积分。（每日限10次）</dd>
            </dl>
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
    import menubox from '../components/menubox/menubox'
    import tips from '../components/tips/tips'
    var local = 'http://192.168.1.227:8081'
    var test = 'http://student.dfth.com'
    var panda = 'http://student.dfth.com'
    export default{
        data(){
            return{
                position:'me',
                myjf:'',
                hasmsg:false,
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
                    this.myjf= parseInt(this.myjf)+25;
                }
            })

            wx.ready(()=>{

                wx.onMenuShareTimeline({
                    title: '2018童年画语-线上个人艺术馆', // 分享标题
                    link: 'http://student.dfth.com/market/index.html#/acthome', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                                this.myjf =parseInt(this.myjf)+5
                            }
                        })
                    
                    // 用户点击了分享后执行的回调函数
                }
                });

                wx.onMenuShareAppMessage({
                title: '2018童年画语-线上个人艺术馆', // 分享标题
                desc: '2018童年画语儿童绘画比赛', // 分享描述
                link: 'http://student.dfth.com/market/index.html#/acthome', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                            this.myjf =this.myjf =parseInt(this.myjf)+5
                        }
                    })
                // 用户点击了分享后执行的回调函数
                }
                });
            });
            

            this.$axios.get(`${test}/actives/joinerInt`, {
                params:{
                    openid:this.oid
                }
            }).then((res)=> {
                this.myjf=res.data.content.total;
            })
        },
        components:{
            menubox,tips
        },
        methods:{
           closepop3(){
                this.pop3=false;
                this.mk=false;
            }
        }
    }
</script>

<style scoped>
    .integral {padding-bottom: 10rem;}
    .bj {background: url('../public/images/bj4.jpg') no-repeat center center;background-size: cover;height: 57.7rem;display: flex;
    align-items: center;color:#9c4c12;}
    .bj .jfbox {width: 100%;}
    .bj .currentjf {font-size: 11rem;line-height: 11rem;margin-top: 2rem;}
    .bj .txt {font-size: 2.8rem;line-height: 2.8rem;}
    .jfrules {padding:6rem 0;}
    .jftitle .p1 {font-size: 4.2rem;color:#333;margin:0 1rem;}
    .jftitle img{width: 3.6rem;margin-top: -2rem;}
    .rulescon {padding:2rem 4.5rem 0;}
    .rulescon dd{margin-top: 3rem;font-size: 2.8rem;color:#666;}

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
</style>