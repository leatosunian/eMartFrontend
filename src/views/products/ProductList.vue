<template>
    <div>
        <template>
            <div class="vld-parent" style="z-index: 999999 !important;">
                <loading :active.sync="isLoading" :can-cancel="false" :is-full-page=true  :opacity=0.61 />
            </div>
        </template>
        <Sidebar />
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
                                    mis Productos
                                    </h6>

                                    <!-- Title -->
                                    <h1 class="header-title">
                                    Todos mis productos
                                    </h1>

                                </div>
                                </div> <!-- / .row -->
                                <div class="row align-items-center">
                                    <div class="col">

                                        <!-- Nav -->
                                        <ul class="nav nav-tabs nav-overflow header-tabs">
                                            <li class="nav-item">
                                                <a class="nav-link active">
                                                Todos los productos
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/products/create" class="nav-link">Nuevo producto</router-link>
                                
                                                
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="!areProducts">
                            <div class="row justify-content-center">
                                <div class="my-5 col-12 col-md-5 col-xl-4">
                                    
                                    <div class="text-center">
                                        
                                        <!-- Preheading -->
                                        <h6 class="mb-4 text-uppercase text-muted">
                                            404 error
                                        </h6>
                                
                                        <!-- Heading -->
                                        <h1 class="mb-3 display-4">
                                            No tienes productos
                                        </h1>
                                
                                        <!-- Subheading -->
                                        <p class="mb-4 text-muted">
                                            
                                        </p>
                            
                                    </div>
                            
                                </div>
                            </div>
                        </div>

                        <div class="row" v-if="areProducts">
                            <div class="col-12">

                                <!-- Files -->
                                <div class="card" data-list="{&quot;valueNames&quot;: [&quot;name&quot;]}">
                              
                                <div class="card-header">
                                    <div class="input-group input-group-flush input-group-merge input-group-reverse">

                                        <!-- Input -->
                                        <input class="form-control list-search" type="search" placeholder="Busca tu producto" v-model="filter" v-on:keyup="getProducts()">

                                        <!-- Prepend -->
                                        <div class="input-group-text" style="cursor:pointer">
                                        <span class="fe fe-search"></span>
                                        </div>

                                    </div>

                                </div>
                                <div class="card-body">

                                    <!-- List -->
                                    <template v-if="loading">
                                        <div>
                                            <div class="row">
                                                <div class="text-center col-12">
                                                    <div class="mt-5 mb-5 spinner-border" role="status">
                                                    <span class="visually-hidden">Cargando...</span>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </template>

                                    <template v-if="!loading">
                                        <div style="margin-top:20px!important;">
                                            <ul class="list-group list-group-lg list-group-flush list my-n4" style="padding-left: 10px!important;
                                            padding-right: 10px!important;" v-if="products.products.length >= 1" id="my-table">
                                                <li class="list-group-item" v-for="item in itemsForList">
                                                    <div class="row align-items-center">
                                                    <div class="col-auto">
        
                                                        <!-- Avatar -->
                                                        <a href="#!" class="avatar avatar-lg">
                                                        <img :src="$url+'/getImage/'+item.image" alt="" class="avatar-img ">
                                                        </a>
        
                                                    </div>

                                                    
                                                    <div class="col ms-n2">
        
                                                        <!-- Title -->
                                                        <h4 class="mb-1 name">
                                                        <router-link :to="{ name: 'editproduct', params: {id: item._id} }">{{item.name}}</router-link>
                                                        
                                                        </h4>
        
                                                        <!-- Text -->
                                                        <p class="mb-1 card-text small text-muted">
                                                            {{item.category}} &nbsp;
                                                            <span v-if="!item.forSale" class="item-score badge bg-danger-soft">Desactivado</span>
                                                            <span v-if="item.forSale" class="item-score badge bg-success-soft">En venta</span>
                                                        </p>
        
                                                        <!-- Time -->
                                                        <p class="card-text small text-muted">
                                                            Creado el <time >{{dateConverter(item.createdAt)}}</time>
                                                        </p>
        
                                                    </div>
                                                    <div class="col-auto">
                                                        <span><b>{{priceConverter(item.price)}}</b></span>
        
                                                    </div>
                                                    <div class="col-auto">
        
                                                        <!-- Dropdown -->
                                                        <div class="dropdown">
                                                            <a href="#" class="" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i class="fe fe-more-vertical"></i>
                                                            </a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <router-link class="dropdown-item" :to="{ name: 'editproduct', params: {id: item._id} }">Editar</router-link>
                                                                <router-link class="dropdown-item" :to="{ name: 'galleryproduct', params: {id: item._id} }">Galería</router-link>
                                                                <a href="#!" class="dropdown-item" v-b-modal="'delete-'+item._id">
                                                                Eliminar
                                                                </a>

                                                                <b-modal centered :id="'delete-'+item._id" title="BootstrapVue" title-html="<h4 class='card-header-title'><b>Eliminar producto</b></h4>" @ok="deleteProduct(item._id)">
                                                                    <p class="my-4">Querés eliminar el producto <b>{{item.name}}</b>?</p>
                                                                </b-modal>
                                                                
                                                            </div>  
                                                        </div>
        
                                                    </div>
                                    
                                                    </div> <!-- / .row -->
                                                </li>
                                            </ul>

                                            <b-pagination
                                                v-model="currentPage"
                                                :total-rows="products.products.length"
                                                :per-page="perPage"
                                                size="md"
                                                pills
                                                aria-controls="my-table"
                                                prev-text="Ant."
                                                first-text=""
                                                last-text=""
                                                next-text="Sig."
                                                style="justify-content: center; margin-top:45px;"
                                            ></b-pagination> 
        
                                            <div v-if="products.products.length === 0">
                                                <div class="row justify-content-center">
                                                    <div class="my-5 col-12 col-md-5 col-xl-4">
                                                        <div class="text-center">
                                                            <!-- Preheading -->
                                                            <h6 class="mb-4 text-uppercase text-muted">
                                                                404 error
                                                            </h6>
                                                    
                                                            <!-- Heading -->
                                                            <h1 class="mb-3 display-4">
                                                                No se encontró el producto
                                                            </h1>
                                                    
                                                            <!-- Subheading -->
                                                            <p class="mb-4 text-muted">
                                                                
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                </div>
                                </div>

                            </div>
                        </div>                     

                    </div>
                </div> <!-- / .row -->
            </div>
            

        </div>
        
    </div>
