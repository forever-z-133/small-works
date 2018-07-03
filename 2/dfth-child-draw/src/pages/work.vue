<template>
    <div :class="['work',loading?'worksearch':'']">
        <div :class="['search-box',{'searchfix':fixed}]">
            <input type="text" placeholder="输入要搜索的参赛者名字或作品名" class="search" id="search" v-model="words" @keyup.enter="searchwords(words)">
            <label for="search" @click="searchwords(words)">搜索</label>
        </div>
        <div class="number" v-if="!searching">
            <img class="numberbj vm g10" src="http://ovqgowr6o.bkt.clouddn.com/bj6.jpg" alt="">
            <div class="number-box">
                <div class="number-con clearfix">
                    <span class="s1 fl">{{number.flow}}</span>
                    <span class="s2 fr">{{number.people}}</span>
                </div>
            </div>
        </div>

        <div :class="['listbox',{'searchbox':searching}]">
            <Waterfall :gutterWidth="gwidth" :gutterHeight="gheight" :minCol="minCol" :maxCol="maxCol" v-if="playlist.length!=0">
                <WaterfallItem :width="waterwidth" v-for="(list,idx) in playlist" :key="idx">
                    <div class="waterlist" @click="gogallery(list.id,list.rank)">
                        <img class="vm g10" :src="list.works_img" alt="">
                        <div :class="['info',list.voice_second==0?'infonovoice':'']">
                            <img class="vm g10" src="http://ovqgowr6o.bkt.clouddn.com/bj7.png" alt="">
                            <div class="infor-con">
                                <p class="p1">NO.{{list.rank}}</p>
                                <p class="p2">积分：{{list.total_vote}}</p>
                                <p class="p3" v-if="list.voice_second!=0">Ta 的有声故事</p>
                            </div>
                        </div>
                        <div class="author">
                            <p class="p4">{{list.works_name}}</p>
                            <div class="user">
                                <img class="vm userpic" :src="list.head_img" alt="">
                                <span class="name">{{list.childname}}</span>
                            </div>
                        </div>
                    </div>
                </WaterfallItem>

            </Waterfall>
            <p class="noresult" v-if="playlist.length===0">没有搜索结果</p>
        </div>

        <menubox :location="position"></menubox>
        <div class="loading" v-if="loading">
            <img class="loadingpic g10 vm" src="http://ovqgowr6o.bkt.clouddn.com/loading.gif" alt="">
        </div>
        <tips :msg="tipsmsg" v-if="hasmsg"></tips>

        <div class="popbox">
            <div class="pop3 tc" v-if="pop3">
                <div class="popinner">
                    <img class="vm endpic" src="http://ovqgowr6o.bkt.clouddn.com/end.png" alt="">
                    <p class="p2 tc">线上评选活动已结束</p>
                    <img class="lookbtn vm playover" src="http://ovqgowr6o.bkt.clouddn.com/resultbtn.png" alt="">
                    <img @click="closepop3()" class="vm close" src="http://ovqgowr6o.bkt.clouddn.com/popclose2.png" alt="">
                </div>
            </div>
        </div>

        <div class="mask" v-if="mk"></div>
    </div>
</template>

