<template>
    <div class="manage" id="share">
        <div class="manageTop">
            <h2 class="tc" v-if="picStatus==='no'&&upStatus==='novoice'">未上传作品、语音</h2>
            <h2 class="tc" v-if="picStatus==='no'&&upStatus==='voiceok'">未上传作品</h2>
            <h2 class="tc" v-if="upStatus==='novoice'&&picStatus==='yes'">未上传语音</h2>
            <h2 class="tc" v-if="picStatus==='yes'&&upStatus==='voiceok'">已完成上传，期待您的童年画语</h2>
            <div class="infor">
                <div class="infor-box clearfix">
                    <div class="infor-con fl">
                        <div class="info-inner">
                            <p class="name b">{{info.childname}}</p>
                            <span class="s1">
                                
                                <i class="group1">{{info.group_type}}</i> 
                                <!--<i class="group1" v-if="group===1">幼儿组</i> 
                                <i class="group2" v-if="group===2">少年组</i> 
                                <i class="group3" v-if="group===3">特别组</i> -->
                                <em>{{info.age}}岁，{{info.sex}}</em>
                            </span>
                            <p class="p2">编号:{{info.number}}</p>
                            <p class="p2">{{info.province}}{{info.city}}</p>
                            <p class="p2">{{info.organization}}</p>
                        </div>
                    </div>
                    <img class="decorate" src="../public/images/decorate.png" alt="" v-if="picurl===''">
                    <div class="picbox fr" v-if="picurl!=''">
                        <div class="wborder">
                            <div class="workbox">
                                <div class="picinner">
                                    <img ref="wpic" class="workpic" :src="picurl" alt="" v-if="picurl!=''">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--<div class="voice" v-if="vupload">
                    <div class="voice-con">
                        <img class="voice-icon" src="../public/images/voice.png" alt="">
                        <span class="seconds">11s</span>
                    </div>
                </div>-->
                <div class="voice" v-if="picStatus==='yes'">
                    <div class="voice-con clearfix">
                        <p class="p1 fl b">您的参赛证书</p>
                        <p class="p2 fr" @click="card()">点击查看</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <ul class="con">
                <li class="clist" @click="gowork">
                    <h3 v-if="picStatus==='no'" class="b">作品上传</h3>
                    <h3 v-if="picStatus==='yes'" class="b">作品修改</h3>
                    <p v-if="picStatus==='no'" class="p1">上传日期：2018-04～2018-06-22</p>
                    <p v-if="picStatus==='yes'" class="p1">截止日期：2018-06-22</p>
                    <div class="status">
                        <span class="s2" v-if="work===1">未开始</span>
                        <span class="s2 s3" v-if="work===2">已开始</span>
                        <span class="s2" v-if="work===3">已停止</span>
                        <img v-if="work!=2" class="arrow1" src="../public/images/arrow3.png" alt="">
                        <img v-if="work===2" class="arrow1" src="../public/images/arrow2.png" alt="">
                    </div>
                </li>
                <li class="clist" @click="goinfo"> 
                    <h3 class="b" v-if="upStatus==='novoice'">语音上传</h3>
                    <h3 class="b" v-if="upStatus==='voiceok'">语音修改</h3>
                    <p class="p1" v-if="upStatus==='novoice'">上传日期：2018-04～2018-06-22</p>
                    <p class="p1" v-if="upStatus==='voiceok'">截止日期：2018-06-22</p>
                    <div class="status">
                        <span class="s2" v-if="voice===1">未开始</span>
                        <span class="s2 s3" v-if="voice===2">已开始</span>
                        <span class="s2" v-if="voice===3">已停止</span>
                        <img v-if="voice!=2" class="arrow1" src="../public/images/arrow3.png" alt="">
                        <img v-if="voice===2" class="arrow1" src="../public/images/arrow2.png" alt="">
                    </div>
                </li>
                <li class="clist" @click="goroom">
                    <h3 class="b">我的线上个人画展</h3>
                    <p class="p1">敬请期待</p>
                    <div class="status">
                        <span class="s2" v-if="look===1">未开始</span>
                        <span class="s2 s3" v-if="look===2">已开始</span>
                        <span class="s2" v-if="look===3">已停止</span>
                        <img v-if="look!=2" class="arrow1" src="../public/images/arrow3.png" alt="">
                        <img v-if="look===2" class="arrow1" src="../public/images/arrow2.png" alt="">
                    </div>
                </li>
            </ul>
        </div>
        <p class="bottom tc" @click="gotest()">
            如有疑问拨打客服电话：<a href="tel:400-895-6006">400-895-6006</a>
        </p>
        <p class="hehe hide" @click="test()">test</p>
        <div class="cardbox" v-if="cardshow">
            <div class="cardcon tc">
                <img class="vm cardpic g10" src="../public/images/prize.jpg" alt="">
                <p class="cardname">{{info.childname}}</p>
                <img class="vm cardclose" @click="cardoff()" src="../public/images/cardclose.png" alt="">
            </div>
        </div>
        <div class="mask" v-if="cardshow"></div>
    </div>
