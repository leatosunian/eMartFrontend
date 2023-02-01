import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import LoginPanel from '../views/LoginPanel.vue'
import CreateAdmin from '../views/CreateAdmin.vue'
import EmployeesList from '../views/EmployeesList.vue'
import EditEmployee from '../views/EditEmployee.vue'
import CreateProduct from '../views/products/CreateProduct.vue'
import ProductList from '../views/products/ProductList.vue'
import EditProduct from '../views/products/EditProduct.vue'
import AddGallery from '../views/products/AddGallery.vue'
import Categories from '../views/categories/Categories.vue'
import OrdersList from '../views/orders/OrdersList.vue'
import PendingOrders from '../views/orders/PendingOrders.vue'
import OrderDetail from '../views/orders/OrderDetail.vue'
import AdminProfile from '../views/profile/AdminProfile.vue'
import ShippingSettings from '../views/ShippingSettings.vue'
import Home from '../views/Home.vue'
import jwtDecode from 'jwt-decode'

Vue.use(VueRouter)

const routes = [
  // EMPLOYEES (DEPRECATED) //
  {
    path: '/',
    name: 'login',
    component: LoginPanel,
    meta: { requiresAuth: false }
  },
  {
    path: '/employees/createadmin',
    name: 'create-admin',
    component: CreateAdmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeesList,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/:id',
    name: 'edit-employee',
    component: EditEmployee,
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },

  // PRODUCT ROUTES //
  {
    path: '/products/create',
    name: 'create-product',
    component: CreateProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id?',
    name: 'products',
    component: ProductList,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/edit/:id',
    name: 'editproduct',
    component: EditProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/gallery/:id',
    name: 'galleryproduct',
    component: AddGallery,
    meta: { requiresAuth: true }
  },

  // CATEGORIES ROUTES //
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: { requiresAuth: true }
  },
 
  // ORDERS ROUTES //
  {
    path: '/orders',
    name: 'orders',
    component: OrdersList,
    meta: { requiresAuth: true }
  },
  {
    path: '/orders/pending',
    name: 'pendingorders',
    component: PendingOrders,
    meta: { requiresAuth: true }
  },
  {
    path: '/order/:id',
    name: 'order',
    component: OrderDetail,
    meta: { requiresAuth: true }
  },

  // Shipping Settings //
  {
    path: '/shipping',
    name: 'shippingconfig',
    component: ShippingSettings,
    meta: { requiresAuth: true }
  },

  // PROFILE SETTINGS //
  {
    path: '/profile',
    name: 'profileconfig',
    component: AdminProfile,
    meta: { requiresAuth: true }
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(item => item.meta.requiresAuth)){
    if(!store.state.token){
      next({name: 'login'})
    } 

    try {
      const token = jwtDecode(store.state.token)
      if(!token.id){
        next({name: 'login'})
      } else{
        next()
      }

      } catch (error) {
        next({name: 'login'}) 
      }

  } else {
    next()
  }
})

export default router
