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
            axios.get("https://my-json-server.typicode.com/FrancescaAlberti/todo-vue/todos").then(result => {
                debugger;
                context.commit("syncMutation", { type: "todos", data: result.data })
            }, error => {
                console.log(error);
            });
        },


        addTaskToServerAction: function(context, itemTitle) {

            axios.post("https://my-json-server.typicode.com/FrancescaAlberti/todo-vue/todos", {
                id: 3,
                title: itemTitle,
                status: 1
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(result => {
                debugger;
                /*                 context.commit("syncMutation", { type: "todos", data: result.data }) */
            }, error => {
                console.log(error);
            });

            /*             context.commit('addNewItemMutation', itemTitle) */
        },
        updateStatus: function(context, payload) {
            context.commit('updateStatusMutation', payload)
        }
    },
    modules: {}
})