import Layout from '@/layout'

const aspirationLeaderMenuRouter = {
  name: 'Aspiration',
  path: '/aspirasi',
  component: Layout,
  redirect: '/aspirasi/index',
  meta: {
    title: 'aspiration-manage',
    roles: ['admin', 'staffProv', 'staffKabkota', 'staffKec', 'staffKel', 'pimpinan'],
    icon: 'aspiration'
  },
  active: false,
  children: [
    {
      name: 'aspiration-list',
      path: 'index',
      component: () => import('@/views/aspiration/list'),
      meta: {
        title: 'aspiration-list',
        roles: ['admin', 'staffProv', 'staffKabkota', 'staffKec', 'staffKel', 'pimpinan']
      }
    },
    {
      name: 'aspiration-detail',
      path: 'detail/:id',
      component: () => import('@/views/aspiration/detail'),
      hidden: true,
      meta: {
        title: 'aspiration-detail',
        roles: ['admin', 'staffProv', 'staffKabkota', 'staffKec', 'staffKel']
      }
    }
  ]
}

export default aspirationLeaderMenuRouter
