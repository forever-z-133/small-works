<template>
    <div class="gallery" id="gallery">
        <div class="top">
            <img :class="['indexbtn vm',{'action1':action1}]" @click="indexgo()" src="http://ovqgowr6o.bkt.clouddn.com/indexbtn.png" alt="">
            <img :class="['rankingbtn vm',{'action2':action2}]" @click="rankgo()" src="http://ovqgowr6o.bkt.clouddn.com/rankingbtn.png" alt="">
            <img :class="['musicbtn vm',{'musicon':play},{'action3':action3}]" @click="musiccontrols()" src="http://ovqgowr6o.bkt.clouddn.com/music.png" alt="">
        </div> 

        <div :class="['gallery-bottom',{'action4':action4}]">
            <div class="presentshow">
                <div class="showcon">
                    <div class="presentscroll">
                        <vue-seamless-scroll :data="presentrecord" :class-option="classOption" v-if="presentrecord.length>1">
                            <p v-for="(list,idx) in presentrecord" :key="idx" class="p1">
                                <em>{{list.wx_name}}</em>送
                                <i v-if="list.inte_lev==='1'">粉色爱心</i>
                                <i v-if="list.inte_lev==='2'">蓝色星球</i>
                                <i v-if="list.inte_lev==='3'">阿特比心</i>
                            <img v-if="list.inte_lev==='1'" class="present-small vm" src="http://ovqgowr6o.bkt.clouddn.com/present1.png" alt="">
                            <img v-if="list.inte_lev==='2'" class="present-small vm" src="http://ovqgowr6o.bkt.clouddn.com/present2.png" alt="">
                            <img v-if="list.inte_lev==='3'" class="present-small vm" src="http://ovqgowr6o.bkt.clouddn.com/present3.png" alt="">
                            </p>
                        </vue-seamless-scroll>
                        <p v-for="(list,idx) in presentrecord" :key="idx" class="p1" v-if="presentrecord.length===1">
                            <em>{{list.wx_name}}</em>送
                            <i v-if="list.inte_lev==='1'">粉色爱心</i>
                            <i v-if="list.inte_lev==='2'">蓝色星球</i>
                            <i v-if="list.inte_lev==='3'">阿特比心</i>
                        <img v-if="list.inte_lev==='1'" class="present-small vm" src="http://ovqgowr6o.bkt.clouddn.com/present1.png" alt="">
                        <img v-if="list.inte_lev==='2'" class="present-small vm" src="http://ovqgowr6o.bkt.clouddn.com/present2.png" alt="">
                        <img v-if="list.inte_lev==='3'" class="present-small vm" src="http://ovqgowr6o.bkt.clouddn.com/present3.png" alt="">
                        </p>
                        <p class="nopresent" v-if="presentrecord.length===0">还没有收到任何礼物哦</p>
                    </div>
                    <div class="presentall">
                        <div class="alltitle tc">
                            <img class="line vm" src="http://ovqgowr6o.bkt.clouddn.com/line1.png" alt="">
                            <span class="s1">总共收到礼物</span>
                            <img class="line vm" src="http://ovqgowr6o.bkt.clouddn.com/line2.png" alt="">
                        </div>
                        <ul class="presentnumber">
                            <li class="present">
                                <img class="present-pic vm" src="http://ovqgowr6o.bkt.clouddn.com/present1.png" alt="">
                                <em>{{presentnum[0].tot}}</em>
                            </li>
                            <li class="present">
                                <img class="present-pic vm" src="http://ovqgowr6o.bkt.clouddn.com/present2.png" alt="">
                                <em>{{presentnum[1].tot}}</em>
                            </li>
                            <li class="present">
                                <img class="present-pic vm" src="http://ovqgowr6o.bkt.clouddn.com/present3.png" alt="">
                                <em>{{presentnum[2].tot}}</em>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="send">
                <div class="send-con clearfix">
                    <div class="jfbox fl" v-if="!change">
                        <p class="p1">NO.{{rank}}</p>
                        <P class="p2">积分：<em>{{author.total_vote}}</em></P>
                    </div>
                    <div class="jfbox fl" v-if="change">
                        <p class="p1">NO.{{author.rank}}</p>
                        <P class="p2">积分：<em>{{author.total_vote}}</em></P>
                    </div>
                    <div class="sendwakeup fr">
                        <img class="wakeupbtn vm g10" src="http://ovqgowr6o.bkt.clouddn.com/sendpresent.png" alt="">
                        <p class="p3" @click="sendpresent()">送礼物</p>
                    </div>
                </div>
            </div>
            <div :class="['presentbox',{'preon':preon}]">
                <ul class="precon">
                    <li :class="['prelist',{'liston':item.on}]" v-for="(item,idx) in items" :key="idx" @click="choose(item,idx)">
                        <img class="vm presentpic" :src="item.img" alt="">
                        <p class="p1">{{item.name}}</p>
                        <div class="price">
                            <em>{{item.money}}</em>
                            <img class="moneypic vm" src="http://ovqgowr6o.bkt.clouddn.com/money.png" alt="">
                        </div>
                    </li>
                </ul>
                <div class="option clearfix">
                    <p class="yourmoney fl">
                        余额：<em>{{tpperson.total}}</em>
                        
                        <img class="moneypic vm" src="http://ovqgowr6o.bkt.clouddn.com/money.png" alt="">
                    </p>
                    <div class="btngroup fr" >
                        <div class="btn1 btn" @click="makemoney()">
                            <img class="btnpic1 vm" src="http://ovqgowr6o.bkt.clouddn.com/getjf.png" alt="">
                            <p class="p1">如何赚积分</p>
                        </div>
                        <div class="btn2 btn" @click="sendgift()">
                            <img class="btnpic1 vm" v-if="sendstatus" src="http://ovqgowr6o.bkt.clouddn.com/sendpresent.png" alt="">
                            <img class="btnpic1 vm" v-if="!sendstatus" src="http://ovqgowr6o.bkt.clouddn.com/notsend.png" alt="">
                            <p class="p1">送出</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div :class="['userbox',{'voiceshow':hasvoice},{'usershow':usershow}]" >
            <div class="user-info clearfix">
                <div class="user-txt fl" @click="information(author.id)">
                    <img class="userpic vm" :src="author.head_img" alt="">
                    <span class="username">{{author.childname}}</span>
                    <img class="arrow vm" src="http://ovqgowr6o.bkt.clouddn.com/arrowright.png" alt="">
                </div>
                <div class="user-voice fr" v-if="hasvoice" @click="uservoice()">
                    <img v-if="!voiceplay" class="voicepic vm" src="http://ovqgowr6o.bkt.clouddn.com/voice.png" alt="">
                    <img v-if="voiceplay" class="voicepic2 vm" src="http://ovqgowr6o.bkt.clouddn.com/voice2.gif" alt="">
                    <span class="time">{{author.voice_second}}s</span>
                </div>
            </div>
        </div>

        <div :class="['giftbox',{'giftsend':giftsend}]">
            <img id="sending" class="vm" src="" alt="">
        </div>

        <div class="popbox">
            <div class="pop1 pop" v-if="pop1">
                <div class="popinner">
                    <p class="poptitle">资料详情</p>
                    <div class="popcon">
                        <img class="userpic vm" :src="userpopinner.head_img" alt="">
                        <p class="username tc">{{userpopinner.childname}}</p>
                        <p class="grouptype tc">{{userpopinner.group_type}}</p>
                        <p class="ages tc">{{userpopinner.age}}岁，{{userpopinner.sex}}</p>
                        <dl>
                            <dd v-if="userpopinner.teacher!=''"><em>指导老师：</em>{{userpopinner.teacher}}</dd>
                            <dd><em>所在区域：</em>{{userpopinner.province}}{{userpopinner.city}}</dd>
                            <dd><em>所属机构或校区：</em>{{userpopinner.organization}}</dd>
                        </dl>
                        <div class="desc">
                            <h2 class="tc">{{userpopinner.works_name}}的创作故事</h2>
                            <div class="shape"></div>
                            <p class="desctxt">
                                {{userpopinner.works_det}}
                            </p>
                        </div>
                    </div>
                    <img @click="closepop1()" class="vm close" src="http://ovqgowr6o.bkt.clouddn.com/popclose.png" alt="">
                </div>
            </div>
            <div class="pop2 pop" v-if="pop2">
                <div class="popinner">
                    <p class="poptitle">如何赚积分</p>
                    <div class="popcon">
                        <p class="p1">1. 每日首次登陆奖励25积分。</p>
                        <p class="p1">2. 分享活动页面至朋友圈，每次可获得5积分。（每日限3次）</p>
                        <p class="p1">3. 分享活动页面至好友或微信群，每次可获得5积分。（每日限10次）</p>
                    </div>
                    <img class="vm close" @click="closepop2()" src="http://ovqgowr6o.bkt.clouddn.com/popclose.png" alt="">
                </div>
            </div>
            <div class="pop3 tc" v-if="pop3">
                <div class="popinner">
                    <img class="vm endpic" src="http://ovqgowr6o.bkt.clouddn.com/end.png" alt="">
                    <p class="p2 tc">线上评选活动已结束</p>
                    <img class="lookbtn vm" src="http://ovqgowr6o.bkt.clouddn.com/resultbtn.png" alt="">
                    <img @click="closepop3()" class="vm close" src="http://ovqgowr6o.bkt.clouddn.com/popclose2.png" alt="">
                </div>
            </div>
        </div>

        <div class="mask" v-if="mk"></div>
        <tips :msg="tipsmsg" v-if="hasmsg"></tips>

        <svg class="hidden">
        <symbol id="icon-arrow" viewBox="0 0 24 24">
        <title></title>
        <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "/>
        </symbol>
        <symbol id="icon-drop" viewBox="0 0 24 24">
        <title></title>
        <path d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z"/>
        <path d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z"/>
        </symbol>
        <symbol id="icon-menu" viewBox="0 0 24 24">
        <title></title>
        <path d="M24,5.8H0v-2h24V5.8z M19.8,11H4.2v2h15.6V11z M24,18.2H0v2h24V18.2z"/>
        </symbol>
        <symbol id="icon-cross" viewBox="0 0 24 24">
        <title></title>
        <path d="M13.4,12l7.8,7.8l-1.4,1.4l-7.8-7.8l-7.8,7.8l-1.4-1.4l7.8-7.8L2.7,4.2l1.4-1.4l7.8,7.8l7.8-7.8l1.4,1.4L13.4,12z"/>
        </symbol>
        <symbol id="icon-info" viewBox="0 0 20 20">
        <title></title>
        <circle style="fill:#fff" cx="10" cy="10" r="9.1"/>
        <path d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M10,18.6c-4.7,0-8.6-3.9-8.6-8.6S5.3,1.4,10,1.4s8.6,3.9,8.6,8.6S14.7,18.6,10,18.6z M10.7,5C10.9,5.2,11,5.5,11,5.7s-0.1,0.5-0.3,0.7c-0.2,0.2-0.4,0.3-0.7,0.3c-0.3,0-0.5-0.1-0.7-0.3C9.1,6.2,9,6,9,5.7S9.1,5.2,9.3,5C9.5,4.8,9.7,4.7,10,4.7C10.3,4.7,10.5,4.8,10.7,5z M9.3,8.3h1.4v7.2H9.3V8.3z"/>
        </symbol>
        </svg>
        <div :class="['container',{'entering':enter}]" @click="popcancel()">
        <div :class="['scroller1']" v-if="coming">
            <div class="room room--current">
                <p class="recorddata"></p>
                <div class="room__side room__side--back"> 
                    <div class="workwrapper hide">
                        <div class="picbox">
                            <div class="wborder g10">
                                <div class="workbox g10">
                                    <div class="picinner g10">
                                        <img class="workpic vm g10" src="" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="information">
                            <div class="work-name"></div>
                        </div>
                    </div>
                </div>
                <div class="room__side room__side--left"></div>
                <div class="room__side room__side--right"></div>
                <div class="room__side room__side--bottom"></div>
            </div>
        </div>
        <div :class="['scroller']" id="scroller" v-show="!coming">
        <!--<div class="scroller" id="scroller">-->
            <!--<div :class="['room',workmany-1===idx?'room--current':'',{'room--current':coming}]" v-for="(room,idx) in playlist" :key="idx">-->
            <div :class="['room',workmany-1===idx?'room--current me':'zindex']" v-for="(room,idx) in playlist" :key="idx">
                <p class="recorddata">{{room.id}}</p>
                <div class="room__side room__side--back"> 
                    <!--<div :class="['workwrapper',{'painting':painting},{'romeing':coming}]">-->
                        <div :class="['workwrapper',{'painting':painting}]">
                        <div class="picbox">
                            <div class="wborder g10">
                                <div class="workbox g10">
                                    <div class="picinner g10">
                                        <img class="workpic vm g10" :src="room.works_img" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="information">
                            <div class="work-name">{{room.works_name}}</div>
                        </div>
                    </div>
                </div>
                <div class="room__side room__side--left"></div>
                <div class="room__side room__side--right"></div>
                <div class="room__side room__side--bottom"></div>
            </div>
        </div>

        

    </div>
    <!-- /container -->
    <div id="content" :class="['content',{'action5':action5}]" @click="popcancel()">
    <header class="codrops-header hide">
        <h1 class="codrops-header__title"></h1>
        <button class="btn btn--info btn--toggle"> <svg class="icon icon--info">
        <use xlink:href="#icon-info"></use>
        </svg> <svg class="icon icon--cross">
        <use xlink:href="#icon-cross"></use>
        </svg> </button>
        <button class="btn btn--menu btn--toggle"> <svg class="icon icon--menu">
        <use xlink:href="#icon-menu"></use>
        </svg> <svg class="icon icon--cross">
        <use xlink:href="#icon-cross"></use>
        </svg> </button>
        <div class="overlay overlay--menu">
        <ul class="menu">
            <li class="menu__item menu__item--current"><a class="menu__link" href="#"></a></li>
            <li class="menu__item"><a class="menu__link" href="#"></a></li>
            <li class="menu__item"><a class="menu__link" href="#"></a></li>
            <li class="menu__item"><a class="menu__link" href="#"></a></li>
        </ul>
        </div>
        <div class="overlay overlay--info">
        </div>
    </header>
    <div class="slides">
        <div class="slide">
        <h2 class="slide__name"></h2>
        <h3 class="slide__title"></span>
            <div class="slide__number"></div>
        </h3>
        <p class="slide__date"></p>
        </div>
        <div class="slide">
        <h2 class="slide__name"></h2>
        <h3 class="slide__title">
            <div class="slide__number"></div>
        </h3>
        <p class="slide__date"></p>
        </div>
        <div class="slide">
        <h2 class="slide__name"></h2>
        <h3 class="slide__title">
            <div class="slide__number"></div>
        </h3>
        <p class="slide__date"></p>
        </div>
        <div class="slide">
        <h2 class="slide__name"></h2>
        <h3 class="slide__title">
            <div class="slide__number"></div>
        </h3>
        <p class="slide__date"></p>
        </div>
        <div class="slide">
        <h2 class="slide__name"></h2>
        <h3 class="slide__title">
            <div class="slide__number"></div>
        </h3>
        <p class="slide__date"></p>
        </div>
    </div>
    <nav class="nav">
        <button class="btn btn--nav btn--nav-left btn-left" id="btnleft" @click="prev()">
            <img class="btnpic vm g10" src="http://ovqgowr6o.bkt.clouddn.com/prev.png" alt="">
        </button>
        <button class="btn btn--nav btn--nav-right btn-right" id="btnright" @click="next()">
            <img class="btnpic vm g10" src="http://ovqgowr6o.bkt.clouddn.com/next.png" alt="">
        </button>
    </nav>
    </div>
    <!-- /content -->
    <div id="loader" :class="['overlay overlay--loader']">
    <div class="loader">
        <div></div>
        <div></div>
        <div></div>
    </div>
    </div>
    

    <iframe src="" frameborder="0" id="source">

    </iframe>

    </div>
