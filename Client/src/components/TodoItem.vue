<template>
  <div class="todo-item">
    <div class="todo-item-left">
        <input type="checkbox" v-model="is_completed" @change="doneEdit">
        <div v-if="!is_editing" @dblclick="editTodo" class="todo-item-label" :class="{ is_completed : is_completed }">{{ text }}</div>
        <input v-else class="todo-item-edit" type="text" v-model="text" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
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
      'text': this.todo.text,
      'is_completed': this.todo.is_completed,
      'is_editing': this.todo.is_editing,
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
      this.$store.dispatch('deleteTodo', id);
    },
    editTodo() {
      this.beforeEditCache = this.text
      this.is_editing = true
    },
    doneEdit() {
      if (this.text.trim() == '') 
        this.text = this.beforeEditCache
      
      this.is_editing = false
      this.$store.dispatch('updateTodo', {
        'id': this.id,
        'text': this.text,
        'is_completed': this.is_completed,
        'is_editing': this.is_editing,
      });
    },
    cancelEdit() {
      this.text = this.beforeEditCache
      this.is_editing = false
    },
  }
}
</script>

