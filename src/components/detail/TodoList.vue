<template>
    <section>
        <todo-filter @change-status="changeStatus"></todo-filter>
        <ul class="collection">
            <li class="collection-item" style="padding:0" >
                <todo-one></todo-one>
            </li>
            <li class="collection-item" transition="expand" style="padding:0"
                v-for="t in listData | filterBy filterStatus in 'done' | sortByStatus" track-by="$index">
                <div class="hoverable todo-container">
                    <todo-one :todo-item="t" :todo-id="t.id"></todo-one>
                    <i class="small material-icons" @click="removeTodo(t)" >close</i>
                </div>
            </li>
        </ul>
        <div class="lighten-3 tips-info">
            <p v-translate="'editway'"></p>
            <p v-translate="'author'"></p>
        </div>
    </section>
</template>

<script>
import TodoOne from './TodoOne.vue';
import TodoFilter from './TodoFilter.vue';
import {
    deleteTodoById as deleteTodoByIdAction,
    setTopMsg as setTopMsgAction
} from '../../vuex/actions.js';


export default {
    name: 'TodoList',
    vuex: {
        actions: { deleteTodoByIdAction, setTopMsgAction }
    },
    props: {
        listData: {
            type: Array
        }
    },
    data(){
        return {
            filterStatus: null
        };
    },
    methods:{
        changeStatus(_status){
            this.filterStatus  = _status;
        },
        removeTodo(todoInfo){
            const self = this;

            self.deleteTodoByIdAction(todoInfo).then(function() {
                self.setTopMsgAction('删除成功');
            }, function(errMsg) {
                self.setTopMsgAction(errMsg);
            });
        }
    },
    components: {
        TodoOne,
        TodoFilter
    }
};
</script>
