<template>
    <div class="login">
        <h5 class="center-align">Login</h5>
      <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="text" class="validate" v-model="username">
            <label for="email">Email</label>
          </div>
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" v-model="password">
            <label for="password">Password</label>
          </div>
          <div class="s12">
            <div class="right-align">
              <button class="btn waves-effect waves-light" type="submit" name="action"
                @click="toLogin"
                :disabled="!isOkBtn">Submit</button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </div>
</template>

<script>
import {
    login as loginAction,
    setTopMsg as setTopMsgAction
} from '../../vuex/actions.js';
import {
    getUser as getUserAction
} from '../../vuex/actions.js';


export default {
    name: 'Login',
    vuex: {
        actions: { getUserAction, loginAction, setTopMsgAction }
    },
    data() {
        const user = this.getUserAction;
        return {
            username: user.username || 'admin',
            usernameMsg: '',
            password: 'admin',
            passwordMsg: ''
        };
    },
    computed: {
        isOkBtn() {
            const self = this;
            const { username, password } = self;
            let { usernameMsg, passwordMsg } = self;

            let isOk = true;

            if (!username) {
                isOk = false;
                usernameMsg = 'need username';
            } else {
                usernameMsg = '';
            }
            self.usernameMsg = usernameMsg;

            if (!password) {
                isOk = false;
                passwordMsg = 'need password';
            } else {
                passwordMsg = '';
            }
            self.passwordMsg = passwordMsg;

            return isOk;
        }
    },
    methods: {
        toLogin() {
            const self = this;
            const {
                username, password,
                usernameMsg, passwordMsg
            } = self;

            if (!self.isOkBtn) {
                self.setTopMsgAction(usernameMsg || passwordMsg);
                return;
            }

            self.loginAction(username, password).then(function() {
                self.setTopMsgAction('登陆成功');
                self.$router.go({ name: 'detail' });
            }, function(errMsg) {
                switch (errMsg) {
                    case 'ERROR_USERNAME':
                        self.setTopMsgAction('无此用户名');
                        break;
                    case 'ERROR_PASSWORD':
                        self.setTopMsgAction('密码不匹配');
                        break;
                    default:
                        self.setTopMsgAction(errMsg);
                }
            });
        }
    }
};
</script>


<style media="screen">
  .login{
    background: rgba(255,255,255,.8);
    padding: 30px;
  }
</style>
