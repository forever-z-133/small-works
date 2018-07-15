<template>
	<div>
		<el-table :data="dataList" class="release-table" header-row-class-name="release-header" cell-class-name="release-cell" row-class-name="release-row">
			<el-table-column prop="ad_type" label="类型" align="center">
				<template slot-scope="scope">
					{{scope.row.ad_type == 0 ? '融资' : '标的'}}
				</template>
			</el-table-column>
			<el-table-column prop="created_at" label="提交时间" align="center" :formatter="formateDate"></el-table-column>
			<el-table-column prop="content" label="公司名称" align="center" :formatter="corpName"></el-table-column>
			<el-table-column prop="content" label="需求" align="center" :formatter="requirements"></el-table-column>
			<el-table-column prop="view" label="查看" align="center">
				<template slot-scope="scope">
					<div @click="viewDetail(scope.row)" class="view-detail">查看</div>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="操作" align="center">
				<template slot-scope="scope">
					<div class="close-btn" @click="hadleAd(scope.row.status)" :class="scope.row.status == 4 ? 'disable' :''">{{scope.row.status | btnText}}</div>
				</template>
			</el-table-column>
		</el-table>
		<page @current-page="handlePage" :page-size="page.pageSize" :page-total="page.pageTotal"></page>
		<el-dialog :visible.sync="dialog" width="500" :close-on-click-modal="true">
			<div class="dialog-content">
				{{content}}
			</div>
			<div class="close-btn" @click="closeSubmit">申请关闭</div>
		</el-dialog>
	</div>
</template>

<script>
	import { findUserAdList } from "../../plugins/userApi"
	import utils from "../../plugins/utils"
	import page from "./page"
	export default {
		data() {
			return {
				dialog: false,
				content: "",
				dataList: [],
				page: {
					pageIndex: 1,
					pageSize: 15,
					pageTotal: 100
				}
			}
		},
		components: {
			page
		},
		filters: {
			btnText(val) {
				switch(val) {
					case 0:
						return "待审核"
						break;
					case 1:
						return "已审核待发布"
						break;
					case 2:
						return "已经发布"
						break;
					case 3:
						return "申请关闭"
						break;
					case 4:
						return "已关闭"
						break;
					case -1:
						return "审核未通过"
						break;
					default:
						return ""
						break;
				}
			}
		},
		created() {
			this.init()
		},
		methods: {
			async init() {
				let res = await findUserAdList({
					pageNum: this.page.pageIndex
				})
				if(res.code == 0) {
					this.dataList = res.data.resultList
				}
			},
			closeSubmit() {

			},
			viewDetail(row) {
				this.dialog = true;
				console.log(row)
			},
			handlePage(val) {
				this.page.pageIndex = val;
				this.init()
			},
			hadleAd(status) {
				if(status == 3) {
					
				}
			},
			formateDate(row, column, cellValue, index) {
				return utils.publishTime(cellValue)
			},
			corpName(row, column, cellValue, index) {
				let data = JSON.parse(cellValue)
				if(data.paramsMap) {
					data = JSON.parse(data.paramsMap)
				}
				return data.companyName || ''
			},
			requirements(row, column, cellValue, index) {
				let data = JSON.parse(cellValue)
				if(data.paramsMap) {
					data = JSON.parse(data.paramsMap)
				}
				//console.log(data)
				return data.requirements || ''
			},
			formateBtn(row, column, cellValue, index) {
				switch(cellValue) {
					case 0:
						return "待审核"
						break;
					case 1:
						return "已审核待发布"
						break;
					case 2:
						return "已经发布"
						break;
					case 3:
						return "申请关闭"
						break;
					case 4:
						return "已关闭"
						break;
					case -1:
						return "审核未通过"
						break;
					default:
						return ""
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.release-table {
		width: 100%;
	}
	
	.view-detail {
		cursor: pointer;
		font-size: 14px;
		color: #E83929;
	}
	
	.release-header {
		font-size: 16px;
		color: #999999;
	}
	
	.release-row {
		font-size: 14px;
		color: #3D3D3D;
	}
	
	.release-cell {
		line-height: 80px;
	}
	
	.close-btn {
		width: 98px;
		height: 36px;
		text-align: center;
		line-height: 36px;
		box-sizing: border-box;
		border: 1px solid #E83929;
		border-radius: 4px;
		cursor: pointer;
		color: #E83929;
		margin: 0 auto;
	}
	
	.close-btn.disable {
		color: #999;
		border-color: #999;
		cursor: no-drop;
	}
</style>