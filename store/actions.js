/**
 * 核心管理对象
 */
//导入异步请求的qpi
import {
  reqAddress,
  reqShops,
  reqFoodCategorys,
  reqUserInfo
} from '../api'
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS,
  RECEIVE_USER
} from './mutation-types'

export default {

  async getAddress({commit,state}){
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    if(result.code===0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }

  },

  async getFoodCategorys({commit}){
    //发送异步请求
    const result = await reqFoodCategorys()
    if(result.code === 0){
      const foodCategorys = result.data
      commit (RECEIVE_CATEGORYS,{categorys: foodCategorys})
    }

  },
  //获取商家列表的异步请请求
  async getShops({commit,state}){

    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)

    if(result.icon === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,[shops])
    }


  },

  //保存用户信息
  saveUser ({commit},user){
    commit(RECEIVE_USER,{user})
  },
  //获取当前用户的信息的异步action
  async getUserInfo({commit}){
    const result = await reqUserInfo()

    if(result.code ===0){
      commit(RECEIVE_USER,{user})
    }
  },

//  退出登陆的action
  async logout({commit}){
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)

    }
  },
    // 异步获取商家信息
    async getShopInfo({commit}){
      const result = await reqShopInfo()
      if(result.code===0) {
        const info = result.data
        info.score = 3.5
        commit(RECEIVE_INFO, {info})
      }
    },

// 异步获取商家评价列表
    async getShopRatings({commit}) {
      const result = await reqShopRatings()
      if(result.code===0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, {ratings})
      }
    },

// 异步获取商家商品列表
    async getShopGoods({commit}) {
      const result = await reqShopGoods()
      if(result.code===0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
      }
    },


}