</template>

<script>
    var test = 'http://studenttest.dfth.com'
    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com'
    import tips from '../components/tips/tips'
    import vueSeamlessScroll from 'vue-seamless-scroll'
    export default{
        data(){
            return{
                coming:true,
                oid:'',
                action1:false,
                action2:false,
                action3:false,
                action4:false,
                action5:false,
                play:true,
                enter:false,
                pop1:false,
                pop2:false,
                pop3:false,
                mk:false,
                preon:false,
                hasvoice:false,
                voiceplay:false,
                items:[
                    {
                        money:'10',
                        name:'粉色爱心',
                        img:'./static/img/bigpresent1.png',
                        on:true
                    },
                    {
                        money:'30',
                        name:'蓝色星球',
                        img:'./static/img/bigpresent2.png',
                        on:false
                    },
                    {
                        money:'50',
                        name:'阿特比心',
                        img:'./static/img/bigpresent3.png',
                        on:false
                    }
                ],
                classOption:{
                    step: 0.6, //步长 越大滚动速度越快
                    limitMoveNum: 2, //启动无缝滚动最小数据量 this.dataList.length
                    hoverStop: true, //是否启用鼠标hover控制
                    direction: 1, //1 往上 0 往下
                    openWatch: true, //开启data实时监听
                    singleHeight: 0, //单条数据高度有值hoverStop关闭
                    waitTime: 1000, //单步停止等待时间
                    autoplay:true
                },
                gallerypage:1,
                playlist:[],
                alllist:[],
                worknumber:1,
                workmany:1,
                presentnum:[
                    {
                        'inte_lev': '',
                        'tot': ''
                    },
                    {
                        'inte_lev': '',
                        'tot': ''
                    },
                    {
                        'inte_lev': '',
                        'tot': ''
                    }
                ],
                presentrecord:[],
                lid:'',
                rank:'',
                currentjf:0,
                newid:'',
                change:false,
                author:{
                    total_vote:''
                },
                firstchange:true,
                tpperson:0,
                sendstatus:false,
                listlength:10,
                bj:'',
                myaudio:'',
                myvoice:'',
                usershow:false,
                userpopinner:'',
                giftsend:false,
                removeroom:false,
                hasmsg:false,
                first:'',
                painting:false
            }
        },
        created(){
            var curl = window.location.href;
            let localoid =localStorage.getItem('oid');
            if(localoid){
                this.oid=localoid
            }else{
                if(curl.indexOf('openid')>-1){
                    this.oid = curl.split('=')[1];
                    localStorage.setItem('oid',this.oid);
                }else{
                    // var urlvalue = curl.split('#/')[1]
                    var urlvalue = escape(curl)
                    // console.log('http://erp.dfth.com/index.php/Weixin/getWebOpenidtest?backurl='+urlvalue)
                    window.location.href='http://erp.dfth.com/index.php/Weixin/getWebOpenidtest?backurl='+urlvalue;
                }
            }

            this.$axios.get(`${test}/actives/joinerIn`,{
                params:{
                    openid:localoid
                }
            }).then((res)=>{
                if(res.data.status===1){
                }
            })

            wx.ready(()=>{
                wx.onMenuShareTimeline({
                    title: '绘画比赛-东方童画', // 分享标题
                    link: curl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: '', // 分享图标
                    success:  ()=> {
                        this.$axios.get(`${test}/actives/timelineAdd`,{
                            params:{
                                openid:localoid
                            }
                        }).then((res)=>{
                            if(res.data.status===1){
                                this.hasmsg=true
                                this.tipsmsg='分享成功'
                                this.tpperson.total = parseInt(this.tpperson.total)+5
                            }
                        })
                }
                });

                wx.onMenuShareAppMessage({
                title: '绘画比赛-东方童画', // 分享标题
                desc: '东方童画绘画比赛', // 分享描述
                link: curl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: ()=> {
                    this.$axios.get(`${test}/actives/shareAppAdd`,{
                        params:{
                            openid:localoid
                        }
                    }).then((res)=>{
                        if(res.data.status===1){
                            this.hasmsg=true
                            this.tipsmsg='分享成功'
                            this.tpperson.total = parseInt(this.tpperson.total)+5
                        }
                    })
                }
                });
            });


            let curlSplit = curl.split('?')[1];

            this.lid = curlSplit.split('with')[0];
            this.rank = curlSplit.split('with')[1].split('end')[0];
            this.newid = this.lid

            if(this.rank.length===1){
                this.gallerypage=1
                this.worknumber = parseInt(this.rank);
            }else{
                this.gallerypage = parseInt(this.rank.charAt(0));
                
                if(parseInt(this.rank.charAt(1))===0){
                    this.worknumber=10
                }else{
                    this.worknumber = parseInt(this.rank.charAt(1))
                }
            }
            console.log(this.worknumber)

            // 列表
            this.$axios.get(`${test}/actives/picSayList`, {
                params:{
                    page:this.gallerypage
                }
            }).then((res)=> {
                this.alllist = res.data.content.data
                this.workmany = this.worknumber
                // this.playlist=res.data.content.data;
                // this.playlist = [1,2,3,4,5,6,7,8,9,10]
                // this.playlist = res.data.content.data.slice(this.worknumber-1,this.worknumber);
                
                // if(this.worknumber===1){
                //     this.firstchange=true
                //     this.playlist = res.data.content.data.slice(this.worknumber-1,this.worknumber+2);

                // }else if(this.worknumber>9){
                //     this.playlist = res.data.content.data.slice(this.worknumber-3,this.worknumber);
                //     this.firstchange=false
                // }else{
                //     this.playlist = res.data.content.data.slice(this.worknumber-2,this.worknumber+1);
                //     this.firstchange=false
                //     this.worknumber=2;
                // }

                // this.playlist.map((value,index,arr)=>{
                //     if(this.worknumber-1===index){
                //         this.currentjf = value.total_vote
                //         this.myvoice = value.works_voice
                //         if(value.voice_second=='0'){
                //             this.hasvoice=false
                //         }else{
                //             this.hasvoice=true
                //         }
                //     }
                // })

                // this.$nextTick(()=>{
                    setTimeout(()=> {
                        this.coming=false
                        // this.playlist=this.alllist;
                        this.playlist.map((value,index,arr)=>{
                            if(this.worknumber-1===index){
                                this.currentjf = value.total_vote
                                this.myvoice = value.works_voice
                                if(value.voice_second=='0'){
                                    this.hasvoice=false
                                }else{
                                    this.hasvoice=true
                                }
                            }
                        })
                    }, 4500);
                // })

            }).then(()=>{
                wx.ready(()=>{ 
                    if(this.hasvoice===false){
                        
                        this.bj = new Audio();
                        this.bj.src='./static/audio/music.mp3';
                        setTimeout(()=> {
                            this.bj.play();
                            this.voiceplay=false
                            this.play=true
                        }, 4300);
                        
                    }else{
                        this.uservoiceplay();
                    }
                })
                
            })

            // 礼物列表
            this.$axios.get(`${test}/actives/voteList`, {
                params:{
                    uid:this.lid
                }
            }).then((res)=> {
                this.presentnum = res.data.content.total;
                this.presentrecord = res.data.content.list;
            })

            // 投票人积分
            this.$axios.get(`${test}/actives/joinerInt`, {
                params:{
                    openid:this.oid
                }
            }).then((res)=> {
                this.tpperson=res.data.content;
            }).then(()=>{
                this.$axios.get(`${test}/actives/dayAdd`,{
                    params:{
                        openid:localoid
                    }
                }).then((res)=>{
                    if(res.data.status===1){
                        this.hasmsg=true
                        this.tipsmsg='首次登陆成功'
                        this.tpperson.total = parseInt(this.tpperson.total)+25
                    }
                })
            })

            if(this.myaudio){
                this.myaudio.addEventListener('ended', ()=> {
                    this.voiceplay=false
                }, false);
            }
            

        },
        mounted(){
            
            let bheight = document.body.clientHeight;
            document.getElementById('gallery').style.height=bheight+'px'
            document.documentElement.className = 'js'

            setTimeout(()=> {
                document.getElementById('loader').className='overlay overlay--loader overlay--active'
            }, 2300);
            // setTimeout(()=> {
            //     this.removeroom=true;
            // }, 4500); 

            setTimeout(()=> {
                this.action3=true;
            }, 4000);            
            setTimeout(()=> {
                this.action1=true;
                this.action2=true;
            }, 4200);
            setTimeout(()=> {
                this.usershow=true;
            }, 4400);            
            // setTimeout(()=> {
                
            // }, 6000);
            setTimeout(()=> {
                this.action4=true;
            }, 4600);
            setTimeout(()=> {
                this.enter=true
            }, 2600);

            setTimeout(()=> {
                let source = document.getElementById('source');
                let sourceGroup = document.createElement('script')
                sourceGroup.src='./static/js/main.js'
                source.appendChild(sourceGroup);
                this.action5=true;
            }, 5500);

            if(this.rank=='1'){
                document.getElementById('btnleft').style.visibility="hidden";
            }
            this.authorinfo();
            // setTimeout(()=> {
                
            // }, 10000);

        },
        beforeDestroy(){
            this.bj.pause();
            this.play=false;
            this.myaudio.pause();
            this.voiceplay=false
        },
        methods:{
            sendpresent(){
                this.preon=true
                this.calculatejf();
            },
            sendgift(){
                this.preon=false
                let presentjfstr =document.querySelector(".liston").querySelector("em").innerHTML;
                let presentjfnum = parseInt(presentjfstr);
                let myjfnum = parseInt(this.tpperson.total);
                if(presentjfnum===10){
                    var presenttype=1;
                }else if(presentjfnum===30){
                    var presenttype=2;
                }else{
                    var presenttype=3;
                }

                var sending = document.getElementById('sending');
                this.$axios.get(`${test}/api/actives/voteUser`, {
                    params:{
                        uid:this.newid,
                        openid:this.oid,
                        vote_type:presenttype,
                        vote:presentjfnum
                    }
                }).then((res)=> {
                    if(res.data.status===1){
                        let mathrandom = Math.random();
                        this.giftsend = true                        
                        this.tpperson.total=myjfnum-presentjfnum
                        let wname = res.data.wx_name
                        if(presenttype===1){
                            sending.src='./static/img/gift1.gif?'+mathrandom
                            this.author.total_vote = parseInt(this.author.total_vote)+10
                            this.presentnum[0].tot =parseInt(this.presentnum[0].tot)+1
                            this.presentrecord.push(
                                {inte:"10",inte_lev:"1",wx_name:wname}
                            )
                            setTimeout(()=> {
                                this.giftsend = false 
                                sending.src='#'
                            }, 6200);
                        }else if(presenttype===2){
                            sending.src='./static/img/gift2.gif?'+mathrandom
                            this.author.total_vote = parseInt(this.author.total_vote)+30
                            this.presentnum[1].tot =parseInt(this.presentnum[1].tot)+1
                            this.presentrecord.push(
                                {inte:"30",inte_lev:"2",wx_name:wname}
                            )
                            setTimeout(()=> {
                                this.giftsend = false 
                                sending.src='#'
                            }, 4200);
                        }else{
                            sending.src='./static/img/gift3.gif?'+mathrandom
                            this.author.total_vote = parseInt(this.author.total_vote)+50
                            this.presentnum[2].tot =parseInt(this.presentnum[2].tot)+1
                            this.presentrecord.push(
                                {inte:"50",inte_lev:"3",wx_name:wname}
                            )
                            setTimeout(()=> {
                                this.giftsend = false 
                                sending.src='#'
                            }, 8000);
                        }

                    }
                })
            },
            popcancel(){
                this.preon=false
            },
            choose(item,idx){
                this.items.forEach((current,index,arr)=> {
                    if(idx===index){
                        current.on=true
                    }else{
                        current.on=false
                    }
                }, this);
                this.calculatejf();
                
            },
            makemoney(){
                this.pop2=true;
                this.mk=true;
            },
            closepop1(){
                this.pop1=false;
                this.mk=false;
            },
            closepop2(){
                this.pop2=false;
                this.mk=false;
            },
            closepop3(){
                this.pop3=false;
                this.mk=false;
            },
            musiccontrols(){
                if(this.play===false){
                    this.bj = new Audio();
                    this.bj.src='./static/audio/music.mp3';
                }

                if(this.bj.paused){
                    this.bj.play();
                    this.voiceplay=false
                    this.play=true
                }else{
                    this.bj.pause();
                    this.play=false
                }
            },
            information(aid){
                this.pop1=true;
                this.mk=true
                this.$axios.get(`${test}/actives/ParticipantInfo`, {
                    params:{
                        id:aid
                    }
                }).then((res)=> {
                    this.userpopinner = res.data.content
                })
            },
            uservoice(){

                if(this.voiceplay===false){
                    this.myaudio=new Audio();
                    this.myaudio.src=this.myvoice;
                    this.myaudio.play();
                    this.play=false
                    this.voiceplay=true
                }else{
                    this.myaudio.pause();
                    this.voiceplay=false
                }

            },
            indexgo(){
                this.$router.push('acthome')
                setTimeout(()=> {
                    window.location.reload();
                }, 100);
            },
            rankgo(){
                this.$router.push('work')
                setTimeout(()=> {
                    window.location.reload();
                }, 100);
            },
            prev(){
                this.painting=true
                setTimeout(()=> {
                    this.painting=false
                }, 1400);
                // 关闭音频
                if(this.voiceplay===true){
                    this.myaudio.pause();
                    this.voiceplay=false
                }

                
                if( document.querySelector(".room--current")){
                    document.querySelector(".room--current").className='room';
                }
                // this.playlist = this.alllist

                // 箭头按钮控制
                document.getElementById('btnright').style.visibility="visible";
                if(this.gallerypage===1&&this.workmany===2){
                    document.getElementById('btnleft').style.visibility="hidden";
                }


                if(this.workmany===1){
                    
                    if(this.gallerypage>1){
                        this.gallerypage-=1 
                        setTimeout(()=> {
                            this.prevgroup();
                        }, 500);
                        setTimeout(()=> {
                            this.roomchange();
                            this.presentdata();
                            this.authorinfo();
                        }, 800);
                    }
                }else{
                    setTimeout(()=> {
                        this.roomchange();
                        this.presentdata();
                        this.authorinfo();
                    }, 800);
                }

                if(this.workmany>1){    
                    this.workmany-=1
                    this.worknumber-=1
                }
                
                setTimeout(()=> {
                    this.roomchange();
                    this.presentdata();
                    this.authorinfo();
                }, 800);

                setTimeout(function() {
                    if(document.querySelector(".me")){
                        document.querySelector(".me").style.opacity=1
                    }
                }, 1000);
            },
            prevgroup(){
                this.$axios.get(`${test}/actives/picSayList`, {
                    params:{
                        page:this.gallerypage
                    }
                }).then((res)=> {
                    this.workmany=10
                    this.worknumber=10
                    this.alllist = res.data.content.data;
                    this.playlist = res.data.content.data;

                    this.playlist.map((value,index,arr)=>{
                        if(this.workmany-1===index){
                            this.currentjf = value.total_vote
                            if(value.voice_second==='0'){
                                this.hasvoice=false
                            }else{
                                this.hasvoice=true
                            }
                        }
                    })
                     
                })
            },
            next(){
                this.painting=true
                setTimeout(()=> {
                    this.painting=false
                }, 1400);
                // this.worknumber = this.workmany;
                // if(this.workmany===2){
                //     setTimeout(function() {
                //         document.querySelector('.room').style.opacity=1
                //     }, 1000);  
                // }

                if(this.voiceplay===true){
                    this.myaudio.pause();
                    this.voiceplay=false
                }
                
                if(document.querySelector(".room--current")&&this.workmany>1){
                    document.querySelector(".room--current").className='room';
                    
                }


                
                
                // this.playlist = this.alllist
                document.getElementById('btnleft').style.visibility="visible";

                if(this.workmany===10){
                    // this.workmany=1
                    this.gallerypage+=1   
                    // setTimeout(()=> {
                         this.nextgroup();
                    // }, 500);
                    // setTimeout(()=> {
                    //     this.roomchange();
                    //     this.presentdata();
                    //     this.authorinfo();
                    // }, 800);
                }
                
            
                if(this.listlength<10&&this.listlength===this.worknumber-1){
                    document.getElementById('btnright').style.visibility="hidden";
                }
                
                if(this.workmany<10){
                    // this.worknumber=this.worknumber+1
                    // this.workmany=this.workmany+1
                    // setTimeout(()=> {
                        // this.workmany=this.workmany+1
                    // }, 600);
                    if(this.workmany===1){
                        setTimeout(()=> {
                            this.workmany=this.workmany+1
                        }, 600);
                        
                        // setTimeout(()=> {
                        //     this.roomchange();
                        //     this.presentdata();
                        //     this.authorinfo();
                        // }, 800);
                    }else{
                        this.workmany=this.workmany+1
                    }
                    console.log(this.workmany)

                    // setTimeout(()=> {
                    //     this.roomchange();
                    //     this.presentdata();
                    //     this.authorinfo();
                    // }, 800);
                }

                // if(this.workmany===2){
                //     this.playlist= this.alllist
                // }


                
                setTimeout(()=> {
                    this.roomchange();
                    this.presentdata();
                    this.authorinfo();
                }, 800);


                setTimeout(function() {
                    if(document.querySelector(".me")){
                        document.querySelector(".me").style.opacity=1
                    }
                }, 1000);
                

            },
            nextgroup(){
                this.$axios.get(`${test}/actives/picSayList`, {
                    params:{
                        page:this.gallerypage
                    }
                }).then((res)=> {
                    this.workmany=1
                    this.worknumber=1
                    this.alllist = res.data.content.data;
                    this.listlength = this.playlist.length
                    this.playlist = res.data.content.data;

                    this.playlist.map((value,index,arr)=>{
                        if(this.workmany-1===index){
                            this.currentjf = value.total_vote
                            if(value.voice_second==='0'){
                                this.hasvoice=false
                            }else{
                                this.hasvoice=true
                            }
                        }
                    })
                    console.log(this.workmany)
                    
                })
            },
            roomchange(){
                let nowroom =document.querySelector(".room--current .recorddata");
                if(nowroom){
                    let nowinner = nowroom.innerHTML
                    this.newid = nowinner;
                    this.change=true
                }
            },
            presentdata(){
                this.$axios.get(`${test}/actives/voteList`, {
                    params:{
                        uid:this.newid
                    }
                }).then((res)=> {
                    this.presentnum = res.data.content.total;
                    this.presentrecord = res.data.content.list;
                })
            },
            authorinfo(){
                this.$axios.get(`${test}/actives/ParticipantInfo`, {
                    params:{
                        id:this.newid
                    }
                }).then((res)=> {
                    
                    this.author = res.data.content
                    this.myvoice = res.data.content.works_voice
                    if(res.data.content.voice_second==='0'){
                        this.hasvoice=false
                    }else{
                        this.hasvoice=true
                    }
                })
            },
            calculatejf(){
                setTimeout(()=> {
                    let presentjfstr =document.querySelector(".liston").querySelector("em").innerHTML;
                    let presentjfnum = parseInt(presentjfstr);
                    let myjfnum = parseInt(this.tpperson.total);
                    if(myjfnum<presentjfnum){
                        this.sendstatus=false;
                    }else{
                        this.sendstatus=true;
                    }
                }, 100);

            },
            uservoiceplay(){
                this.myaudio = new Audio();
                this.myaudio.src=this.myvoice;
                this.play=false
                
                setTimeout(()=> {
                        this.myaudio.play();
                        this.voiceplay=true
                }, 4000);
                this.myaudio.addEventListener('ended', ()=> {
                    this.voiceplay=false
                }, false);
            }
        },
        components:{
            vueSeamlessScroll,tips
        }
    }
