<template>
	<div class="question">
		<div class="question-box" v-for="(item,index) in dataList" :key="index" :index="index">
			<div class="question-header">
				<div class="question-title">{{ item.question | showQuestion}}</div>
				<div class="question-time" v-if="item.status != 0">{{item.modifiedat | formatDate}}</div>
			</div>
			<div v-if="item.status == 0" class="question-wait question-content">
				头豹的专家正在积极为您解答中
			</div>
			<div class="question-content" v-else>
				<div class="question-date">{{item.createdat | formatDate}}</div>
				<div class="question-left">
					<img src="../../assets/userCenter/head-default.png" />
				</div>
				<div class="question-right">
					<div class="question-name">{{item.answerauthorname}}</div>
					<div class="question-text">{{item.answer}}</div>
				</div>
			</div>
		</div>
		<div v-if="dataList.length == 0" style="text-align: center;">暂无数据...</div>
		<page @page="handlePage" :page-size="page.pageSize" :page-total="page.pageTotal"></page>
	</div>
</template>

<script>
	import { findUserQuestionList } from "../../plugins/userApi";
	import { publishTime } from "../../plugins/utils"
	import page from "./page"
	export default {
		data() {
			return {
				dataList: [],
				page: {
					pageIndex: 1,
					pageSize: 15,
					pageTotal: 0
				}
			}
		},
		components: {
			page
		},
		filters: {
			formatDate(val) {
				let str = publishTime(val)
				return str
			},
			showQuestion(val) {
				let data = JSON.parse(val)
				return data.question
			}
		},
		created() {
			//			console.log("我的提问")
			this.init()
		},
		methods: {
			handlePage(val) {
				this.page.pageIndex = val;
				this.init()
			},
			async init() {
				let res = await findUserQuestionList({
					pageNum: this.page.pageIndex
				})
				if(res.code == 0) {
					let data = res.data
					this.dataList = data.resultList;
					this.page.pageTotal = data.total
				} else {
					this.dataList = [];
					this.page.pageTotal = 0
				}
			}
		}
	}
</script>

<style scoped>
	.question-box {
		padding-bottom: 20px;
		border-bottom: 1px solid #F2F2F2;
		margin-bottom: 20px;
	}
	
	.question-header {
		overflow: hidden;
		height: 25px;
		line-height: 25px;
	}
	
	.question-title {
		float: left;
		font-size: 18px;
		color: #3D3D3D;
	}
	
	.question-time {
		width: 100px;
		text-align: right;
		float: right;
		font-size: 16px;
		color: #3D3D3D;
	}
	
	.question-content {
		margin-top: 15px;
		width: 660px;
		height: 125px;
		box-sizing: border-box;
		background: #F5F5F5;
		border-radius: 10px;
		position: relative;
		padding: 30px 25px 20px 20px;
	}
	
	.question-content:after {
		content: "";
		position: absolute;
		left: 20px;
		top: -7px;
		border-bottom: 7px solid #F5F5F5;
		border-left: 3.5px solid transparent;
		border-right: 3.5px solid transparent;
	}
	
	.question-date {
		position: absolute;
		right: 20px;
		top: 15px;
		font-size: 15px;
		color: #999999;
	}
	
	.question-left {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 12px;
		float: left;
	}
	
	.question-left>img {
		width: 100%;
		height: 100%;
	}
	
	.question-name {
		height: 25px;
		font-size: 18px;
		color: #555555;
	}
	
	.question-right {
		width: 531px;
		float: left;
	}
	
	.question-text {
		font-size: 14px;
		color: #333333;
		margin-top: 5px;
		line-height: 22px;
		height: 47px;
		overflow: hidden;
	}
	.question-wait{
		
	}
</style>