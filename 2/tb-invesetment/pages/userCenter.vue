<template>
	<div class="user-wrap">
		<div class="user-header">
			<div class="user-info">
				<div class="user-head-img">
					<img :src="imgbaseurl + user.namecard" />
				</div>
				<div class="user-info-center">
					<div>{{user.name || '某某某'}}</div>
					<router-link v-if="!user.name" class="link" to="editUserInfo">补全信息 <i class="el-icon-arrow-right"></i></router-link>
				</div>
				<div class="user-info-bottom">
					<ul class="user-tag-icon">
						<li>{{user.position}}</li>
						<li>{{user.companyName}}</li>
					</ul>
					<ul class="user-tag-border">
						<li v-for="(item,index) in usertags" :key="index" :index="index">{{item}}</li>
					</ul>
					<div class="edit-pencle" v-if="user.name" @click="edit"></div>
					<div class="user-logout">退出账号</div>
				</div>
			</div>
		</div>
		<div class="user-nav">
			<div class="nav" @click="activeNav = 1">
				<div>{{a || 0}}</div>
				<div>我的提问</div>
				<div v-if="activeNav == 1" class="nav-border"></div>
			</div>
			<div class="nav" @click="activeNav = 2">
				<div>{{b || 0}}</div>
				<div>我的发布</div>
				<div v-if="activeNav == 2" class="nav-border"></div>
			</div>
			<div class="nav" @click="activeNav = 3">
				<div>{{c || 0}}</div>
				<div>我的收藏</div>
				<div v-if="activeNav == 3" class="nav-border"></div>
			</div>
			<div class="nav" @click="activeNav = 4">
				<div>{{d || 0}}</div>
				<div>我的评论</div>
				<div v-if="activeNav == 4" class="nav-border"></div>
			</div>
			<div class="nav" @click="activeNav = 5">
				<div>{{e || 0}}</div>
				<div>阅读历史</div>
				<div v-if="activeNav == 5" class="nav-border"></div>
			</div>
		</div>
		<div class="content">
			<my-question v-if="activeNav == 1"></my-question>
			<my-release v-if="activeNav == 2"></my-release>
			<my-collection v-if="activeNav == 3"></my-collection>
			<my-comment v-if="activeNav == 4"></my-comment>
			<read-history v-if="activeNav == 5"></read-history>
		</div>
	</div>
</template>

<script>
	import myCollection from "../components/userCenter/myCollection.vue"
	import myComment from "../components/userCenter/myComment.vue"
	import myQuestion from "../components/userCenter/myQuestion.vue"
	import myRelease from "../components/userCenter/myRelease.vue"
	import readHistory from "../components/userCenter/readHistory.vue";
	import { findUserInfoAndUserCompanyByUserId, findUserFavorite, findUserLeavewords, findUserQuestionList, findUserAdList, findUserLogReadList } from "../plugins/userApi"
	export default {
		data() {
			return {
				user:{},
				usertags:[],
				activeNav: "1",
				a: "",
				b: "",
				c: "",
				d: "",
				e: ""
			}
		},
		components: {
			myCollection,
			myComment,
			myQuestion,
			myRelease,
			readHistory
		},
		created() {
			this.init()
			this.getUser()
		},
		mounted() {
			var str = window.location.search;
			var r = str.match(new RegExp('(^|\\?|&)tab=([^&]*)(&|$)'));
			this.activeNav = r && r.length ? r[2] : this.activeNav;
		},
		methods: {
			async getUser(){
				let res = await findUserInfoAndUserCompanyByUserId();
				if(res.code == 0){
					this.user = res.data

					let tags = res.data.focuson;
					if(tags){
						this.usertags = tags.split(",")
					}
				}
			},
			async init() {
				let params = {
					pageNum: 1
				}
				let a = await findUserQuestionList(params)
				this.callback(a, "a")
				let b = await findUserAdList(params)
				this.callback(b, "b")
				let c = await findUserFavorite(params)
				this.callback(c, "c")
				let d = await findUserLeavewords(params)
				this.callback(d, "d")
				let e = await findUserLogReadList(params)
				this.callback(e, "e")
			},
			callback(data, keys) {
				if(data.code == 0) {
					let nums = data.data.total;
					this[keys] = nums;
				} else {
					this[keys] = 0;
				}
			},
			edit(){
				this.$router.push("/editUserInfo")
			}
		}
	}
</script>

