const popupInformasiRouter = [
  {
    name: 'notification-user',
    path: '/popup-informasi/index',
    component: () => import('@/views/popupInformasi/list'),
    meta: {
      title: 'popup-informasi-manage',
      roles: ['admin', 'staffProv']
    }
  },
  {
    name: 'popup-informasi-create',
    path: '/popup-informasi/create',
    component: () => import('@/views/popupInformasi/create'),
    hidden: true,
    meta: {
      title: 'popup-informasi-create',
      roles: ['admin', 'staffProv']
    }
  },
  {
    path: '/popup-informasi/edit/:id',
    component: () => import('@/views/popupInformasi/edit'),
    name: 'popup-informasi-edit',
    hidden: true,
    meta: {
      title: 'popup-informasi-edit',
      noCache: true,
      roles: ['admin', 'staffProv']
    }
  },
  {
    name: 'popup-informasi-detail',
    path: '/popup-informasi/detail/:id',
    component: () => import('@/views/popupInformasi/detail'),
    hidden: true,
    meta: {
      title: 'popup-informasi-detail',
      roles: ['admin', 'staffProv']
    }
  }
]

export default popupInformasiRouter
