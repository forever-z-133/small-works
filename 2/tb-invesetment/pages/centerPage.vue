<template>
	<div class="siginin-wrap" style="padding: 45px 0;margin-top: 13px;">
		<div class="content-box-center">
			<div class="login-title">
				<div class="border-title">注册头豹，及时准确的行业理解助力您的决策</div>
				<router-link class="new-link" to="../login">使用已有账号登录</router-link>
			</div>
			<div class="sigin-success">
				<h1>注册成功</h1>
				<p @click="toMain">{{seconds}}秒后跳转至首页<i class="el-icon-arrow-right"></i></p>
				<div @click="fillInfo">去完善资料</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				seconds:3
			}
		},
		mounted() {
			this.timer()
		},
		methods: {
			init() {
				var redirect = window.sessionStorage.getItem('backto')
				if(redirect) {
					this.$router.replace(redirect);
				} else {
					this.$router.replace('/');
				}
			},
			timer(){
				let self = this;
				if(self.seconds == 0){
					clearInterval(window.siginTime)
					self.init()
					return
				}
				window.siginTime = setInterval(function(){
					self.seconds--;
					clearInterval(window.siginTime)
					self.timer()
				},1000)
			},
			toMain(){
				clearInterval(window.siginTime)
				this.$router.push("/")
			},
			fillInfo(){
				clearInterval(window.siginTime)
				this.$router.push("/editUserInfo")
			}
		}
	}
</script>
<style scoped>
	.content-box-center {
		width: 1200px;
		background: #fff;
		overflow: hidden;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0 auto;
		padding: 0;
		padding-bottom: 40px
	}
	
	.sigin-success {
		text-align: center;
		padding-top: 60px;
		padding-bottom: 150px;
	}
	
	.sigin-success>h1 {
		width: 270px;
		margin: 0 auto;
		font-size: 48px;
		color: #211E1E;
		background: url(../assets/userCenter/sigin-success.png) no-repeat;
		padding-left: 70px;
		background-size: 60px 60px;
		background-position: 10px 50%;
	}
	
	.sigin-success>p {
		font-size: 16px;
		color: #000000;
		margin-top: 30px;
		margin-bottom: 40px;
		cursor: pointer;
	}
	
	.sigin-success>div {
		width: 270px;
		height: 56px;
		border: 1px solid #E83929;
		border-radius: 4px;
		font-size: 16px;
		color: #E83929;
		text-align: center;
		line-height: 56px;
		cursor: pointer;
		margin: 0 auto;
	}
</style>
<style scoped>
	@import url("../assets/css/form.css")
</style>