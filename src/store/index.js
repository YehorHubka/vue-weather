import { createStore } from "vuex"

export default createStore({
  state: {
    cities: [],
    loading: false,
    hourlyCityData: null,
    citiesFromLocalStorageLength: JSON.parse(
      localStorage.getItem("favoritesList") || "[]"
    ).length,
  },
  mutations: {
    incriseCitiesFromLocalStorageLength(state) {
      state.citiesFromLocalStorageLength =
        JSON.parse(localStorage.getItem("favoritesList") || "[]").length + 1
    },
    resetFavorutes(state) {
      state.cities.forEach((i) => (i.favorite = false))
    },
    decreaseCitiesFromLocalStorageLength(state) {
      state.citiesFromLocalStorageLength =
        JSON.parse(localStorage.getItem("favoritesList") || "[]").length - 1
    },
    setCities(state, city) {
      state.cities.push(city)
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    removeCity(state, id) {
      state.cities = state.cities.filter((city) => city.id !== id)
    },
    addCityToFavorites(state, id) {
      state.cities.find((city) => {
        //console.log("city", city)
        if (city.id === id) {
          city.favorite === false
            ? (city.favorite = true)
            : (city.favorite = false)
        }
      })
    },
    setToFavorites(state, id) {
      state.cities.find((city) => {
        if (city.id === id) city.favorite = true
      })
    },
    setHourlyCityData(state, payload) {
      state.hourlyCityData = payload
    },
  },
  actions: {
    async geocodingCityInfo({ _ }, cityName) {
      let geocodingAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.VUE_APP_GEO_API_KEY}`
      let cityGeoData = null

      try {
        await fetch(geocodingAPIUrl)
          .then((response) => response.json())
          .then((data) => (cityGeoData = data[0]))
      } catch (error) {
        console.log("error: ", error.message)
      }

      return cityGeoData
    },

    async getCityInfo({ commit, dispatch }, cityName) {
      commit("setLoading", true)

      let cityGeoData = null

      if (typeof cityName == "string") {
        cityGeoData = await dispatch("geocodingCityInfo", cityName)
      } else {
        cityGeoData = cityName
      }

      let dataAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${process.env.VUE_APP_GEO_API_KEY}`
      let cityData = null
      let favoritesField = { favorite: false }

      try {
        await fetch(dataAPIUrl)
          .then((response) => response.json())
          .then(
            (data) =>
              (cityData = Object.assign({}, data, cityGeoData, favoritesField))
          )
      } catch (error) {
        console.log("error: ", error.message)
      }

      commit("setCities", cityData)

      let dataHourlyAPIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&exclude=daily,minutely&appid=${process.env.VUE_APP_GEO_API_KEY}`
      let hourlyCityData = null

      try {
        await fetch(dataHourlyAPIUrl)
          .then((response) => response.json())
          .then(
            (data) =>
              (hourlyCityData = Object.assign({}, data, cityGeoData, cityData))
          )
      } catch (error) {
        console.log("error: ", error.message)
      }

      commit("setHourlyCityData", hourlyCityData)
      commit("setLoading", false)
    },
  },
})
