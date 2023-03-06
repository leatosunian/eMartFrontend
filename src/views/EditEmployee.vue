<template>
    <div>
      <template>
        <div class="vld-parent" style="z-index: 999999 !important;">
            <loading :active.sync="isLoading" :can-cancel="false" :is-full-page=true :opacity=0.61 />
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
                        Mi perfil
                      </h6>
  
                      <!-- Title -->
                      <h1 class="header-title">
                        Mis datos
                      </h1>
  
                    </div>
                  </div> <!-- / .row -->

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
                          Nombre de usuario
                        </label>

                        <!-- Input -->
                        <input type="text" class="form-control" placeholder="NIngresa un nombre de usuario" v-model="employee.userName">

                      </div>
                      <div class="form-group">

                        <!-- Label -->
                        <label class="form-label">
                          Contraseña
                        </label>

                        <!-- Input -->
                        <input type="password" class="form-control" placeholder="Ingresa una contraseña" v-model="employee.password">

                      </div>

                    </div>
                    
                    
                    <div class="col-12 col-md-6">

                      <div class="form-group">

                        <!-- Label -->
                        <label class="form-label">
                          Nombre de mi tienda
                        </label>

                        <!-- Input -->
                        <input type="text" class="form-control" placeholder="Ingresa un nombre" v-model="employee.companyName">

                      </div>

                      <!-- Birthday -->
                      <div class="form-group">

                        <!-- Label -->
                        <label class="form-label">
                          Email
                        </label>

                        <!-- Input -->
                        <input type="email" class="form-control" placeholder="Ingresa tu email" v-model="employee.email">
                      </div>

                    </div>

                  </div> 
                  <hr>
                  <button type="button" class="btn" style="background: linear-gradient(-50.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color :#f9f9f9 ;" v-on:click="validate()">
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
    name: 'EditEmployee',
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
          console.log(error.response.data.msg)
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
          this.$notify({
            group: 'foo',
            title: '',
            text: 'Empleado actualizado correctamente!',
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
      }
    },
    beforeMount(){
      this.init_data()
    },
    mounted(){
      window.scrollTo(0, 0)
    },
    components: {
      Sidebar,
      Loading,
      Error
    },
    
  }
  </script>
  