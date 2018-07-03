<template>
    <div :class="['sign',{anzhuo:anzhuo}]" id="share">
        <div class="sign-box">
            <p class="sign-time">报名时间：2018年4月8日~6月22日</p>
            <div class="content">
                <ul class="tab-con">
                    <li :class="['tab-list b',match==='未报名'?'tabon':'']" @click="tab('未报名')">比赛报名</li>
                    <li :class="['tab-list b',match==='已报名'?'tabon':'']" @click="tab('已报名')">我的报名</li>
                </ul>
                <div class="match-box" v-if="match==='未报名'">
                    <div class="info-box">
                        <p class="special-tips" v-if="special">特殊组报名提示</p>
                        <input v-model="name" class="text ilist name" type="text" placeholder="输入参赛者真实姓名，确定后不能修改" maxlength="18">
                        <div class="user-info clearfix ilist">
                            <div class="age info fl">
                                <select name="age" v-model="age">
                                    <option value="">参赛者年龄</option>
                                    <option :value="item" v-for="item in 50" :key="item">{{item}}</option>
                                </select>
                                <img class="arrow" src="http://ovqgowr6o.bkt.clouddn.com/arrow.png" alt="">
                            </div>
                            <div class="sex info fr">
                                <select name="sex" v-model="sex">
                                    <option value="">参赛者性别</option>
                                    <option value="1">男</option>
                                    <option value="2">女</option>
                                </select>
                                <img class="arrow" src="http://ovqgowr6o.bkt.clouddn.com/arrow.png" alt="">
                            </div>
                        </div>
                        <div class="group-box info">
                            <select name="group" class="group ilist" v-model="group">
                                <option value="">选择比赛组别</option>
                                <option value="0">幼儿组</option>
                                <option value="1">少儿组</option>
                                <!--<option value="2">特别组</option>-->
                            </select>
                            <img class="arrow" src="http://ovqgowr6o.bkt.clouddn.com/arrow.png" alt="">
                        </div>
                        <div class="user-info clearfix ilist">
                            <div class="city1 info fl">
                                <select name="city1" v-model="city1" @change="choose">
                                    <option :value="idx" v-for="(item,idx) in cgroup">{{item.name}}</option>
                                </select>
                                <img class="arrow" src="http://ovqgowr6o.bkt.clouddn.com/arrow.png" alt="">
                            </div>
                            <div class="city2 info fr">
                                <select name="city2" v-model="city2">
                                    <option :value="list.id" v-for="list in cgroup2">{{list.name}}</option>
                                </select>
                                <img class="arrow" src="http://ovqgowr6o.bkt.clouddn.com/arrow.png" alt="">
                            </div>
                        </div>
                        <input class="text ilist school" type="text" placeholder="输入所在机构名或学校" maxlength="25" v-model="school">
                        <login ref="login" :login1="login1" key="login1"></login>
                    </div>
                    <p class="sign-btn bgcolor" @click="signbtn">报名</p>
                </div>
                <div class="my-match" v-if="match==='已报名'">
                    <div class="tips">
                        <p class="p1">已报名的参赛者登录后，可上传及修改作品和语音</p>
                        <p class="p1">作品上传日期：2018年4月8日~6月22日</p>
                        <p class="p1">语音上传日期：2018年4月15日~6月22日</p>
                    </div>
                    <div class="login-box">
                        <login ref="login2" :login2="login2" key="login2"></login>
                    </div>
                    <p class="sign-btn bgcolor" @click="signbtn2">登录</p>
                </div>
            </div>
        </div>
        <pop :message="message">
            <div slot="pop">{{msg}}</div>
        </pop>
        <popus :tips="tips" :mask="mask" @close="parentClose" @gosign="gosign"></popus>
    </div>
</template>

