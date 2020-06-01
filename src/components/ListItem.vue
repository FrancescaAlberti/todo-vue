<template>
  <div class="list-item container">
    <h3>ListItem</h3>
    <Item v-for="i in getToDoList" :key="i.id" v-bind:item="i"></Item>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "ListItem",
  components: {
    Item
  },
  data() {
    return {};
  },
  methods:{
    ...mapActions({ sync: "getTasksFromServerAction" })
  },
  mounted() {
    this.sync();
  },
  computed: {
    ...mapGetters({
      getToDoList: "getToDoList"
    }),
  }
};
</script>
<style lang="scss">
</style>