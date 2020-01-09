import Layout from '@/layout'

const newsRouter = {
  name: 'news',
  path: '/news',
  component: Layout,
  redirect: '/news/index',
  meta: {
    title: 'news-manage',
    roles: ['admin', 'staffProv', 'staffKabkota', 'pimpinan'],
    icon: 'news'
  },
  active: false,
  children: [
    {
      name: 'news-list',
      path: 'index',
      component: () => import('@/views/news/list'),
      meta: {
        title: 'news-list',
        roles: ['admin', 'staffProv', 'staffKabkota', 'pimpinan']
      }
    },
    {
      name: 'news-create',
      path: 'create',
      component: () => import('@/views/news/create'),
      meta: {
        title: 'news-create',
        roles: ['admin', 'staffProv', 'staffKabkota']
      }
    },
    {
      name: 'news-edit',
      path: 'edit/:id',
      component: () => import('@/views/news/edit'),
      hidden: true,
      meta: {
        title: 'news-edit',
        roles: ['admin', 'staffProv', 'staffKabkota']
      }
    },
    {
      name: 'news-detail',
      path: 'detail/:id',
      component: () => import('@/views/news/detail'),
      hidden: true,
      meta: {
        title: 'news-detail',
        roles: ['admin', 'staffProv', 'staffKabkota']
      }
    },
    {
      name: 'news-priority',
      path: 'priority',
      component: () => import('@/views/news/listPriority'),
      hidden: true,
      meta: {
        title: 'news-priority',
        roles: ['admin', 'staffProv', 'staffKabkota']
      }
    }
  ]
}

export default newsRouter
