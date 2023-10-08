// 封装所有和用户相关的接口函数
import request from '@/utils/http';

export const getRankAPI = (lane) => {
  return request({
    url:
      '/g78_op_stat_hero_rank_new_v2/free_convey' +
      '?hero_type=' +
      lane +
      '&limit=300' +
      '&mode=ban_3',
    method: 'GET',
  });
};
