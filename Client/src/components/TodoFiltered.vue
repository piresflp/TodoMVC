<template>
    <div>
        <button :class="{ active: filter == 'all' }" @click="changeFilter('all')">All</button>
        <button :class="{ active: filter == 'active' }" @click="changeFilter('active')">Active</button>
        <button :class="{ active: filter == 'is_completed' }" @click="changeFilter('completed')">Completed</button>
      </div>
</template>

<script>
export default {
    name: 'todo-filtered-all',
    data(){
        return{
            'filter': 'all',
        }
    },
    methods: {
        changeFilter(filter){
            this.filter = filter;
            eventBus.$emit('filterChanged', filter)
        }
    }
}
</script>