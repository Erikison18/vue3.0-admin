import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'

//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      buttons: [],
    }
  },

  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data)
      // console.log(result, 'result')
      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return result
      } else {
        return Promise.reject(new Error(result.data))
      }
    },

    async userInfo() {
      const result: userResponseData = await reqUserInfo()
      // console.log(result, 'result')
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          result.data.routes,
        )
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    async userLogout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        this.token = null
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return result
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },

  getters: {},
})

export default useUserStore
