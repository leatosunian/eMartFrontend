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
                                            Mis Pedidos 
                                        </h6>
                                        <!-- Title -->
                                        <h1 class="header-title">
                                            <b>Buscar Pedidos</b>
                                        </h1>
                                    </div>
                                </div> <!-- / .row -->
                            </div>
                        </div>

                        <div class="gap-4 mb-4 row">
                            <div class="card-header">

                                <!-- Title -->
                                <h4 class="mb-0 card-header-title">
                                    <b>Buscar por fecha</b>
                                </h4>

                            </div>
                            <div class="col-12 col-md-8 col-xl-10 d-flex">
                                <input type="date" class="form-control" placeholder="Desde" v-model="inicio" style="margin-right: 1rem"/>
                                <input type="date" class="form-control" placeholder="Hasta" v-model="hasta"/>
                            </div>
                            <div class="col-3 col-md-3 col-xl-2">
                                <button class="btn" style="width:100%; background: linear-gradient(120.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color:#f9f9f9 ;" v-on:click="getOrders()">Buscar</button>
                            </div>
                        </div>

                        <div class="mb-5 row" style="height: 80px">
                            <div class="card-header">

                                <!-- Title -->
                                <h4 class="mb-0 card-header-title">
                                    <b>Buscar por N° de pedido</b>
                                </h4>

                            </div>
                            <div class="input-group input-group-rounded input-group-merge input-group-reverse" >
                                <input v-model="searchFilter" v-on:keyup.enter="searchOrders()" class="form-control" type="number" placeholder="Buscar pedido" aria-label="Search" style="border-right:1px solid #95aac9; border-top:1px solid #95aac9; border-bottom:1px solid #95aac9">
                                <div class="input-group-text" style="border-left:1px solid #95aac9; border-top:1px solid #95aac9; border-bottom:1px solid #95aac9">
                                    <span class="fe fe-search"></span>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="table-responsive">
                                <table class="table table-sm table-nowrap card-table">
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Pedido</th>
                                            <th>Total</th>
                                            <th>Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody class="fs-base" v-if="orders.length >= 1">
                                        <tr v-for="item in orders">
                                            <td>
                                                <a>{{item.client.name}}</a>
                                            </td>
                                            <td>
                                                <a>#{{item.orderNumber.toString().padStart(6,'000000')}}</a>
                                            </td>
                                            <td>
                                                {{priceConverter(item.total)}}
                                            </td>

                                            <td>
                                                <a>{{item.statusStr}}</a>
                                            </td>

                                            <td>
                                                <router-link :to="{name: 'order',params: {id: item._id}}" class="btn btn-sm" style="background: linear-gradient(120.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color:#f9f9f9 !important;">
                                                    <a style="color:#f9f9f9 !important;"  >Editar</a>
                                                </router-link>
                                            </td>
                                        </tr>
                                    </tbody>

                                    <tbody v-if="orders.length == 0">
                                        <tr>
                                            <td colspan="4">
                                                <div class="row justify-content-center">
                                                    <div class="my-5 col-12 col-md-6 col-xl-6">
                                                        <div class="text-center">
                                                            <h1 class="mb-3 display-4">
                                                                No se encontraron registros
                                                            </h1>

                                                            <p class="mb-4 text-muted">
                                                                No hay datos que mostrar
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>  
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> <!-- / .row -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '@/components/Sidebar.vue'
import currencyFormatter from 'currency-formatter'


export default {
    name: "OrdersList",
    components: {
        Sidebar
    },
    data(){
        return {
            inicio: '',
            hasta: '',
            searchFilter: '',
            orders: []
        }
    },
    beforeMount(){
        
    },
    methods: {
        priceConverter(price){
            return currencyFormatter.format(price, { code: 'ARS' });
        },
        getOrders(){
            if(!this.inicio){
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese la fecha de inicio',
                    type: 'error'
                });
            }else if(!this.hasta){
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese la segunda fecha',
                    type: 'error'
                });
            }else{
                axios.get(this.$url+'/orders/get/'+this.inicio+'/'+this.hasta,{
                    headers:{
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.$token}`
                    }
                }).then((result)=>{
                    this.orders = result.data;
                });
            }
        },
        searchOrders(){
            axios.get(this.$url+'/orders/search/'+this.searchFilter,{
                headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.$token}`
                }
            }).then((result)=>{
                this.orders = result.data
                if(!result.data[0]){
                    this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: result.data.msg,
                    type: 'error'
                });
                }
            });
        }
    }
}
</script>