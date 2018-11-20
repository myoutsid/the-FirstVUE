/**
 * 核心管理对象
 */
//导入异步请求的qpi
import {
  reqAddress,
  reqShops,
  reqFoodCategorys
} from '../api'
import {
  RECEIVE_SHOPS,
  RECEIVE_CATEGORYS,
  RECEIVE_ADDRESS
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

  async getShops({commit,state}){

    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)

    if(result.icon === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,[shops])
    }


  }



}
