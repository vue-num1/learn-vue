import {
    ADD_USER, LOGIN, UPDATE_TODO_LIST, UPDATE_TODO_BY_ID, DELETE_TODO_BY_ID, NEW_TOP_MSG
} from './types.js';
import noticeJob from '../js/notice-job';


export const state = {
    user: null,
    todoList: null,
    topMsg: ''
};

export const mutations = {
    [NEW_TOP_MSG](state, msg) {
        state.topMsg = msg;
    },
    [ADD_USER](state, user) {
        state.user = user;
    },
    [LOGIN](state, user) {

    },
    [UPDATE_TODO_LIST](state, todoList) {
        state.todoList = todoList;

        noticeJob(todoList);
    },
    [UPDATE_TODO_BY_ID](state, todoInfo, isNew) {
        const todoList = state.todoList;
        const todoListLen = todoList.length;
        var i = -1;

        if (!isNew) {
            i = 0;
            for (i = 0; i < l; i++) {
                if (todoList[i].id === todoInfo.id) {
                    break;
                }
            }
        }

        if (i < 0 || i >= todoListLen) {
            state.todoList = todoList.concat(todoInfo);
        } else {
            todoList[i] = todoInfo;
        }

        state.todoList = todoList;
        // noticeJob(todoList);
    },
    [DELETE_TODO_BY_ID](state, todoInfo) {
        const todoList = state.todoList;

        let i = -1;
        const l = todoList.length;
        for (i = 0; i < l; i++) {
            if (todoList[i].id === todoInfo.id) {
                break;
            }
        }
        if (i >= 0) {
            state.todoList = todoList.slice(0, i).concat(todoList.slice(i + 1));
            noticeJob(state.todoList);
        }
    }
};
