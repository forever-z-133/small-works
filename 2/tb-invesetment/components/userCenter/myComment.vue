<template>
	<div class="collect">
		<div class="collect-box" v-for="(item,index) in pagelist" :key="index" :index="index" @click="articleDetail(item.articleId)">
			<div class="collect-img">
				<img :src="imgbaseurl + item.images" alt="" />
			</div>
			<div class="collect-center">
				<div class="collect-title">{{item.title}}</div>
				<div class="collect-text">
					<div class="collect-tag" v-if="item.labels">{{item.labels}}</div>
					<div class="collect-auther">沙利文Sullivan</div>
				</div>

			</div>
			<div class="collect-time">
				{{item.releaseDate | formatDate}}
			</div>
		</div>
		<div v-if="pagelist.length == 0">暂无数据...</div>
		<page @current-page="handlePage" :page-size="page.pageSize" :page-total="page.pageTotal"></page>
	</div>
</template>

<script>
	import { findUserLeavewords } from "../../plugins/userApi"
	import utils from "../../plugins/utils"
	import page from "./page"
	export default {
		data() {
			return {
				pagelist: [],
				page: {
					pageIndex: 1,
					pageSize: 15,
					pageTotal: 100
				}
			}
		},
		created() {
			console.log("阅读历史")
			this.init()
		},
		filters:{
			formatDate(val){
				let str = utils.publishTime(val)
				return str
			}
		},
		components: {
			page
		},
		methods: {
			handlePage(val) {
				this.page.pageIndex = val;
				this.init()
			},
			async init(){
				let res = await findUserLeavewords({pageNum:this.page.pageIndex})
				if(res.code == 0){
					let data = res.data
					this.pagelist = data.resultList;
					this.page.pageTotal = data.total
				} else {
					this.pagelist = [];
					this.page.pageTotal = 0
				}
			},
			articleDetail(id) {
				const {
					href
				} = this.$router.resolve({
					name: "articleDetail",
					query: {
						id: id
					}
				});
				window.open(href, "_blank");
			}
		}
	}
</script>

<style scoped>
	.collect-box {
		overflow: hidden;
		width: 100%;
		height: 85px;
		cursor: pointer;
		padding-bottom: 20px;
		border-bottom: 1px solid #F2F2F2;
		margin-bottom: 20px;
	}
	
	.collect-box>div {
		float: left;
	}
	
	.collect-img {
		width: 146px;
		height: 85px;
		overflow: hidden;
		margin-right: 12px;
	}
	
	.collect-img>img {
		width: 100%;
		height: 100%;
	}
	
	.collect-center {
		max-width: 800px;
	}
	
	.collect-center>.collect-title {
		height: 65px;
		font-size: 16px;
		color: #3D3D3D;
	}
	
	.collect-text {
		overflow: hidden;
	}
	
	.collect-text>div {
		float: left;
	}
	
	.collect-tag {
		width: 32px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border: 1px solid #F12525;
		border-radius: 8px;
		font-size: 10px;
		color: #E83929;
		margin-right: 10px;
	}
	
	.collect-auther {
		line-height: 18px;
		font-size: 12px;
		color: #999999;
	}
	
	.collect-box .collect-time {
		float: right;
		width: 100px;
		text-align: right;
		font-size: 16px;
		color: #3D3D3D;
	}
</style>