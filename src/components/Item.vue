<template>
  <div class="item" v-bind:class="{'completed':item.status ===2 }">
    <p>
      <font-awesome-icon
        :icon="['far', 'square']"
        v-show="item.status===1"
        v-on:click="updateStatus({id:item.id, status:2})"
      />
      <font-awesome-icon
        :icon="['far', 'check-square']"
        v-show="item.status===2"
        v-on:click="updateStatus({id:item.id, status:1})"
      />
      <span>{{item.title}}</span>
      <font-awesome-icon :icon="['far', 'trash-alt']" v-on:click="removeTask(item.id)" />
    </p>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
export default {
  props: ["item"],
  methods: {
    ...mapMutations({
      removeTask: "removeItemMutation"
    }),
    ...mapActions(["updateStatus"])
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.item {
  border: 2px solid $primary-color;
  margin-bottom: 5px;
  p {
    text-align: left;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
  }
}
.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>