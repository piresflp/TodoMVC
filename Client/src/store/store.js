import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { // global variables
        filter: 'all',
        todos: []  
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
        loadTodos(state, todos){
            state.todos = todos;
        },
        addTodo(state, todo){
            state.todos.push({
                id: todo.id,
                text: todo.text,
                is_completed: todo.is_completed,
                is_editing: false
            });
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
            state.todos.splice(index, 1);
        },        
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.is_completed);
        },
        updateFilter(state, filter){
            state.filter = filter;
        },
        checkAll(state, checked){
            state.todos.forEach(todo => (todo.is_completed = checked))
        },
    },
    actions: {        
        loadTodos(context, userId){
          let url = "http://localhost:3030/users/"+userId+"/todos";
          axios.get(url)
          .then(response => context.commit('loadTodos', response.data.todos))
          .catch(error => { console.log(error) });            
        },
        addTodo(context, todo){
            const url = "http://localhost:3030/todos";
            axios.post(url, {
                text: todo.text,
                is_completed: false,
                id_user: localStorage.getItem('userId')
            })
            .then(response => context.commit('addTodo', response.data))
            .catch(error => { console.log(error) });
            
        },
        updateTodo(context, todo){
            const url = "http://localhost:3030/todos/"+todo.id;
             axios.put(url, {
                text: todo.text,
                is_completed: todo.is_completed,
                is_editing: todo.is_editing
            })
            .then(response => context.commit('updateTodo', response.data))
            .catch(error => { console.log(error) });
        },
        deleteTodo(context, id){
            const url = "http://localhost:3030/todos/"+id;
            axios.delete(url);
                
            context.commit('deleteTodo', id);
        },
        clearCompleted(context){
            const completed = context.state.todos
                .filter(todo => todo.is_completed)
                .map(todo => todo.id)

            const url = "http://localhost:3030/todosCompleted";
            axios.delete(url, {
                data: {
                    todos: completed
                }
            })
            .then(context.commit('clearCompleted'))
            .catch(error => console.log(error))
        },
        updateFilter(context, filter){
            context.commit('updateFilter', filter);           
        },
        checkAll(context, checked){
            let url = "http://localhost:3030/todos";
            axios.patch(url, {
                is_completed: checked,
                id_user: localStorage.getItem('userId')
            })
            .then(context.commit('checkAll', checked))
            .catch(error => console.log(error))
        },
    }
})