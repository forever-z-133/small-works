<template>
	<div>
		<el-table v-if="dataList.length > 0" :data="dataList | formateData" class="release-table" header-row-class-name="release-header" cell-class-name="release-cell" row-class-name="release-row">
			<el-table-column prop="ad_type" label="类型" align="center">
				<template slot-scope="scope">
					{{scope.row.content.adType == 0 ? '融资' : '标的'}}
				</template>
			</el-table-column>
			<el-table-column prop="created_at" label="提交时间" align="center" :formatter="formateDate"></el-table-column>
			<el-table-column prop="content" label="公司名称" align="center">
				<template slot-scope="scope">
					{{scope.row.content.companyName}}
				</template>
			</el-table-column>
			<el-table-column prop="content" label="需求" align="center">
				<template slot-scope="scope">
					<div class="text-wrap">
						{{scope.row.content || scope.row.content | contentText(getTurn, getcorp, getmdoe, gettype)}}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="view" label="查看" align="center">
				<template slot-scope="scope">
					<div @click="viewDetail(scope.row)" class="view-detail">查看</div>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="操作" align="center">
				<template slot-scope="scope">
					<div @click="hadleAd(scope.row)" class="close-btn" :class="scope.row.status == 2 ? '' :'disable'">{{scope.row.status | btnText}}</div>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="dataList.length == 0" style="text-align: center;">暂无数据...</div>
		<page @current-page="handlePage" :page-size="page.pageSize" :page-total="0"></page>
		<el-dialog :title="content.adType == 0 ? '找融资' : '找标的'" :visible.sync="contentDialog" width="980px" :close-on-click-modal="true">
			<rongzi :data="content" v-if="content.adType == 0"></rongzi>
			<biaodi :data="content" v-if="content.adType == 1"></biaodi>
		</el-dialog>
		<el-dialog :visible.sync="dialog" width="600px" :close-on-click-modal="true">
			<div class="dialog-content">
				<div class="close-reason">关闭理由:</div>
				<ul class="radio-list">
					<template v-for="(item,index) in reasonList">
						<li :class="reasonIndex == index ? 'active' : ''" @click="add(index)" :key="index" :value="index" class="select-radio">{{item}}</li>
					</template>
				</ul>
			</div>
			<div class="close-btn dialog-btn" @click="closeSubmit">申请关闭</div>
		</el-dialog>
	</div>
</template>

