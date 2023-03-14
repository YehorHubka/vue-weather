<template>
  <button :type="type" :class="['btn', styling]" :disabled="disabled">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
    },
    styling: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  background: #42b983;
  padding: 0 15px;
  height: 50px;
  border-radius: 10px;
  color: #fff;
  border: 0;
  white-space: nowrap;
  font-weight: bold;
  font-size: 16px;
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
  &.danger {
    background: #f00;
    &:hover {
      background: #000;
    }
    &:disabled {
      cursor: default;
      background: #eee;
    }
  }
}
</style>