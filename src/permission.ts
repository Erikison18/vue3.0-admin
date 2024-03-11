import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
import useUserStore from '@/store/modules/user'
import pinia from '@/store'
import setting from './setting'
const userStore = useUserStore(pinia)

router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  // console.log(to, from, 8888)
  nprogress.start()
  const token = userStore.token
  const username = userStore.username

  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          //刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
          next({ ...to })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  // next()
})

router.afterEach((to: any, from: any, next: any) => {
  nprogress.done()
  // console.log(to, from, 99)
})
