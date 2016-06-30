<template>
    <div class="app">
        <div class="bg"></div>
        <top-msg></top-msg>
        <router-view></router-view>
        <top-nav></top-nav>
        <Setting></Setting>
    </div>
</template>

<script>
import store from '../vuex/store.js';
import TopNav from './menu/TopNav.vue';
import Setting from './menu/Setting.vue';
import TopMsg from './dialog/TopMsg.vue';

export default {
    name: 'App',
    store,
    components: {
        TopNav, TopMsg, Setting
    }
};
</script>
