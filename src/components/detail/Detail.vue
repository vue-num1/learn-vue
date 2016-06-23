<template>
    <div class-="detail">
        <div id="toast-container" v-show="isShowTopMsg">
            <div class="toast" >{{topMsg}}</div>
        </div>
        <todo-list :list-data="todoList"></todo-list>
    </div>
</template>

<script>
import {
    regetTodoList as regetTodoListAction
} from '../../vuex/actions.js';
import {
    getTodoList as todoList, getTopMsg
} from '../../vuex/getters.js';

import TodoList from './TodoList.vue';


export default {
    name: 'Detail',
    vuex: {
        actions: { regetTodoListAction },
        getters: { todoList, getTopMsg }
    },
    data() {
        return {
            isShowTopMsg: false
        };
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
    computed: {
        topMsg() {
            const self = this;

            setTimeout(function() {
                self.isShowTopMsg = false;
            }, 3000);

            if (self.getTopMsg) {
                self.isShowTopMsg = true;
            }
            return self.getTopMsg;
        }
    },
    components: {
        TodoList
    }
};
</script>
