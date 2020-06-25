<template>
  <div class="add-item container">
    <h3>AddItem</h3>
    <form name="todo-form" method="post" action v-on:submit.prevent="addTask(newItemInput)">
      <input class="rounded no-focus-outline" v-model="newItemInput" placeholder="edit me" />
      <button class="rounded" type="submit">Add new Item</button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "AddItem",
  data() {
    return {
      newItemInput: ""
    };
  },
  methods: {
    ...mapActions(["addTaskToServerAction"]),
    
    addTask() {
      this.addTaskToServerAction(this.newItemInput);
      this.newItemInput = "";
    }
  }
};
</script>

<style lang="scss">
</style>