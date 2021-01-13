import request from '../utils/request';

export function getJsConfig(params) {
  return request({
    url: '/getConfig',
    methods: 'get',
    params
  })
}