<template>
    <div>
        <Sidebar />
        <div class="main-content contentPadding">

            <div class="container-fluid ">
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
                                        <b>Galería del producto</b>
                                    </h1>

                                </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                <div class="col">

                                    <!-- Nav -->
                                    <ul class="nav nav-tabs nav-overflow header-tabs">
                                    <li class="nav-item">
                                        <router-link to="/products" class="nav-link">Todos los productos</router-link>
                                    </li>
                                    <li class="nav-item">
                                        
                                        <a class="nav-link active">
                                            Galeria de producto
                                        </a>
                                        
                                    </li>
                                    
                                    </ul>

                                </div>
                                </div>
                            </div>
                        </div>

                        <template v-if="loadingData">
                            <div class="row">
                                <div class="text-center col-12">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <div class="mb-7" v-if="!loadingData">
                            <div class="row">
                                <div class="col-12 col-md-12">

                                <!-- Email address -->
                                <div class="form-group">

                                    <!-- Label -->
                                    <label class="mb-1">
                                        Imagen
                                    </label>

                                    

                                    <!-- Input -->
                                    <div class="mb-3 input-group">
                                        <input type="file" id="input_file" class="form-control" placeholder="Selecciona la imagen" v-on:change="uploadImg($event)">
                                        <button class="btn" style="background: linear-gradient(120.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color:#f9f9f9 ;" v-on:click="addImage()">
                                            <i class="fe fe-upload"></i>
                                        </button>
                                    </div>
                                    <!-- Form text -->
                                    <small class="form-text text-muted">
                                        Subo un maximo de 5 imagenes para la galeria del producto.
                                    </small>
                                </div>

                                </div>
                                
                            </div> <!-- / .row -->




                            <div class="row listAlias">
                                <div class="col-12 col-md-6 col-xl-4" v-for="item in images" v-if="!loadingGallery">
                                    <div class="card">
                                        <a href="project-overview.html">
                                            <img :src="$url+'/getGallery/'+item.image" alt="..." class="card-img-top">
                                        </a>
                                        <div class="card-footer card-footer-boxed">
                                        <div class="row">
                                            <div class="text-center col">
                                                <a href="#!" class="dropdown-item" v-b-modal="'delete-'+item._id">
                                                    Eliminar
                                                    </a>

                                                    <b-modal centered :id="'delete-'+item._id" title="BootstrapVue" title-html="<h4 class='card-header-title'><b>Eliminar imagen</b></h4>" @ok="deleteImage(item._id)">
                                                        <p class="my-4">Querés eliminar la imagen?</p>
                                                    </b-modal>
                                            </div>
                                            
                                        </div> <!-- / .row -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row" v-if="loadingGallery">
                                <div class="text-center col-12">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <template v-if="!isData">
                            <div>
                              <Error/>
                            </div>
                        </template>
                        

                    </div>
                </div> <!-- / .row -->
            </div>
            

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
import Error from '@/components/Error.vue';
import axios from 'axios';
import store from '@/store/index';
import $ from 'jquery'

// @ is an alias to /src
export default {
  name: 'AddGallery',
  components: {
    Sidebar,
    Topbar,
    Error
  },
  data(){
    return {
        uploadedImg: undefined,
        str_image: '',
        images: [],
        isData: false,
        loadingData: true,
        loadingGallery: true
    }
  },

  mounted(){
      window.scrollTo(0, 0)
    },

  methods:{

    getProducts(){
            this.loadingData= true
            const token = localStorage.getItem('token')
            axios.get(this.$url+'/products/get/'+this.$route.params.id, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization" : `Bearer ${token}`
            }
            }).then((response) => {
                const {data} = response
                this.loadingData = false
                this.isData = true
                this.str_image = this.$url+'/getImage/'+this.product.image
            }).catch( error => {
                console.log(error.response.data.msg)
                this.isData = false
                this.msm_error = error.response.data.msg
            })
    },

    getGallery(){
        this.loadingGallery= true
            const token = localStorage.getItem('token')
            axios.get(this.$url+'/getAllGallery/'+this.$route.params.id, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                const {data} = response
                this.loadingGallery = false
                this.images = data
                this.isData = true
            }).catch( error => {
                console.log(error.response.data.msg)
                this.isData = false
                this.msm_error = error.response.data.msg
            })
    },

    uploadImg($event){
            var image
            if($event.target.files.length >= 1){
                image = $event.target.files[0]
                
            }
            if(image.size <= 1480000){
                if(image.type == 'image/jpeg' || image.type == 'image/png' || image.type == 'image/webp' || image.type == 'image/jpg'){
                    this.str_image = URL.createObjectURL(image)
                    this.uploadedImg = image
                } else {
                    this.$notify({
                    group: 'foo',
                    title: 'Error',
                    text: 'El archivo debe ser una imagen',
                    type: 'error'
                  });
                  this.uploadedImg = undefined
                  $('#input_file').val('')
                }
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Error',
                    text: 'La imagen es muy pesada, máximo 1 megabyte',
                    type: 'error'
                  });
                this.uploadedImg = undefined
                $('#input_file').val('')
            }
    },

    addImage() {
        if(this.uploadedImg == undefined){
            this.$notify({
                group: 'foo',
                title: 'Error',
                text: 'Selecciona una imagen para subir',
                type: 'error'
              })
        } else{
            const formData = new FormData()
            formData.append('product', this.$route.params.id)
            formData.append('image', this.uploadedImg)
          
            axios.post(this.$url+'/gallery/add', formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    "Authorization" : `Bearer ${this.$token}`
                }
                }).then((response) => {
                    const {data} = response
                    this.$notify({
                        group: 'foo',
                        title: '',
                        text: 'Imagen añadida!',
                        type: 'success'
                    });
                    $('#input_file').val('')
                    this.getGallery()
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

    deleteImage(id){
        this.loadingGallery = true
        const token = localStorage.getItem('token')
        axios.delete(this.$url+'/gallery/delete/'+id, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }).then((response) => {
            const {data} = response
            if(data.msg){
                this.$notify({
                        group: 'foo',
                        title: '',
                        text: data.msg,
                        type: 'error'
                    });
                this.loadingGallery = false
            } else {
                this.$notify({
                        group: 'foo',
                        title: '',
                        text: 'Imagen eliminada!',
                        type: 'success'
                    });
                this.loadingGallery = false
                this.getGallery()
            }
            
        }).catch( error => {
            console.log(error.response.data.msg)
            this.msm_error = error.response.data.msg
        })
    }
  },

  beforeMount(){
    this.getProducts()
    this.getGallery()
  }

}
</script>
  