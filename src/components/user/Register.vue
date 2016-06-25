<template>
    <div class="register">
    <h5 class="center-align">Register</h5>
    <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
        <div class="input-field col s12">
          <input id="repeatPassword" type="password" class="validate">
          <label for="repeatPassword">RepeatPassword</label>
        </div>
        <div class="s12">
          <div class="right-align">
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit</button>
          </div>
        </div>
      </div>
    </form>
    </div>
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


<style media="screen">
.register{
  background: rgba(255,255,255,.8);
  padding: 30px;
}
</style>
