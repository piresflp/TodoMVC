<template>
  <div id="app" class="container">
    <div id="title">todos</div>
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
          
    this.$store.dispatch('loadTodos', localStorage.getItem('userId'));   
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

          localStorage.setItem('userId', response.data.id);
        }catch(err){
          console.log(err);
        }        
      })()
    },
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

#title{
  font-size: 84px;
  color: rgba(175, 47, 47, 0.15);
  text-rendering: optimizeLegibility;
}
</style>
