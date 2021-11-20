<template>
    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Register new User</v-card-title>
        <v-card-text>
          <v-text-field label="Username" v-model='username' prepend-icon="mdi-account-circle"/>
          <v-text-field label="email" v-model='email' prepend-icon="mdi-at"/>
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
          @click="insertUser">Register</v-btn>
          <v-btn color="info">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
</template>

<script>
import UserService from '../UserService'

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
    async insertUser() {
      console.log(this.email+"#"+this.username+"#"+this.password);
      //await UserService.RegisterNewUser(this.email, this.username, this.password);
      await UserService.RegisterNewUser(email);
    }
  }
}
</script>