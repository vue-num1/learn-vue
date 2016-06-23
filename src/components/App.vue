<template>
    <div class="app">
        <div class="bg"></div>
        <router-view></router-view>
        <top-nav></top-nav>
    </div>
</template>

<script>
import store from '../vuex/store.js';
import TopNav from './menu/TopNav.vue';


export default {
    name: 'App',
    store,
    components: {
        TopNav
    }
};
</script>
