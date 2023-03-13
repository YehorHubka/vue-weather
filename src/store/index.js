import { createStore } from "vuex"

export default createStore({
  state: {
    cities: [],
    loading: false,
  },
  getters: {},
  mutations: {
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
        city.id === id && city.favorite === false
          ? (city.favorite = true)
          : (city.favorite = false)
      })
    },
  },
  actions: {
    async getCityName({ _ }, cityName) {
      let geocodingAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${process.env.VUE_APP_GEO_API_KEY}`
      let cities = null

      try {
        await fetch(geocodingAPIUrl)
          .then((response) => response.json())
          .then((data) => (cities = data))
      } catch (error) {
        console.log("error: ", error.message)
      }

      console.log("data: ", cities)
    },

    async geocodingCityInfo({ _ }, cityName) {
      let geocodingAPIUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.VUE_APP_GEO_API_KEY}`
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

    async getCityInfo({ commit }, cityName) {
      this.commit("setLoading", true)

      const cityGeoData = await this.dispatch("geocodingCityInfo", cityName)

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

      this.commit("setCities", cityData)
      this.commit("setLoading", false)
    },
  },
  modules: {},
})
