<template>
  <div>
    <h1>Choose city to see the weather info</h1>
    <div class="search-field">
      <div class="search-field__error" v-if="error">{{ error }}</div>

      <SearchForm @addCard="addCard" v-model="choosenCity" />

      <div class="search-field__disable-info" v-if="cities.length === 5">
        Yon can add only <b>5</b> cities. <br />
        To add more or another you should remove any of existed.
      </div>
    </div>

    <div v-if="!loading" class="info-block">
      <div class="cards-grid">
        <InfoCard
          @removeCity="removeCity"
          @addToFavorites="addToFavorites"
          :data="city"
          v-for="city in cities"
          :key="city.id"
        />

        <div class="list-empty" v-if="!cities.length">
          Info list is empty. Choose the city!
        </div>
      </div>

      <div class="chart-block" v-if="cities.length">
        <h3 class="chart-block__title">
          {{ hourlyCityData.name }} ({{ hourlyCityData.country }}) <br /><small
            >(hourly weather info on 24 hours)</small
          >
        </h3>
        <Chart :hourlyData="hourlyCityData" />
      </div>
    </div>

    <Loader v-else />
  </div>
</template>

<script>
import InfoCard from "../components/InfoCard.vue";
import Chart from "../components/Chart.vue";
import SearchForm from "../components/SearchForm.vue";
import Loader from "../components/Loader.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      choosenCity: "",
      error: "",
      hourly: null,
      favoritesList: [],
    };
  },
  methods: {
    ...mapActions([
      "getCityInfo",
      "getCityName",
      "getHourlyCityInfo",
      "resetFavorutes",
    ]),
    ...mapMutations([
      "removeCity",
      "addCityToFavorites",
      "incriseCitiesFromLocalStorageLength",
    ]),
    removeCity(id) {
      this.$store.commit("removeCity", id);
      this.openModal = false;
    },
    addToFavorites(id) {
      this.$store.commit("addCityToFavorites", id);
      this.$store.commit("incriseCitiesFromLocalStorageLength");

      this.favoritesList = this.cities.filter((i) => i.favorite === true);
      localStorage.setItem("favoritesList", JSON.stringify(this.favoritesList));
    },
    async addCard() {
      try {
        await this.$store.dispatch("getCityInfo", this.choosenCity);
        this.error = "";
      } catch (error) {
        console.log("add card error: ", error.message);
        this.error = "There is some mistake in city name. Try again!";
      }
      this.choosenCity = "";
    },
  },
  watch: {},
  components: { SearchForm, Loader, InfoCard, Chart },
  computed: {
    ...mapState(["cities", "loading", "hourlyCityData"]),
  },
  async created() {
    this.$store.commit("resetFavorutes");
    if (!this.cities.length) {
      let defaultCity = "Kharkiv";
      await this.$store.dispatch("getCityInfo", defaultCity);
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.chart-block {
  margin-top: 50px;
  &__title {
    margin: 0 0 30px;
    text-align: center;
    font-size: 24px;
    small {
      font-weight: normal;
      font-size: 18px;
    }
  }
}
.search-field {
  max-width: 500px;
  margin: 0 auto 30px;
  &__error {
    text-align: center;
    margin-bottom: 10px;
    color: #f00;
  }
  &__disable-info {
    text-align: center;
    margin-top: 10px;
    color: #f00;
  }
}
.cards-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -15px;
}
.list-empty {
  width: 100%;
  font-weight: bold;
  text-align: center;
}
</style>