<script>
    import login from '../components/login/login'
    import pop from '../components/pop'
    import popus from '../components/popus/popus'
 
    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com/'
    export default{
        data(){
            return{
                // tabon:true,
                match:'未报名',
                name:'',
                phone:'',
                msg:'',
                message:true,
                tips:'',
                mask:false,
                age:'',
                sex:'',
                group:'',
                cgroup:[{
                    id:0,
                    name:'省份/直辖市'
                }],
                cgroup2:[{
                    id:0,
                    name:'城市/区县'
                }],
                city1:0,
                cid:'',
                cid2:'',
                city2:0,
                school:'',
                login1:'send1',
                login2:'send2',
                special:false,
                anzhuo:false
            }
        },
        components:{
            login,pop,popus
        },
        created(){
            
            let u = navigator.userAgent;
            let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid===true){
                this.anzhuo=true
            }else{
                this.anzhuo=false
            }

            let curl = window.location.href;
            if(curl.indexOf('special')>-1){
                this.special
            }
            this.$axios.get(`${panda}/actives/getCity`, {
            }).then((res)=> {
                this.cgroup=res.data.msg
                this.cgroup.unshift({
                    id:0,
                    name:'省份/直辖市'
                })
                this.city1 = 0

            })
        },
        methods:{
            tab(event){
			
                this.match=event
            },
            checkName(){
                let sp = /^\s/;
                let regName = /^([a-zA-Z ]+|[\u4e00-\u9fa5]+)$/;
                if (this.name) {
                    this.message=false
                    this.popoff();
                    if(!sp.test(this.name)){
                        if (regName.test(this.name)) {
                            this.message=true
                            return true
                        } else {
                            this.msg='姓名格式错误';
                        }
                    }
                } else {
                    this.message=false
                    this.msg='姓名不能为空';
                    this.popoff();
                }
            },
            signbtn(){
			 window.location.href='http://student.dfth.com/market/index.html#/work';
                this.checkName();
                if(this.checkName()===true){
                    if(this.age===''){
                        this.message=false
                        this.msg='参赛者年龄不能为空'
                    }else{
                        if(this.sex===''){
                            this.message=false
                            this.msg='参赛者性别不能为空'
                        }else{
                            if(this.group===''){
                                this.message=false
                                this.msg='参赛组别不能为空'
                            }else if(this.age<7){
                                if(this.group==1){
                                    this.message=false
                                    this.msg='少儿组年龄必须为7-15岁'
                                }else{
                                    this.otherCheck();
                                }
                            }else{
                                if(this.group==0){
                                    this.message=false
                                    this.msg='幼儿组年龄必须为3-6岁'
                                }else{
                                    this.otherCheck();
                                }
                            }
                        }
                    }
                }else{

                }
            },
            signbtn2(){
			 window.location.href='http://student.dfth.com/market/index.html#/work';
                this.$refs.login2.pcheck()
                if(this.$refs.login2.pcheck()===true){
                    this.$refs.login2.codeCheck()
                    if(this.$refs.login2.codeCheck()===true){
                        this.submitInfo2();
                    }
                }
            },
            submitInfo(){
                var tk = sessionStorage.getItem('tk'); 
                this.$axios.post(`${panda}/actives/saveInfo`,{
                    _token:tk,
                    childname:this.name,
                    age:this.age,
                    sex:this.sex,
                    group_type:this.group,
                    province:this.cid2,
                    city:this.city2,
                    organization:this.school,
                    mobile:this.$refs.login.phone,
                    code:this.$refs.login.code
                }).then(res=>{
                    
                    if(res.data.status===1){
                        // this.msg="登录成功"
                        sessionStorage.setItem('tid',res.data.content.id); 
                        this.tips='ok';
                        this.mask=true;
                    }else if(res.data.msg==='此手机号已报名'){
                        // sessionStorage.setItem('tid',res.data.content.id); 
                        this.tips='had'
                        this.mask=true;
                    }else{
                        this.tips='fail';
                        this.message=false
                        this.msg=res.data.msg
                    }
                    this.popoff();
                    
                })
            },
            submitInfo2(){
                var tk = sessionStorage.getItem('tk'); 
                this.$axios.post(`${panda}/actives/SignIn`,{
                    _token:tk,
                    mobile:this.$refs.login2.phone,
                    code:this.$refs.login2.code
                }).then(res=>{
                    if(res.data.status===1){
                        let mid = res.data.content.id;
                        this.$router.push(`manage?id=${mid}`);
                        sessionStorage.setItem('tid',res.data.content.id); 
                    }else{
                        this.message=false
                        this.msg=res.data.msg
                    }
                    this.popoff();
                })
            },
            groupCheck(){
                if(this.age<7){
                    this.group!=1
                    return true
                }else{
                    this.group!=2
                    return false
                }
            },
            otherCheck(){
                if(this.city1===0||this.city1===0){
                    this.message=false
                    this.msg='请选择城市'
                }else{
                    if(this.school===''){
                        this.message=false
                        this.msg='学校或者机构不能为空'
                    }else{
                        this.$refs.login.pcheck()
                        if(this.$refs.login.pcheck()===true){
                            this.$refs.login.codeCheck()
                            if(this.$refs.login.codeCheck()===true){
                                this.submitInfo();
                            }
                        }
                    }
                }
            },
            choose(){
                this.cgroup2=this.cgroup[this.city1].child; 
                this.city2=this.cgroup2[0].id;
                let cid1 = this.city2.toString().substr(0,2); 
                this.cid2 = cid1;
                console.log(this.cid2);
            },
            popoff(){
                let self = this;
                setTimeout(function() {
                    self.message=true
                }, 2000);
            },
            parentClose(){
                this.tips='',
                this.mask=false;
            },
            gosign(){
                this.parentClose();
                this.match='已报名'
            }
        }
    }
