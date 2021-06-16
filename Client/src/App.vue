<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <TodoList/>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    TodoList,
  },
  mounted: function () {
    if(!this.userExists)
          this.createUser();
          
    this.loadUserTodos();    
  },
  computed: {
    userExists(){
      return (localStorage.getItem('userId') == null) ? false : true
    }
  },
  methods: {    
    async createUser(){ 
      // Initialize an agent at application startup.
      const fpPromise = FingerprintJS.load()

      ;(async () => {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise
        const result = await fp.get()

        // This is the visitor identifier:
        const userId = result.visitorId;

        try{
          let url = "http://localhost:3030/users";
          const response = await axios.post(url, {
            id: userId
          });

          this.$store.dispatch('userId', userId);
          localStorage.setItem('userId', response.data.id);
          console.log(userId);
        }catch(err){
          console.log(err);
        }        
      })()
    },
    async loadUserTodos(){
      try{
        let url = "http://localhost:3030/users/"+localStorage.getItem('userId')+"/todos";
        const response = await axios.get(url);

        console.log(response.data);
      }catch(err){
        console.log(err);
      }
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
