import $axios from "./axios.js";
import Vue from "../node_modules/vue";
let config = {
	baseURL: 'http://test.vestleader.com:2222/vestLeader/',
	headers: {
		"Content-Type": "application/json"
	},
	params: {},
	data: {},
	timeout: 10000,
}

const $http = (url, method, data, header) => {
	config.url = url;
	config.method = method;
	let params = data || {}
	if(method == "get") {
		config.params = params
	} else {
		config.data = JSON.stringify(params)
	}

	return new Promise((resolve, reject) => {
		$axios(config).then(res => {
            // console.log(url, res);
			if(!res.status == 200) return new Error('请求失败');
            if(res.data.code != 0) return reject(res.data);
            resolve(res.data.data);
		}).catch(err => {
            // console.log('接口出错', err);
            reject(err);
        })
	})
}

//获取文章祥情
export const getArticleDetail = id => $http(`cmsArticle/${id}`, "get")
// 添加收藏
export const addFavorite = articleid => $http(`/userFavorite/add`, 'post', { articleid })
export const deleteFavorite = articleid => $http(`/userFavorite/update`, 'put', { articleid, valid: false })
export const getFavoriteNumber = articleid => $http(`/userFavorite/getCount/${articleid}`, 'get')
export const getFavoriteState = articleid => $http(`/userFavorite/getFavorite/${articleid}`, 'post')
//用户阅读记录埋点 
export const addReadLog = data => $http(`/userLogRead/update`, "post", data)

// 添加留言
export const addComment = (articleId, content) =>  $http(`/UserLeavewords/add`, "post", { articleId, content })
// 获取留言列表
export const getCommentList = (id, pageNum) =>  $http(`/UserLeavewords/list/${id}/${pageNum}`, "get")

// 添加问答
export const addQuestion = data => $http(`/userQuestion/addUserQuestion`, 'post', data)

//获取报告目录
export const getReportDetail = (id) => $http(`/report/findReport/${id}`, "get")
// 用 token 验证是否需要登录（UP|DOWN）
export const getReportImageList = (id) => $http(`/report/getIllsList/${id}`, "get")
// export const getNextReportImage = (id, direction) => $http(`/report/getNextIlls/${id}/${direction}`, "get")
// 用 token 验证是否需要登录
export const findUser = (id) => $http(`/user/findUser`, "get")

//获取报告图标、图说
export const getReportImage = (id) => $http(`/report/findIlls/${id}`, "get")

//获取一级行业对象
export const getIndustyList = () => $http(`/sysIndusty/query/parentlist`, "get")
//添加找标的/找投资
export const addInvestment = (data) => $http(`/userAd/addUserAd`, "post", data)
export const addFinancing = (data) => $http(`/userAd/addUserAd`, "post", data)

// 文件上传
export const ajaxUpload = (file) => $axios({ url: `/file/uploadFile`, method: "post", data: file, headers: { 'Content-Type': 'multipart/form-data' }})