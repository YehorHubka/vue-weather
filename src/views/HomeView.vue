<template>
  <div>
    <h1>Choose city to see the weather info</h1>
    <div class="search-field">
      <div class="search-field__error" v-if="error">{{ error }}</div>
      <SearchForm @addCard="addCard" v-model="choosenCity" />
    </div>

    <div v-if="!loading" class="cards-grid">
      <InfoCard :data="city" v-for="city in cities" :key="city.id" />

      <div class="list-empty" v-if="!cities.length">
        Info list is empty. Choose the city!
      </div>
    </div>

    <Loader v-else />
  </div>
</template>

<script>
import InfoCard from "../components/InfoCard.vue";
import SearchForm from "../components/SearchForm.vue";
import Loader from "../components/Loader.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      choosenCity: "",
      error: "",
    };
  },
  methods: {
    ...mapActions(["getCityInfo", "getCityName"]),
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
  watch: {
    // async choosenCity(newVal) {
    //   await this.$store.dispatch("getCityName", newVal);
    // },
  },
  components: { SearchForm, Loader, InfoCard },
  computed: {
    ...mapState(["cities", "loading"]),
  },
  async created() {
    let defaultCity = "Kyiv";
    await this.$store.dispatch("getCityInfo", defaultCity);
  },
};
</script>

<style lang="scss" scoped>
.search-field {
  max-width: 500px;
  margin: 0 auto 30px;
  &__error {
    text-align: center;
    margin-bottom: 10px;
    color: #f00;
  }
}
.cards-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.list-empty {
  width: 100%;
  font-weight: bold;
  text-align: center;
}
</style>