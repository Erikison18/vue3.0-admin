import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type {
  loginForm,
  loginResponseData,
  userResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
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
        this.username = result.data.name as string
        this.avatar = result.data.avatar as string
        return result
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
