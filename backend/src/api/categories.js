import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/categories',
    method: 'get',
    params: query
  })
}

export function fetchRecord(id) {
  return request({
    url: `/categories/${id}`,
    method: 'get'
  })
}

export function hoaxTypes() {
  return request({
    url: `http://52.74.74.33:3000/v1/hoax-types`,
    method: 'get'
  })
}

export function fetchTypes() {
  return request({
    url: `/categories/types`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/categories',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/categories/${id}`,
    method: 'put',
    data
  })
}

export function deleteData(id) {
  return request({
    url: `/categories/${id}`,
    method: 'delete'
  })
}

const exportFunctions = {
  fetchList,
  hoaxTypes,
  fetchRecord,
  fetchTypes,
  create,
  update,
  deleteData
}

export default exportFunctions
