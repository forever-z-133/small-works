<template>
	<div class="login-wrap" style="padding: 45px 0;">
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
}
</style>