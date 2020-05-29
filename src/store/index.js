import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [
            { id: 1, title: 'todo 1', status: 1 }
        ]
    },
    getters: {
        getToDoList: state => {
            return state.todos;
        }
    },
    mutations: {
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
        }
    },
    actions: {
        addItemAction: function(context, itemTitle) {
            context.commit('addNewItemMutation', itemTitle)
        },
        updateStatus: function(context, payload) {
            context.commit('updateStatusMutation', payload)
        }
    },
    modules: {}
})