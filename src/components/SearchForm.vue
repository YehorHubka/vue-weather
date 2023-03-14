<template>
  <form class="search-form" @submit.prevent="addCard(cityName)">
    <!-- <input
      v-on:input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      type="text"
      class="search-form__input"
      placeholder="City name..."
      id="autocomplete"
      ref="search"
      :disabled="cities.length === 5"
    /> -->
    <vue-google-autocomplete
      classname="search-form__input"
      @placechanged="getAddressData"
      placeholder="City name..."
      id="autocomplete"
      :disabled="cities.length === 5"
      types="(cities)"
      ref="search"
    >
    </vue-google-autocomplete>
    <Button :disabled="!cityName || cities.length === 5" type="submit">
      + Add
    </Button>
  </form>
</template>

<script>
import Button from "../components/Button.vue";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { mapState } from "vuex";

export default {
  emits: ["addCard"],
  mounted() {
    this.$refs.search.focus();
  },
  data() {
    return {
      cityName: "",
    };
  },
  methods: {
    getAddressData: function (addressData) {
      this.cityName = addressData.locality;
    },
    addCard(name) {
      this.$emit("addCard", name);
      this.$refs.search.clear();
    },
  },
  computed: {
    ...mapState(["cities"]),
  },
  components: { Button, VueGoogleAutocomplete },
};
</script>

<style lang="scss" scoped>
.search-form {
  display: flex;
  &__input {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    font-size: 18px;
    color: #000;
    border: 1px solid #eee;
    border-radius: 10px 0 0 10px;
    outline: none;
    transition: border-color 0.3s ease;
    &:focus {
      border-color: #ccc;
    }
  }
  & .btn {
    border-radius: 0 10px 10px 0;
  }
}
input::-webkit-input-placeholder,
input::-moz-placeholder {
  opacity: 1;
  transition: opacity 0.3s ease;
}
input:focus::-webkit-input-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}
input:focus::-moz-placeholder {
  opacity: 0;
  transition: opacity 0.3s ease;
}
</style>