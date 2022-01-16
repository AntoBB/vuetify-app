<template>
    <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="brown"
              size="48"
            >
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-list-item-content>
                <v-btn v-if="user.isLoggedIn === true"
                  depressed
                  rounded
                  text
                >
                  Profilo
                </v-btn>
                <v-btn v-if="user.isLoggedIn === true"
                  v-on:click="logout()"
                  depressed
                  rounded
                  text
                >
                  Logout
                </v-btn>

                <v-btn v-else
                v-on:click="openLoginPage()"
                  depressed
                  rounded
                  text
                >
                  Login
                </v-btn>
              </v-list-item-content>
              <v-divider class="my-3"></v-divider>
              
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
</template>

<script>
export default {
  name: "avatar",
  data: () => ({ 
      user: {
        initials: localStorage.getItem('initials'),
        fullName: (JSON.parse(localStorage.getItem('user'))).name,
        isLoggedIn: String(localStorage.getItem('isLogged')) == "true",
        renderMyComponent : true
        //email: 'john.doe@doe.com',
      },
  }),
  methods: {
          async openLoginPage() {
            this.$router.push('/Login');
            //this.$router.push({name:'home', params: {id: '[paramdata]'}}); 
          },
          async logout() {
            console.log(localStorage.getItem('isLogged'));
            console.log(typeof(localStorage.getItem('isLogged')));
            //this.$router.push('/Login');
            //this.$router.push({name:'home', params: {id: '[paramdata]'}}); 
          }
        }
};

</script>