<template>
    <nav class="navbar navbar-vertical fixed-start navbar-expand-md navbar-dark sidebarColor" id="sidebar">
      <div class="container-fluid">
    
         <!-- User (xs) -->
        <div class="navbar-user d-md-none">
    
          <!-- Dropdown -->
          <div class="dropdown">
    
            <!-- Toggle -->
            <a href="#" id="sidebarIcon" class="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div class=" avatar-online" style="width: 30px; height: 30px;display: flex;justify-content: center;align-items: center;border:1px solid #a7a7a7;border-radius:50%;color: rgba(255, 255, 255, 0.589);">
                <i class="fe fe-user" style="color:#a7a7a7!important; "></i>
                <!-- <img src="@/assets/default-profile.png" class="avatar-img rounded-circle" alt="..." style="z-index:999999; width: 40px;height: 40px;"> -->
              </div>
            </a>
    
            <!-- Menu -->
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarIcon">
              <router-link :to="'/profile/'+userId" class="dropdown-item">Mi perfil</router-link>
              <a href="" v-on:click="logOut()" class="dropdown-item">Cerrar sesión</a>
            </div>
    
          </div>
    
        </div>
    
        <!-- Brand -->
        <router-link class="navbar-brand" :to="'/home'">
          <img src="@/assets/emart0000.png" class="mx-auto navbar-brand-img logoIMG" alt="...">
        </router-link>
        <!-- Toggler -->
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->

        <div class="hamburguer" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation"   >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
    
        <!-- Collapse -->
        <div class="collapse navbar-collapse" id="sidebarCollapse">
          <!-- Form -->
          <form class="mt-4 mb-3 d-md-none">
            <div class="input-group input-group-rounded input-group-merge input-group-reverse">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search">
              <div class="input-group-text">
                <span class="fe fe-search"></span>
              </div>
            </div>
          </form>

          <hr class="my-3 navbar-divider">
          <h6 class="navbar-heading">
            Mi inventario
          </h6>

          <ul class="navbar-nav">

            <li class="nav-item">
              <router-link to="/home" class="nav-link " active-class="active" >
                <i class="fe fe-home"></i> Inicio
              </router-link>

            </li>

            <li class="nav-item">
              <a class="nav-link collapsed" href="#sidebarDashboard2" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboard2">
                <i class="fe fe-shopping-cart"></i> Productos
              </a>
              <div class="collapse" id="sidebarDashboard2">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <router-link to="/products/create" class="nav-link ">
                      Nuevo producto
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/products" class="nav-link ">
                      Todos mis productos
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link collapsed" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
                <i class="fe fe-shopping-bag"></i> Pedidos
              </a>
              <div class="collapse" id="sidebarDashboards">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <router-link to="/orders/pending" class="nav-link ">
                      Pendientes
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/orders" class="nav-link ">
                      Historial
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>


            <li class="nav-item">
              <a class="nav-link collapsed" href="#sidebarDashboards3" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards3">
                <i class="fe fe-settings "></i> Configuración
              </a>
              <div class="collapse" id="sidebarDashboards3">
                <ul class="nav nav-sm flex-column">
                  <li class="nav-item">
                    <router-link to="/categories" class="nav-link " active-class="active" >
                      <i class="fe fe-tag"></i> Categorías
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/shipping" class="nav-link " active-class="active" >
                      <i class="fe fe-truck"></i> Costos de envío
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>


            
          </ul>

  
            <div class="navProfileSett" style="" >
              <div class="navbar-user ">
                <div class="dropdown">
                  <!-- Toggle -->
                  <a href="#" id="sidebarIcon" class="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class=" avatar-online" style="width: 30px; height: 30px;display: flex;justify-content: center;align-items: center;border:1px solid #c9c9c9;border-radius:50%;color: rgba(255, 255, 255, 0.589);">
                      <i class="fe fe-user" style="color:#c9c9c9!important; "></i>
                      <!-- <img src="@/assets/default-profile.png" class="avatar-img rounded-circle" alt="..." style="z-index:999999; width: 40px;height: 40px;"> -->
                    </div>
                  </a>
          
                  <!-- Menu -->
                  <div class="dropdown-menu dropdown-menu-end-lg" aria-labelledby="sidebarIcon">
                    <router-link :to="'/profile/'+userId" class="dropdown-item">Mi perfil</router-link>
                    <a href="" v-on:click="logOut()" class="dropdown-item">Cerrar sesión</a>
                  </div>
          
                </div>
          
              </div>
              <router-link :to="'/profile/'+userId"  style="color:white; font-size:15px;">{{userData.stName}} | {{userData.companyName.substr(0,10)}}</router-link>
            </div>


        </div> <!-- / .navbar-collapse -->
    
      </div>
    </nav>
</template>

<style>
.navbar-collapse:before {
  border: none;
}

.navbar {
  padding: 1.2rem 1.2rem !important;
}

.dropdown-menu-end[data-bs-popper] {
  left: 0 !important;
  right: 0 !important;
  margin-top: 10px;
  border: 1px solid rgba(0, 0, 0, 0.18);
}

.dropdown-menu-end-lg[data-bs-popper] {
  left: 0 !important;
  right: 0 !important;
  margin-top: 0px;
  border: 1px solid rgba(0, 0, 0, 0.18);
  top: -100px;
}

.navbar-dark .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='%236E84A3' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.sidebarColor{
  background: linear-gradient(340.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%);
}
.navbar-dark .navbar-divider {
  background-color: rgba(255, 255, 255, 0.185);
}

.navbar-dark .navbar-heading {
  color: rgba(255, 255, 255, 0.589);
}

.navbar-dark .navbar-nav .nav-link {
  color: #c9c9c9;
}

.avatar-offline:before, .avatar-online:before {
  border-radius: 50%;
  bottom: 5%;
  content: "";
  height: 24%;
  position: absolute;
  right: 1%;
  width: 24%;
}

.logoIMG {
  width: 135px;
}
.navProfileSett {
  display:flex; 
  align-items:center; 
  gap:15px; 
  bottom:30px; 
  left:0px; 
  position:absolute; 
  justify-content:center;
  width: fit-content !important;
  padding: 0 10px;
  height: 44px;

  
}

@media (max-width: 768px){
  .logoIMG {
    width: 100px;
  }
  
  .navProfileSett {
    display: none;
  }
}

@media (min-width: 768px){
  .navbar-vertical.navbar-expand-md .navbar-user {
    border:none;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding: 0;
  }

  .navbar-vertical.navbar-expand-md .navbar-collapse {
    width: 245px !important;
    align-items: stretch !important;
    display: flex;
    flex: 1;
    flex-direction: column !important;

    padding-left: 1.8rem !important;
    padding-right: 1rem !important;
}
}


</style>


<script>
import axios from 'axios'
export default {
  name: 'Sidebar',
  data(){
    return{
      userId: '',
      userData: {}
    }
  },
  beforeMount(){
    this.userId = localStorage.getItem('user_id')
    this.getUser()
  },
  methods: {
    getUser(){
      axios.get(this.$url+'/employees/'+this.userId,{
          headers:{
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.$token}`
          }
      }).then((result)=>{
        this.userData = result.data;
        this.userData.stName = this.userData.userName.split(' ')[0]
      });
    },
    logOut(){
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      return window.location.refresh()
    }
  }
}
</script>




