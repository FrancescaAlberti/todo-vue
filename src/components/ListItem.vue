<template>
  <div class="list-item container">
    <h3>ListItem</h3>
    <Item v-for="i in getToDoList" :key="i.id" v-bind:item="i"></Item>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import { mapGetters } from "vuex";

export default {
  name: "ListItem",
  components: {
    Item
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getToDoList: "getToDoList"
    })
  }
};
</script>
<style lang="scss">
.list-item{
   
}
</style>