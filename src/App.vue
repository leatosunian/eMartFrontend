
<template>
  <div id="app">
    <!-- <Sidebar/> -->
    <notifications animation-type="css" position="bottom center" height="80px" group="foo" />
    <router-view/>
  </div>

</template>

<script>

  import Sidebar from '@/components/Sidebar.vue'
  
  export default {
    components: {
      Sidebar
    }
  }

</script>

<style>
.vue-notification-template{
  margin-bottom: 120px !important;
}
.notification-content{
  margin: 5px 15px;
  font-size: 14px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh !important;
}
</style>
