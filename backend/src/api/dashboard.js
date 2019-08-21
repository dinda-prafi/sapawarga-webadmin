import request from '@/utils/request'

export function fetchAspirasiMostLikes(query) {
  return request({
    url: '/dashboards/aspirasi-most-likes',
    method: 'get',
    params: query
  })
}

export function fetchAspirasiCounts(query) {
  return request({
    url: 'dashboards/aspirasi-counts',
    method: 'get',
    params: query
  })
}

