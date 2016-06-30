<template>
    <div class="top-nav language">
        <div class="logo">
            <a v-link="{ name: 'index' }">todos</a>
        </div>
        <div class="user-menu">
          <span v-if="hasUser">
            <a v-link="{ name: 'detail' }">{{user.username}}</a>
          </span>
          <span v-else>
            <a v-link="{ name: 'login' }">Login</a>&nbsp;/&nbsp;
            <a v-link="{ name: 'register' }">Register</a>
          </span>


        </div>
    </div>
</template>

<script>
import {
    getUser as user
} from '../../vuex/getters.js';


export default {
    name: 'TopNav',
    vuex: {
        getters: { user }
    },
    computed: {
        hasUser() {
            const self = this;
            const user = self.user;

            return user && user.username && user.password;
        }
    }
};
</script>

<style>
.top-nav {
    left: 0;
}
.logo {
    float: left;
    margin-left: 30px;
    font-size: 30px;
    font-weight: bold;
    color: rgb(177, 192, 197);
    text-shadow: -1px -1px rgba(0, 0, 0, 0.5);
    text-rendering: optimizeLegibility;
}
.user-menu {
    float: right;
}
</style>
