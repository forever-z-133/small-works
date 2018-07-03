<template>
    <div class="upload" id="share">
        <div class="upload-box">
            <div class="load-inner">
                <div class="load-con">
                    <div class="title">
                        <p class="p1 tc" v-if="fixed===''">作品上传</p>
                        <p class="p1 tc" v-if="fixed==='yes'">作品修改</p>
                        <img class="tree1" src="../public/images/tree1.png" alt="">
                        <img class="tree2" src="../public/images/tree2.png" alt="">
                    </div>
                    <div class="content">
                        <div class="subtance">
                            <div class="input">
                                <input class="work-name" type="text" placeholder="输入作品名字，限10字以内" v-model="workname" maxlength="10">
                            </div>
                            <textarea class="work-story" placeholder="输入我的作品故事，限100字以内" v-model="workstory" maxlength="100">
                            </textarea>
                            <div class="input">
                                <input class="teacher-name" type="text" placeholder="选填，输入指导老师姓名" v-model="teacher">
                            </div>
                        </div>
                    </div>
                    <div class="file-box clearfix">
                        <chart ref="chart1" class="fl chart1" msg="上传参赛者照片" @gbs="gbs" :curl1="curl1" key="chart1"></chart>
                        <chart ref="chart2" class="fr chart2" msg="上传作品" @gbs2="gbs2" :curl2="curl2" key="chart2"></chart>
                    </div>
                    <p class="sure" @click="sure">确定</p> 
                </div>
            </div>
            
        </div>
        <div :class="['tips-box',{hide:on}]">
            <div class="photo-tips">
                <p class="title tc">拍摄提示</p>
                <div class="photo-con">
                    <div class="photo-inner">
                        <div class="ebox">
                            <p class="p1">1.建议选择1200万像素以上的设备进行拍摄</p>
                            <img class="example" src="../public/images/example.jpg" alt="">
                        </div>
                        <div class="ebox">
                            <p class="p1">2.请将相机垂直画面拍摄</p>
                            <div class="imgbox">
                                <img class="example" src="../public/images/example2.jpg" alt="">
                                <img class="example" src="../public/images/example3.jpg" alt="">
                            </div>
                        </div>
                        <div class="ebox">
                            <p class="p1">3.拍摄使用自然背景光效果最佳，避免光点以及阴影</p>
                            <div class="imgbox">
                                <img class="example" src="../public/images/example4.jpg" alt="">
                                <img class="example" src="../public/images/example5.jpg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <p class="pclose" @click="pclose">确定</p>
            </div>
            <div class="mask"></div>
        </div>
        <pop :message="message">
            <div slot="pop">{{msg}}</div>
        </pop>
        <div class="mk" v-if="mk"></div>
        <img v-if="loading" class="loading" src="../public/images/loading.gif" alt="">
        <popus :voiceupload="voiceupload" :mask="mask" @close="parentClose" :fmsg="fmsg"></popus>
    </div>
</template>

