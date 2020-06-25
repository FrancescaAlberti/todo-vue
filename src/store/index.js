import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [

        ]
    },
    getters: {
        getToDoList: state => {
            return state.todos.reverse();
        }
    },
    mutations: {
        syncFromServer: function() {

        },
        addNewItemMutation: function(state, newTitle) {
            if (newTitle && state.todos.filter(i => i.title === newTitle).length === 0)
                state.todos.push({ id: (state.todos.length - 1) >= 0 ? (state.todos[state.todos.length - 1].id) + 1 : 1, title: newTitle, status: 1 })
        },
        removeItemMutation: function(state, idToRemove) {
            let itemToRemove = state.todos.findIndex(i => i.id === idToRemove);
            if (itemToRemove !== -1)
                state.todos.splice(itemToRemove, 1);
        },
        updateStatusMutation: function(state, payload) {
            let itemToUpdateIndex = state.todos.findIndex(i => i.id === payload.id);
            if (itemToUpdateIndex !== -1)
                state.todos[itemToUpdateIndex].status = payload.status;
        },
        syncMutation: function(state, payload) {
            state[payload.type] = [];
            payload.data.map(i => state[payload.type].push({ id: i.id, title: i.title, status: i.status }))
        }
    },
    actions: {
        getTasksFromServerAction: function(context) {
            debugger;
            let result = JSON.parse(localStorage.getItem('to-do'));
            if (!result) {
                localStorage.setItem('to-do', JSON.stringify([{ id: 1, title: 'default', status: 1 }]))
            }
            context.commit("syncMutation", {
                type: "todos",
                data: result || [{ id: 1, title: 'default', status: 1 }]
            })

        },
        addTaskToServerAction: function({ context, dispatch }, itemTitle) {
            let result = JSON.parse(localStorage.getItem('to-do'));
            let newId = result[(result.length - 1)].id + 1;
            debugger;
            result.push({ id: newId, title: itemTitle, status: 1 })

            localStorage.setItem('to-do', JSON.stringify(result));
            dispatch('getTasksFromServerAction', context)

        },
        removeTaskFromServerAction: function({ context, dispatch }, payload) {
            debugger;
            let result = JSON.parse(localStorage.getItem('to-do'));
            let taskIdToRemove = result.findIndex(t => t.id === payload);
            result.splice(taskIdToRemove, 1);
            localStorage.setItem('to-do', JSON.stringify(result));

            dispatch('getTasksFromServerAction', context)
        },

        updateStatus: function({ context, dispatch }, payload) {
            let result = JSON.parse(localStorage.getItem('to-do'));
            result.filter(t => t.id === payload.id)[0].status = payload.status;
            localStorage.setItem('to-do', JSON.stringify(result));

            dispatch('getTasksFromServerAction', context)

        }
    },
    modules: {}
})