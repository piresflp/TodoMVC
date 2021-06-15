<template>
    <div><label><input type="checkbox" :checked="!anyRemaining" @change="allChecked"> Check All</label></div>
</template>

<script>
export default {
    name: 'todo-remaining',
    props: {
        anyRemaining: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        allChecked(){
            eventBus.$emit('checkAllChanged')
        }
    }
}
</script>