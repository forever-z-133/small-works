<template>
	<div class="siginin-wrap" style="padding: 45px 0;">
		<div class="content-box" style="width: 75%;min-width: 960px;">
			<div class="login-title">
				<div class="border-title">注册头豹，及时准确的行业理解助力您的决策</div>
				<router-link class="new-link" to="../login">使用已有账号登录</router-link>
			</div>
			<el-form :model="siginForm" class="login-form">
				<select v-model="siginForm.areacode" class="form-input">
					<option value="+86">中国大陆(+86)</option>
					<option value="+0855">中国香港(+0855)</option>
				</select>
				<div class="form-items">
					<input type="text" v-model="siginForm.mobileno" class="form-input form-icon login-tele" placeholder="手机号" />
					<span class="err-tips">{{phoneValid}}</span>
				</div>
				<div class="form-items">
					<input type="password" v-model="siginForm.password" class="form-input form-icon login-pwd" placeholder="密码" />
					<span class="err-tips">{{pwdValid}}</span>
				</div>
				<div class="form-code">
					<input type="text" v-model="imgCode" class="form-input form-icon login-img" placeholder="图形码" />
					<div class="form-code-img" @click="init">
						<img :src="codeSrc + uuid" />
						<!--{{imgCode}}-->
					</div>
					<div class="code-reload" @click="init"></div>
					<div class="tips tips-error" style="right: -175px; top: 22px;">{{errorMsg}}</div>
				</div>
				<div class="form-code">
					<input type="text" v-model="siginForm.verificationCode" class="form-input form-icon login-code" placeholder="验证码" />
					<div class="form-code-btn" :class="codeImgStatus || sendStatus || phoneValid ? 'disable' : ''" @click="sendMsg">{{sendBtnText}}</div>
				</div>
				<el-button class="btn" @click="submit" :class="submitBtn ? 'btn-disable' : ''" :disabled="submitBtn">注册账号</el-button>
				<div class="login-type">
					<div class="login-wx">微信登录</div>
					<div class="login-tb">头豹APP登录</div>
				</div>
			</el-form>

		</div>
	</div>

</template>

<script>
	import { baseUrl, getUUID, register, imgvrifyControllerDefaultKaptchas, getVerificationCode, updatePasswordValidate } from "../plugins/userApi"
	export default {
		data() {
			return {
				codeSrc: `${baseUrl}/user/getKaptchaImage/`,
				uuid: "",
				errorMsg: "",
				siginForm: {
					areacode: "+86",
					mobileno: "",
					password: "",
					verificationCode :""
				},
				imgCode: "",
				seconds: 120,
				codeImgStatus: true,
				sendStatus: false,
				sendBtnText: "发送验证码",
				phoneValid: "",
				pwdValid: "",
				codeValid:false
			}
		},
		watch: {
			"siginForm.areacode"(val, old) {
				let type = this.siginForm.areacode
				let reg = ""
				if(type == "+86"){
					reg = /^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(val)
				} else {
					reg = /^([6|9])\d{7}$/.test(val) 
				}
				if(!reg) {
					this.phoneValid = "手机号不正确!"
				} else {
					this.phoneValid = ""
				}
			},
			"siginForm.mobileno" (val, old) {
				let type = this.siginForm.areacode
				let reg = ""
				if(type == "+86"){
					reg = /^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(val)
				} else {
					reg = /^([6|9])\d{7}$/.test(val) 
				}
				this.phoneValid = reg ? "" : "手机号不正确!"
			},
			"siginForm.password" (val, old) {
				let reg = (val.length >= 6) && (val.length <= 24);
				this.pwdValid = reg ? "" : "密码长度6~24位!"
			},
			"imgCode" (val, old) {
				if(val.length > 4) {
					this.imgCode = val.slice(0, 4);
				}
				if(val.length == 4) {
					this.checkImg()
				}
			},
			"siginForm.verificationCode" (val, old) {
				this.codeValid = false
				if(val.length > 4) {
					this.siginForm.verificationCode = val.slice(0, 4);
				}
				if(val.length == 4){
					this.codeValid = true
				}
			}
		},
		created() {
			this.init()
		},
		computed: {
			submitBtn() {
//				let phone = !this.phoneValid;
//				let pwd = !this.pwdValid;
//				let code = !this.pwdValid;
//				let img = this.codeImgStatus;
//				console.log(!phone , !pwd , code , img)
//				return !phone || !pwd || !code || img
				return false
			}
		},
		methods: {
			getUUID,
			init() {
				let self = this;
				this.uuid = this.getUUID()
				let timer = setTimeout(function(){
					self.init();
				},120000)
			},
			timer() {
				let self = this;
				if(self.seconds == 0) {
					self.sendStatus = false;
					self.seconds = 120;
					self.sendBtnText = "获取验证码"
					return
				}
				self.seconds--;
				self.sendBtnText = self.seconds + "s";

				let test = setInterval(function() {
					clearInterval(test)
					self.timer()
				}, 1000)
			},
			async submit() {
				//提交注册
				if(this.phoneValid || this.pwdValid){
					return
				}
				let params = this.siginForm
				let res = await register(params)
				if(res.code == 0){
					localStorage.setItem("userinfo",JSON.stringify(res.data))
					localStorage.setItem("token",res.data.token)
					this.$store.commit("setLogin", true);
					this.$router.push("/centerPage")
				} else {
					this.init()
					this.$message.error(res.msg)
				}
			},
			async sendMsg() {
				//发送验证码
				let status = !this.codeImgStatus && !this.sendStatus && !this.phoneValid;
				console.log(status)
				if(status) {
					this.sendStatus = true;
					let params = {
						mobileno: this.siginForm.mobileno,
						kaptchaImage: this.imgCode,
						uuid: this.uuid,
						areacode:this.siginForm.areacode
					}
					let res = await getVerificationCode(params)
					if(res.data.status) {
						this.timer();
						this.$message.success("验证码发送成功")
					} else {
						this.init();
						this.$message.error("验证码发送失败")
					}
				}
			},
			async checkImg() {
				//验证图片验证码
				let params = {
					kaptchaImage: this.imgCode,
					uuid: this.uuid
				}
				let res = await imgvrifyControllerDefaultKaptchas(params)
				if(res.data) {
					this.codeImgStatus = false
					this.errorMsg = ""
				} else {
					this.codeImgStatus = true
					this.errorMsg = res.msg
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../assets/css/form.css")
</style>