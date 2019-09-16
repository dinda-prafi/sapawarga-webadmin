import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/polling',
    method: 'get',
    params: query
  })
}

export function fetchRecord(id) {
  return request({
    url: `/polling/${id}`,
    method: 'get'
  })
}

export function fetchResult(id) {
  return request({
    url: `/polling/${id}/result`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/polling',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/polling/${id}`,
    method: 'put',
    data
  })
}