<script>
    import chart from '../components/chart/chart'
    import popus from '../components/popus/popus'
    import pop from '../components/pop'

    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com/'
    export default{
        data(){
            return{
                on:true,
                photo:'上传参赛者照片',
                work:'上传作品',
                message:true,
                msg:'',
                workname:'',
                workstory:'',
                base1:'',
                base2:'',
                loading:false,
                workupload:false,
                voiceupload:-1,
                info:'',
                mask:false,
                curl1:'',
                curl2:'',
                fixed:'',
                fmsg:'',
                teacher:'',
                mk:false
            }
        },
        components:{
            chart,pop,popus
        },
        methods:{
            pclose(){
                this.on = true
                localStorage.setItem('first', 1);
            },
            sure(){
                let sp = /^\s/;
                let regName = /^([a-zA-Z ]+|[\u4e00-\u9fa5]+)$/;
                let maxsize = 5*1024*1024;//5M

                if(this.workname===''){
                    this.message=false
                    this.msg='作品名字不能为空'
                }else{
                    if(this.workstory===''){
                        this.message=false;
                        this.msg='作品故事不能为空'
                    }else{
                        if(this.$refs.chart1.previewsurl===''&&this.$refs.chart1.curl1===''){
                            this.message=false;
                            this.msg='头像不能为空'
                        }else{
                            if(this.$refs.chart2.previewsurl2===''&&this.$refs.chart2.curl2===''){
                                this.message=false;
                                this.msg='作品不能为空'
                            }else{
                                this.upinfo();
                            }
                        }
                    }
                }
                this.popoff();
            },
            upinfo(){
                var tk = sessionStorage.getItem('tk'); 
                var tid = sessionStorage.getItem('tid'); 
                let curl = window.location.href;
                if(this.$refs.chart1.previewsurl){
                    var tbase1 = this.base1;
                }else{
                    var tbase1 = '';
                }
                if(this.$refs.chart2.previewsurl2){
                    var tbase2 = this.base2;
                }else{
                    var tbase2 = '';
                }

                        this.mk=true
                        this.loading=true
                        this.$axios.post(`${panda}/actives/pictureSayAdd`,{
                            _token:tk,
                            id:tid,
                            head_img:tbase1,
                            works_img:tbase2,
                            works_name:this.workname,
                            works_det:this.workstory,
                            teacher:this.teacher
                        }).then((res)=>{
                            this.mk=true
                            this.loading=false
                            var tid = sessionStorage.getItem('tid'); 
                            this.$axios.get(`${panda}/actives/ParticipantInfo`,{
                                params:{
                                    id:tid
                                }
                            }).then((res)=>{
                                this.info=res.data.content
                                if(res.data.status===1){
                                    if(res.data.content.works_voice===''){
                                        this.voiceupload=0
                                    }else{
                                        this.voiceupload=1
                                    }
                                    this.mask=true
                                }else{
                                    this.msg=res.data.msg;
                                    this.message=false
                                }
                                this.popoff();
                            })
                        }).catch((error)=>{
                            this.msg='服务器繁忙，请稍候再试'
                            this.message=false
                            this.loading=false
                            this.mk=false
                            this.popoff();
                        })
                        if(this.fixed===''){
                            this.fmsg===''
                        }else{
                            this.fmsg==='fixed'
                        }

                // let max = 5*1024*1024
                // let img2 = document.getElementById('uploads2');
                // if(img2.src===''){
                //     let imgsize = img2.files[0].size;
                //     if(imgsize>max){
                //         this.msg='图像不能大于5M';
                //         this.message=false
                //         this.popoff();
                //     }else{

                //         this.mk=true
                //         this.loading=true
                //         this.$axios.post(`${panda}/actives/pictureSayAdd`,{
                //             _token:tk,
                //             id:tid,
                //             head_img:tbase1,
                //             works_img:tbase2,
                //             works_name:this.workname,
                //             works_det:this.workstory,
                //             teacher:this.teacher
                //         }).then((res)=>{
                //             this.mk=true
                //             this.loading=false
                //             var tid = sessionStorage.getItem('tid'); 
                //             this.$axios.get(`${panda}/actives/ParticipantInfo`,{
                //                 params:{
                //                     id:tid
                //                 }
                //             }).then((res)=>{
                //                 this.info=res.data.content
                //                 if(res.data.status===1){
                //                     if(res.data.content.works_voice===''){
                //                         this.voiceupload=0
                //                     }else{
                //                         this.voiceupload=1
                //                     }
                //                     this.mask=true
                //                 }else{
                //                     this.msg=res.data.msg;
                //                     this.message=false
                //                 }
                //                 this.popoff();
                //             })
                //         }).catch((error)=>{
                //             this.msg='服务器繁忙，请稍候再试'
                //             this.message=false
                //             this.loading=false
                //             this.mk=false
                //             this.popoff();
                //         })
                //         if(this.fixed===''){
                //             this.fmsg===''
                //         }else{
                //             this.fmsg==='fixed'
                //         }
                //     }
                // }else{
                //         this.mk=true
                //         this.loading=true
                //         this.$axios.post(`${panda}/actives/pictureSayAdd`,{
                //             _token:tk,
                //             id:tid,
                //             head_img:tbase1,
                //             works_img:tbase2,
                //             works_name:this.workname,
                //             works_det:this.workstory,
                //             teacher:this.teacher
                //         }).then((res)=>{
                //             this.mk=true
                //             this.loading=false
                //             var tid = sessionStorage.getItem('tid'); 
                //             this.$axios.get(`${panda}/actives/ParticipantInfo`,{
                //                 params:{
                //                     id:tid
                //                 }
                //             }).then((res)=>{
                //                 this.info=res.data.content
                //                 if(res.data.status===1){
                //                     if(res.data.content.works_voice===''){
                //                         this.voiceupload=0
                //                     }else{
                //                         this.voiceupload=1
                //                     }
                //                     this.mask=true
                //                 }else{
                //                     this.msg=res.data.msg;
                //                     this.message=false
                //                 }
                //                 this.popoff();
                //             })
                //         }).catch((error)=>{
                //             this.msg='服务器繁忙，请稍候再试'
                //             this.message=false
                //             this.loading=false
                //             this.mk=false
                //             this.popoff();
                //         })
                //         if(this.fixed===''){
                //             this.fmsg===''
                //         }else{
                //             this.fmsg==='fixed'
                //         }
                // }
                

            },
            popoff(){
                let self = this;
                setTimeout(function() {
                    self.message=true
                }, 2000);
            },
            gbs(dbase){
                this.base1=dbase
            },
            gbs2(dbase){
                this.base2=dbase
            },
            parentClose(){
                var mid = sessionStorage.getItem('tid'); 
                this.voiceupload='',
                this.mask=false;
                this.$router.push(`manage?id=${mid}`);
            }
        },
        created(){
            if(this.fixed==='yes'){
                this.on = false
            }else{
                this.on = true
            }
            let curl = window.location.href;
            if(curl.indexOf('fixed')>-1){
                var tid = sessionStorage.getItem('tid'); 
                this.fixed='yes'
                this.$axios.get(`${panda}/actives/ParticipantInfo`,{
                    params:{
                        id:tid
                    }
                }).then((res)=>{
                    this.info=res.data.content
                    this.workname=this.info.works_name;
                    this.workstory=this.info.works_det
                    this.curl1=this.info.head_img;
                    this.curl2=this.info.works_img;
                    this.teacher=this.info.teacher;
                })
            }else{
                this.fixed=''
            }
        }
    }
