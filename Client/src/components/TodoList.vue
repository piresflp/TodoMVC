<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
    </todo-item>
    </transition-group>

    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filtered></todo-filtered>

      <div>
        <transition name="fade">
          <todo-clear-completed :showClearCompletedButton="showClearCompletedButton"></todo-clear-completed>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import TodoCheckAll from './TodoCheckAll.vue'
import TodoClearCompleted from './TodoClearCompleted.vue'
import TodoFiltered from './TodoFiltered.vue'
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining.vue'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted,
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      filter: 'all',
      todos: [
        {
          'id': 1,
          'title': 'Finish Vue Screencast',
          'is_completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Take over world',
          'is_completed': false,
          'editing': false,
        },
      ]
    }
  },
  created(){
    eventBus.$on('removedTodo', (index) => this.removeTodo(index));
    eventBus.$on('finishedEdit', (data) => this.finishedEdit(data));
    eventBus.$on('checkAllChanged', () => this.checkAllTodos());
    eventBus.$on('filterChanged', (filter) => this.filter = filter);
    eventBus.$on('clearCompletedTodos', () => this.clearCompleted());
  },
  beforeDestroy(){
    eventBus.$off('removedTodo', (index) => this.removeTodo(index));
    eventBus.$off('finishedEdit', (data) => this.finishedEdit(data));
    eventBus.$off('checkAllChanged', () => this.checkAllTodos());
    eventBus.$off('filterChanged', (filter) => this.filter = filter);
    eventBus.$off('clearCompletedTodos', () => this.clearCompleted());
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.is_completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      if (this.filter == 'all') 
        return this.todos
      else if (this.filter == 'active') 
        return this.todos.filter(todo => !todo.is_completed)
      else if (this.filter == 'completed') 
        return this.todos.filter(todo => todo.is_completed)
      
      return this.todos
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.is_completed).length > 0
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        is_completed: false,
      })

      this.newTodo = ''
      this.idForTodo++
    },
    removeTodo(id) {
      const index = this.todos.findIndex((item) => item.id == id)
      this.todos.splice(index, 1)
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.is_completed = event.target.checked)
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.is_completed)
    },
    finishedEdit(data) {
      const index = this.todos.findIndex((item) => item.id == data.id)
      this.todos.splice(index, 1, data)
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

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.2s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }

  .todo-item-left { // later
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .is_completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
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
