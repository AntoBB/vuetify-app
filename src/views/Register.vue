<template>
    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Register new User</v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model='username' prepend-icon="mdi-account-circle"/>
          <v-text-field label="email" v-model="email" prepend-icon="mdi-at"/>
          <v-text-field 
          label="Password" 
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"/>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success" 
          @click="insertNewUser">Register</v-btn>
          <v-btn color="info">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
</template>

<script>
import UserService from '../UserService'
var Toasted = require('vue-toasted').default


export default {
  data()
  {
    return{
      email: '',
      username: '',
      password: '',
      showPassword:false
    }
  },
  methods: {
    async insertNewUser(e){
      e.preventDefault();
      const response = await fetch("http://localhost:5001/api/users/RegisterUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email,
        }),
      });
      console.log('status: ', response.body);
      switch (response.status) {
        case 200:
          let successToast = this.$toasted.show("Registration Complete", { 
            theme: "bubble", 
            type: "success",
            position: "bottom-right", 
            duration : 2500
          });
          break;
        case 402:
          let _errUsernameToast = this.$toasted.show("Username already exist", { 
            theme: "bubble", 
            type: "error",
            position: "bottom-right", 
            duration : 2500
          });
          break;
        case 403:
          let _errEmailToast = this.$toasted.show("Email exist. Please login with your mail", { 
            theme: "bubble", 
            type: "error",
            position: "bottom-right", 
            duration : 2500
          });
          break;
      }
    },
  }
}
</script>