</template>
  
<style>


    .card-body {
        padding: 0 !important;
    }
    .sidebar-menu-item[data-bs-toggle="collapse"]::before{
        display: none !important;
    }

    .nav-pills .nav-link.active, .nav-pills .show>.nav-link{
      color: #ffffff !important;
      background-color: black !important;
    }

    .noUi-horizontal {
      background-color: black !important;
      height: 7px !important;
      padding-bottom: 4px !important;
    }

    .noUi-horizontal .noUi-handle {
      background: black !important;
      width: 0.4rem !important;
      height: 1.3rem !important;
      border-radius: 5px !important;
    }
    
    .page-link {
      color: black !important;
    }

    .page-item .active {
      color: white !important;
      background-color: #ffffff !important  ;
    }

    .page-item.active .page-link {
        background: linear-gradient(120.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%) !important;
        border-color: rgb(69 41 90) !important;
        color: white !important;
        width: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
        background-color: transparent;
        border-color: transparent transparent rgb(87 36 114);
        color: #12263f;
    }
</style>


<script>

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
  
import Sidebar from '@/components/Sidebar.vue'
import axios from 'axios';
import store from '@/store/index';
import moment from 'moment'
import currencyFormatter from 'currency-formatter'
  
export default {
  name: 'ProductList',
  
  mounted(){
      window.scrollTo(0, 0)
    },

  data() {
    return {
        products: [],
        productsLoaded: [],
        filter: '',
        loading: false,
        areProducts: true,
        currentPage: 1,
        perPage: 20,
        get itemsForList(){
            return this.products.products.slice(
            (this.currentPage-1)* this.perPage, this.currentPage*this.perPage
            )
        },
        isLoading: true,

    }
  },
  
  methods: {
    getProducts(){
        this.loading = true
        const token = localStorage.getItem('token')
        
        axios.get(this.$url+'/products/'+this.filter, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${token}`
        }
      }).then((response) => {
        const {data} = response
        this.products = data
        this.loading = false        
      }).catch( error => {
        console.log(error.response.data.msg)
        this.msm_error = error.response.data.msg
      })
    },

    allproducts(){
        this.loading = true
        const token = localStorage.getItem('token')
        
        axios.get(this.$url+'/products/'+this.filter, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${token}`
        }
        }).then((response) => {
            const {data} = response
            this.productsLoaded = data
            this.loading = false
            if(this.productsLoaded.products.length === 0){
                this.areProducts = false
            } else{
                this.areProducts = true
            }
            this.isLoading = false

        }).catch( error => {
            console.log(error.response.data.msg)
            this.msm_error = error.response.data.msg
        })        
    },

    dateConverter(date){
        return moment(date).format('DD-MM-YYYY')
    },

    priceConverter(price){
        return currencyFormatter.format(price, { code: 'ARS' });
    },

    deleteProduct(id){
        this.loading = true
        const token = localStorage.getItem('token')
        
        axios.delete(this.$url+'/products/delete/'+id, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        }).then((response) => {
            const {data} = response
            this.getProducts()
            this.loading = false
            
        }).catch( error => {
            console.log(error.response.data.msg)
            this.msm_error = error.response.data.msg
        })
    },
  },

  beforeMount(){
    this.getProducts()
    this.allproducts()
  },

  components: {
    Sidebar,
    Loading
  }
}
</script>
  