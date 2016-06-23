<template>
    <div class-="register">
        <h1>Register!</h1>
    </div>
</template>

<script>
import {
    addUser as addUserAction
} from '../../vuex/actions.js';


export default {
    name: 'Register',
    vuex: {
        actions: { addUserAction }
    }
};
</script>
