import request from '../utils/request';

export default {
  getIP(data: Record<string, any>) {
    return request({
      url: 'https://apis.map.qq.com/ws/location/v1/ip',
      method: 'get',
      params: data,
    });
  },
};
