import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
// 外部人员
import index from '@/components/outman/index'
import home from '@/components/outman/home'
import baifang from '@/components/outman/baifang'
import songhuo from '@/components/outman/songhuo'
import person from '@/components/outman/person'
import yewuOk from '@/components/outman/yewuOk'
import checkorder from '@/components/outman/checkorder'
import songhuomessage from '@/components/outman/songhuoMessage'
import uploadimg from '@/components/outman/uploadImg'
import error from '@/components/outman/error'
import yewumessage from '@/components/outman/yewumessage'
import songhuoloser from '@/components/outman/songhuoloser'
import songhuocheck from '@/components/outman/songhuocheck'
import songhuocheckOk from '@/components/outman/songhuocheckOk'
import songhuoSuccess from '@/components/outman/songhuoSuccess'
import zhuce from '@/components/outman/zhuce'
import zhuceok from '@/components/outman/zhuceok'
import zhucefail from '@/components/outman/zhucefail'
import songhuook from "@/components/outman/songhuook"
// 采购
import caigouindex from '@/components/caigou/index'
import caigouhome from '@/components/caigou/home'
import caigouorder from '@/components/caigou/order'
import caigoucheck from '@/components/caigou/check'
import caigoubaobiao from '@/components/caigou/baobiao'
import heimingdan from '@/components/caigou/heimingdan'
import addorder from '@/components/caigou/addorder'
import ordermessage from '@/components/caigou/ordermessage'
import yuyuenumber from '@/components/caigou/yuyuenumber'
import changshang from '@/components/caigou/changshang'
import addchangshang from '@/components/caigou/addchangshang'
import editchangshang from '@/components/caigou/editchangshang'
import daoruchangshang from '@/components/caigou/daoruchangshang'
import daorumessage from '@/components/caigou/daorumessage'
import checkresult from '@/components/caigou/checkresult'
import baobiaomessage from '@/components/caigou/baobiaomessage'
import huike from '@/components/caigou/huike'
import huikemessage from '@/components/caigou/huikemessage'
// 仓管 品质 物控
import other from '@/components/other/index'
import othercheck from '@/components/other/check'
import gocheck from '@/components/other/gocheck'
import otherhome from '@/components/other/home'
// 管理员
import admin from '@/components/admin/index'
import zhucecheck from '@/components/admin/zhuceCheck'
import zhucecheckin from '@/components/admin/zhuceCheckin'
import adminperson from '@/components/admin/person'
import personmessage from '@/components/admin/personmessage'
import goodsaddress from '@/components/admin/goodsaddress'
import adminhome from '@/components/admin/home'
// 门卫
import menwei from '@/components/menwei/home'
import yewu from '@/components/menwei/yewu'
import huowu from '@/components/menwei/huowu'

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    {path:'/',component:login},
    // 外部人员
    {
      path: '/outman',
      component: index,
      redirect:'/outman/home',
      children:[
        {path:'home',component:home},
        {path:'baifang', component:baifang},
        {path:'songhuo', component:songhuo},
        {path:'person', component:person},
      ]
    },
    {path:'/outman/checkorder',component:checkorder},
    {path:'/outman/songhuomessage',component:songhuomessage},
    {path:'/outman/uploadimg',component:uploadimg},
    {path:'/outman/error',component:error},
    {path:'/outman/yewumessage',component:yewumessage},
    {path:'/outman/songhuoloser',component:songhuoloser},
    {path:'/outman/songhuocheck',component:songhuocheck},
    {path:'/outman/songhuocheckOk',component:songhuocheckOk},
    {path:'/outman/songhuoSuccess',component:songhuoSuccess},
    {path:'/zhuce',component:zhuce},
    {path:'/outman/yewuok',component:yewuOk},
    {path:'/zhuceok',component:zhuceok},
    {path:'/zhucefail',component:zhucefail},
    {path:'/outman/songhuook',component:songhuook},
    // 采购
    {
      path:'/caigou',
      component:caigouindex,
      redirect:'/caigou/home',
      children:[
        {path:'home',component:caigouhome},
        {path:'order',component:caigouorder},
        {path:'check',component:caigoucheck},
        {path:'baobiao',component:caigoubaobiao},
        {path:'heimingdan',component:heimingdan},
      ]
    },
    {path:'/huike',component:huike},
    {path:'/huikemessage',component:huikemessage},
    {path:'/caigou/addorder',component:addorder},
    {path:'/caigou/ordermessage',component:ordermessage},
    {path:'/caigou/yuyuenumber',component:yuyuenumber},
    {path:'/caigou/changshang',component:changshang},
    {path:'/caigou/addchangshang',component:addchangshang},
    {path:'/caigou/editchangshang',component:editchangshang},
    {path:'/caigou/daoruchangshang',component:daoruchangshang},
    {path:'/caigou/daorumessage',component:daorumessage},
    {path:'/caigou/checkresult',component:checkresult},
    {path:'/caigou/baobiaomessage',component:baobiaomessage},
    // 仓管 品质 物控
    {path:'/other',
      component:other,
      redirect:'/other/home',
      children:[
        {path:'home',component:otherhome},
        {path:'audit',component:othercheck},
        {path:'check',component:caigoucheck},
        {path:'baobiao',component:caigoubaobiao},
        {path:'heimingdan',component:heimingdan}
      ]
    },
    {path:'/other/gocheck',component:gocheck},
    // 管理员
    {path:'/admin',
      component:admin,
      redirect:'/admin/home',
      children:[
        {path:'home',component:adminhome},
        {path:'zhucecheck',component:zhucecheck},
        {path:'person',component:adminperson},
        {path:'goodsaddress',component:goodsaddress},
        {path:'heimingdan',component:heimingdan}
      ]
    },
    {path:'/admin/zhucecheckin',component:zhucecheckin},
    {path:'/admin/personmessage',component:personmessage},
    // 门卫
    {path:'/menwei',component:menwei},
    {path:'/yewu',component:yewu},
    {path:'/huowu',component:huowu}
  ]
})
// 在守卫中对token进行监听，有token就让执行，否则跳转到登录页去
// router.beforeEach((to, from, next) => {
//   // 请求"login"就直接通过
//   if (to.path === '/') {
//     return next()
//   }
//   // 请求"非login"，就判断token
//   var token = window.sessionStorage.getItem('token')
//   if (!token) {
//     return next('/')
//   }

//   next() // 请继续你的旅行
// })
export default router
