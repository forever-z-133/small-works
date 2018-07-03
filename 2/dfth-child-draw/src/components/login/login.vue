<template>
    <div class="login">
        <div class="phone-box ilist">
            <input v-model="phone" class="text phone" type="number" placeholder="输入手机号码" maxlength="11">
            <p :class="['codebtn bgcolor',{hide:hide}]" @click="phoneCheck()">获取验证码</p>
            <p :class="['timeCatch codebtn codesec',{hide:show}]" ref="seconds">{{seconds}}s</p>
        </div>
        <input class="text code ilist" type="number" placeholder="输入验证码" maxlength="4" v-model="code">
        <pop :message="message">
            <div slot="pop">{{msg}}</div>
        </pop>  
    </div>
</template>

<script>
    var local = 'http://192.168.1.227:8081'
    var panda = 'http://student.dfth.com/'     

    
    import pop from '../pop'
    export default{
        props:['login1','login2'],
        data(){
            return{
                hide:false,
                show:true,
                seconds:60,
                phone:'',
                message:true,
                msg:'',
                code:'',
            }
        },
        methods:{
            sec(){
                if(this.seconds>0){
                    this.seconds--;
                }
                if(this.seconds===0){
                    this.hide = false;
                    this.show = true;
                    this.seconds=60
                }
            },
            phoneCheck(){
                var regPhone = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;  
                if (!this.phone) {
                    this.message=false
                    this.msg='手机号不能为空'
                } else if (!regPhone.test(this.phone)) {
                    this.message=false
                    this.msg='手机号格式错误'
                } else {
                    this.hide = true;
                    this.show = false;
                    setInterval(this.sec,1000);
                    this.message=true
                    this.sencode();
                }
                this.popoff();
            },
            sencode(){
                var tk = sessionStorage.getItem('tk'); 
                if(this.login1==='send1'){
                    this.$axios.post(`${panda}/actives/getPictureSayCode`, {
                        _token:tk,
                        mobile:this.phone
                    }).then((res)=> {
                        if(res.status===0){
                            this.msg=res.msg
                            this.message=false
                        }else{
                            this.msg='发送成功'
                            this.message=false
                        }
                    })
                    this.popoff();
                }
                if(this.login2==='send2'){
                    this.$axios.post(`${panda}/actives/signPictureSayCode`, {
                        _token:tk,
                        mobile:this.phone
                    }).then((res)=> {
                        if(res.status===0){
                            this.msg=res.msg
                            this.message=false
                        }else{
                            this.msg='发送成功'
                            this.message=false
                        }
                    })
                    this.popoff();
                }
                
            },
            pcheck(){
                var regPhone = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/; 
                if (!this.phone) {
                    this.message=false
                    this.msg='手机号不能为空'
                } else if (!regPhone.test(this.phone)) {
                    this.message=false
                    this.msg='手机号格式错误'
                } else {
                    return true;
                }
                this.popoff();
            },
            codeCheck(){
                if (!this.code) {
                    this.message=false
                    this.msg='验证码不能为空'
                    this.popoff();
                    return false
                }else if(this.code.length<4){
                    this.message=false
                    this.msg='验证码错误'
                    this.popoff();
                    return false
                }else{
                    return true
                }
            },
            popoff(){
                let self = this;
                setTimeout(function() {
                    self.message=true
                }, 3000);
            }

        },
        created(){
            // let u = navigator.userAgent;
            // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            // if(isAndroid===true){
            //     this.anzhuo=true
            // }else{
            //     this.anzhuo=false
            // }
            this.$axios.get(`${panda}/actives/getToken`,{
                params:{

                }
            }).then(res=>{
                sessionStorage.setItem('tk',res.data); 
                // var tk = sessionStorage.getItem('tk'); 
            })
        },
        components:{
            pop
        }
    }
</script>

<style scoped>
    .ilist {margin-top: 3.5rem;}
    .phone-box {position: relative;}
    .phone-box .codebtn {position: absolute;width: 18rem;height: 5.6rem;line-height: 5.6rem;text-align: center;border-radius:0.8rem;
    font-size: 2.4rem;color:#fff;right: 1.5rem;top: 15px;
    box-shadow:0 0.4rem 1.2rem rgba(49,170,246,0.5);
    }
    .phone-box .codesec {box-shadow:none;}
    .sign-btn {height: 8rem;line-height: 8rem;color:#fff;font-size: 2.4rem;text-align: center;margin:3.5rem 4rem 0;border-radius:1.2rem;}
    .timeCatch {background: #ccc;}
    .bgcolor {
        background: #55bafa;
        background: -moz-linear-gradient(top, #55bafa 0% 0%, #31aaf6 100% 100%);
        background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,#55bafa), color-stop(100%,#31aaf6));
        background: -webkit-linear-gradient(top, #55bafa 0% 0%,#31aaf6 100% 100%);
        background: -o-linear-gradient(top, #55bafa 0% 0%,#31aaf6 100% 100%);
        background: -ms-linear-gradient(top, #55bafa 0% 0%,#31aaf6 100% 100%);
        background: linear-gradient(to bottom, #55bafa 0% 0%,#31aaf6 100% 100%);
    }
</style>