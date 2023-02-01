<template>
    <div>
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
                            Configuraciones
                        </h6>
    
                        <!-- Title -->
                        <h1 class="header-title">
                            Todos las categorias
                        </h1>
    
                        </div>
                    </div> <!-- / .row -->
        

                    
                    </div>
                </div>

                <div class="mb-3 row">
    
                    <div class=" col-12 col-lg-6" >
                        <div class="mb-3 input-group">
                            <input type="text" class="form-control" placeholder="Ingresa la nueva categoría" v-model="newCategory">
                            <button type="button" class="btn" style="background: linear-gradient(-50.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color :#f9f9f9 ;" v-on:click="validate()">Añadir</button>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">

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

                        
                        <ul class="list-group list-group-flush list my-n3">
                            <li class="list-group-item" v-for="item in allCategories">
                                <!-- CATEGORIES -->
                                <div class="row align-items-center">

                                    <div class="col ms-n2">
                                        <!-- Title -->
                                        <h2 class="mb-1 name">
                                            <span href="profile-posts.html" style="font-weight:700;font-size: 1.2rem;">{{ item.category.name }}</span>
                                            
                                        </h2>

                                        <span style="font-size: 13px;">{{ item.qOfProducts }} Productos</span>
                
                                        <!-- enabled -->
                                        <p class="mt-1 small" v-if="item.category.enabled">
                                            <span class="text-success">●</span> Activado
                                        </p>

                                        <p class="mt-1 small" v-if="!item.category.enabled">
                                            <span class="text-success">●</span> Desactivado
                                        </p>
                                    </div>

                                    <div class="col-auto">
                                        <button type="button" class="text-white btn btn-sm btn-dark" style="margin-right: 1rem;background: linear-gradient(-50.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color :#f9f9f9 ;" v-on:click="openInput(item.category._id)">
                                            Agregar subcategoria
                                        </button>
                                        <!-- Button -->
                                        <a v-b-modal="`eliminar-${item.category._id}`" class="text-white btn btn-sm btn-danger" >
                                            Eliminar
                                        </a>
                                        <b-modal :id="`eliminar-${item.category._id}`" title="BootstrapVue" title-html="<h4 class='card-header-title'><b>Eliminar categoria<b/></h4>" @ok="deleteCategory(item.category._id)">
                                            <p class="my-4" style="font-size: 16px;">Deseas eliminar la categoría <b>{{item.category.name}}</b>?</p>
                                        </b-modal>
                                    </div>
                                </div>
                                
                                <!-- FORM ADD CATEGORY -->
                                <div class="mt-3 col-12 col-lg-6 col-md-10 hideInput contentGroup" :id="'content-'+item.category._id" >
                                    <div class="mb-3 input-group">
                                        <input type="text" class="form-control" placeholder="Ingresa la nueva subcategoría" v-model="newSubcategory">
                                        <button type="button" class="btn" style="background: linear-gradient(-50.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color :#f9f9f9 ;" v-on:click="validateSubcat()">Agregar</button>
                                    </div>
                                </div>

                                <!-- SUBCATEGORIES -->
                                <div class="mt-1 row">
                                    <div class="col-12">
                                        <ul class="mt-1 list-group" v-for="subItem in item.subcategories">
                                            
                                            <li class="list-group-item d-flex justify-content-between align-items-center" style="font-size: .9rem;padding: 0.5rem 1.5rem;">
                                                - {{subItem.name}} 
                                                <a v-b-modal="`disable-${subItem._id}`" class="text-white btn btn-sm btn-danger" >
                                                    Eliminar
                                                </a>
                                                <b-modal :id="`disable-${subItem._id}`" title="BootstrapVue" title-html="<h4 class='card-header-title'><b>Eliminar subcategoria<b/></h4>" @ok="deleteSubcategory(subItem._id)">
                                                    <p class="my-4" style="font-size: 16px;">Deseas eliminar la subcategoría <b>{{subItem.name}}</b>?</p>
                                                </b-modal>
                                            </li>
                                        
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
                    </div>
                </div>
  
             
            </div>
  
            </div>
          </div> <!-- / .row -->
        </div>
        
  
      
    </div>