</script>

<style scoped>
    .sign {background: #31aaf6;padding-bottom: 4rem;}
    .sign-box {background: url('http://ovqgowr6o.bkt.clouddn.com/banner.jpg') no-repeat;min-height: 120.7rem;background-size: 100%;}
    .sign-time {font-size: 2.3rem;color:#fff;padding-top: 42.8%;text-align: center;}
    .content {border-radius:1.5rem;background: #fff;box-shadow:0 0.8rem 4rem rgba(21,88,130,0.2);margin:5rem 4rem 0;overflow: hidden;
    padding-bottom: 6rem;}
    .tab-con {display: flex;}
    .tab-list {width: 50%;font-size: 3.2rem;color:#c5d1dc;background: #f5f5f5;text-align: center;line-height: 8rem;}
    .tabon {color:#31aaf6;background: #fff;}
    .info-box {width: 88%;margin:0 auto;}
    .content select{line-height: 8rem;color:#333;font-size: 2.8rem;text-align: center;display: inline-block;
    border-radius:1.5rem;border:0.1rem solid #ccc;height: 8rem;text-indent: 0.5em;}
    .info-box .user-info .info {width: 47%;}
    .info {position: relative;}
    .info .arrow{position: absolute;width: 2.2rem;right: 2rem;bottom: 3rem;}
    .info-box select{width: 100%;}
    .group-box select {width: 100%;}
    .user-info option{text-align: center;}
    .info-box .ilist {margin-top: 3.5rem;}
    .sign-btn {height: 8rem;line-height: 8rem;color:#fff;font-size: 2.8rem;text-align: center;margin:3.5rem 4rem 0;border-radius:1.2rem;
    box-shadow: 0 0.8rem 3rem rgba(49,170,246,0.5);}
    .bgcolor {
        background: #55bafa;
        background: -moz-linear-gradient(top, #55bafa 0% 0%, #31aaf6 100% 100%);
        background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,#55bafa), color-stop(100%,#31aaf6));
        background: -webkit-linear-gradient(top, #55bafa 0% 0%,#31aaf6 100% 100%);
        background: -o-linear-gradient(top, #55bafa 0% 0%,#31aaf6 100% 100%);
        background: -ms-linear-gradient(top, #55bafa 0% 0%,#31aaf6 100% 100%);
        background: linear-gradient(to bottom, #55bafa 0% 0%,#31aaf6 100% 100%);
    }
    .tips {color:#fd7555;font-size: 2.34rem;line-height: 4rem;margin:3.5rem 4rem 0;}
    .login-box {margin:3.5rem 4rem 0;}
    .special-tips {font-size: 2.8rem;margin-top: 1.8rem;}
    
</style>