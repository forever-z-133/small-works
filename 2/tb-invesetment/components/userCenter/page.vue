<template>
	<div class="page-wrap">
		<div class="page" :class="pageIndex == item ? 'active' : ''" v-for="(item,index) in total" @click="clickPage(item)" :key="index" :index="index">{{item}}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageIndex: 1
			}
		},
		props: {
			pageSize: {
				type: Number,
				required: true,
			},
			pageTotal: {
				type: Number,
				required: true
			}
		},
		computed: {
			total() {
				let total = this.pageTotal > 150 ? 150 : this.pageTotal;
				let size = this.pageSize;
				let pageTotal = (total / size) + (total % size == 0 ? 0 : 1);
				return parseInt(pageTotal)
			}
		},
		methods: {
			clickPage(index) {
				this.pageIndex = index;
				this.$emit("currentPage", index)
			}
		}
	}
</script>

<style scoped>
	.page-wrap {
		display: flex;
		justify-content: center;
		padding-top: 30px;
		margin: 20px 0;
	}
	
	.page-wrap .page {
		width: 30px;
		height: 30px;
		line-height: 30px;
		border: 1px solid #E8E8E8;
		color: #E8E8E8;
		border-radius: 4px;
		text-align: center;
		cursor: pointer;
		margin-right: 10px;
	}
	.page-wrap .page:nth-last-child(1){
		margin: 0;
	}
	.page-wrap .page.active {
		color: #E83929;
		border-color: #E83929;
	}
</style>