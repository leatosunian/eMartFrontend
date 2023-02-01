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
                        Todos los empleados
                      </h1>
  
                    </div>
                  </div> <!-- / .row -->
                  <div class="row align-items-center">
                    <div class="col">
  
                      <!-- Nav -->
                      <ul class="nav nav-tabs nav-overflow header-tabs">
                        <li class="nav-item">
                            
                          <a href="" class="nav-link active">
                            Todos los empleados
                          </a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/employees/createadmin" >Nuevo empleado</router-link>
                          
                        </li>
                        
                      </ul>
  
                    </div>
                  </div>
                </div>
              </div>

              <div class="tab-content">
                <div class="tab-pane fade show active" id="contactsListPane" role="tabpanel" aria-labelledby="contactsListTab">
  
                  <!-- Card -->
                  <div class="card" >
                    <div class="card-header">
                      <div class="row align-items-center">
                        <div class="col">
  
                          <!-- Form -->
                          <form>
                            <div class="input-group input-group-flush input-group-merge input-group-reverse">
                              <input class="form-control list-search" type="search" placeholder="Buscar usuario" v-model="searchFilter" v-on:keyup="buscar()">
                              <span class="input-group-text">
                                <i class="fe fe-search"></i>
                              </span>
                            </div>
                          </form>
  
                        </div>
                        
                        <div class="col-auto">
  
                          <!-- Dropdown -->
                          <button class="btn btn-sm btn-white" type="button" >
                            <i class="fe fe-sliders me-1"></i> Buscar <span class="badge bg-primary ms-1 d-none">0</span>
                          </button>
  
                        </div>
                      </div> <!-- / .row -->
                    </div>
                    <div class="table-responsive">
                      <table class="table table-sm table-hover table-nowrap card-table">
                        <thead>
                          <tr>
                            
                            <th>
                              <a class="list-sort text-muted" >Usuario</a>
                            </th>
                            <th>
                              <a class="list-sort text-muted" >Tipo de usuario</a>
                            </th>
                            <th>
                              <a class="list-sort text-muted" >Estado</a>
                            </th>
                        
                          </tr>
                        </thead>
                        <paginate
                            tag='tbody'
                            ref="employees" 
                            name="employees"
                            :list="employees"
                            :per="perPage"
                            class="list fs-base"
                          >
                            <tr v-for="item in paginated('employees')">
                            
                              <td>
    
                                <!-- Avatar -->
                                <div class="align-middle avatar avatar-xs me-2">
                                  <img class="avatar-img rounded-circle" src="assets/img/avatars/profiles/avatar-1.jpg" alt="...">
                                </div> <a class="item-name text-reset" href="profile-posts.html">{{item.name}}</a>
    
                              </td>
                              
                              <td>
    
                                <!-- Link -->
                                <a class="item-company text-reset" >{{item.userType}}</a>
    
                              </td>

                              <td>
    
                                <!-- Badge -->
                                <span v-if="!item.enabled" class="item-score badge bg-danger-soft">Desactivado</span>
                                <span v-if="item.enabled"  class="item-score badge bg-success-soft">Activado</span>
                              </td>

                              <td class="text-end">
    
                                <!-- Dropdown -->
                                <div class="dropdown">
                                  <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fe fe-more-vertical"></i>
                                  </a>
                                  <div class="dropdown-menu dropdown-menu-end">
                                    <router-link :to="{name:'edit-employee', params:{id: item._id}}" class="dropdown-item">Editar usuario</router-link>
                                  
                                    <a href="" class="dropdown-item">
                                      Eliminar usuario
                                    </a>
                                    <a v-if="item.enabled" class="dropdown-item" style="cursor:pointer" v-b-modal="`disable-${item._id}`" >
                                      Desactivar usuario
                                    </a>
                                    <a v-if="!item.enabled" class="dropdown-item" style="cursor:pointer" v-b-modal="`disable-${item._id}`" >
                                      Activar usuario
                                    </a>
                                  </div>

                                </div>

                                <b-modal :id="`disable-${item._id}`" title="BootstrapVue" title-html="<h4 class='card-header-title'><b>Modal<b/></h4>" @ok="disable(item._id, item.enabled)">
                                  <p class="my-4">{{item._id}}</p>
                                </b-modal>
    
                              </td>
                            </tr>
                        </paginate>
              
                      </table>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
  
                      <!-- Pagination (prev) -->
                      <ul class="list-pagination-prev pagination pagination-tabs card-pagination">
                        <li class="page-item">
                          <a class="page-link ps-0 pe-4 border-end" v-on:click="prevPage()">
                            <i class="fe fe-arrow-left me-1"></i> Prev
                          </a>
                        </li>
                      </ul>
  
                      <!-- Pagination -->
                      
                      <paginate-links @change="onLangsPageChange" for="employees" :classes="{'ul': ['list-pagination', 'pagination', 'pagination-tabs', 'card-pagination', ], 'a': ['page']}" ></paginate-links>

                      <!-- Pagination (next) -->
                      <ul class="list-pagination-next pagination pagination-tabs card-pagination">
                        <li class="page-item">
                          <a class="page-link ps-4 pe-0 border-start"  v-on:click="nextPage()">
                           Next <i class="fe fe-arrow-right ms-1"></i>
                          </a>
                        </li>
                      </ul>

                      </div>
  
                    </div>
                  </div>
  
                </div>
                
              </div>
  
            </div>
          </div> <!-- / .row -->
        </div>
  
      
    </div>
