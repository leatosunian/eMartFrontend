<template>
    <div class="d-flex align-items-center bg-auth border-top border-top-2 border-primary" style="height: 100vh !important ; display: flex !important;
    flex-direction: column !important;">
        <div class="" style="width:100%; display:flex; justify-content:center; margin-top:20px; margin-bottom:170px;">
          <img src="@/assets/emart0.png" class="" style="width:150px; " alt="...">
        </div>
        <div class="container">
            
            <div class="row justify-content-center align-items-center" style="padding: 0 30px;">
                <div class="my-5 col-12 col-md-5 col-xl-4">

                  <!-- Heading -->
                  <h1 class="mb-3 text-center display-4">
                    Iniciá Sesión
                  </h1>

                  <!-- Subheading -->
                  <p class="mb-5 text-center text-muted">
                    Accede a tu panel de administrador
                  </p>

                  <!-- Form -->
                  <form>

                    <!-- Email address -->
                    <div class="form-group"  style="display:flex; flex-direction:column ; align-items: flex-start">

                      <!-- Label -->
                      <label class="form-label">
                        Usuario
                      </label>

                      <!-- Input -->
                      <input type="text" v-model="name" class="form-control" placeholder="Ingresa tu usuario">

                    </div>

                    <!-- Password -->
                    <div class="form-group" style="display:flex; flex-direction:column ; align-items: flex-start"  >
                      <div class="row">
                        <div class="col">

                          <!-- Label -->
                          <label class="form-label">
                            Contraseña
                          </label>

                        </div>
                        
                      </div> <!-- / .row -->

                      <!-- Input group -->
                      <div class="input-group input-group-merge">

                        <!-- Input -->
                        <input class="form-control" v-model="password" type="password" placeholder="Ingresá tu contraseña">

                        <!-- Icon -->
                        <span class="input-group-text">
                          <i class="fe fe-eye"></i>
                        </span>

                      </div>
                    </div>

                    <!-- Submit -->
                    <button v-on:click="validate()" type="button" class="mb-3 btn btn-lg w-100 btn-primary" style="background: linear-gradient(to right, #dc2430, #7b4397); border: none">
                      Iniciar Sesión
                    </button>

                    <div v-if="msm_error" class="alert alert-warning" role="alert">
                      {{msm_error}}
                    </div>
                    

                  </form>

                </div>
            </div> <!-- / .row -->

           
        </div> <!-- / .container -->
    </div>
</template>

<style>



</style>

<script>

import axios from 'axios'
import store from '@/store/index'

// @ is an alias to /src
export default {
  name: 'LoginPanel',
  data() {
    return {
      name: '',
      password: '',
      msm_error: ''
    }
  },
  created(){
  } ,
  methods: {
    validate() {
      if(!this.name || !this.password){
        this.msm_error = 'Completá todos los campos'
      } else {
        this.msm_error = ''
        this.login()
      }
    },
    login() {
      const data = {
        name: this.name,
        password: this.password
      }
      
      axios.post(this.$url + '/login', data, {
        headers: {
          "Content-Type": 'application/json'
        }
      }).then((response) => {
        const {data} = response
        this.$store.dispatch('saveToken', data.token)
        localStorage.setItem('user_id', data._id)
        
        if(data.token){
          this.$router.push({name:'home'})
          window.location.reload()
        }

      }).catch( error => {
        console.log(error.response.data.msg)
        this.msm_error = error.response.data.msg
      })
      
      
    }
  },
  components: {
    
  },
  mounted(){
      window.scrollTo(0, 0)
    },
}
</script>
