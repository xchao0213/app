import request from '../utils/request';

export function getPage(id) {
  return request({
    url: `/page/${id}`,
    methods: 'get'
  })
}

export function getPlaces() {
  return request({
    url: '/places',
    methods: 'get'
  })
}