</template>

<script>
    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com/'
    export default{
        data(){
            return{
                group:1,
                vupload:false,
                work:2,
                voice:1,
                look:1,
                info:'',
                picurl:'',
                picStatus:'no',
                upStatus:'novoice',
                cardshow:false,
                yourid:''
            }
        },
        created(){
            
            let curl = window.location.href;
            if(curl.indexOf('id=')>0){
                var mid = curl.split('id=')[1];
            }else{
                var mid = sessionStorage.getItem('tid'); 
            }
            this.yourid  = mid;
            sessionStorage.setItem('tid',mid); 
            // let newid = sessionStorage.getItem('tid'); 
            // var mid = sessionStorage.getItem('tid'); 
            this.$axios.get(`${panda}/actives/ParticipantInfo`,{
                params:{
                    id:mid
                }
            }).then((res)=>{
                this.info=res.data.content
                this.rank = res.data.content.rank
                if(res.data.content.works_img!=''){
                    this.picurl=res.data.content.works_img;
                    this.picStatus='yes'
                }else{
                    this.picStatus='no'
                }

                if(res.data.content.works_voice!=''){
                    this.upStatus='voiceok'
                }else{
                    this.upStatus='novoice'
                }


                if(this.info.group_type==='幼儿组'){
                    this.group=1
                }else if(this.info.group_type==='少儿组'){
                    this.group=2
                }else{
                    this.group=3
                }

            })

            this.$axios.get(`${panda}/actives/limitTime`,{

            }).then((res)=>{
                this.work=res.data.msg.works.status
                this.voice=res.data.msg.voice.status
                this.look=res.data.msg.game.status
            })
            // this.$axios.get(`/actives/limitTime`,{
            // }).then((res)=>{
            //     console.log(res)
            // })

        },
        mounted(){
            this.$nextTick(()=>{
                let pheight = this.$refs.wpic;
            })
            
        },
        methods:{
            gotest(){
                this.push('acthome');
            },
            gowork(){
                // if(this.picStatus==='yes'){
                //     this.$router.push('upload?fixed');
                // }else{
                //     this.$router.push('upload');
                // }
                if(this.work===2){
                    let curl = window.location.href;
                    let mid = curl.split('id=')[1];
                    window.location.href=`http://erp.dfth.com/index.php/Drawing/upload2.html?id=${mid}`
                }
            },
            // test(){
            //     if(this.voice===2){
            //         if(this.upStatus==='voiceok'||this.upStatus==='finished'){
            //             this.$router.push('voice?fixed');
            //         }else{
            //             this.$router.push('voice');
            //         }
            //     }
            // },
            goinfo(){
                if(this.voice===2){
                    if(this.upStatus==='voiceok'){
                        window.location.href='http://student.dfth.com/market/index.html#/voice?fixed'
                        // this.$router.push('voice?fixed');
                    }else{
                        window.location.href='http://student.dfth.com/market/index.html#/voice'
                        // this.$router.push('voice');
                    }
                }
            },
            goroom(){
                if(this.look===2){
                    window.location.href=`http://student.dfth.com/market/index.html#/room?${this.yourid}with${this.rank}end`
                }
            },
            test(){
                var mid = sessionStorage.getItem('tid'); 
                window.location.href=`http://erp.dfth.com/index.php/Drawing/upload2.html?id=${mid}`
            },
            card(){
                this.cardshow=true
            },
            cardoff(){
                this.cardshow=false
            }
        }
    }
</script>

