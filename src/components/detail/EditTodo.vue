<template>
    <section class="edit-todo">
      <div class="row">
  <form class="col s12">
      <div class="types">
        <div class="fixed-action-btn horizontal" style="position:absolute;bottom: 45px; right: 24px;">
        <a class="btn-floating btn-large red">
          <i class="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
          <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
          <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
          <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
        </ul>
      </div>
      </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="title" type="text" class="validate" placeholder="Title">
      </div>
    </div>
    <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea" length="360"></textarea>
          <label for="textarea1">Textarea</label>
        </div>
      </div>
  </form>
</div>

    </section>
</template>
<style media="screen">
  .edit-todo{
    background-color: #fff;
  }
  .types{
    position: relative;
  }
</style>

<script>
import _ from 'lodash';
import performance from '../../js/performance_mixin';
import moment from 'moment';
import datePicker from 'vue-datepicker';
import {
    updateTodoById as updateTodoByIdAction,
    setTopMsg as setTopMsgAction
} from '../../vuex/actions.js';


const initTodo = {
    id: null,
    text: '',
    content:'',
    done: false,
    time: ''
};

export default {
    name: 'EditTodo',
    mixins: [performance],
    vuex: {
        actions: { updateTodoByIdAction, setTopMsgAction }
    },
    props: {
        todoId: {
            type: String,
            default() {
                return _.cloneDeep(initTodo).id;
            }
        },
        todoItem: {
            default() {
                return _.cloneDeep(initTodo);
            }
        }
    },
    data(){
        return {
            isAdding: false,
            startTime: '',
            timeoption: {
                type: 'min',
                week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                format: 'YYYY-MM-DD HH:mm'
            },
            isEditMode: false
        };
    },
    // watch:{
    //     'todoItem.done':function (){
    //         this.saveTodo();
    //     },
    //     'todoItem.time':function (){
    //         this.noticed = false;
    //         this.saveTodo();
    //     }
    // },
    methods:{
        saveTodo(){
            const self = this;

            if (_.isEmpty(self.todoItem.text)) {
                self.$els.editinput.focus();
                return;
            }
            if (self.isAdding) {
                return;
            }

            self.isAdding = true;
            self.updateTodoByIdAction(self.todoItem).then(function(isNew) {
                self.disableEdit();
                self.isAdding = false;

                self.setTopMsgAction(isNew ? '新增成功' : '更新成功');
            }, function(errMsg) {
                self.isAdding = false;

                self.setTopMsgAction(errMsg);
            });
        },
        enableEdit() {
            if (this.todoItem.done) {
                return;
            }
            this.isEditMode = true;
            this.$nextTick(() => {
                this.$els.editinput.focus();
            });
        },
        disableEdit() {
            this.isEditMode = false;
        }
    },
    created(){
        window.addEventListener('click', () => {
            this.disableEdit();
        });
    },
    beforeDestroy() {
        window.removeEventListener('click', () => {
            this.disableEdit();
        });
    },
    components: {
        datePicker
    },
    filters:{
        formatDate(val, format){
            let mt = moment(val);
            return  mt.isValid() ? mt.format(format||'YYYY-MM-DD HH:mm') : ''
        }

    },
    directives: {
        placeholder(placeString) {
            let vm = this.vm;
            if (_.isEmpty(vm.todoItem.text)) {
                vm.todoItem.text = placeString;
            }
            // console.log(placeString);
        }
    }
};

</script>
