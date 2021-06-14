<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
  
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <div v-if="!todo.is_editing" @dblclick="editTodo(todo)" class="todo-item-label">{{todo.text}}</div>
        <input v-else class="todo-item-edit" type="text" v-model="todo.text" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)">
      </div>

      <div class="remove-item" @click="removeTodo(index)">
        &times;
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
      idForTodo: 3,
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
      todo.is_editing = true
    },
    doneEdit(todo){
      todo.is_editing = false;
    },
    removeTodo(index){
      this.todos.splice(index, 1); // remove the todo from the array
    }
  }
}
</script>

<style lang="scss">
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
</style>
