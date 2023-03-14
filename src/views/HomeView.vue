<template>
  <div>
    <h1>Choose city to see the weather info</h1>
    <div class="search-field">
      <div class="search-field__error" v-if="error">{{ error }}</div>

      <SearchForm @addCard="addCard" />

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
          {{ hourlyCityData.name }} ({{ hourlyCityData.sys.country }})
          <br /><small>(hourly weather info on 24 hours)</small>
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
      error: "",
      hourly: null,
      favoritesList: [],
      defaultLocation: {},
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
      "setToFavorites",
      "removeCity",
      "addCityToFavorites",
      "incriseCitiesFromLocalStorageLength",
      "decreaseCitiesFromLocalStorageLength",
    ]),
    removeCity(id) {
      this.$store.commit("removeCity", id);
      this.openModal = false;
    },
    addToFavorites(id) {
      this.$store.commit("addCityToFavorites", id);

      if (this.cities.find((i) => i.id == id).favorite) {
        this.$store.commit("incriseCitiesFromLocalStorageLength");
      } else {
        this.$store.commit("decreaseCitiesFromLocalStorageLength");
      }

      this.favoritesList = this.cities.filter((i) => i.favorite === true);
      localStorage.setItem("favoritesList", JSON.stringify(this.favoritesList));
    },
    async addCard(name) {
      try {
        await this.$store.dispatch("getCityInfo", name);
        this.error = "";
      } catch (error) {
        console.log("add card error: ", error.message);
        this.error = "There is some mistake in city name. Try again!";
      }
    },
  },
  components: { SearchForm, Loader, InfoCard, Chart },
  computed: {
    ...mapState(["cities", "loading", "hourlyCityData"]),
  },
  async created() {
    //check favorites enable after routing to set favorites an cityList in store
    if (JSON.parse(localStorage.getItem("favoritesList") || "[]").length) {
      JSON.parse(localStorage.getItem("favoritesList") || "[]").map((i) => {
        this.$store.commit("resetFavorutes");
        this.$store.commit("setToFavorites", i.id);
      });
    } else {
      this.$store.commit("resetFavorutes");
    }

    //geolocation
    if (!this.cities.length) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // console.log("lat: ", position.coords.latitude);
            // console.log("lng: ", position.coords.longitude);
            await this.$store.dispatch("getCityInfo", {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            console.log("geo error: ", error.message);
          }
        );
      }
    }
  },
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