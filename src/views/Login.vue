<template>
    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model='username' prepend-icon="mdi-account-circle"/>
          <v-text-field 
          label="Password" 
          v-model='password'
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"/>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" 
          @click="OpenRegisterTab">Register</v-btn>
          <v-btn color="info"
          @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
</template>

<script>
import UserService from '../UserService'
import { mapMutations } from "vuex";
import reRender from "../App.vue";
var Toasted = require('vue-toasted').default

export default {
  data()
  {
    return{
      username: '',
      password: '',
      showPassword:false
    }
  },
  methods: {
    async OpenRegisterTab() {
      this.$router.push('/Register'); 
    },

    ...mapMutations(["setUser", "setToken"]),
    
    async login(e) {
      e.preventDefault();
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      const { user, mytoken } = await response.json();
      switch (response.status) {
        case 200:
          //console.log(user);
          //console.log(mytoken);
          this.setUser(user);
          this.setToken(mytoken);
          let successToast = this.$toasted.show("Login Correct", { 
            theme: "bubble", 
            type: "success",
            position: "bottom-right", 
            duration : 2500
          });
          this.$root.$refs.MyApp.reRender();
          this.$router.push("/");
          break;
        case 403:
          //console.log('403 error');  // not getting here
          let errToast = this.$toasted.show("Login Incorrect", { 
            theme: "bubble", 
            type: "error",
            position: "bottom-right", 
            duration : 2500
          });
          break;
        case 401:
          console.log('401 error');  // or here
          break;
        default:
          console.log('some other error');  // end up here all the time
          break;
      }
    },
  }
}
</script>