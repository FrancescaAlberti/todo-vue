<template>
  <div class="nav">
    <h1>TO DO</h1>
  </div>
</template>
<script>
export default {
  name: "Menu"
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.nav {
  background-color: $primary-color;
  background: url("../assets/img/header.jpg");
  background-size: cover;
  background-position-y: center;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  h1 {
    color: $text-color;
  }
}
</style>