<style scoped>
	.user-wrap {
		width: 100%;
		overflow: hidden;
		background-color: #eaeaea;
		padding: 45px 0;
		box-sizing: border-box;
		min-width: 1200px;
	}

	.user-header {
		width: 1200px;
		height: 300px;
		background-color: cornflowerblue;
		position: relative;
		margin: 0 auto;
	}

	.user-info {
		position: absolute;
		width: 1200px;
		height: 100px;
		bottom: 0;
		background-color: #fff;
	}

	.user-head-img {
		width: 122px;
		height: 122px;
		border-radius: 50%;
		border: 1px solid #fff;
		overflow: hidden;
		position: absolute;
		left: 60px;
		bottom: 20px;
		background: #eaeaea;
	}

	.user-head-img>img {
		width: 100%;
		height: 100%;
	}

	.user-info-center {
		padding-left: 210px;
		overflow: hidden;
		margin-top: 20px;
	}

	.user-info-center>div,
	.user-info-center>.link {
		float: left;
		line-height: 24px;
		margin-right: 20px;
	}

	.user-info-center>div:nth-child(1) {
		font-size: 24px;
		color: #2D2828;
	}

	.user-info-center>.link {
		font-size: 16px;
		color: #E83929;
		cursor: pointer;
	}

	.user-info-bottom {
		margin-top: 7px;
		padding-left: 210px;
		overflow: hidden;
	}

	.user-info-bottom>ul {
		float: left;
		overflow: hidden;
	}

	.user-tag-icon>li {
		float: left;
		margin-right: 30px;
		line-height: 22px;
		color: #ACA0A0;
		font-size: 12px;
		padding-left: 25px;
		cursor: pointer;
	}

	/*.user-tag-icon>li:hover,*/
	/*.user-tag-border>li:hover,*/
	.user-logout:hover {
		color: #E83929;
		border-color: #E83929;
	}
	.user-tag-icon>li:nth-child(1){
		background: url(../assets/login/icon-position.png) no-repeat;
		background-size: 17px 14px;
		background-position: 0 50%;
	}
	.user-tag-icon>li:nth-child(2){
		background: url(../assets/login/icon-corp.png) no-repeat;
		background-size: 17px 14px;
		background-position: 0 50%;
	}
	.user-tag-border>li {
		float: left;
		border: 1px solid #ACA0A0;
		border-radius: 8px;
		width: 40px;
		height: 22px;
		line-height: 22px;
		color: #ACA0A0;
		text-align: center;
		font-size: 12px;
		margin-right: 16px;
		cursor: pointer;
	}

	.edit-pencle {
		margin-top: 4px;
		cursor: pointer;
		float: left;
		width: 16px;
		height: 16px;
		background: url(../assets/userCenter/user-info.png) no-repeat;
		background-size: 100% 100%;
	}

	.edit-pencle:hover {
		background: url(../assets/userCenter/user-info-active.png) no-repeat;
		background-size: 100% 100%;
	}

	.user-logout {
		cursor: pointer;
		position: absolute;
		right: 20px;
		top: 39px;
		font-size: 16px;
		padding-left: 30px;
		color: #ACA0A0;
		background: url(../assets/userCenter/user-logout.png) no-repeat;
		background-size: 20px 20px;
		background-position: 0 0;
	}

	.user-logout:hover {
		background: url(../assets/userCenter/user-logout-hover.png) no-repeat;
		background-size: 20px 20px;
		background-position: 0 0;
	}

	.user-nav {
		height: 80px;
		margin: 0 auto;
		margin-top: 20px;
		width: 1200px;
		background-color: #fff;
		/*overflow: hidden;*/
		border-bottom: 4px solid #eaeaea;
		padding: 0px 170px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-around;
	}

	.user-nav>div>div:nth-child(1) {
		font-size: 24px;
		color: #555555;
		line-height: 33px;
	}

	.user-nav>div {
		text-align: center;
		font-size: 18px;
		color: #3D3D3D;
		position: relative;
		line-height: 25px;
		padding-top: 5px;
		cursor: pointer;
	}

	.user-nav>div .nav-border {
		position: absolute;
		bottom: -4px;
		width: 100%;
		height: 4px;
		background-color: #E83929;
	}

	.content {
		width: 1200px;
		margin: 0 auto;
		background: #fff;
		box-sizing: border-box;
		padding: 20px 30px;
	}
</style>
