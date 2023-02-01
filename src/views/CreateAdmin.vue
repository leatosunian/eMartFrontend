<template>
  <div>
    <Sidebar/>
    <div class="main-content contentPadding">

      <Topbar/>

      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">

            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Pretitle -->
                    <h6 class="header-pretitle">
                      Mis Empleados
                    </h6>

                    <!-- Title -->
                    <h1 class="header-title">
                      Nuevo Empleado
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
                        <a  class="nav-link active">
                            Nuevo empleado
                        </a>
                        
                      </li>
                      
                    </ul>

                  </div>
                </div>
              </div>
            </div>

        

          

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

              </div> <!-- / .row -->

              <!-- Divider -->
              

   

              <hr class="my-5">

              <!-- Button -->
              <button type="button" class="btn btn-primary" v-on:click="validate()">
                Crear empleado
              </button>


            

            <br><br>

          </div>
        </div> <!-- / .row -->
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue';
import axios from 'axios'

export default {
  name: 'CreateAdmin',
  data() {
    return {
      employee: {
        userType: ''
      },

    }
  },

  methods: {

    
    validate(){
      if(!this.employee.name || !this.employee.userType){
        this.$notify({
          group: 'foo',
          title: 'Error',
          text: 'Completar todos los campos',
          type: 'error'
        });
      } 

      this.createEmployee()
      
    },

    createEmployee(){
      
      axios.post(this.$url+'/createadmin', this.employee, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${this.$token}`
        }
      }).then((response) => {
        const {data} = response
        this.$notify({
          group: 'foo',
          title: '',
          text: 'Empleado creado correctamente!',
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

  components: {
    Sidebar,
    Topbar
  },
  mounted(){
      window.scrollTo(0, 0)
    },
}
</script>
