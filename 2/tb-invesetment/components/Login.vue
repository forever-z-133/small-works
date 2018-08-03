<template>
	<div class="content-box" style="min-width: 960px;width: 75%;">
		<div class="login-title">
			<div class="border-title">账号密码登录</div>
			<router-link class="new-link" to="../signin">注册新用户</router-link>
		</div>
		<div class="login-form">
			<select name="" id="" class="form-input">
				<option value="+86">中国大陆(+86)</option>
				<option value="+0855">中国香港(+0855)</option>
			</select>
			<input type="text" v-model="loginForm.mobileNo" class="form-input form-icon login-tele" placeholder="手机号" />
			<input type="password" v-model="loginForm.password" class="form-input form-icon login-pwd" placeholder="密码" />
			<div class="form-code" v-if="chance <= 0">
				<input type="text" v-model="imgCode" class="form-input form-icon login-img" placeholder="图形码" />
				<div class="form-code-img" @click="init">
					<img :src="codeSrc+uuid" />
				</div>
				<div class="code-reload" @click="init"></div>
			</div>
			<div class="login-link-tips">
				<router-link to="../forget" style="color:#555">忘记登录密码</router-link>
				<div class="tips tips-error" v-if="errorMsg">{{errorMsg}}</div>
			</div>
			<el-button class="btn" @click="submit">立即登录</el-button>
			<div class="login-type">
				<div class="login-wx">微信登录</div>
				<div class="login-tb">头豹APP登录</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { baseUrl, getUUID, login, imgvrifyControllerDefaultKaptchas } from "../plugins/userApi"
	export default {
		name: "login",
		data() {
			return {
				codeSrc:`${baseUrl}/user/getKaptchaImage/`,
				uuid:"",
				chance:2,
				loginForm: {
					mobileNo: "",
					password: ""
				},
				imgCode:"",
				errorMsg:""
			}
		},
		created(){
			this.init()
		},
		watch:{
			"loginForm.mobileNo" (val, old) {
				let type = this.areacode
				let reg = ""
				if(type == "+86"){
					reg = /^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(val)
				} else {
					reg = /^([6|9])\d{7}$/.test(val) 
				}
				this.errorMsg = reg ? '' : "手机号不正确!";
			},
			"loginForm.password" (val, old) {
				let reg = val.length >= 6;
				this.errorMsg = reg ? '' : "密码长度至少6位!";
			},
			"imgCode"(val,old){
				if(val.length > 4){
					this.imgCode = val.slice(0, 4);
				}
				if(val.length == 4){
					this.checkImg()
				}
			}
		},
		methods: {
			init(){
				this.uuid = this.getUUID()
			},
			getUUID,
			async submit() {
				let params = this.loginForm;
				params.uuid = this.uuid;
				if(this.chance == 0){
					params.kaptchaImage = this.imgCode
				}
				
				let res = await login(params)
				if(res.code == 0){
					console.log("登录成功")
					localStorage.setItem("userinfo",JSON.stringify(res.data))
					localStorage.setItem("token",res.data.token)
					this.$store.commit("setLogin", true);
					if (window.sessionStorage.getItem('backto')) {
						var redirect = window.sessionStorage.getItem('backto')
						return this.$router.replace(redirect);
					}
					this.$router.push("/")
				} else {
					this.chance--;
					this.init()
					this.errorMsg = res.msg;
				}
			},
			async checkImg(){
				let params = {
					kaptchaImage:this.imgCode,
					uuid:this.uuid
				}
				let res = await imgvrifyControllerDefaultKaptchas(params)
				if(res.data){
					this.errorMsg = ""
				} else {
					this.errorMsg = res.msg
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../assets/css/form.css");
</style>