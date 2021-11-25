<template>
  <v-app id="inspire">
    <v-navigation-drawer 
    v-model="drawer"
    app
    >
    
      <v-list-item>
        
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Ndo Menu
          </v-list-item-title>
          <v-list-item-subtitle>
            Lorem Ipsum
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>NDO Application</v-toolbar-title>
      <v-spacer></v-spacer>
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
              <v-btn 
              v-on:click="openLoginPage()"
                depressed
                rounded
                text
              >
                Login
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <!--<v-btn
                depressed
                rounded
                text
              >
                Disconnect
              </v-btn>-->
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import About from './views/About.vue'
  export default {
    data: () => ({ 
      user: {
        initials: 'O',
        fullName: 'Ospite',
        //email: 'john.doe@doe.com',
      },
      //components: {
      //  'about': About,
      //},
      drawer: null,
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
          { title: 'Login', icon: 'mdi-account', to: '/Login'},
          { title: 'Map', icon: 'mdi-map', to: '/Map'},
          { title: 'About', icon: 'mdi-help-box', to: '/About' },
          { title: 'Some Stuff', icon: 'mdi-alert-octagram', to: '/Stuff'}
        ] }),
        methods: {
          async openLoginPage() {
            this.$router.push('/Login');
            //this.$router.push({name:'home', params: {id: '[paramdata]'}}); 
          }
        }
  }
</script>