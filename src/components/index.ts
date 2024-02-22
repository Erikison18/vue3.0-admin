import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import Pagination from './Pagination/index.vue'
const allGlobalComponent: any = { SvgIcon, Category, Pagination }

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      app.component(key, allGlobalComponent[key])
    })
  },
}
