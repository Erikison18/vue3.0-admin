import request from '@/utils/request'

enum API {
  TRADREMARK_URL = '/admin/product/baseTrademark/',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, any>(API.TRADREMARK_URL + `${page}/${limit}`)
