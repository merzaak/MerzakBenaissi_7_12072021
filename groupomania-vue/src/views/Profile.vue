<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà qui suis je</p>
    <p>{{user.email}} </p>
    <img :src="user.photo">
    <div class="form-row">
      <button @click="logOut" class="btn my-4">Déconnexion</button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Profile',
    mounted() {
      console.log(this.$store.state.user)
      if(this.$store.state.user.userId == -1) {
        this.$router.push('/')
        return
      }
      this.$store.dispatch('getUserInfos')
    },

    computed: {
      ...mapState({
        user: 'userInfos'
      })
    },

    methods: {
      logOut() {
        this.$store.commit('logOut')
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
.btn {
    background: #d1515a;
    color:white;
    transition: .4s background-color;
}
.btn:hover {
    cursor:pointer;
    background: #d87b81;
}
</style> >
  
