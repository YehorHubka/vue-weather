<template>
  <div>
    <h1>Favorites</h1>

    <div class="cards-grid">
      <InfoCard
        @removeCity="removeCity"
        @addToFavorites="addToFavorites"
        :data="city"
        v-for="city in favoritesFromLS"
        :key="city.id"
      />

      <div class="list-empty" v-if="!favoritesFromLS.length">
        You have not favorites yet! <br />Add some cities on
        <router-link to="/">Home Page</router-link>.
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import InfoCard from "../components/InfoCard.vue";

export default {
  name: "FavoritesView",
  components: { InfoCard },
  data() {
    return {
      favoritesFromLS: [],
    };
  },
  methods: {
    ...mapMutations(["decreaseCitiesFromLocalStorageLength"]),
    removeCity(id) {
      this.openModal = false;
      this.$store.commit("decreaseCitiesFromLocalStorageLength");

      this.favoritesFromLS = JSON.parse(
        localStorage.getItem("favoritesList") || "[]"
      );

      this.favoritesFromLS = this.favoritesFromLS.filter((i) => i.id !== id);

      localStorage.setItem(
        "favoritesList",
        JSON.stringify(this.favoritesFromLS)
      );
    },
    addToFavorites(id) {},
  },
  mounted() {
    this.favoritesFromLS = JSON.parse(
      localStorage.getItem("favoritesList") || "[]"
    );
  },
};
</script>

<style lang="scss" scoped>
.cards-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -15px;
  &:deep {
    & .city-card {
      &__favorites-btn {
        display: none;
      }
    }
  }
}
.list-empty {
  width: 100%;
  font-weight: bold;
  text-align: center;
  a {
    color: #42b983;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>