</script>


<style scoped>
    /*画框*/
    .gallery {background: #cecece;overflow-y:hidden;-webkit-transform-style: preserve-3d;transform-style: preserve-3d;transform: translateZ(0);
    transform: translate3d(0,0,0);}
    .recorddata {opacity: 0;z-index:-1;}
    .content {opacity: 0;transition:all ease 0.8s;}
    .action5 {opacity: 1;}
    #source {display: none;}
    .gallery .entering {z-index:100;}
    .wborder {border:1.7rem solid #fff;box-shadow:0 1rem 2.5rem rgba(3,15,39,0.14);margin:0 1.5rem;display: flex;align-items: center;}
    .workbox {background: #fff;padding: 3rem;box-shadow:0 0 1.5rem 0.1rem rgba(0,0,0,0.3) inset;}
    .workwrapper {opacity: 1;}
    .painting {opacity: 0;}
    .romeing {opacity: 0;}
    .picbox {align-items: center;height: 100%;overflow: hidden;display:flex;margin: -40vh auto 0;width: 60vw;}
    .picinner {overflow: hidden;}
    .workpic {width: 100%;box-shadow:0 0 0 0.2rem rgba(0,0,0,0.2);vertical-align: middle;max-height:35vh;}

    .gallery .btn-left {position: fixed;top: 45%;left: 2rem;}
    .gallery .btn-right {position: fixed;top: 45%;right: 2rem;}
    .nav .btn {width: 8rem;height: 8rem;background: none;}

    .gallery .top .indexbtn {width: 10.4rem;height: 10.4rem;border-radius:50%;position: fixed;top: 3rem;left:0;z-index:400;
    transition:all ease 0.8s;opacity: 0;transform: translateX(0px);}
    .gallery .top .rankingbtn {width: 10.4rem;height: 10.4rem;border-radius:50%;position: fixed;top: 14rem;left: 0;z-index:400;
    transition:all ease 0.8s;opacity: 0;transform: translateX(0px);}
    .gallery .top .musicbtn {width: 8rem;height: 8rem;border-radius:50%;position: fixed;top: 3rem;right: 0rem;z-index:400;
    transition:all ease 0.8s;opacity: 0;}


    .gallery .top .action1 {opacity: 1;transform: translateX(20px)}
    .gallery .top .action2 {opacity: 1;transform: translateX(20px);}
    .gallery .top .action3 {opacity: 1;right:3rem;}

    @keyframes music {
        0%{transform:rotate(0deg);}
        50%{transform:rotate(180deg);}
        100%{transform:rotate(360deg);}
    }
    .gallery .top .musicon {animation: music linear 2s infinite;}

    .userbox {position: fixed;top: 50%;left: 50%;z-index:400;width: 36%;margin:5rem 0 0 -18%;z-index:-1;opacity: 0;
    transition:all ease 0.5s;transform: translateY(50px);}
    .voiceshow {width: 50%;margin:5rem 0 0 -25%;}
    .user-box {z-index:500;position: relative;}
    .usershow {opacity: 1;z-index:400;transform: translateY(0px);}

    .work-name {font-size: 4rem;color:#333;width: 28rem;text-align: center;margin:1rem auto 0;overflow: hidden;height: 12rem;}
    .user-info {background: rgba(0,0,0,0.5);border-radius:10rem;display: flex;justify-content: center;margin-top: 1rem;}
    .user-info .userpic {width: 5rem;height: 5rem;border-radius:50%;margin-top: -0.5rem;}
    .user-info .user-txt {font-size: 3rem;color:#fff;line-height: 7rem;}
    .user-info .user-txt .username {margin:0 0.5rem;}
    .user-info .arrow {width: 1.6rem;margin-top: -0.5rem;}
    .user-voice {margin-left: 1.5rem;border-left: 0.1rem solid #999;}
    .user-voice .voicepic {width:2.6rem;margin:-1.5rem 1rem 0 1rem;}
    .user-voice .voicepic2 {width: 3.2rem;margin:-1rem 1rem 0 1rem;}
    .user-voice .time {font-size: 3rem;color:#999;line-height: 7rem;}

    

    .gallery-bottom {position: fixed;bottom: 3rem;width: 92%;left: 4%;z-index:300;transition: all ease 0.6s;opacity: 0;
    transform: translateY(100%);}
    .action4 {transform: translateY(0);opacity: 1;}
    .gallery-bottom .presentshow {width: 100%;background: rgba(255,255,255,0.5);height: 18rem;border-radius:2rem;
    box-shadow:0 1.8rem 6.8rem rgba(0,0,0,0.18);}
    .presentshow .showcon {padding:1rem 5%;}
    .presentscroll {height: 6rem;overflow: hidden;}
    .presentshow .p1 {font-size: 2.4rem;margin-bottom: 1rem;}
    .presentshow .p1 em{color:#333;}
    .presentshow .p1 i{color:#c58500;}
    .presentshow .p1 img{width: 2.6rem;margin:-0.7rem 0 0 1rem;}
    .presentall {margin-top: 1rem;}
    .alltitle .line {width: 12.4rem;height: 0.1rem;margin-top: -1rem;}
    .alltitle .s1 {margin:0 2rem;font-size: 2.4rem;color:#666;}
    .presentnumber {display: flex;justify-content: center;}
    .presentnumber .present {margin:0 3%;}
    .presentnumber .present-pic {height: 3.2rem;margin-top: -1.2rem;}
    .presentnumber em{color:#c58500;font-size: 2.8rem;margin-left: 1rem;}

    .send {width: 100%;background: rgba(255,255,255,1);height: 11rem;border-radius:2rem;
    box-shadow:0 1.8rem 6.8rem rgba(0,0,0,0.18);margin-top: 2rem;}
    .send-con {padding:1rem 5%;}
    .send-con .jfbox {color:#c58500;}
    .send-con .jfbox .p1 {font-size: 2.8rem;margin-top: 0.4rem;}
    .send-con .jfbox .p2 {font-size: 2.4rem;margin-top: 0.6rem;}
    .send-con .sendwakeup {width: 15.6rem;position: relative;text-align: center;line-height: 8rem;top: 0.4rem;}
    .send-con .p3 {font-size: 2.6rem;position: absolute;width: 100%;color:#fff;top: 0.4rem;left: 0;}

    .presentbox {border-radius:2.1rem;overflow: hidden;background: #fff;box-shadow:0 1.8rem 6.8rem rgba(0,0,0,0.18);margin-top: 2rem;
    transition:all ease 0.5s;position: fixed;bottom:0;width: 100%;left: 0;opacity: 0;z-index:-1;transform: translateY(100%)}
    .preon {opacity: 1;z-index:400;bottom: 0;transform: translateY(0)}
    .presentbox .precon {background: #f5f5f5;display: flex;justify-content: center;align-items: center;}
    .presentbox .prelist {text-align: center;width: 33.333%;padding:1.5rem 0 0.5rem 0;border:1rem solid #f5f5f5;}
    .presentbox .liston {border-color:rgb(255,205,83);}
    .presentbox .prelist:nth-child(1) {border-radius:2rem 0 0 0;}
    .presentbox .prelist:nth-child(3) {border-radius:0 2rem 0 0;}
    .presentbox .prelist .presentpic {height: 9rem;}
    .presentbox .prelist .p1 {font-size: 2.8rem;margin-top: 1rem;}
    .presentbox .prelist em{font-size: 2.4rem;color:#999;position: relative;top: 0.5rem;}
    .presentbox .prelist .moneypic {width: 5rem;}
    .presentbox .option {height: 11rem;padding:0 2rem;}
    .presentbox .option .yourmoney {color:#c58500;font-size: 2.8rem;line-height: 11rem;}
    .presentbox .option .yourmoney .moneypic {margin-top: -0.3rem;}
    .btngroup .btn {width: 15rem;margin:1.5rem 0 0 1rem;position: relative;text-align: center;}
    .btngroup .btn .p1 {font-size: 2.6rem;color:#fff;text-shadow:0.2rem 0.4rem 0.4rem rgba(43,21,0,0.2);width: 100%;height: 100%;
    top:2rem;left: 0;position: absolute;}
    .btngroup .btn .btnpic1 {width: 100%;}

    .pop {background: #fff;border-radius:2rem;box-shadow:0 0.6rem 5rem rgba(0,0,0,0.12);position: fixed;top: 50%;left: 50%
    ;z-index:1000;}
    .pop1 {width: 84%;height: 80rem;margin:-40rem 0 0 -42%;}
    .pop1 .popinner {position: relative;}
    .pop1 .popcon {height: 69rem;overflow: scroll;}
    .pop .poptitle {height: 9rem;line-height: 9rem;text-align: center;font-size: 3.6rem;text-align: center;border-bottom: 0.1rem solid #e6e6e6;}
    .pop1 .userpic {width: 14rem;height: 14rem;border-radius:50%;margin:3.5rem auto 1rem;display: block;}
    .pop1 .username {font-size: 3.2rem;color:#333;}
    .pop1 .grouptype {height: 3.6rem;line-height: 3.6rem;color:#fff;background: #31aaf6;padding:0 1rem;width: 11rem;margin:0.5rem auto;
    font-size: 2.4rem;}
    .pop1 .ages {font-size: 2.4rem;color:#999;}
    .pop1 dl{width: 80%;margin:2rem auto 0;font-size: 2.4rem;color:#666;border-bottom: 0.1rem solid #e6e6e6;padding:0 3rem 3rem;}
    .pop1 dd{line-height: 4.4rem;}
    .pop1 dl em{width: 21rem;display: inline-block;}
    .pop1 h2{font-size: 3.2rem;color:#333;font-weight:bold;}
    .pop1 .desc {margin-top: 3rem;}
    .pop1 .shape {width: 6rem;height: 0.5rem;background: #ffd15a;margin:1.5rem auto;}
    .pop1 .desctxt {font-size: 2.8rem;color:#999;width: 80%;margin:0 auto;padding-bottom: 1rem;}
    .pop .close {width: 3rem;position: absolute;top: 3rem;right: 3rem;}

    .pop2 {width: 68%;height: 44rem;margin:-22rem 0 0 -34%;}
    .pop2 .popcon {margin:0 2rem;font-size: 2.6rem;color:#666;}
    .pop2 .popcon .p1 {margin-top: 4rem;}


    .pop3 {width: 70%;height: 50rem;margin:-25rem 0 0 -35%;position: fixed;top: 50%;left: 50%
    ;z-index:1000;}
    .pop3 .popinner {position: relative;}
    .pop3 .endpic {width: 29.7rem;height: 29.7rem;}
    .pop3 .p2 {color:#fff;font-size: 4rem;margin-top: 2rem;}
    .pop3 .lookbtn {width: 25rem;margin:2rem auto 0;}
    .pop3 .close {position: absolute;width: 3rem;top: 2rem;right: 3rem;}

    .mask {background: rgba(0,0,0,0.5);width: 100%;height: 100%;z-index:900;position: fixed;top: 0;left: 0;}
    .nav {z-index:500;}
    .nopresent {font-size: 2.4rem;margin-top: 1rem;color:#999;text-align: center;}
    .giftbox {position: fixed;z-index:-1;width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;top: 0;
    left: 0;}
    .giftsend {z-index:1000;}
    .giftbox img{width: 100%;position: relative;top: -10%;}
    .zindex {z-index:-1;}
</style>