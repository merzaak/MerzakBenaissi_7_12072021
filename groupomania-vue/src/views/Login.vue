<template>
  <div id="login" class="container-fluid py-5">
    <div class="my-5">
      <Connection  />
    </div>
    
  </div>
</template>
<script>

import Connection from "../components/Connection.vue"
export default {
  name: "login",
  components: {
    Connection,
  }
}
</script>
<style>
  #login {
    background: #091f43;
    height: 100vh;
  }

</style>