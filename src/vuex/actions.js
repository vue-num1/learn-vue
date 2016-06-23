const Wilddog = require('wilddog');
import {
    ADD_USER, UPDATE_TODO_LIST, UPDATE_TODO_BY_ID, DELETE_TODO_BY_ID, NEW_TOP_MSG
} from './types.js';
// import router from '../index.js';
import noticeJob from '../js/notice-job';


const DBUrl = 'https://todoyonghua110.wilddogio.com/todoList';

export const setTopMsg = function({ dispatch, state }, msg) {
    dispatch(NEW_TOP_MSG, msg);
};
export const addUser = function({ dispatch, state }, user) {
    dispatch(ADD_USER, user);
};

export const regetTodoList = function({ dispatch, state }) {
    // if (!state.user) {
    //     router.go({ name: 'login' });
    // }

    const user = state.user;

    return new Promise(function(resolve, reject) {
        new Wilddog(DBUrl).on('value', (response) => {
            let data = response.val() || {};

            let todoList = [];
            for (const todoId in data) {
                if (!data.hasOwnProperty(todoId) || !data[todoId]) {
                    continue;
                }
                todoList.push(data[todoId]);
            }

            resolve(todoList);
            dispatch(UPDATE_TODO_LIST, todoList);
        }, (errMsg) => {
            console.error(errMsg);
            reject(errMsg);
        });
    });
};

export const updateTodoById = function({ dispatch, state }, todoInfo) {
    const isNew = !todoInfo.id;
    if (isNew) {
        todoInfo.id = `TODO-${Date.now()}`;
    }

    return new Promise(function(resolve, reject) {
        new Wilddog(DBUrl).child(todoInfo.id).update(todoInfo, (errMsg) => {
            if (errMsg) {
                reject(errMsg);
                return;
            }

            resolve(isNew);
            dispatch(UPDATE_TODO_BY_ID, todoInfo, isNew);
        });
    }).then(() => {
        noticeJob(todoInfo)
        return Promise;
    });
};

export const deleteTodoById = function({ dispatch, state }, todoInfo) {
    return new Promise(function(resolve, reject) {
        new Wilddog(DBUrl).child(todoInfo.id).set(null, (errMsg) => {
            if (errMsg) {
                reject(errMsg);
                return;
            }

            resolve();
            dispatch(DELETE_TODO_BY_ID, todoInfo);
        });
    });
};
