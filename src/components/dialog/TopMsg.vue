<template>
    <div class="top-msg">
        <div id="toast-container" v-show="isShowTopMsg">
            <div class="toast" >{{topMsg}}</div>
        </div>
    </div>
</template>

<script>
import {
    getTodoList as todoList, getTopMsg
} from '../../vuex/getters.js';


export default {
    name: 'TopMsg',
    vuex: {
        getters: { getTopMsg }
    },

    data() {
        return {
            isShowTopMsg: false
        };
    },
    computed: {
        topMsg() {
            const self = this;

            setTimeout(function() {
                self.isShowTopMsg = false;
            }, 2000);

            if (self.getTopMsg) {
                self.isShowTopMsg = true;
            }

            return self.getTopMsg;
        }
    }
};
</script>