<script>
	import { findUserAdList, applyClose } from "../../plugins/userApi";
	import { publishTime } from "../../plugins/utils";
	import rongzi from "../FinancingInput.vue";
	import biaodi from "../InvestmentInput.vue";
	import page from "./page";
	export default {
		data() {
			return {
				contentDialog: false,
				dialog: false,
				content: "",
				dataList: [],
				page: {
					pageIndex: 1,
					pageSize: 15,
					pageTotal: 0
				},
				reasonList: ["我已借助头豹找到【融资/标的】", "我已通过其他渠道找到【融资/标的】", "该【融资/标的】项目已放弃或因其他原因中止"],
				reasonIndex: 0,
				row: {}
			}
		},
		components: {
			page,
			rongzi,
			biaodi
		},
		filters: {
			contentText(val, fn,getcorp,getmdoe,gettype) {
				//console.log(val);
				if(val.adType == 0) {
					let turn = val.turn ? fn(val.turn) : "";
					let amount = val.amount > 0 ? `${val.amount}万元` : ""
					let purpose = val.purpose
					return `${turn}+${amount}+${purpose}`
				} else if(val.adType == 1) {
					let corptype = val.acquirerType ? getcorp(val.acquirerType) : '';
					let mode = val.acquisitionMode ? getmdoe(val.acquisitionMode) : '';
					let type = val.acquisitionType ? gettype(val.acquisitionType) : '';
					let req = val.requirements;
					return `${corptype}+${mode}+${type}+${req} `
				} else {
					return ""
				}

			},
			formateData(data) {
				data.forEach(obj => {
					let content = obj.content
					if(typeof content == "string") {
						let a = JSON.parse(obj.content)
						if(a.paramsMap) {
							a = JSON.parse(a.paramsMap)
						}
						obj.content = a
					}
				})
				return data
			},
			btnText(val) {
				val = parseInt(val)
				switch(val) {
					case 0:
						return "待审核"
						break;
					case 1:
						return "已审核待发布"
						break;
					case 2:
						return "申请关闭" //已经发布
						break;
					case 3:
						return "申请关闭中"
						break;
					case 4:
						return "已关闭"
						break;
					case -1:
						return "审核未通过"
						break;
					default:
						return "--"
						break;
				}
			}
		},
		created() {
			this.init()
		},
		methods: {
			getcorp(val){
				val = parseInt(val)
				switch(val) {
					case 1:
						return "上市公司"
						break;
					case 2:
						return "非上市公司"
						break;
					case 3:
						return "私募基金"
						break;
					case 4:
						return "个人投资者"
						break;
					case 5:
						return "其他"
						break;
					default:
						break;
				}
			}, 
			getmdoe(val){
				val = parseInt(val)
				switch(val) {
					case 1:
						return "参股收购"
						break;
					case 2:
						return "控股收购"
						break;
					default:
						break;
				}
			}, 
			gettype(val){
				val = parseInt(val)
				switch(val) {
					case 1:
						return "战略投资"
						break;
					case 2:
						return "财务投资"
						break;
					case 3:
						return "同业并购"
						break;
					case 4:
						return "产业链并购"
						break;
					case 5:
						return "其他"
						break;
					default:
						break;
				}
			},
			getTurn(val) {
				val = parseInt(val)
				switch(val) {
					case 1:
						return "天使轮"
						break;
					case 2:
						return "PreA轮融资"
						break;
					case 3:
						return "A轮融资"
						break;
					case 4:
						return "B轮融资"
						break;
					case 5:
						return "C轮融资"
						break;
					case 6:
						return "D轮融资"
						break;
					case 7:
						return "E轮融资"
						break;
					case 8:
						return "PreIPO"
						break;
					case 9:
						return "其他"
						break;
					default:
						break;
				}
			},
			async init() {
				let res = await findUserAdList({
					pageNum: this.page.pageIndex
				})
				if(res.code == 0) {
					this.dataList = res.data.resultList
					this.page.pageTotal = res.data.total
				}
			},
			async closeSubmit() {
				let params = {
					id: this.row.id,
					closingReason: this.reasonList[this.reasonIndex]
				};
				let res = await applyClose(params);
				if(res.code == 0) {
					this.dialog = false;
					this.init();
					this.row = {}
				} else {
					this.$message.error(res.msg)
				}
			},
			add(index) {
				this.reasonIndex = index;
			},
			viewDetail(row) {
				this.content = row.content
				this.contentDialog = true;
			},
			handlePage(val) {
				this.page.pageIndex = val;
				this.init()
			},
			hadleAd(row) {
				if(row.status == 2) {
					this.row = row
					this.dialog = true;
				}
			},
			formateDate(row, column, cellValue, index) {
				return publishTime(cellValue)
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
	
	.close-reason {
		font-size: 20px;
		color: #000000;
		padding-left: 60px;
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
	
	.dialog-btn.close-btn {
		width: 386px;
		height: 58px;
		line-height: 58px;
		margin-top: 63px;
		color: #fff;
		background: #E83929;
		font-size: 16px;
		color: #FFFFFF;
	}
	
	.close-btn.disable {
		color: #999;
		border-color: #999;
		cursor: no-drop;
	}
	
	.radio-list {
		padding-left: 60px;
		margin-top: 40px;
	}
	
	.select-radio {
		font-size: 16px;
		padding-left: 30px;
		margin-right: 20px;
		margin-bottom: 10px;
		cursor: pointer;
		background: url(../../assets/userCenter/radio.png) no-repeat;
		background-position: 5px 50%;
		margin-top: 20px;
	}
	
	.select-radio.active {
		background: url(../../assets/userCenter/radio-active.png) no-repeat;
		background-position: 5px 50%;
		color: #E83929;
	}
	
	.text-wrap {
		text-align: left;
		max-height: 115px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}
</style>