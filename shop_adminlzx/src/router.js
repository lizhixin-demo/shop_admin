import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login/login'
import Home from './views/home/index'
import Welcome from './components/Welcome'
import  users  from './views/users'



Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "/Login"
    },
    {
      path: '/Login',
      component: Login
    }, 
    {
      path: '/home',
      component: Home,
      redirect:'/Welcome',
      children:[
                  {
                    path:'/Welcome',
                    component: Welcome
                  },
                  {
                    path:'/users',
                    component: users
                  }
                ]
    }, 

  ]
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // form 代表 从哪个路径跳转而来
  // next 是一个函数 ， 表示放行
  // next 放行  next("./login") 强制跳转

  if (to.path === "/login") return next();
  const tokenStr = window.sessionStorage.getItem('token')
  // console.log(tokenStr);
  if (!tokenStr) return next('/login');
  next();
});

export default router
