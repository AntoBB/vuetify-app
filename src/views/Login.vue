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
          @click="UserLogin">Login</v-btn>
          <v-btn color="info"
          @click="login">New Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
</template>

<script>
import UserService from '../UserService'
import { mapMutations } from "vuex";
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
      // console.log(user);
      // console.log(token);
      this.setUser(user);
      this.setToken(mytoken);
      this.$router.push("/");
    },

    async UserLogin() {
     await UserService.LoginUrl(this.username, this.password).then(response => {
            console.log('status: ', response.status);

                switch (response.status) {
                    case 200:
                        console.log('good to go!');
                        break;
                    case 201:
                        console.log('Login User OK!');
                        let toast = this.$toasted.show("Login Correct!", { 
                          theme: "bubble", 
                          type: "success",
                          position: "bottom-right", 
                          duration : 3000
                        });
                        break;
                    case 400:
                        console.log('400 error');  // not getting here
                        break;
                    case 401:
                        console.log('401 error');  // or here
                        break;
                    default:
                        console.log('some other error');  // end up here all the time
                        break;
                    }
        })
        .catch(error => {
            console.log('SignInForm.authenticate error: ', error);
        });
    }
  }
}
</script>