import Vue from 'vue';
import VueRouter from 'vue-router';

import _ from 'lodash';
import myI18n from './js/i18n';
import App from './components/App.vue';
import translateLib from './js/translate';
// import router from './components/router.js';


Vue.use(VueRouter);

// custom plugin
Vue.use(myI18n, { translateLib });

// custom filter
Vue.filter('sortByStatus', function(list) {
    let doneList = [];
    let willList = [];
    list.forEach(function(d) {
        if (d.done) {
            doneList.push(d);
        } else {
            willList.push(d);
        }
    });

    return willList.sort(function(a, b) {
        return (b.times - a.times) || 0;
    }).concat(doneList.sort(function(a, b) {
        return (b.times - a.times) || 0;
    }));
});


const router = new VueRouter({
    // history: true,
    // saveScrollPosition: true,
    // transitionOnLoad: true,
});

router.map({
    '/login': {
        name: 'login',
        component: require('./components/user/Login.vue')
    },
    '/register': {
        name: 'register',
        component: require('./components/user/Register.vue')
    },
    '/detail': {
        name: 'detail',
        component: require('./components/detail/Detail.vue')
    },
    '/index': {
        name: 'index',
        component: require('./components/Index.vue')
    },
    '*': {
        name: 'index',
        component: require('./components/Index.vue')
    }
});
// router.redirect({
//     '/': '/index'
// });


// start App
router.start(App, '#todo-app');


// export default router;
