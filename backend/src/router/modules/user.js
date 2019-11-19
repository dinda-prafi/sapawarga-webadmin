/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user/user-all',
  name: 'User',
  meta: {
    title: 'user-manage',
    icon: 'user',
    roles: ['admin', 'staffProv', 'staffKabkota', 'staffKec', 'staffKel']
  },
  children: [
    {
      name: 'user-list',
      path: 'user-all',
      component: () => import('@/views/user/list'),
      props: {
        pages: 'all'
      },
      meta: {
        title: 'Semua Pengguna'
      }
    },
    {
      name: 'user-list-saberhoax',
      path: 'user-saberhoax',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'staffSaberhoax'
      },
      meta: {
        title: 'user-list-saberhoax',
        roles: ['admin']
      }
    },
    {
      name: 'user-list-provinsi',
      path: 'user-provinsi',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'staffProv'
      },
      meta: {
        title: 'user-list-provinsi',
        roles: ['admin']
      }
    },
    {
      name: 'user-list-kabkota',
      path: 'user-kabkota',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'staffKabkota'
      },
      meta: {
        title: 'user-list-kabkota',
        roles: ['admin', 'staffProv']
      }
    },
    {
      name: 'user-list-kecamatan',
      path: 'user-kecamatan',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'staffKec'
      },
      meta: {
        title: 'user-list-kecamatan',
        roles: ['admin', 'staffProv', 'staffKabkota']
      }
    },
    {
      name: 'user-list-kelurahan',
      path: 'user-kelurahan',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'staffKel'
      },
      meta: {
        title: 'user-list-kelurahan',
        roles: ['admin', 'staffProv', 'staffKabkota', 'staffKec']
      }
    },
    {
      name: 'user-list-rw',
      path: 'user-rw',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'staffRW'
      },
      meta: {
        title: 'user-list-rw',
        roles: ['admin', 'staffProv', 'staffKabkota', 'staffKec']
      }
    },
    {
      name: 'user-list-trainer',
      path: 'user-trainer',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'trainer'
      },
      meta: {
        title: 'user-list-trainer',
        roles: ['admin', 'staffProv']
      }
    },
    {
      name: 'user-list-user',
      path: 'user-publik',
      component: () => import('@/views/user/list'),
      props: {
        roleId: 'user'
      },
      meta: {
        title: 'user-list-user',
        roles: ['admin', 'staffProv']
      }
    },
    {
      name: 'user-edit',
      path: 'edit/:id',
      component: () => import('@/views/user/edit'),
      hidden: true,
      meta: {
        title: 'Edit'
      }
    },
    {
      name: 'user-create',
      path: 'create',
      component: () => import('@/views/user/add'),
      hidden: true,
      meta: {
        title: 'user-create'
      }
    },
    {
      name: 'user-detail',
      path: 'detail/:id',
      component: () => import('@/views/user/detail'),
      hidden: true,
      meta: {
        title: 'user-create'
      }
    }
  ]
}

export default userRouter
