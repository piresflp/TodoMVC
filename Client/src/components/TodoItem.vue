
<template>
  <div class="todo-item">
    <div class="todo-item-left">
        <input type="checkbox" v-model="is_completed" @change="doneEdit">
        <div v-if="!editing" @dblclick="editTodo" class="todo-item-label" :class="{ is_completed : is_completed }">{{ title }}</div>
        <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
      </div>
      <div class="remove-item" @click="removeTodo(todo.id)">
        &times;
      </div>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'is_completed': this.todo.is_completed,
      'editing': this.todo.editing,
      'beforeEditCache': '',
    }
  },
  watch: {
    checkAll() {
      // if (this.checkAll) {
      //   this.is_completed = true
      // } else {
      //   this.is_completed = this.todo.is_completed
      // }
      this.is_completed = this.checkAll ? true : this.todo.is_completed
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTodo(id) {
      eventBus.$emit('removedTodo', id)
    },
    editTodo() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') 
        this.title = this.beforeEditCache
      
      this.editing = false
      eventBus.$emit('finishedEdit', {
        'id': this.id,
        'title': this.title,
        'is_completed': this.is_completed,
        'editing': this.editing,
      })

    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
  }
}
</script>