</script>

<style scoped>
    .upload {background: #31aaf6;padding-bottom: 10rem;}
    .upload-box {background: url('../public/images/bj2.jpg') no-repeat top center;min-height:120.7rem;background-size: 100%;}
    .load-inner {padding-top: 10rem;}
    .load-con {background: #fff;border-radius:1.5rem;box-shadow:0 1.4rem 6rem rgba(3,15,39,0.14);margin:0 auto;width:81.4%;
    padding:0 3rem 8rem;}
    .title {position: relative;border-bottom: 0.1rem solid #ccc;}
    .title .p1 {height: 8.4rem;line-height: 8.4rem;font-size: 3.6rem;color:#333;}
    .title img{position: absolute;}
    .title .tree1 {width: 20.7rem;left: -3rem;bottom: 0;}
    .title .tree2 {width: 21.1rem;right: -3rem;bottom: 0;}
    .content {margin-top: 7rem;}
    .content .subtance {margin:0 2rem;}
    .content input {width: 97%;border-radius:1.5rem;border:0.1rem solid #ccc;text-indent: 0.5rem;font-size: 2.8rem;line-height: 8rem;
    padding:0 1.5%;}
    .content .input {margin-bottom: 3rem;}
    .content .work-name {height: 8rem;}
    .content .work-story {height: 20rem;width: 97%;font-size: 2.8rem;border-radius:1.5rem;border:0.1rem solid #ccc;
    padding:1.5% 1.5% 0;margin-bottom: 3rem;}
    .file-box {margin:6rem 4rem 0;}
    .sure {height: 8rem;line-height: 8rem;border-radius:1.2rem;background: #31aaf6;font-size: 3.2rem;color:#fff;text-align: center;
    margin: 6rem 3rem 0;;box-shadow:0 0.8rem 3rem rgba(49,170,246,0.5);}
    .photo-tips {width: 59rem;background: #fff;border-radius:1.2rem;position: fixed;left: 50%;top: 50%;margin:-55rem 0 0 -29rem;
    z-index:500;height: 104rem;}
    .photo-tips .title {font-size: 3rem;text-align: center;border-bottom: 0.1rem solid #ddd;line-height: 9rem;}
    .photo-tips .photo-inner {margin:0 4rem;}
    .photo-tips .imgbox {display:flex;justify-content: space-between;height: 16.7rem;}
    .photo-tips .ebox {margin-top: 4rem;}
    .photo-tips .p1 {font-size: 2.6rem;margin-bottom: 3rem;}
    .photo-tips img{width: 23.7rem;}
    .photo-tips .pclose {background: rgb(50,179,246);color:#fff;font-size: 3.6rem;text-align: center;margin-top: 5rem;height: 8rem;
    line-height: 8rem;border-radius: 0 0 1.2rem 1.2rem;}
    .mask {background: rgba(0,0,0,0.5);position: fixed;width: 100%;height: 100%;top: 0;left: 0;}
    .loading {position: fixed;top: 50%;left: 50%;width: 18rem;height: 18rem;margin:-9rem 0 0 -9rem;z-index:999;}
    .mk {background:rgba(0,0,0,0.5);width: 100%;height: 100%;left: 0;top: 0;z-index:800;position: fixed;}
</style>