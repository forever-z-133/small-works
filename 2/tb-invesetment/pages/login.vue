<template>
	<div class="login-wrap">
		<login-form></login-form>
	</div>
</template>

<script>
	import loginForm from "../components/Login"
	export default {
		name:"login",
		components:{ loginForm },
		data(){
			return{
				loginForm:{
				
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
.login-wrap{
	position: relative;
	background: #eee;
	padding: 45px 0;
	background: url(../assets/userCenter/login-bg.png) no-repeat;
	background-size: 100% 100%;
}
</style>