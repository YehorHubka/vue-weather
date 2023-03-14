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
  data() {
    return {
      favoritesFromLS: [],
    };
  },
  computed: {
    ...mapState(["citiesFromLocalStorageLength"]),
    favoritesLength() {
      return this.cities.filter((i) => i.favorite === true).length;
    },
  },
  mounted() {
    this.favoritesFromLS = JSON.parse(
      localStorage.getItem("favoritesList") || "[]"
    ).length;
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