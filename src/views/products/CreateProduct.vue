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
              <div class="header mt-md-5">
                <div class="header-body">
                  <div class="row align-items-center">
                    <div class="col">
  
                      <!-- Pretitle -->
                      <h6 class="header-pretitle">
                        Mis Productos
                      </h6>
  
                      <!-- Title -->
                      <h1 class="header-title">
                        Agregar Producto
                      </h1>
  
                    </div>
                  </div> <!-- / .row -->
                  <div class="row align-items-center">
                    <div class="col">
  
                      <!-- Nav -->
                      <ul class="nav nav-tabs nav-overflow header-tabs">
                        <li class="nav-item">
                          <router-link to="/products" class="nav-link ">Todos los productos</router-link>
                        </li>
                        
                        <li class="nav-item">
                            <router-link class="nav-link active" to="" >Nuevo Producto</router-link>
                          
                        </li>
                        
                      </ul>
  
                    </div>
                  </div>
                </div>
              </div>
  
              <div>
              
                <div class="row">
                    <div class="col-12 col-md-6">
              
                    <!-- Email address -->
                    <div class="form-group">
              
                      <!-- Label -->
                      <label class="mb-1" style="font-size: 17px; font-weight:500">
                        Nombre del producto
                      </label>
              
                      <!-- Input -->
                      <input type="text" class="form-control" placeholder="Nombre del producto" v-model="product.name">
              
                    </div>
              
                  </div>

                  <div class="col-12 col-md-6">
              
                    <!-- Last name -->
                    <div class="form-group">
              
                      <!-- Label -->
                      <label class="form-label">
                        Precio
                      </label>
              
                      <!-- Input -->
                      <input type="number" class="form-control" placeholder="Ingresa el precio" v-model="product.price">
              
                    </div>
              
                  </div>

                  <div class="col-12 col-md-6">
              
                    <!-- First name -->
                    <div class="form-group">
              
                      <!-- Label -->
                      <label class="form-label">
                        Categoria
                      </label>
              
                      <!-- Input -->
                      <select name="" class="form-select" v-model="product.category" v-on:change="getSubcategories($event)">
                          <option value="" disabled selected>Seleccionar</option>
                          <option :value="item.category.name" v-for="item in categories">{{ item.category.name }} </option>
                      </select>
              
                    </div>
              
                  </div>
                  
                  <div class="col-12 col-md-6">
              
                    <!-- First name -->
                    <div class="form-group">
              
                      <!-- Label -->
                      <label class="form-label">
                        Subcategoria
                      </label>
              
                      <!-- Input -->
                      <select name="" class="form-select" v-model="product.subcategory" >
                          <option value="" disabled selected>Seleccionar</option>
                          <option :value="item.name" v-for="item in subcategories">{{ item.name }} </option>
                      </select>
              
                    </div>
              
                  </div>
                  
                  
                  <div class="col-12 col-md-6">
              
                    <!-- Phone -->
                    <div class="form-group">
              
                      <!-- Label -->
                      <label class="form-label">
                        Descripción
                      </label>
              
                      <!-- Input -->
                      <textarea class="form-control" id="" rows="3" placeholder="Ingresa una descripción" v-model="product.description"></textarea>
              
                    </div>
              
                  </div>

                  <div class="col-12 col-md-6">
                    <!-- Last name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="mb-1 form-label">
                        Variedad
                      </label>
                      <!-- Text -->
                      <small class="mb-2 text-muted form-text">
                        Es la variante del producto que se visualiza en la tienda (ej. talle, color, etc)
                      </small>
              
                      <!-- Input -->
                      <input type="text" class="form-control" placeholder="Ingresa la variante del producto" v-model="product.str_variant">
                    </div>
                  </div>

                  <div class="flex row justify-content-left align-items-center" style="gap:20px; padding:10px; margin: 0 auto;">
                    <div class="" style="margin-left:10px;width: 250px; height :60px; display:flex; justify-content:center; align-items:center;">
                      <div class="row align-items-center" style="min-width:300px">
                        <div class="col-auto">
                
                          <!-- Avatar -->
                          <div class="avatar">
                            <img class="avatar-img rounded-3" :src="str_image" alt="">
                          </div>
                
                        </div>
                        <div class="col ms-n2">
                
                          <!-- Heading -->
                          <h4 class="mb-1">
                            <b>Imagen</b>
                          </h4>
                
                          <!-- Text -->
                          <small class="text-muted">
                            En formato PNG, JPG, JPEG, webp y menor a 2MB.
                          </small>
                
                        </div>
                      </div> <!-- / .row -->
                    </div>

                    <div class="" style="width: 120px; height :60px; display:flex; justify-content:center; align-items:center;">
                
                      <!-- Button -->
                      
                      <label for="file-upload" class="btn btn-sm" style="background: linear-gradient(120.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color:#f9f9f9">
                          Subir imagen 
                      </label>
                      <input style="display:none" id="file-upload" type="file" v-on:change="uploadImg($event)"/>
                
                    </div>
                  </div> <!-- / .row -->  
                  
                </div> <!-- / .row -->
            
                <!-- Divider -->
                <hr class="mt-0 mb-4">
              
                <!-- Button -->
                <button class="btn marginAuto" style="margin-bottom:50px ;background: linear-gradient(120.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 30) 99.1%); color:#f9f9f9" v-on:click="validate()">
                  Crear producto
                </button>
              
              
              </div>
                
            </div>
  
            </div>
          </div> <!-- / .row -->
        </div>
  
      
    </div>
  </template>
