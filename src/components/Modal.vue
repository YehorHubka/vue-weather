<template>
  <Teleport to="body">
    <transition>
      <div class="modal" v-if="openModal">
        <div class="modal__overlay" @click="$emit('close', false)"></div>
        <div class="modal__window" role="dialog">
          <div class="modal__close" @click="$emit('close', false)">
            <img width="15" src="@/assets/icon-delete.svg" alt="" />
          </div>
          <h3 class="modal__title">{{ title }}</h3>
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  props: {
    openModal: Boolean,
    title: String,
  },
  emits: ["close"],
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 5;
  &__window {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300px;
    padding: 30px;
    border-radius: 1rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background: #fff;
    z-index: 6;
    transform: translate(-50%, -50%);
  }
  &__overlay {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
  }
  &__close {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
  &__title {
    text-align: center;
    margin: 0 0 20px;
    font-weight: 700;
    font-size: 20px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>