<style scoped>
    body,html{background: #fff;}
    .manage {background: #fff;padding-bottom: 14rem;}
    .manageTop {background:url('../public/images/bj1.jpg') no-repeat center center;background-size: cover;min-height: 37.3rem;}
    .manageTop h2{font-size: 3.8rem;color:#fff;padding:1.5rem 0;position: relative;top: 1.5rem;font-weight:bold;}
    .voice {background: url('../public/images/bj10.jpg') no-repeat center center;background-size: cover;height: 7.9rem;
    border-radius:0 0 1.5rem 1.5rem;margin-top: 2rem;}
    /*.voice-con {height: 5.8rem;margin:0 auto;border-radius:1.2rem;background: #fff;position: relative;top: 1rem;display: flex;
    align-items: center;}*/
    .voice .voice-con .p1 {font-size: 3rem;margin-left: 3rem;text-shadow:0 0.2rem 1.2rem rgba(0,60,101,0.4);color:#fff;line-height: 7.9rem;}
    .voice .voice-con .p2 {width: 12.7rem;height: 5.2rem;font-size: 2.4rem;color:#31aaf6;text-align: center;border-radius:0.8rem;background: #fff;
    box-shadow:0 0.4rem 1.2rem rgba(0,87,146,0.4);line-height: 5.2rem;margin-right: 3rem;position: relative;top: 0.2rem;}
    .voice-con .voice-icon {width: 2.3rem;margin-left: 2rem;}
    .voice-con .seconds {font-size: 2.4rem;color:#999;margin-left: 9rem;}
    .infor {background: #fff;border-radius:1.5rem;box-shadow:0 1.4rem 6rem rgba(3,15,39,0.14);width: 90%;margin:0 auto;
    position: relative;min-height: 31rem;position: relative;top: 2rem;margin-bottom: 6rem;}
    .infor-box {padding:0 3rem;}
    .infor-con {width: 28rem;display: flex;align-items: center;height: 100%;margin-top: 5rem;}
    .infor .name {font-size: 3.4rem;color:#333;margin-bottom: 1rem;}
    .infor .s1 {font-size: 2.4rem;}
    .infor .s1 i{display: inline-block;width: 10rem;height: 3.8rem;line-height: 3.8rem;color:#fff;text-align: center;font-size: 2.4rem;
    border-radius:0.8rem;}
    .infor .group1 {background: #fd7555;}
    .infor .group2 {background: #31aaf6;}
    .infor .group3 {background: #4cb444;}
    .infor .s1 em{color:#999;margin-left: 1rem;display: inline-block;font-size: 2.8rem;}
    .infor .p2 {font-size: 2.4rem;color:#666;margin-top: 1rem;}
    .decorate {position: absolute;width: 26.2rem;right: 3rem;top: -1.2rem;}

    .wborder {border:0.7rem solid #fff;box-shadow:0 1rem 2.5rem rgba(3,15,39,0.14);margin:0 1.5rem;display: flex;align-items: center;}
    .workbox {background: #fff;padding: 1.5rem;box-shadow:0 0 1.5rem 0.1rem rgba(0,0,0,0.3) inset;}
    .picbox {width: 21rem;display: flex;align-items: center;height: 100%;overflow: hidden;height: 30rem;}
    .picinner {max-height:20rem;overflow: hidden;}
    .workpic {width: 100%;box-shadow:0 0 0 0.2rem rgba(0,0,0,0.2);vertical-align: middle;}

    .content {margin-top: 4rem;}
    .clist {width:81.4%;padding:3rem;background: #fff;border-radius:1.5rem;box-shadow:0 1.4rem 6rem rgba(3,15,39,0.14);
    margin:0 auto 4rem;position: relative;}
    .clist h3{font-size: 3.8rem;color:#333;}
    .clist .p1 {font-size: 2.4rem;color:#999;margin-top: 0.5rem;}
    .clist .status {position: absolute;right: 2rem;top: 50%;margin-top: -1.3rem;}
    .clist .status .s2 {color:#fd7555;font-size: 2.4rem;position: relative;top: -0.3rem;}
    .clist .status .s3 {color:#31aaf6;}
    .clist .status .arrow1 {width: 1.5rem;margin-left: 1.2rem;}
    .bottom {font-size: 2.8rem;color:#666;margin-top: 4rem;}
    .bottom a{color:#fd7555;}
    .hehe {width: 100%;height: 5rem;border:0.1rem solid #000;}
    .cardbox {position: fixed;z-index:1000;top: 13%;left: 0;width: 100%;}
    .cardbox .cardcon {width: 54.3rem;margin:0 auto;height: 76.7rem;}
    .cardbox .cardname {font-size: 2.6rem;color:#333;position: absolute;top: 48%;left: 40%;font-weight:bold;}
    .cardclose {width: 7.6rem;height: 7.6rem;margin-top: 6rem;}
    .mask {background:rgba(0,0,0,0.5);position: fixed;z-index:500;width: 100%;height: 100%;top: 0;left: 0;}
    


</style>