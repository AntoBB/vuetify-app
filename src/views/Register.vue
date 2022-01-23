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
      switch (response.status) {
        case 200:
          let successToast = this.$toasted.show("Registration Complete", { 
            theme: "bubble", 
            type: "success",
            position: "bottom-right", 
            duration : 2500
          });
          break;
        case 403:
          //console.log('403 error');  // not getting here
          let errToast = this.$toasted.show("Registration Failed", { 
            theme: "bubble", 
            type: "error",
            position: "bottom-right", 
            duration : 2500
          });
          break;
      }
    },
    async _insertNewUser() {
      await UserService.RegisterNewUser(this.email, this.username, this.password).then(response => {
            console.log('status: ', response.status);

                switch (response.status) {
                    case 200:
                        console.log('good to go!');
                        break;
                    case 201:
                        console.log('user created!');
                        let oktoast = this.$toasted.show("Registration Complete", { 
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
                    case 404:
                        console.log('401 error');  // or here
                        let errtoast = this.$toasted.show("Failed to Register", { 
                          theme: "bubble", 
                          type: "error",
                          position: "bottom-right", 
                          duration : 3000
                        });
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