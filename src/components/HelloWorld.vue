<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome
        </h1>
      </v-col>

      <v-col class="mb-5" cols="12" >
        <h2 v-if="isLoggedIn" class="headline font-weight-bold mb-3">
          <p>{{this.$store.state.user.username }}</p>
        </h2>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters, mapState } from "vuex";
  import username from '../views/Login.vue';

  export default {
    name: 'HelloWorld',
    computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: "token",
    }),
    },
    data: () => ({
      myusername : username
    }),
  }
</script>
