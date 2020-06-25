<template>
  <div class="to-do-list">
    <Menu></Menu>
    <AddItem></AddItem>
    <ListItem></ListItem>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import AddItem from "@/components/AddItem.vue";
import ListItem from "@/components/ListItem.vue";

export default {
  name: "ToDoList",
  components: {
    Menu,
    AddItem,
    ListItem
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
body {
  padding: 0;
  margin: 0;
  background-color: $background-color;
}
.container {
  width: 70%;
  margin: auto;
}
input {
  border: 1px solid $primary-color;
  margin: 10px;
}
.no-focus-outline{
  outline: none;
}
button {
  border: 0px;
  background-color: $primary-color;
  color: $text-color;
}

.rounded {
  border-radius: 10px;
  margin-right: 10px;
  padding: 2px 10px;
}
.to-do-list {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
