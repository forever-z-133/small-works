<template>
	<div class="siginin-wrap">
		<div class="content-box">
			<div class="login-title">
				<div class="border-title">找回密码</div>
			</div>
			<el-form :model="forgetform" class="login-form" v-if="step">
				<select name="" id="" class="form-input">
					<option value="1">中国大陆(+86)</option>
				</select>
				<input type="text" v-model="forgetform.mobileno" class="form-input form-icon login-tele" placeholder="手机号" />
				<div class="form-code">
					<input type="text" v-model="imgCode" class="form-input form-icon login-img" placeholder="图形码" />
					<div class="form-code-img" @click="init">
						<img :src="codeSrc" />
					</div>
					<div class="code-reload" @click="init"></div>
					<div class="tips tips-error" style="right: -175px; top: 22px;">{{errorMsg}}</div>
				</div>
				<div class="form-code">
					<input type="text" v-model="code" class="form-input form-icon login-code" placeholder="验证码" />
					<div class="form-code-btn" :class="codeImgStatus || sendStatus ? 'disable' : ''" @click="sendMsg">{{sendBtnText}}</div>
				</div>
				<el-button class="btn" @click="checkCode">下一步</el-button>
			</el-form>

			<el-form class="login-form" v-else>
				<div class="forget-tele">手机号:{{forgetform.mobileno}}</div>
				<div class="form-items">
					<input type="password" v-model="forgetform.password" class="form-input" placeholder="输入新密码" />
					<span class="err-tips">{{pwdValid}}</span>
				</div>
				<div class="form-items">
					<input type="password" v-model="forgetform.repassword" class="form-input" placeholder="再次输入密码" />
					<span class="err-tips">{{repwdValid}}</span>
				</div>
				<!--<input type="password" v-model="forgetform.password" class="form-input" placeholder="" />-->
				<!--<input type="password" v-model="forgetform.repassword" class="form-input" placeholder="" />-->
				<el-button class="btn" @click="submit">确认</el-button>
			</el-form>

		</div>
	</div>

</template>

<script>
	import { baseUrl, getUUID, updatePassword, updatePasswordValidate, imgvrifyControllerDefaultKaptchas, getVerificationCode, checkCode } from "../plugins/userApi"
	import axios from "../plugins/axios"
	export default {
		data() {
			return {
				baseUrl: baseUrl,
				forgetform: {
					mobileno: "",
					password: "",
					repassword: ""
				},
				imgCode: "",
				codeImgStatus: true,
				errorMsg: "",
				code: "",
				seconds: 120,
				uuid: "",
				step: true,
				sendStatus: false,
				sendBtnText: "发送验证码",
				codeValid: false,
				pwdValid: "",
				repwdValid: ""

			}
		},
		computed: {
			codeSrc() {
				let url = `${this.baseUrl}/user/getKaptchaImage/`
				let uuid = this.uuid
				return url + uuid
			}
		},
		created() {
			this.init()
		},
		watch: {
			"imgCode" (val, old) {
				if(val.length > 4) {
					this.imgCode = val.slice(0, 4);
				}
				if(val.length == 4) {
					this.checkImg()
				}
			},
			"code" (val, old) {
				if(val.length > 4) {
					this.code = val.slice(0, 4);
				}
			},
			"forgetform.password" (val, old) {
				let reg = val.length >= 6;
				if(!reg) {
					this.pwdValid = "密码长度至少6位!"
				} else {
					this.pwdValid = ""
				}
			},
			"forgetform.repassword" (val, old) {
				let pwd = this.forgetform.password
				if(val === pwd) {
					this.repwdValid = "";
				} else {
					this.repwdValid = "两次密码输入不一致";
				}
			}

		},
		methods: {
			getUUID,
			init() {
				this.uuid = this.getUUID()
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
			},
			async sendMsg() {
				//发送验证码
				let status = !this.codeImgStatus && !this.sendStatus && !this.phoneValid;
				if(status) {
					this.sendStatus = true;
					let params = {
						mobileno: this.forgetform.mobileno,
						kaptchaImage: this.imgCode,
						uuid: this.uuid
					}
					let res = await getVerificationCode(params)
					if(res.data) {
						this.timer();
						this.$message.success("验证码发送成功")
					} else {

					}
				}
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
			async checkCode() {
				//验证手机验证码
				let params = {
					mobileno: this.forgetform.mobileno,
					verificationCode: this.code
				}
				let res = await updatePasswordValidate(params)
				if(res.code == 0) {
					this.step = false;
					localStorage.setItem("token", res.data)
					this.codeErrorMsg = ""
				} else {
					this.step = true;
					this.codeErrorMsg = res.msg
					this.$message.error(res.msg)
				}
			},
			async submit() {
				if(this.repwdValid || this.pwdValid) {
					return
				}
				let params = this.forgetform
				let res = await updatePassword(params);
				if(res.code == 0) {
					this.$message.success("密码修改成功")
					this.$router.push("/")
				} else {
					this.$message.error(res.msg)
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../assets/css/form.css")
</style>