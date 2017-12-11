import Vue from 'vue'
import Router from 'vue-router'
 /*---------1级-----------*/
import index from '@/components/index/index';
import cart from '@/components/cart/cart';
import checkout from '@/components/cart/checkout';
import paySucess from '@/components/cart/paySucess';
import center from '@/components/center/center';
import test from '@/components/center/test';
import logistics from '@/components/center/logistics';
import myEdite from '@/components/center/myEdite';
import login from '@/components/center/login';
import total from '@/components/center/order_total';
import address from '@/components/center/address';
import wcomment from '@/components/center/order_wcomment';
import favourite from '@/components/center/favourite';
import wreceived from '@/components/center/order_wreceived';
import addressEdite from '@/components/center/addressEdite';
import orderSucess from '@/components/center/orderSucess';
import about from '@/components/center/about';
import wpay from '@/components/center/order_wpay';
import wsend from '@/components/center/order_wsend';
import order from '@/components/center/order';
import mySell from '@/components/center/mySell';
import classfiy from '@/components/classfiy/classfiy';
import home from '@/components/home'
import list from  '@/components/good/list';
import detail from '@/components/detail/detail';
import comment from '@/components/detail/comment';
import fbcomment from '@/components/detail/fbcomment';
import detailed from '@/components/detail/detailed';
import goodDetail from '@/components/detail/goodDetail';
import search from '@/components/search/search';
import searchList from '@/components/search/searchList';
import  shoplist  from '@/components/shop/shoplist';
import  shophome  from '@/components/shop/shophome';
import  shopInfo  from '@/components/shop/shopInfo';
import myShop  from '@/components/center/myShop';
import footmark  from '@/components/center/footmark';
import hot from '@/components/share/hotList';
import sucess from '@/components/share/sucess';
import detailbridge from '@/components/detail/detailbridge';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
   
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/mySell',
      name: 'mySell',
      component: mySell
    },
    {
      path: '/paySucess',
      name: 'paySucess',
      component: paySucess
    },
     {
      path: '/login',
      name: 'login',
      component: login
    },
     {
      path: '/sucess',
      name: 'sucess',
      component: sucess
     },
     {
      path: '/center',
      name: 'center',
      component: center
     },
     {
      path: '/test',
      name: 'test',
      component: test
     },
      {
      path: '/cart',
      name: 'cart',
      component: cart
     },
     {
      path: '/checkout',
      name: 'checkout',
      component: checkout
     },
     {
      path: '/logistics',
      name: 'logistics',
      component: logistics
     },
      {
      path: '/about',
      name: 'about',
      component: about
     },
      {
      path: '/footmark',
      name: 'footmark',
      component: footmark
     },
     {
      path: '/myEdite',
      name: 'myEdite',
      component: myEdite
     },
      {
      path: '/order',
      name: 'order',
      component: order,
       children:[
      {
        path:'/order/total',
        name:'total',
        component:total
      },
      {
        path:'/order/wpay',
        name:'wpay',
        component:wpay
      },
       {
        path:'/order/wsend',
        name:'wsend',
        component:wsend
      },
      {
        path:'/order/wreceived',
        name:'wreceived',
        component:wreceived
      },
      {
        path:'/order/wcomment',
        name:'wcomment',
        component:wcomment
      }
      ]
     },
     {
      path: '/orderSucess',
      name: 'orderSucess',
      component: orderSucess
     },
     {
      path: '/address',
      name: 'address',
      component: address
     },
     {
      path: '/favourite',
      name: 'favourite',
      component: favourite
     },

     {
      path: '/addressEdite',
      name: 'addressEdite',
      component: addressEdite
     },
     {
      path: '/classfiy',
      name: 'classfiy',
      component: classfiy
     },
     {
      path: '/list',
      name: 'list',
      component: list
     },
     {
      path: '/search',
      name: 'search',
      component: search
     },
      {
      path: '/searchList',
      name: 'searchList',
      component: searchList
     },
      {
      path: '/shophome',
      name: 'shophome',
      component: shophome
     },
       {
      path: '/shopInfo',
      name: 'shopInfo',
      component: shopInfo
    },
      {
      path: '/myShop',
      name: 'myShop',
      component: myShop
    },
     {
        path:'/fbcomment',
        name:'fbcomment',
        component:fbcomment
      },
      {
        path:'/detailbridge',
        name:'detailbridge',
        component:detailbridge
      },
      {
      path: '/detail',
      name: 'detail',
      component: detail,
      children:[
      {
        path:'/detail/goodDetail',
        name:'goodDetail',
        component:goodDetail
      },
       {
        path:'/detail/detailed',
        name:'detailed',
        component:detailed
      },
      {
        path:'/detail/comment',
        name:'comment',
        component:comment
      }
      ]
     },
      {
      path: '/test',
      name: 'test',
      component: test
     }
  
  ]
})
