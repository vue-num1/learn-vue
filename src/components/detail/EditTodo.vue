<template>
    <div>
        <div @click="updateEditmodeAction" v-show="getEditMode" class="black-bg"></div>
        <div v-show="getEditMode">
            <section class="edit-todo">
                <div class="edit-title">EditTodo</div>
                <div class="row">
                    <form class="col s12">
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
                        <div class="types">
                            <div class="fixed-action-btn horizontal select-type">
                                <a class="btn-floating btn-large red">
                                    <i class="large material-icons">mode_edit</i>
                                </a>
                                <ul>
                                    <li><a class="btn-floating red"><i class="material-icons">perm_identity</i></a></li>
                                    <li><a class="btn-floating yellow darken-1"><i class="material-icons">supervisor_account</i></a></li>
                                    <li><a class="btn-floating green"><i class="material-icons">turned_in</i></a></li>
                                    <li><a class="btn-floating blue"><i class="material-icons">loyalty</i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="center-align">
                            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                                <i class="material-icons right">send</i>
                            </button>
                        </div>

                    </form>
                </div>

            </section>
        </div>
    </div>
</template>


<script>
    import _ from 'lodash';
    import {
        updateEditmode as updateEditmodeAction
    } from '../../vuex/actions.js';
    import {
        getEditMode,
    } from '../../vuex/getters.js';
    export default {
        name: 'EditTodo',
        vuex: {
            actions: {
                updateEditmodeAction
            },
            getters: {
                getEditMode
            }
        },
        data() {
            return {

            };
        },
        methods: {
            saveTodo() {
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
            }
        }
    };
</script>
<style>
    .select-type {
        position: absolute;
        right: 20px;
        top: -20px;
        /*transform: translate3d(-50%,0,0);*/
    }

    .edit-title {
        text-align: center;
        background: #f44336;
        line-height: 3;
        color: #fff;
        font-size: 24px;
    }

    .black-bg {
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .edit-todo {
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        min-height: 500px;
        width: 540px;
        max-height: 600px;
        border-radius: 5px;
        overflow: hidden;
    }

    .input-field {
        max-height: 300px;
        overflow-y: scroll;
    }

    .types {
        position: relative;
        height: 50px;
    }
</style>