<style>
  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
      background-color: transparent;
      border-color: transparent transparent rgb(87 36 114);
      color: #12263f;
  }
  
</style>
  <script>
  
  import Sidebar from '@/components/Sidebar.vue'
  import Topbar from '@/components/Topbar.vue';
  import axios from 'axios';
  import store from '@/store/index';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    name: 'CreateProduct',
    components: {
      Sidebar,
      Topbar,
      Loading
    },

    data() {
        return {
            str_image: '/assets/img/defaultimage.png',
            product: {
              image: undefined
            },
            uploadedImg: undefined,
            subcategories: [],
            categories: [],
            isLoading: true,
        }
    },

    mounted(){
      window.scrollTo(0, 0)
    },

    methods: {
        uploadImg($event){
            var image
            if($event.target.files.length >= 1){
                image = $event.target.files[0]
                
            }
            if(image.size <= 1480000){
                if(image.type == 'image/jpeg' || image.type == 'image/png' || image.type == 'image/webp' || image.type == 'image/jpg'){
                    this.str_image = URL.createObjectURL(image)
                    this.uploadedImg = image
                    this.product.image= this.uploadedImg
                } else {
                    this.$notify({
                    group: 'foo',
                    title: 'Error',
                    text: 'El archivo debe ser una imagen',
                    type: 'error'
                  });
                  this.image = undefined
                }
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Error',
                    text: 'La imagen es muy pesada, máximo 1 megabyte',
                    type: 'error'
                  });
            }
        },

        validate(){
          if(!this.product.name || !this.product.price || !this.product.image || !this.product.category || !this.product.str_variant || !this.product.subcategory){
            return this.$notify({
              group: 'foo',
              title: 'Error',
              text: 'Completar todos los campos',
              type: 'error'
            });
          } 
          this.createProduct()
        },

        createProduct() {
          const formData = new FormData()
          formData.append('name', this.product.name)
          formData.append('description', this.product.description)
          formData.append('price', this.product.price)
          formData.append('category', this.product.category)
          formData.append('subcategory', this.product.subcategory)
          formData.append('image', this.product.image)
          formData.append('str_variant', this.product.str_variant)

          axios.post(this.$url+'/products/add', formData, {
            headers: {
              "Content-Type": 'multipart/form-data',
              "Authorization" : `Bearer ${this.$token}`,
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'POST,OPTIONS',
            }
            }).then((response) => {
              const {data} = response
              console.log(data);
              this.$notify({
                group: 'foo',
                title: '',
                text: 'Producto creado correctamente!',
                type: 'success'
              });
              setTimeout(() => {
              this.$router.push({name: 'products'})
              }, 2200);
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


        },
        getCategories(){
            const token = localStorage.getItem('token')
            axios.get(this.$url+'/getAllCategories', {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                const {data} = response
                this.categories = data
                this.isLoading = false
            }).catch( error => {
                console.log(error.response.data.msg)
            })
        },
        getSubcategories(event){
            this.subcategories = this.categories.filter(cat => cat.category.name == event.target.value)[0].subcategories
        }
    },
    beforeMount(){
      this.getCategories()
    }
  }
</script>
  