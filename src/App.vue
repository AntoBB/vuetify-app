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
      <avatar v-if="renderKey"/>
    </v-app-bar>

    <v-main>
      <router-view v-if="renderKey"/>
    </v-main>
  </v-app>
</template>

<script>
import avatar from './components/Avatar.vue'

  export default {
    components: {
    avatar,
  },
    data: () => ({ 
      
      renderKey : true,
      drawer: null,
      items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
          { title: 'Map', icon: 'mdi-map', to: '/Map'},
          { title: 'About', icon: 'mdi-help-box', to: '/About' },
          { title: 'Some Stuff', icon: 'mdi-alert-octagram', to: '/Stuff'}
        ] }),
        created() {
          this.$root.$refs.MyApp = this;
        },
        methods: {
          async openLoginPage() {
            this.$router.push('/Login');
            //this.$router.push({name:'home', params: {id: '[paramdata]'}}); 
          },
          reRender(){
            this.renderKey = false;
            this.$nextTick(()=>{
            this.renderKey = true;
            }); 
          }
        }
  }
</script>