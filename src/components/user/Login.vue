<template>
    <div class="login">
        <h5 class="center-align">Login</h5>
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

export default {
    name: 'Login'
};
</script>


<style media="screen">
  .login{
    background: rgba(255,255,255,.8);
    padding: 30px;
  }
</style>
