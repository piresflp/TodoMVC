import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // global variables
        filter: 'all',
        todos: [
            {
              'id': 1,
              'text': 'Finish Vue Screencast',
              'is_completed': false,
              'is_editing': false,
            },
            {
              'id': 2,
              'text': 'Take over world',
              'is_completed': false,
              'is_editing': false,
            },
          ]  
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.is_completed).length
        },
        anyRemaining(state, getters) {
            return getters.remaining != 0
        },
        todosFiltered(state) {
            if (state.filter == 'all') 
                return state.todos
            else if (state.filter == 'active') 
                return state.todos.filter(todo => !todo.is_completed)
            else if (state.filter == 'completed') 
                return state.todos.filter(todo => todo.is_completed)
            
            return state.todos
        },
        showClearCompletedButton(state) {
            return state.todos.filter(todo => todo.is_completed).length > 0
        }
    },
    mutations: {
        addTodo(state, todo){
            state.todos.push({
                id: todo.id,
                text: todo.text,
                is_completed: false,
                is_editing: false
            });
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.is_completed);
        },
        updateFilter(state, filter){
            state.filter = filter;
        },
        checkAll(state, checked){
            state.todos.forEach((todo) => todo.is_completed = checked);
        },
        updateTodo(state, todo){
            const index = state.todos.findIndex((item) => item.id == todo.id);
            state.todos.splice(index, 1, {
                'id': todo.id,
                'text': todo.text,
                'is_completed': todo.is_completed,
                'is_editing': todo.is_editing
            });
        },
        deleteTodo(state, id){
            const index = state.todos.findIndex((item) => item.id == id)
            state.todos.splice(index, 1)
        },
    },
    actions: {
        addTodo(context, todo){
            context.commit('addTodo', todo);
        },
        updateTodo(context, todo){
            context.commit('updateTodo', todo);
        },
        deleteTodo(context, id){
            context.commit('deleteTodo', id);
        },
        clearCompleted(context){
            context.commit('clearCompleted');            
        },
        updateFilter(context, filter){
            context.commit('updateFilter', filter);           
        },
        checkAll(context, checked){
            context.commit('checkAll', checked);    
        },
    }
})