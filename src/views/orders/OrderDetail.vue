<template>
  <div>
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
                    <h6 class="header-pretitle">Ventas</h6>

                    <!-- Title -->
                    <h1 class="header-title">
                      <b>Detalle de venta</b>
                    </h1>
                  </div>
                </div>
                <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">
                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/orders" class="nav-link">
                          Volver a ventas
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-4 row">
                <div class="col-12 col-md-12 col-xl-3">
                    <!-- First name -->
                    <div class="form-group">
              
                      <!-- Label -->
                      <label class="form-label">
                        Estado del pedido
                      </label>
              
                      <!-- Input -->
                      <select name="status" class="form-select" v-model="status">
                        <option value="En preparación" selected>En preparación</option>
                        <option value="En camino" >En camino</option>
                        <option value="Recibido" >Recibido</option>
                      </select>
              
                    </div>
                </div>

                <div class="col-12 col-md-12 col-xl-6">
                    <div class="form-group">
                        <!-- Label -->
                        <label class="form-label">
                        Código de seguimiento
                        </label>
                        <!-- Input -->
                        <input type="string" class="form-control"  placeholder="Ingresa el código" v-model="order.trackingCode">
                    </div>

                </div>

                <div class="col-12 col-md-12 col-xl-3" >
                    
                    <button class="btn" style=" margin-top:30px; background: linear-gradient(-50.6deg, rgb(179 134 149) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(69 41 90) 99.1%); color :#f9f9f9 ;" v-on:click="validate()">
                        Guardar cambios
                    </button>
                </div>

                
                
            </div>

            <div class="row">
                <div class="card-header" style="padding-left:35px">
                    <!-- Title -->
                    <h4 class="mb-0 card-header-title" style="font-size:17px">
                      <b>Datos de la compra</b>
                    </h4>
                </div>
              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <!-- List group -->
                    <div class="list-group list-group-flush my-n3">
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">N° de orden</h5>
                          </div>
                          <div class="col-auto">
                            <!-- Time -->
                            <time
                              class="small text-muted"
                              datetime="1988-10-24"
                              v-if="order.orderNumber"
                            >
                              {{
                                order.orderNumber
                                  .toString()
                                  .padStart(6, "000000")
                              }}
                            </time>

                          </div>
                        </div>
                        <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">N° de transacción</h5>
                          </div>
                          <div class="col-auto">
                            <!-- Time -->
                            <time
                              class="small text-muted"
                              datetime="2018-10-28"
                            >
                              {{ order.transaction }}
                            </time>
                          </div>
                        </div>
                        <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">Cliente</h5>
                          </div>
                          <div class="col-auto">
                            <!-- Text -->
                            <small class="text-muted" >
                              {{ order.client.name }}
                            </small>
                          </div>
                        </div>
                        <!-- / .row -->
                      </div>
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">Fecha</h5>
                          </div>
                          <div class="col-auto">
                            <!-- Link -->
                            <span class="small text-muted">
                              {{ convertDate(order.createdAt) }}
                            </span>
                          </div>
                        </div>
                        <!-- / .row -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="card">
                  <div class="card-body">
                    <!-- List group -->
                    <div class="list-group list-group-flush my-n3">
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">Subtotal</h5>
                          </div>
                          <div class="col-auto">
                            <!-- Time -->
                            <time
                              class="small text-muted"
                              datetime="1988-10-24"
                            >
                              {{ convertCurrency(order.total) }}
                            </time>
                          </div>
                        </div>
                        <!-- / .row -->
                      </div>

                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">Envio</h5>
                          </div>
                          <div class="col-auto">
                            <!-- Time -->
                            <time
                              class="small text-muted"
                              
                            >
                              {{ convertCurrency(order.shippingPrice) }}
                            </time>
                          </div>
                        </div>
                        <!-- / .row -->
                      </div>

                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">Total</h5>
                          </div>
                          <div class="col-auto">
                            <!-- Link -->
                            <span class="small text-muted">
                              {{ convertCurrency(order.total + order.shippingPrice) }}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="list-group-item">
                        <div class="row align-items-center">
                          <div class="col">
                            <!-- Title -->
                            <h5 class="mb-0">Tipo de envío</h5>
                          </div>
                          <div class="col-auto" v-if='order.shipMethod === "toAddress" '>
                            <span class="small text-muted" >
                              Envío a domicilio
                            </span>
                          </div>

                          <div class="col-auto" v-if='order.shipMethod === "toShipperBranch" '>

                            <span class="small text-muted" >
                              A sucursal de empresa logística
                            </span>
                          </div>

                          <div class="col-auto" v-if='order.shipMethod === "toBranch" '>
                            <!-- Link -->
                            
                            <span class="small text-muted" >
                              Retiro por mi sucursal
                            </span>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SHIPPING DATA -->
            <div class="row">
                <div class="card-header" style="padding-left:35px">
                    <!-- Title -->
                    <h4 class="mb-0 card-header-title" style="font-size:17px">
                      <b>Datos de envío</b>
                    </h4>
                </div>
                <div class="col-12 col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <!-- List group -->
                      <div class="list-group list-group-flush my-n3">
                        <div class="list-group-item">
                          <div class="row align-items-center">
                            <div class="col">
                              <!-- Title -->
                              <h5 class="mb-0">Nombre del destinatario</h5>
                            </div>
                            <div class="col-auto">
                              <!-- Time -->
                              <time
                                class="small text-muted"
                                datetime="1988-10-24"
                              >
                                {{order.address.surname}}, {{order.address.name}}
                              </time>
  
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>
                        <div class="list-group-item">
                          <div class="row align-items-center">
                            <div class="col">
                              <!-- Title -->
                              <h5 class="mb-0">N° de DNI</h5>
                            </div>
                            <div class="col-auto">
                              <!-- Time -->
                              <time
                                class="small text-muted"
                                datetime="2018-10-28"
                              >
                                {{ order.address.dni }}
                              </time>
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>
                        <div class="list-group-item">
                          <div class="row align-items-center">
                            <div class="col">
                              <!-- Title -->
                              <h5 class="mb-0">Teléfono</h5>
                            </div>
                            <div class="col-auto">
                              <!-- Text -->
                              <small class="text-muted" >
                                {{ order.address.phone }}
                              </small>
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>
                        <div class="list-group-item">
                            <div class="row align-items-center">
                              <div class="col">
                                <!-- Title -->
                                <h5 class="mb-0">Código Postal</h5>
                              </div>
                              <div class="col-auto">
                                <!-- Text -->
                                <small class="text-muted" >
                                  {{ order.address.code }}
                                </small>
                              </div>
                            </div>
                            <!-- / .row -->
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="card">
                    <div class="card-body">
                      <!-- List group -->
                      <div class="list-group list-group-flush my-n3">
                        <div class="list-group-item">
                          <div class="row align-items-center">
                            <div class="col">
                              <!-- Title -->
                              <h5 class="mb-0">Ciudad</h5>
                            </div>
                            <div class="col-auto">
                              <!-- Time -->
                              <time
                                class="small text-muted"
                                datetime="1988-10-24"
                              >
                                {{ order.address.city }}
                              </time>
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>
                        <div class="list-group-item">
                          <div class="row align-items-center">
                            <div class="col">
                              <!-- Title -->
                              <h5 class="mb-0">Provincia</h5>
                            </div>
                            <div class="col-auto">
                              <!-- Time -->
                              <time
                                class="small text-muted"
                                datetime="2018-10-28"
                              >
                                {{ order.address.province }}
                              </time>
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>
  
                        <div class="list-group-item">
                          <div class="row align-items-center">
                            <div class="col">
                              <!-- Title -->
                              <h5 class="mb-0">Domicilio</h5>
                            </div>
                            <div class="col-auto">
                              <!-- Link -->
                              <span class="small text-muted">
                                {{ order.address.address }}
                              </span>
                            </div>
                          </div>
                          <!-- / .row -->
                        </div>

                        <div class="list-group-item">
                            <div class="row align-items-center">
                              <div class="col">
                                <!-- Title -->
                                <h5 class="mb-0">Piso</h5>
                              </div>
                              <div class="col-auto">
                                <!-- Link -->
                                <span class="small text-muted" v-if="order.address.floor">
                                  {{ order.address.floor }}
                                </span>
                                <span class="small text-muted" v-if="!order.address.floor">
                                    No especificado
                                </span>
                              </div>
                            </div>
                            <!-- / .row -->
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <!-- PRODUCTS -->
            <div class="card">
              <div class="card-header">
                <!-- Title -->
                <h4 class="mb-0 card-header-title">
                  <b style="font-size:17px">Productos</b>
                </h4>
              </div>
              <div class="table-responsive">
                <table class="table table-sm table-nowrap card-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio Un.</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody class="fs-base">
                    <tr v-for="item in details">
                      <td class="products-product">
                        <div class="d-flex align-items-center">
                          <!-- Image -->
                          <div class="avatar">
                            <img
                              class="rounded avatar-img me-3"
                              :src="$url + '/getImage/' + item.product.image"
                              alt="..."
                            />
                          </div>

                          <div class="ms-3">
                            <!-- Heading -->
                            <h4 class="mb-1 fw-normal">
                              {{ item.product.name.substr(0, 25) }}
                            </h4>

                            <!-- Text -->
                            <small class="text-muted">{{
                              item.variant.variant
                            }}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        {{ convertCurrency(item.unitPrice) }}
                      </td>
                      <td>
                        {{ item.items }}
                      </td>
                      <td>
                        {{ convertCurrency(item.subtotal) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
        <!-- / .row -->
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import axios from "axios";
import moment from "moment";
import currency_formatter from "currency-formatter";

export default {
  name: "OrderDetail",
  data() {
    return {
      order: {},
      details: [],
      status: '',
      trackingCode: ''
    };
  },
  beforeMount() {
    this.getOrder();
  },
  methods: {
    validate(){
        if(this.order.trackingCode === ''){
          return this.$notify({
            group: 'foo',
            title: 'Error',
            text: 'Ingresá un código',
            type: 'error'
          });
        } 
        this.updateStatus()
      },
    updateStatus(){
        const token = localStorage.getItem('token')
        console.log(token);
        let data = {}
        data.status = this.status
        data.trackingCode = this.order.trackingCode
        axios
        .put(this.$url + "/orders/change/" + this.$route.params.id, data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.$token}`,
          },
        
        }).then((response) => {
            const {data} = response
            this.$notify({
              group: 'foo',
              title: '',
              text: 'Código de seguimiento enviado',
              type: 'success'
            });
        }).catch( error => {
            console.log(error.response.data.msg)
        })
    },
    getOrder() {
      axios
        .get(this.$url + "/orders/get/" + this.$route.params.id, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.$token}`,
          },
        })
        .then((response) => {
          const { data } = response;
          if(data.order[0]){
            this.order = data.order[0];
            console.log(this.order);
          }
          this.details = data.details;
          this.status = this.order.statusStr
        });
    },
    convertCurrency(number) {
      return currency_formatter.format(number, { code: "ARS" });
    },
    convertDate(item) {
      return moment(item).format("YYYY/MM/DD");
    },
    
  },
  components: {
    Sidebar,
  },
};
</script>
