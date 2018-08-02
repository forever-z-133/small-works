import axios from "axios";
import Qs from "qs";
let config = {
	baseURL: 'http://test.vestleader.com:2222/vestLeader/',
	headers: {},
	paramsSerializer: function(params) {
		return Qs.stringify(params, {
			arrayFormat: 'brackets'
		})
	},
	timeout: 10000,
}

const $http = (url, method, data, sigin) => {
	config.url = url;
	config.method = method;
	let params = data || {}
	if(method == "get") {
		config.params = params
	} else {
		config.headers["Content-Type"] = "application/json"
		config.data = JSON.stringify(params)
	}
	if(sigin) {
		var token, userinfo = localStorage.getItem("userinfo");

		try { // 刷新后 getTokenId 取得还是登录前的旧 token，所以从登录后的 userinfo.token 中取
			userinfo = JSON.parse(userinfo);
			token = userinfo.token
		} catch(err) {
			token = localStorage.getItem("token");
		}
		//		console.log(token)
		config.headers.Authorization = token
	}
	return new Promise((resolve, reject) => {
		axios(config).then(res => {
			if(res.status == 200) {
				resolve(res.data)
			}
			if(res.status == 500) {
				alert(res.message)
			}
		})
	})
}
export const baseUrl = "http://test.vestleader.com:2222/vestLeader"

export const getUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

//修改密码
export const updatePassword = data => $http("user/updatePassword", "post", data)

//获取用户信息
export const findUserByMobileno = data => $http("user/findUserByMobileno", "get", data)

//获取验证码图片
export const getKaptchaImage = () => $http("user/getKaptchaImage", "get")

//验证图形验证码
export const imgvrifyControllerDefaultKaptchas = data => $http("/user/imgvrifyControllerDefaultKaptchas", "get", data)

//用户登录
export const login = data => $http("user/login", "get", data)

//用户注册
export const register = data => $http("user/register", "post", data)

//获取验证码
export const getVerificationCode = data => $http("user/getVerificationCode", "get", data)

//验证码验证
export const updatePasswordValidate = data => $http("user/updatePasswordValidate", "get", data)

//修改用户信息
export const fillInUserInfo = data => $http("userInfo/fillInUserInfo", "put", data)

//获取用户详细资料信息和用户公司信息
export const findUserInfoAndUserCompanyByUserId = data => $http("userInfo/findUserInfoAndUserCompanyByUserId", "get", data)

//用户收藏记录
export const findUserFavorite = page => $http("userFavorite/findUserFavorite", "get", page, true)

//用户留言记录
export const findUserLeavewords = page => $http("UserLeavewords/findUserLeavewords", "get", page, true)

//用户历史浏览记
export const findUserLogReadList = page => $http("userLogRead/findUserLogReadList", "get", page, true)

//查询用户问答列表
export const findUserQuestionList = page => $http("userQuestion/findUserQuestionList", "get", page, true)

//发布
export const findUserAdList = page => $http("userAd/findUserAdList", "post", page, true)

//查找找融资、找标的对象
export const applyClose = data => $http("/userAd/applyClose", "post", data, true)

export const parentlist = () => $http("/sysIndusty/query/parentlist", "get", {}, true)
