<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="100"
        />
      </v-col>

      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-3">
          Welcome
        </h2>
      </v-col>

      <v-col class="mb-5" cols="12" >
        <h2 v-if="isLoggedIn" class="headline font-weight-bold mb-3">
          <p>{{this.$store.state.user.username }}</p>
        </h2>
        <h2 v-else class="headline font-weight-bold mb-3">
          <p>You are not logged</p>
        </h2>
      </v-col>

    </v-row>
      <div class="posts-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deletePost(post._id)"
    >
      <p class="text">{{ post }}</p>
    </div>
  </div>
  </v-container>
  
</template>

<script>
  import { mapGetters, mapState } from "vuex";
  import username from '../views/Login.vue';
  import PostService from '../PostService';

  export default {
    name: 'HelloWorld',
    computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: "token",
    }),
    },
    data(){
      return {
        myusername : username,
        posts: [],
        error: '',
        text: ''
      }
    },
    async created() {
      try {
        //this.posts = await PostService.getPosts();
        this.posts = await PostService.getUserPosts(this.$store.state.user.username);
      } catch(err){
        this.error = err.message;
      }
    },
    methods: {
      async createPost() {
        await PostService.insertPost(this.text);
        this.posts = await PostService.getPosts();
    },
      async deletePost(id) {
        await PostService.deletePost("/"+id);
        this.posts = await PostService.getPosts();
    }
    }
  }
</script>
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding:  10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #ecc61a;
  background-color:  #3f2aff;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