</template>



<style>
    .hideInput{
        display: none;
    }
    .showInput{
        display: block;
    }
</style>



<script>

import axios from 'axios'
import Sidebar from '@/components/Sidebar.vue';
import $ from 'jquery'

export default {
    name: 'Categories',
    components: {
        Sidebar
    },
    data(){
        return{
            form: false,
            btnName: 'Agregar categoría',
            newCategory: '',
            newSubcategory: '',
            allCategories: [],
            categoryId: '',
            loading: true
        }
    },
    methods: {
        setForm(){
            if (this.form === false) {
                this.form = true
                this.btnName = 'Ocultar'
            } else {
                this.form = false
                this.btnName = 'Agregar categoría'
            }
        },
        validate(){
          if(this.newCategory === ''){
            return this.$notify({
              group: 'foo',
              title: 'Error',
              text: 'Ingresá una categoría',
              type: 'error'
            });
          } 
          this.createNewCategory()
        },
        validateSubcat(){
          if(this.newSubcategory === ''){
            return this.$notify({
              group: 'foo',
              title: 'Error',
              text: 'Ingresá una subcategoría',
              type: 'error'
            });
          } 
          this.createNewSubcategory()
        },
        createNewCategory(){
            const token = localStorage.getItem('token')
            axios.post(this.$url+'/createCategory', {name: this.newCategory}, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                const {data} = response
                this.newCategory = ''
                this.$notify({
                group: 'foo',
                title: '',
                text: data.msg,
                type: 'success'
                });
                this.getCategories()

            }).catch( error => {
                console.log(error.response.data.msg)
              
            })
        },
        createNewSubcategory(){
            if(this.newSubcategory){
                const token = localStorage.getItem('token')
                axios.post(this.$url+'/subcategories/create', {name: this.newSubcategory, category: this.categoryId}, {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization" : `Bearer ${token}`
                    }
                }).then((response) => {
                    const {data} = response
                    this.newSubcategory = ''
                    this.getCategories()
                    if(data.msg){
                        this.$notify({
                        group: 'foo',
                        title: '',
                        text: data.msg,
                        type: 'error'
                        });
                    }
                }).catch( error => {
                    console.log(error.response.data.msg)
                })
            } else {
                this.$notify({
                    group: 'foo',
                    title: '',
                    text: 'Ingrese una subcategoría',
                    type: 'error'
                });
            }
            
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
                this.allCategories = data
                this.loading = false
            }).catch( error => {
                console.log(error.response.data.msg)
            })
        },
        openInput(id){
            setTimeout(() => {
                this.newSubcategory = ''
                this.categoryId = id
                $('.contentGroup').addClass('hideInput')
                $('#content-'+id).removeClass('hideInput')

            }, 20);
        },
        deleteCategory(id){
            const token = localStorage.getItem('token')
            axios.delete(this.$url+'/categories/delete/'+id, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                const {data} = response
                this.getCategories()
                this.$notify({
                    group: 'foo',
                    title: '',
                    text: `${data.cat.name} se ha eliminado`,
                    type: 'success'
                });
                {
            }}).catch( error => {
                console.log(error.response.data.msg)
            })
        },
        deleteSubcategory(id){
            const token = localStorage.getItem('token')
            axios.delete(this.$url+'/subcategories/delete/'+id, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${token}`
                }
            }).then((response) => {
                const {data} = response
                this.getCategories()
                this.$notify({
                group: 'foo',
                title: '',
                text: `${data.subcat.name} se ha eliminado`,
                type: 'success'
                });
                {
            }}).catch( error => {
                console.log(error.response.data.msg)
            })
        },


    },
    beforeMount(){
        this.getCategories()
    },
    
    mounted(){
      window.scrollTo(0, 0)
    },
}
</script>