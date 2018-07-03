import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import manage from '../pages/manage'
import upload from '../pages/upload'
import home from '../pages/home'
import voice from '../pages/voice'
import integral from '../pages/integral'
import work from '../pages/work'
import acthome from '../pages/acthome'
import room from '../pages/room'
import gallery from '../pages/gallery'
import testgallery from '../pages/testgallery'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/manage',
      name: 'manage',
      component: manage
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/voice',
      name: 'voice',
      component: voice
    },
    {
      path: '/integral',
      name: 'integral',
      component: integral
    },
    {
      path: '/work',
      name: 'work',
      component: work
    },
    {
      path: '/acthome',
      name: 'acthome',
      component: acthome
    },
    {
      path: '/room',
      name: 'room',
      component: room
    },
	  {
      path: '/newroom',
      name: 'room',
      component: room
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: gallery
    },
    {
      path: '/testgallery',
      name: 'testgallery',
      component: testgallery
    }
  ]
})
