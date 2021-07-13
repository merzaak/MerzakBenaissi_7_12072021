<template>
<!-- fichier pour l'inscription et la connexion -->
    <section class="bg-white rounded col-lg-6 container">
        <div class="card-header bg-white ">
            <h1 class="card__title font-weight-bold text-dark" v-if="mode == 'login' ">CONNEXION</h1>
            <h1 class="card__title font-weight-bold text-dark" v-else>INSCRIPTION</h1>
            <p class="card__subtitle" v-if="mode =='login' ">Vous n'avez pas encore de compte? <span class="card__action" v-on:click="switchToCreateAccount()">Créer un compte</span></p>
            <p class="card__subtitle" v-else>Tu as déjà un compte? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
        </div>
        <div class="card-body">
            <form action="">
                <div class="form-row mb-4">
                    <input v-model="email" type="email" class="form-control" placeholder="Adresse mail" aria-label="email">
                </div>
                <div class="form-row d-flex justify-content-between" v-if="mode == 'create'">
                    <div class="col me-2">
                        <input v-model="firstName" type="text" class="form-control" placeholder="Prénom" aria-label="Prénom">
                    </div>
                    <div class="col ms-2">
                        <input v-model="lastName" type="text" class="form-control" placeholder="Nom" aria-label="Nom">
                    </div>
                </div>
                <div class="form-row mt-4">
                    <input v-model="password" type="password" class="form-control" placeholder="Mot de passe" aria-label="mot de passe">
                </div>
            </form>
            <div class="form-row" v-if="mode == 'login' && status == 'error_login' ">
                <span class="error__message">Email et/ou mot de passe invalide</span>
                </div>
                <div class="form-row" v-if="mode == 'create' && status == 'error_create' ">
                <span class="error__message">votre formulaire n'est bien rempli</span>
            </div>
            <div class="form-row">
                <button class="btn my-4" :class="{'btn--disabled' : !validatedForm}" v-if="mode =='login' " @click="login">
                    <span v-if="status == 'loading' ">
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only"></span>
                    </div>
                    connexion en cours...
                    </span>
                    <span v-else>Connexion</span>
                </button>
                <button class="btn  my-4" type="button" :class="{'btn--disabled' : !validatedForm}" v-if="mode =='create'" @click="createAccount">
                    <span v-if="status == 'loading' ">
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only"></span>
                    </div>
                    Création en cours...
                    </span>
                    <span v-else>Créer mon compte</span>
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Login',
    data () {
        return {
            mode: 'login',
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        }
    },

    mounted() {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/profile');
            return ;
        }
    },

    computed: {
      validatedForm () {
        if (this.mode == 'create') {
          if(this.email != '' && this.firstName != '' && this.lastName != '' && this.password != ''){
            return true
          } else {
            return false
          }
        } else {
          if(this.email != ''  && this.password != ''){
            return true
          } else {
            return false
          }
        }
      },
      ...mapState(['status'])
    },

    methods: {
      //deux fonction pour changer de mode (login/create)
      switchToCreateAccount() {
        this.mode = "create"
      },

      switchToLogin() {
        this.mode = "login"
      },

      //fonction pour créer un user
      createAccount() {
        const self = this
        this.$store.dispatch('createAccount', {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password
        }).then(() => {
          self.login()
        }, (error) => {
          console.log(error)
        })
      },

      //fonction pour la connexion
      login() {
        const self = this
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(() => {
          self.$router.push('/profile')
        }, (error) => {
          console.log(error)
        })
      }
    },


  }
</script>
  
<style scoped>
.card__action {
    color:#d1515a;
    text-decoration: underline;
}
.card__action:hover {
    cursor:pointer;
}

.form-control {
    background: #f2f2f2;
    border: none;
     color: black;
}
.btn {
    background: #d1515a;
    color:white;
    transition: .4s background-color;
}
.btn:hover {
    cursor:pointer;
    background: #d87b81;
}
.btn--disabled {
    background:#cecece;
    color:#ececec
}
.btn--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
}
.error__message {
    color: red
}
</style>


