/*
包含n个接口请求函数的模块
函数的返回值是promise对象
 */
import ajax from './ajax'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (longitude, latitude) => ajax(`/position/${latitude},${longitude}`)

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodCategorys = () => ajax('/index_category')

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = ({longitude, latitude}) => ajax('/shops', {latitude, longitude})
// 发送手机验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})
// 手机号验证码登陆
export const reqSmsLogin = (phone,code) => ajax(BASE + '/login_sms', {phone,code},'post')

// 用户密码登陆
export const reqPwdLogin = (name,pwd,captcha) => ajax(BASE + '/login_pwd', {name,pwd,captcha},'post')

//获取当前用户信息
export const reqUserInfo = () => ajax(BASE + '/userinfo')

//退出登陆
export const reqLogout = () => ajax(BASE + '/logout')

export const reqShopInfo = () => ajax('/info')
export const reqShopGoods = () => ajax('/goods')
export const reqShopRatings = () => ajax('/ratings')

