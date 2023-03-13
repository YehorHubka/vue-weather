<template>
  <form class="search-form" @submit.prevent="$emit('addCard')">
    <input
      v-on:input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      list="cities"
      type="text"
      class="search-form__input"
      placeholder="City name..."
      id="autocomplete"
      ref="search"
    />
    <!-- <datalist id="cities">
      <option value="Edge"></option>
      <option value="Firefox"></option>
      <option value="Chrome"></option>
      <option value="Opera"></option>
      <option value="Safari"></option>
    </datalist> -->
    <button :disabled="!modelValue" type="submit" class="search-form__submit">
      + Add
    </button>
  </form>
</template>

<script>
export default {
  emits: ["addCard", "update:modelValue"],
  props: {
    modelValue: String,
  },
  mounted() {
    new google.maps.places.Autocomplete(this.$refs.search, {
      types: ["(cities)"],
    });
  },
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
  &__submit {
    background: #42b983;
    padding: 0 15px;
    height: 50px;
    border-radius: 0 10px 10px 0;
    color: #fff;
    border: 0;
    white-space: nowrap;
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s all ease;
    &:hover {
      background: #000;
    }
    &:disabled {
      cursor: default;
      background: #eee;
    }
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