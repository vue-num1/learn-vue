<template>
    <div class-="detail">
        <todo-list :list-data="todoList"></todo-list>
    </div>
</template>

<script>
import {
    regetTodoList as regetTodoListAction
} from '../../vuex/actions.js';
import {
    getTodoList as todoList
} from '../../vuex/getters.js';

import TodoList from './TodoList.vue';


export default {
    name: 'Detail',
    vuex: {
        actions: { regetTodoListAction },
        getters: { todoList }
    },
    created() {
        const self = this;
        const todoList = self.todoList;

        if (todoList) {
            return;
        }

        self.regetTodoListAction().then(function(d) {

        }, function(errMsg) {

        });
    },
    components: {
        TodoList
    }
};
</script>
