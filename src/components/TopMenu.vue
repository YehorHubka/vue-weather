<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/favorites"
      >Favorites
      <span v-if="citiesFromLocalStorageLength"
        >({{ citiesFromLocalStorageLength }})</span
      ></router-link
    >
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["citiesFromLocalStorageLength"]),
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 25px;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    transition: 0.3s all ease;
    font-size: 20px;
    &.router-link-exact-active,
    &:hover {
      color: #42b983;
    }
  }
}
</style>