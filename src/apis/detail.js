import request1 from '@/utils/http1';
export const getDetailAPI = (heroId) => {
  const url =
    '/act/lbp/common/guides/champDetail/champDetail_' +
    heroId +
    '.js?ts=2818991';
  //console.log('url', url);
  return request1({
    url: url,
    method: 'GET',
  });
};

export const getPosAPI = () => {
  const url = '/act/lbp/common/guides/guideschampion_position.js?ts=2818991';
  //console.log('url', url);
  return request1({
    url: url,
    method: 'GET',
  });
};
