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
                                        Costos de envío
                                        </h1>
                                    </div>

                                </div> <!-- / .row -->
                                
                            </div>
                        </div>

                        <div>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">
                                            Envio a domicilio
                                        </label>

                                        <input type="number" class="form-control" placeholder="Ingresa un precio" v-model="settings.toAddress">
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">
                                            Envío a sucursal de correo
                                        </label>

                                        <input type="number" class="form-control" placeholder="Ingresa un precio" v-model="settings.toShipperBranch">
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">
                                            Retiro por mi sucursal
                                        </label>

                                        <select name="" class="form-select" v-model="settings.toBranch" >
                                            <option value="Permitido" selected>Permitido</option>
                                            <option value="No permitido" >No permitido</option>
                                        </select>
                                    </div>
                                </div>
                            
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">
                                            Empresa de logística
                                        </label>
                                
                                        <input type="text" class="form-control" placeholder="Ingresa la empresa" v-model="settings.shippingCompany" >
                                    </div>
                                </div>
                            
                                <div class="mt-4 col-12 col-md-6">
                                    <label class="form-label" style="font-weight:600; font-size:17px" >
                                        Envio gratis
                                    </label>
                                    <div class="form-group">
                                        
                                        <label class="form-label">
                                            Compras que superen los:
                                        </label>

                                        <input type="number" class="form-control" placeholder="Ingresa el precio" v-model="settings.freeShippingAmount">
                                    </div>
                                </div>
                            </div> 
                        
                            <hr class="mt-2 mb-4">
                        
                            <button class="btn" style="background: linear-gradient(-50.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color :#f9f9f9 ;"  v-on:click="validate()" >
                                Guardar cambios
                            </button>
                        </div>                            
                    </div>
                </div>
            </div> <!-- / .row -->
        </div>
    
        
    </div>
</template>



<script>
import Sidebar from '@/components/Sidebar.vue'
import axios from 'axios'

export default {
    name: "ShippingSettings",
    components: {
        Sidebar
    },
    data(){
        return {
            settings: {}
        }
    },
    beforeMount(){
        this.getConfig()
        this.settings.seller = localStorage.getItem('user_id')
    },
    mounted(){
        window.scrollTo(0, 0)
    },
    methods: {
        validate(){
            if(!this.settings.toAddress || !this.settings.toBranch || !this.settings.toShipperBranch || !this.settings.shippingCompany || !this.settings.freeShippingAmount){
                return this.$notify({
                    group: 'foo',
                    title: 'Error',
                    text: 'Completar todos los campos',
                    type: 'error',
                    position: 'top center',
                    duration: 100000,
                    speed: 1000
                });
            } 
            this.saveConfig()
        },
        getConfig(){
            const user = localStorage.getItem('user_id')
            axios.get(`${this.$url}/config/shipping/get/${user}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${this.$token}`
            }
            }).then((response) => {
                if(response.data[0]){
                    const {data} = response
                    this.settings = data[0]
                } 
            }).catch( error => {
                console.log(error)
                console.log(error.response.data.msg)
            })
        },
        saveConfig(){
            console.log(this.settings);
            axios.post(`${this.$url}/config/shipping`, this.settings, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization" : `Bearer ${this.$token}`
                }
            }).then((response) => {
                const {data} = response
                this.$notify({
                    group: 'foo',
                    title: '',
                    text: 'Configuraciones actualizadas correctamente!',
                    type: 'success'
                });
                this.getConfig()
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
    }
}
</script>