<script>
    import {Waterfall, WaterfallItem} from 'vue2-waterfall';
    import menubox from '../components/menubox/menubox'
    import tips from '../components/tips/tips'

    var test = 'http://student.dfth.com'
    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com'
    export default{
        data(){
            return{
                waterwidth:350,
                gheight:24,
                gwidth:24,
                minCol:2,
                maxCol:2,
                fixed:false,
                position:'work',
                loading:false,
                words:'',
                number:'',
                playlist:[],
                page:1,
                spage:2,
                searching:false,
                listdata:true,
                searchdata:true,
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


            let swidth = document.documentElement.clientWidth;
            let widthgroup = swidth-24*3
            this.waterwidth = widthgroup/2
            let self = this

            window.onscroll = function() {
                if (window.scrollY >= 300) {
                    self.fixed=true
                } else {
                    self.fixed=false
                }
            }

            this.$axios.get(`${test}/actives/totalNum`, {
            }).then((res)=> {
                this.number=res.data.content;
            })

            this.newlist();


            this.$axios.get(`${test}/actives/dayAdd`,{
                params:{
                    openid:localoid
                }
            }).then((res)=>{
                if(res.data.status===1){
                    this.hasmsg=true
                    this.tipsmsg='首次登陆成功'
                }
            })

            wx.ready(()=>{

                wx.onMenuShareTimeline({
                    title: '2018童年画语-线上个人艺术馆', // 分享标题
                    link: curl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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

                    // 用户点击了分享后执行的回调函数
                }
                });

                wx.onMenuShareAppMessage({
                title: '2018童年画语-线上个人艺术馆', // 分享标题
                desc: '2018童年画语儿童绘画比赛', // 分享描述
                link: curl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
        mounted(){
            let self = this;
            window.onscroll = function(){
            　　if(self.getScrollTop() + self.getWindowHeight() == self.getScrollHeight()){
                    if(self.searching===false){
                        self.newlist();
                    }else{
                        self.searchlist();
                    }
            　　}
            };
        },
        components:{
            Waterfall,WaterfallItem,menubox,tips
        },
        methods:{
            closepop3(){
                this.pop3=false;
                this.mk=false;
            },
            searchwords(words){
                this.words===''
                this.playlist=''
                this.loading=true
                this.searching=true
                this.$axios.get(`${test}/actives/picSayList`, {
                    params:{
                        page:1,
                        name:this.words
                    }
                }).then((res)=> {
                    this.playlist = res.data.content.data
                    this.loading=false
                })
            },
            searchlist(){
                if(this.searchdata===true){
                    this.$axios.get(`${test}/actives/picSayList`, {
                        params:{
                            page:this.spage,
                            name:this.words
                        }
                    }).then((res)=> {
                        if(this.spage>1){
                            this.playlist = this.playlist.concat(res.data.content.data)
                        }else{
                            this.playlist = res.data.content.data
                        }
                        this.loading=false
                        console.log()
                        if(res.data.content.data.length>0){
                            this.spage+=1
                        }else{
                            this.searchdata=false
                        }
                    })
                }
            },
            getScrollTop(){
                //滚动条在Y轴上的滚动距离
            　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
            　　if(document.body){
            　　　　bodyScrollTop = document.body.scrollTop;
            　　}
            　　if(document.documentElement){
            　　　　documentScrollTop = document.documentElement.scrollTop;
            　　}
            　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            　　return scrollTop;
            },
            getScrollHeight(){
                //文档的总高度
            　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
            　　if(document.body){
            　　　　bodyScrollHeight = document.body.scrollHeight;
            　　}
            　　if(document.documentElement){
            　　　　documentScrollHeight = document.documentElement.scrollHeight;
            　　}
            　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
            　　return scrollHeight;
            },
            getWindowHeight(){
                //浏览器视口的高度
            　　var windowHeight = 0;
            　　if(document.compatMode == "CSS1Compat"){
            　　　　windowHeight = document.documentElement.clientHeight;
            　　}else{
            　　　　windowHeight = document.body.clientHeight;
            　　}
            　　return windowHeight;
            },
            newlist(){
                if(this.listdata===true){
                    this.$axios.get(`${test}/actives/picSayList`, {
                        params:{
                            page:this.page
                        }
                    }).then((res)=> {
                        // this.playlist.push(res.data.content.data)
                        if(this.page>1){
                            this.playlist = this.playlist.concat(res.data.content.data)
                        }else{
                            this.playlist = res.data.content.data
                        }
                        if(res.data.content.data.length>0){
                            this.page+=1
                        }else{
                            this.listdata=false
                        }

                    })
                }
            },
            gogallery(lid,rank){
                this.$router.push(`newroom?${lid}with${rank}end`);
                setTimeout(()=> {
                    window.location.reload();
                }, 200);
            }
        }
    }
</script>

<style scoped>
    .work {padding-bottom: 12rem;}
    .search-box {background: url('http://ovqgowr6o.bkt.clouddn.com/bj5.png') no-repeat center center;background-size: 100% 100%;
    position: fixed;width: 100%;left: 0;top: 0;z-index:100;}
    .searchfix {position: fixed;width: 100%;left: 0;top: 0;z-index:100;}
    .search-box .search {height: 6rem;background: #fff;border-radius:1rem;width: 76%;font-size: 2.8rem;
    box-shadow:0 0.2rem 1rem rgba(0,142,196,0.29);border:none;margin-left: 3.5%;text-indent: 1em;position: relative;top: -0.2rem;}
    .search-box .search:-webkit-input-placeholder{color:#c3d0d6;}
    .search-box label {font-size: 3.2rem;color:#fff;line-height: 9.8rem;margin:0 3.5% 0 2.5%;}
    .number {position: relative;margin-top: 9.5rem;}
    .number .number-box {position: absolute;width: 100%;top: 0;left: 0;}
    .number .number-con {padding-top: 15.8%;width: 86%;margin:0 auto;}
    .number span{font-size: 4rem;color:#fff;font-weight:bold;text-shadow:0 0.2rem 0.6rem rgba(0,50,118,0.6);
    display: inline-block;width: 40%;text-align: center;}
    .worksearch {padding-top: 14rem;}

    .waterfall {margin:0 24px;transition:all ease 0.5s;}
    .searchbox {padding-top: 12rem;}
    .waterlist {border:0.1rem solid #e6e6e6;border-radius:1rem;overflow: hidden;}
    .waterfall-item .info {position: relative;height: 12.9rem;overflow: hidden;}
    .waterfall-item .infonovoice {height: 7.9rem;}
    .waterfall-item .info img{height: 12.9rem;}
    .waterfall-item .infor-con {position: absolute;top: 0;left: 0;width: 100%;text-align: center;color:#9c4c12;}

    .infor-con .p1 {font-size: 2.8rem;line-height: 3rem;padding-top: 1rem;}
    .infor-con .p2 {font-size: 2.4rem;margin-bottom: 1.5rem;}
    .infor-con .p3 {font-size: 2.4rem;}
    .author {background: #fff;padding: 2.5rem;}
    .author .p4 {font-size: 2.8rem;color:#333;max-height:7.2rem;overflow: hidden;line-height: 3.5rem;margin-bottom: 0.5rem;}
    .author .userpic {width: 3.2rem;height: 3.2rem;border-radius:50%;}
    .author .name {font-size: 2.4rem;color:#999;margin-left: 1rem;position: relative;top: 0.6rem;}
    .loading {position: fixed;width: 180px;height: 180px;left: 50%;top: 50%;margin:-90px 0 0 -90px;z-index:600;}
    .noresult {color:#666;font-size: 3.2rem;text-align: center;margin-top: 50%;}

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
