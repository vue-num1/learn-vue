<template>
    <div class="register">
    <h5 class="center-align">Register</h5>
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
        <div class="input-field col s12">
          <input id="repeatPassword" type="password" class="validate" v-model="repeatPassword">
          <label for="repeatPassword">RepeatPassword</label>
        </div>
        <div class="s12">
          <div class="right-align">
            <button class="btn waves-effect waves-light" type="submit" name="action"
                @click="toRegister"
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
    findUser as findUserAction,
    register as registerAction,
    setTopMsg as setTopMsgAction
} from '../../vuex/actions.js';


export default {
    name: 'Register',
    vuex: {
        actions: { findUserAction, registerAction, setTopMsgAction }
    },
    data() {
        return {
            username: 'admin',
            usernameMsg: '',
            password: 'admin',
            passwordMsg: '',
            repeatPassword: 'admin',
            repeatPasswordMsg: '',
            isAdding: false
        };
    },
    computed: {
        isOkBtn() {
            const self = this;
            const { username, password, repeatPassword } = self;
            let { usernameMsg, passwordMsg, repeatPasswordMsg } = self;

            let isOk = true;

            if (!username) {
                isOk = false;
                usernameMsg = '用户名无效';
            } else {
                usernameMsg = '';
            }
            self.usernameMsg = usernameMsg;

            if (!password) {
                isOk = false;
                passwordMsg = '密码无效';
            } else {
                passwordMsg = '';
            }
            self.passwordMsg = passwordMsg;

            if (!repeatPassword || password !== repeatPassword) {
                isOk = false;
                repeatPasswordMsg = '两次密码不匹配';
            } else {
                repeatPasswordMsg = '';
            }
            self.repeatPasswordMsg = repeatPasswordMsg;

            return isOk;
        }
    },
    methods: {
        toRegister() {
            const self = this;
            const {
                username, password, repeatPassword,
                usernameMsg, passwordMsg, repeatPasswordMsg
            } = self;

            if (!self.isOkBtn) {
                self.setTopMsgAction(usernameMsg || passwordMsg || repeatPasswordMsg);
                return;
            }
            if (self.isAdding) {
                self.setTopMsgAction('正在注册。。。');
                return;
            }

            self.isAdding = true;
            self.findUserAction(username).then(function() {
                self.registerAction(username, password).then(function() {
                    self.setTopMsgAction('注册成功');
                    self.$router.go({ name: 'login' });
                }, function(errMsg) {
                    // TODO
                });
            }, function(errMsg) {
                switch (errMsg) {
                    case 'ERROR_USERNAME':
                        self.setTopMsgAction('用户名重复');
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
.register{
  background: rgba(255,255,255,.8);
  padding: 30px;
}
</style>
