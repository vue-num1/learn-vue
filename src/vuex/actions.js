const Wilddog = require('wilddog');
import {
    REGISTER, UPDATE_TODO_LIST, UPDATE_TODO_BY_ID, DELETE_TODO_BY_ID, NEW_TOP_MSG, LOGIN
} from './types.js';
// import router from '../index.js';
import noticeJob from '../js/notice-job';


const DBUrl = 'https://weifei365.wilddogio.com/';

export const setTopMsg = function({ dispatch, state }, msg) {
    dispatch(NEW_TOP_MSG, msg);
};
export const register = function({ dispatch, state }, username, password) {
    return new Promise(function(resolve, reject) {
        new Wilddog(`${DBUrl}user_list`).child(username).update({ username, password }, function(errMsg) {
            if (errMsg) {
                reject(errMsg);
            } else {
                resolve();
                dispatch(REGISTER, { username, password });
            }
        });
    });
};
export const findUser = function({ dispatch, state }, username) {
    return new Promise(function(resolve, reject) {
        new Wilddog(`${DBUrl}user_list`).on('value', (response) => {
            let userMap = response.val() || {};

            // TODO，用户名非法 userMap.hasOwnProperty(username)

            if (userMap[username]) {
                reject('ERROR_USERNAME');
            } else {
                resolve(null);
            }
        });
    });
};
export const login = function({ dispatch, state }, username, password) {
    return new Promise(function(resolve, reject) {
        new Wilddog(`${DBUrl}user_list`).on('value', (response) => {
            let userMap = response.val() || {};

            if (!userMap.hasOwnProperty(username) || !userMap[username]) {
                reject('ERROR_USERNAME');
            } else if (userMap[username].password !== password) {
                reject('ERROR_PASSWORD');
            } else {
                resolve();
                dispatch(LOGIN, userMap[username]);
            }
        }, (errMsg) => {
            console.error(errMsg);
            reject(errMsg);
        });
    });
};

export const regetTodoList = function({ dispatch, state }) {
    // if (!state.user) {
    //     router.go({ name: 'login' });
    // }

    const user = state.user;

    return new Promise(function(resolve, reject) {
        new Wilddog(`${DBUrl}todoList`).on('value', (response) => {
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
        new Wilddog(`${DBUrl}todoList`).child(todoInfo.id).update(todoInfo, function(errMsg) {
            if (errMsg) {
                reject(errMsg);
            } else {
                resolve(isNew);
                dispatch(UPDATE_TODO_BY_ID, todoInfo, isNew);
            }
        });
    });
};

export const deleteTodoById = function({ dispatch, state }, todoInfo) {
    return new Promise(function(resolve, reject) {
        new Wilddog(`${DBUrl}todoList`).child(todoInfo.id).set(null, (errMsg) => {
            if (errMsg) {
                reject(errMsg);
            } else {
                resolve();
                dispatch(DELETE_TODO_BY_ID, todoInfo);
            }
        });
    });
};
