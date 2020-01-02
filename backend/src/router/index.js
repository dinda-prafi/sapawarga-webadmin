import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import dashboardRouter from './modules/dashboard'
import userRouter from './modules/user'
import newsRouter from './modules/news'
import videoRouter from './modules/video'
import bannerRouter from './modules/banner'
import surveyRouter from './modules/survey'
import pollingRouter from './modules/polling'
import newsHoaxRouter from './modules/newsHoax'
import broadcastRouter from './modules/broadcast'
import aspirationRouter from './modules/aspiration'
import categoriesRouter from './modules/categories'
import nomorPentingRouter from './modules/nomorPenting'
import notificationRouter from './modules/notification'
import newsChannelsRouter from './modules/newsChannels'
import newsImportantRouter from './modules/newsImportant'
import popupInformasiRouter from './modules/popupInformasi'
import questionsAnswerRouter from './modules/questionsAnswer'
import releaseManagementRouter from './modules/releaseManagement'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    title: 'reset-password',
    path: '/reset-password',
    component: () => import('@/views/resetPassword/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    title: 'verifikasi-user',
    path: '/confirm',
    component: () => import('@/views/verifikasiUser/index'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/errorPage/403'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  // rute dashboard ini di matikan sementara, karena dashboard belum siap.
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: {
  //         title: 'dashboard',
  //         icon: 'home',
  //         noCache: true,
  //         affix: true,
  //         roles: ['admin', 'staffProv']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        name: 'Profile',
        path: '',
        component: () => import('@/views/profile/index'),
        hidden: true,
        meta: {
          title: 'profile',
          roles: ['admin', 'staffProv', 'staffSaberhoax', 'staffKabkota', 'staffKec', 'staffKel']
        }
      }
    ]
  },
  {
    path: '/edit-profile',
    component: Layout,
    children: [
      {
        name: 'profile-edit',
        path: '',
        component: () => import('@/views/profile/edit'),
        hidden: true,
        meta: {
          title: 'profile',
          roles: ['admin', 'staffProv', 'staffSaberhoax', 'staffKabkota', 'staffKec', 'staffKel']
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  dashboardRouter,
  userRouter,
  nomorPentingRouter,
  broadcastRouter,
  questionsAnswerRouter,
  notificationRouter,
  aspirationRouter,
  pollingRouter,
  surveyRouter,
  newsRouter,
  newsHoaxRouter,
  newsChannelsRouter,
  videoRouter,
  categoriesRouter,
  releaseManagementRouter,
  bannerRouter,
  popupInformasiRouter,
  newsImportantRouter,
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.path && r.path)

  if (nearestWithTitle !== undefined) {
    const taged = nearestWithTitle.path.split('/')
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

    // Turn the meta tag definitions into actual elements in the head.
    if ((taged[1] === 'reset-password') || (taged[1] === 'confirm')) {
      // If a route with a title was found, set the document (page) title to that value.
      if (nearestWithTitle) document.title = taged[1]
    } else {
      document.title = 'sapawarga-administrator'
    }
  }
  next()
})

export default router
