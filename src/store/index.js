import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [
            { id: 0, title: 'todo 1', status: 1 }
        ]
    },
    getters: {
        getToDoList: state => {
            return state.todos;
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
            axios.get("http://localhost:3000/tasks").then(result => {
                context.commit("syncMutation", { type: "todos", data: result.data })
            }, error => {
                console.log(error);
            });
        },
        addTaskToServerAction: function({ context, dispatch }, itemTitle) {

            axios.post("http://localhost:3000/tasks", {
                title: itemTitle,
                status: 1
            }).then(result => {
                dispatch('getTasksFromServerAction', context)
            }, error => {
                console.log(error);
            });
        },
        removeTaskFromServerAction: function({ context, dispatch }, payload) {
            axios.delete('http://localhost:3000/tasks/' + payload)
                .then(resp => {
                    dispatch('getTasksFromServerAction', context)
                }).catch(error => {
                    console.log(error);
                });
        },

        updateStatus: function({ context, dispatch }, payload) {
            debugger;
            axios.put('http://localhost:3000/tasks/' + payload.id + '/', {
                    title: payload.title,
                    status: payload.status
                })
                .then(resp => {
                    dispatch('getTasksFromServerAction', context)
                }).catch(error => {
                    console.log(error);
                });

        }
    },
    modules: {}
})