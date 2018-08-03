<template>
	<div class="siginin-wrap user-info-wrap" style="padding: 45px 0;">
		<div class="content-box">
			<div class="login-title">
				<div class="border-title">填写资料</div>
			</div>
			<el-form class="signin-wrap">
				<div class="login-form">
					<input type="text" v-model="user.name" class="form-input form-icon icon-name" placeholder="姓名" />
					<input type="text" v-model="user.address" class="form-input form-icon icon-pwd" placeholder="公司地址" />
					<input type="text" v-model="user.department" class="form-input form-icon icon-depart" placeholder="部门" />
					<select v-model="user.industry" name="" id="" class="form-input">
						<option value="">角色</option>
						<option value="基金">基金</option>
						<option value="上市公司">上市公司</option>
						<option value="券商">券商</option>
						<option value="私营业主">私营业主</option>
						<option value="个人投资者">个人投资者</option>
						<option value="其他">其他</option>

					</select>
					<select v-model="scale" name="" id="" class="form-input">
						<option value="0,0">投资规模</option>
						<option value="100,0">100万以下</option>
						<option value="100,1000">100 ~ 1000万</option>
						<option value="1000,1500">1000 ~ 15000万</option>
						<option value="5000,2">5000 ~ 2亿</option>
						<option value="0,2">2亿以上</option>
					</select>
					<div class="form-input form-icon icon-add">
						<div class="name-card">
							<img :src="imgbaseurl + user.namecard" v-if="user.namecard" width="50" height="50">
                        	<span>{{ user.namecard || "上传名片" }}</span>
						</div>
						<el-upload :on-success="uploadFile" :show-file-list="false" class="file-upload" action="http://test.vestleader.com:2222/vestLeader/file/uploadFile">
							<el-button class="file-upload-btn" size="small" type="primary">点击上传</el-button>
						</el-upload>
					</div>
				</div>
				<div class="login-form" style="margin-left: 60px;">
					<input type="text" v-model="user.companyName" class="form-input form-icon icon-corp" placeholder="公司名称" />
					<input type="text" v-model="user.province" class="form-input form-icon icon-province" placeholder="公司所在省份" />
					<input type="text" v-model="user.tele" class="form-input form-icon icon-tele" placeholder="公司电话" />
					<input type="text" v-model="user.position" class="form-input form-icon icon-position" placeholder="职位" />
					<select v-model="user.investment" name="" id="" class="form-input">
						<option value="">投资偏好</option>
						<option value="参股投资">参股投资</option>
						<option value="控股投资">控股投资</option>
						<option value="财务投资">财务投资</option>
					</select>
				</div>
				<div class="edit-radios">
					<div>关注领域:</div>
					<ul class="radio-list">
						<template v-for="(item,index) in arealist">
							<li :class="addareas.indexOf(item.name) > -1 ? 'active' : (addareas.length == 3 ? 'disable' : '')" @click="add(item.name)" :key="index" :value="index" class="select-radio">{{item.name}}</li>
						</template>
					</ul>
				</div>
				<div style="text-align: center;">
					<el-button class="btn" @click="submit">完成</el-button>
				</div>
			</el-form>

		</div>
	</div>
</template>

<script>
	import { fillInUserInfo, findUserByMobileno, findUserInfoAndUserCompanyByUserId, parentlist } from "../plugins/userApi"
	export default {
		data() {
			return {
				arealist: [],
				user: {
					name: "",
					address: "",
					companyName: "",
					department: "",
					province: "",
					tele: "",
					position: "",
					investment: "",
					industry: "",
					maxinumscale: "",
					mininumscale: "",
					focuson: "",
					namecard:""
				},
				scale: "0,0",
				addareas: []
			}
		},
		created() {
			this.getUserData()
		},
		methods: {
			add(item) {
				let index = this.addareas.indexOf(item)
				if(index > -1) {
					this.addareas.splice(index, 1)
				} else {
					if(this.addareas.length < 3) {
						this.addareas.push(item)
					}
				}

			},
			async getUserData() {
				let areas = await parentlist();
				this.arealist = areas.data
				let data = this.user;
				let res = await findUserInfoAndUserCompanyByUserId();
				if(res.code == 0) {
					let focus = res.data.focuson ? res.data.focuson.split(",") : [];
					let max = res.data.maxinumscale || 0;
					let min = res.data.mininumscale || 0;
					this.addareas = focus;
					this.scale = [min, max].join(",");

					this.user = Object.assign(data, res.data);
				}
			},
			async submit() {
				let params = this.user;
				let focus = this.addareas.join(",")
				let money = this.scale.split(",")
				params.focuson = focus;
				params.mininumscale = money[0]
				params.maxinumscale = money[1]
				//console.log(JSON.stringify(params))
				let res = await fillInUserInfo(params);
				//console.log(res);
				if(res.code == 0) {
					this.$message.success("修改资料成功!");
					this.$router.push("/userCenter")
				} else {
					this.$message.error(res.msg);
				}
			},
			uploadFile(res) {
				if(res.code == 0){
					this.user.namecard = res.data.url
				} else {
					this.$message.error(res.msg)
					this.user.namecard = ""
				}
			}
		}
	}
</script>

<style scoped>
	@import url("../assets/css/form.css")
</style>