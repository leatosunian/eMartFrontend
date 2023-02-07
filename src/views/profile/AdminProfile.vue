<template>
    <div>
      <template>
        <div class="vld-parent" style="z-index: 999999 !important;">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page=true :transition="fade" :opacity=0.61 />
        </div>
      </template>
      <Sidebar/>
      <div class="main-content contentPadding">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-lg-10 col-xl-8">
  
              <!-- Header -->
              <div class="header mt-md-5" v-if="isData">
                <div class="header-body">
                  <div class="row align-items-center">
                    <div class="col">
  
                      <!-- Pretitle -->
                      <h6 class="header-pretitle">
                        Mis Empleados
                      </h6>
  
                      <!-- Title -->
                      <h1 class="header-title">
                        Editar Empleado
                      </h1>
  
                    </div>
                  </div> <!-- / .row -->
                  <div class="row align-items-center">
                    <div class="col">
  
                      <!-- Nav -->
                      <ul class="nav nav-tabs nav-overflow header-tabs">
                        <li class="nav-item">
                          <router-link to="/employees" class="nav-link" >Todos los empleados</router-link>
                        </li>
                        <li class="nav-item">
                          
                          <router-link to="/employees" class="nav-link" >Nuevo empleado</router-link>
                          
                        </li>
                        
                      </ul>
  
                    </div>
                  </div>
                </div>
              </div>
  
        
              <template v-if="isData">
                <div>
                  
                  <div class="row">
                    <div class="col-12 col-md-6">

                      <!-- First name -->
                      <div class="form-group">

                        <!-- Label -->
                        <label class="form-label">
                          Nombre
                        </label>

                        <!-- Input -->
                        <input type="text" class="form-control" placeholder="Nombre del empleado" v-model="employee.name">

                      </div>
                      <div class="form-group">

                        <!-- Label -->
                        <label class="form-label">
                          Contraseña
                        </label>

                        <!-- Input -->
                        <input type="password" class="form-control" placeholder="Contraseña del empleado" v-model="employee.password">

                      </div>

                    </div>
                    
                    
                    <div class="col-12 col-md-6">

                      <!-- Birthday -->
                      <div class="form-group">

                        <!-- Label -->
                        <label class="form-label">
                          Tipo de usuario
                        </label>

                        <!-- Input -->
                        <select name="" class="form-select" id="" v-model="employee.userType">
                            <option value="" disabled selected >Seleccionar</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Vendedor">Vendedor</option>  
                        </select>
                      </div>

                    </div>

                  </div> 
                  <hr class="my-5">
                  <button type="button" class="btn btn-primary" v-on:click="validate()">
                    Guardar cambios
                  </button>

                </div>
              </template>
              
              <template v-if="!isData">
                <div>
                  <Error/>
                </div>
              </template>
  
              
  
              <br><br>
  
            </div>
          </div> <!-- / .row -->
        </div>
  
      </div>
    </div>
  </template>
  
<script>
  import Sidebar from '@/components/Sidebar.vue'
  import Topbar from '@/components/Topbar.vue';
  import axios from 'axios'
  import Error from '@/components/Error.vue'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  
  export default {
    name: 'AdminProfile',
    data() {
      return {
        employee: {
          userType: ''
        },
        id: this.$route.params.id,
        isData: true,
        isLoading: true
      }
    },

    mounted(){
      window.scrollTo(0, 0)
    },
  
    methods: {
      init_data(){
        axios.get(`${this.$url}/employees/${this.id}`, {
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${this.$token}`
          }
        }).then((response) => {
          if(response){
            const {data} = response
            this.isData = true
            this.employee = data
            this.isLoading = false
          } 
          
  
        }).catch( error => {
          this.isData = false
          console.log(error)
        })
      },
      
      validate(){
        if(!this.employee.name || !this.employee.userType || !this.employee.password){
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: 'Completar todos los campos',
            type: 'error'
          });
        } 
  
        this.editEmployee()
        
      },
  
      editEmployee(){
        
        axios.post(`${this.$url}/confirmedit/${this.id}`, this.employee, {
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${this.$token}`
          }
        }).then((response) => {
          const {data} = response
          console.log(data)
          this.$notify({
            group: 'foo',
            title: '',
            text: 'Perfil actualizado correctamente!',
            type: 'success'
          });
  
        }).catch( error => {
          console.log(error.response.data.msg)
          this.msm_error = error.response.data.msg
          this.$notify({
            group: 'foo',
            title: 'Error',
            text: error.response.data.msg,
            type: 'error'
          });
        })
  
        setTimeout(() => {
          this.$router.push({name: 'employees'})
        }, 3000); 
      }
    },

    beforeMount(){
      this.init_data()
    },

    components: {
      Sidebar,
      Loading,
      Error
    },
    
  }
  </script>
  