</template>

<script>

    import Sidebar from '@/components/Sidebar.vue'
    import Topbar from '@/components/Topbar.vue';
    import axios from 'axios';
    import store from '@/store/index';

    export default {
    name: 'EmployeesList',

    data(){
      return {
        employees: [],
        employeesSearch: [],
        paginate: ['employees'],
        currentPage: 1,
        perPage: 10,
        searchFilter: ''
      }
    },

    components: {
        Sidebar,
        Topbar
    },
    mounted(){
      window.scrollTo(0, 0)
    },

    methods: {
      onLangsPageChange (toPage, fromPage) {
        this.currentPage = toPage

      },
      nextPage(){
        if(this.currentPage <= Math.ceil(this.employees.length/this.perPage)){
          this.$refs.employees.goToPage(this.currentPage++)
        } else {
          this.$refs.employees.goToPage(Math.ceil(this.employees.length/this.perPage))
        }
      },

      prevPage(){
        if(this.currentPage >= 2){
          this.$refs.employees.goToPage(this.currentPage--)
        } else {
          this.$refs.employees.goToPage(1)
        }
      },

      buscar(){
        console.log(this.searchFilter);
        var term = new RegExp(this.searchFilter, 'i')
        this.employees = this.employeesSearch.filter( emp => 
        term.test(emp.name) || term.test(emp.userType) || term.test(emp.enabled)
        )
      },

      refresh(){
        axios.get(this.$url+'/employees', {
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${store.state.token}`
        }
      }).then((response) => {
        const {data} = response
        this.employees = data
        
      }).catch( error => {
        console.log(error.response.data.msg)
        this.msm_error = error.response.data.msg
      })
      },

      disable(id, enabled){
          axios.put(this.$url+'/disable/'+id, {enabled: enabled} , {
            headers: {
              "Content-Type": 'application/json',
              "Authorization" : `Bearer ${store.state.token}`
            }
          }).then((response) => {
            const {data} = response
            this.refresh()
            if(data.enabled){
              this.$notify({
                group: 'foo',
                title: '',
                text: `${data.name} se ha activado`,
                type: 'success'
              });
            } else {
              this.$notify({
                group: 'foo',
                title: '',
                text: `${data.name} se ha desactivado`,
                type: 'danger'
              });
            }
            
          }).catch( error => {
            console.log(error.response.data.msg)
            this.msm_error = error.response.data.msg
          })
        }
      },
    
    beforeMount() {
      
      axios.get(this.$url+'/employees', {
        headers: {
          "Content-Type": 'application/json',
          "Authorization" : `Bearer ${this.$token}`
        }
      }).then((response) => {
        const {data} = response
        this.employees = data
        this.employeesSearch = this.employees
        console.log(this.employees)
      }).catch( error => {
        console.log(error.response.data.msg)
        this.msm_error = error.response.data.msg
      })
    }

    }

</script>