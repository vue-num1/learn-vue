<template>
    <div class-="detail">
        <div class="todolist-loading" v-show="isLoading"><h1>{{$t('common.loading')}}</h1></div>
        <todo-list v-show="!isLoading" :list-data="todoList"></todo-list>
    </div>
</template>

<script>
import {
    regetTodoList as regetTodoListAction,
    login as loginAction
} from '../../vuex/actions.js';
import {
    getTodoList as todoList,
    getUser as user
} from '../../vuex/getters.js';
import { getCookieByName } from '../../utils/other.js';

import TodoList from './TodoList.vue';



export default {
    name: 'Detail',
    vuex: {
        actions: { regetTodoListAction, loginAction },
        getters: { todoList, user }
    },
    data() {
        return {
            isLoading: true
        };
    },
    created() {
        const self = this;

        self.firstRender();
    },
    methods: {
        firstRender() {
            const self = this;
            const { user } = self;

            if (user.isLogin) {
                self.regetTodoListAction().then(function(d) {
                    self.isLoading = false;
                }, function(errMsg) {
                    self.isLoading = false;
                });
            } else if (user.isTryToLogin) {
                setTimeout(self.firstRender, 1000);
            } else {
                self.$router.go({ name: 'login' });
            }
        }
    },
    components: {
        TodoList
    }
};
</script>
