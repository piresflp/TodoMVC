<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
  <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.is_completed">
        <div v-if="!todo.is_editing" @dblclick="editTodo(todo)" class="todo-item-label" :class="{is_completed: todo.is_completed}">{{todo.text}}</div>
        <input v-else class="todo-item-edit" type="text" v-model="todo.text" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
      </div>

      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>

    <div class="extra-container">
      <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos">
      Check All
      </label></div>
      <div>{{remaining}} items left</div>
    </div>
  </transition-group>

      <div class="extra-container">
        <div>
          <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
          <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
          <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
        </div>

        <div>
          <transition name="fade">
          <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
          </transition>
        </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      beforeEditCache: '',
      idForTodo: 3,
      filter: 'all',
      todos: [
        {
          'id': 1,
          'text': 'Finish Vue Screencast',
          'is_completed': false,
          'is_editing': false
        },
        {
          'id': 2,
          'text': 'I cant define no one like you',
          'is_completed': true,
          'is_editing': false
        }
      ]
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.is_completed).length
    },
    anyRemaining(){
      return this.remaining != 0
    },
    todosFiltered(){
      if(this.filter == 'all')
        return this.todos;

      else if(this.filter == 'active')
        return this.todos.filter(todo => !todo.is_completed)

      else if(this.filter == 'completed')
        return this.todos.filter(todo => todo.is_completed)

      return this.todos;
    },
    showClearCompletedButton(){
      return this.todos.filter(todo => todo.is_completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function(el){ el.focus() }
    }
  },
  methods: {
    addTodo(){
      if(this.newTodo.trim().length == 0) // prevents adding empty todos
        return

      this.todos.push({
        id: this.idForTodo,
        text: this.newTodo,
        is_completed: false, // by default
      });

      this.newTodo = '' // clears the input
      this.idForTodo++;

    },
    editTodo(todo){
      this.beforeEditCache = todo.text;
      todo.is_editing = true
    },
    doneEdit(todo){
      if(todo.text.trim() == '') // prevents editing empty todos
        todo.text = this.beforeEditCache;

      todo.is_editing = false;
    },
    cancelEdit(todo){
      todo.text = this.beforeEditCache;
      todo.is_editing = false;
    },
    removeTodo(index){
      this.todos.splice(index, 1); // remove the todo from the array
    },
    checkAllTodos(){
      this.todos.forEach((todo) => todo.is_completed = event.target.checked)
    },
    clearCompleted(){
      this.todos = this.todos.filter(todo => !todo.is_completed)
    }
  }
}
</script>

<style lang="scss">
 @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus{
        outline: 0;
    }
}

.todo-item{
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-item{
  cursor: pointer;
  margin-left: 14px;
  &:hover{ color: black; }
}

.todo-item-left{
  display: flex;
  align-items: center;
}

.todo-item-label{
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit{
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  &:focus{
    outline: none;
  }
}

.is_completed{
  text-decoration: line-through;
  color: grey;
}

.extra-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}

button{
  font-size: 14px;
  background-color: white;
  appearance: none;

  &:hover{ 
    background: lightgreen;
  }

  &:focus {
    outline: none;
  }
}

.active{
  background: lightgreen;
}

// CSS Transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
