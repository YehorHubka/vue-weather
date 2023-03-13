<template>
  <div class="city-card">
    <div class="city-card__name">{{ data.name }} ({{ data.country }})</div>
    <div class="city-card__temp">
      {{ Math.round(data.main.temp - 273.15) }}°C
    </div>
    <div class="city-card__info">
      (feels like {{ Math.round(data.main.feels_like - 273.15) }}°C /
      {{ data.weather[0].description }})
    </div>
    <button
      @click="addToFavorites(data.id)"
      type="button"
      class="city-card__favorites-btn"
      :class="{ active: data.favorite }"
    ></button>
    <button
      @click="removeCity(data.id)"
      type="button"
      class="city-card__delete-btn"
    ></button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    data: Object,
  },
  methods: {
    ...mapMutations(["removeCity", "addCityToFavorites"]),
    removeCity(id) {
      this.$store.commit("removeCity", id);
    },
    addToFavorites(id) {
      this.$store.commit("addCityToFavorites", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.city-card {
  border: 1px solid #eee;
  padding: 30px 10px;
  text-align: center;
  width: calc(25% - 15px);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  transition: 0.3s all ease;
  &:hover {
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
  }
  &__name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  &__temp {
    font-size: 36px;
    margin-bottom: 15px;
    font-weight: bold;
    color: #42b983;
  }
  &__info {
    font-size: 16px;
  }
  &__favorites-btn {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url(@/assets/icon-favorite.svg) 50% / contain no-repeat;
    border: 0;
    transition: 0.3s all ease;
    &:hover {
      transform: scale(1.1);
    }
    &.active {
      background: url(@/assets/icon-favorite-active.svg) 50% / contain no-repeat;
    }
  }
  &__delete-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url(@/assets/icon-delete.svg) 50% / 15px no-repeat;
    border: 0;
    transition: 0.3s all ease;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>