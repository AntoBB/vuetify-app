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
</template>

<script>
export default {
  name: "avatar",
  data: () => ({ 
      user: {
        initials: 'O',
        fullName: 'Ospite',
        //email: 'john.doe@doe.com',
      },
  }),
  methods: {
          async openLoginPage() {
            this.$router.push('/Login');
            //this.$router.push({name:'home', params: {id: '[paramdata]'}}); 
          }
        }
};

</script>